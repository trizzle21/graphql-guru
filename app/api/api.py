import time
from flask import Flask
from flask import request, jsonify
from flask_cors import CORS

from ariadne import (
    load_schema_from_path,
    make_executable_schema,
    graphql_sync,
    snake_case_fallback_resolvers,
    ObjectType,
)
from ariadne.asgi import GraphQL

from resolvers import (
    list_posts_resolver,
    get_post_resolver,
    create_post_resolver,
    update_post_resolver,
    delete_post_resolver,
)

query = ObjectType("Query")
query.set_field("listPosts", list_posts_resolver)
query.set_field("getPost", get_post_resolver)

mutation = ObjectType("Mutation")
mutation.set_field("createPost", create_post_resolver)
mutation.set_field("updatePost", update_post_resolver)
mutation.set_field("deletePost", delete_post_resolver)

type_defs = load_schema_from_path("schema.graphql")
schema = make_executable_schema(
    type_defs, query, mutation, snake_case_fallback_resolvers
)

app = Flask(__name__)
CORS(app)


@app.route("/")
def get_home():
    return "Your application is running!"


@app.route("/graphql", methods=["POST"])
def graphql_server():
    data = request.get_json()
    success, result = graphql_sync(schema, data, context_value=request, debug=app.debug)
    status_code = 200 if success else 400
    return jsonify(result), status_code
