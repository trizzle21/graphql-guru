import time
from flask import Flask
from flask import request, jsonify
from flask_cors import CORS

from ariadne import load_schema_from_path, make_executable_schema, \
    graphql_sync, snake_case_fallback_resolvers, ObjectType
from ariadne.asgi import GraphQL

from resolvers import listPosts_resolver, getPost_resolver

query = ObjectType('Query')
query.set_field('listPosts', listPosts_resolver)
query.set_field('getPosts', getPost_resolver)

type_defs = load_schema_from_path('schema.graphql')
schema = make_executable_schema(
    type_defs, query, snake_case_fallback_resolvers
)

app = Flask(__name__)
CORS(app)

@app.route('/')
def get_home():
    return 'hello!'


@app.route('/time')
def get_current_time():
    return {'time': time.time()}

# @app.route('/graphql', methods=['GET'])
# def graphql_playground():
#     return PLAYGROUND_HTML, 200

@app.route('/graphql', methods=['POST'])
def graphql_server():
    data = request.get_json()
    success, result = graphql_sync(
        schema,
        data,
        context_value=request,
        debug=app.debug
    )
    status_code = 200 if success else 400
    return jsonify(result), status_code

