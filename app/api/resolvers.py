from ariadne import convert_kwargs_to_snake_case

# all the resolvers we need
all_authors = [
    {
        "id": 0,
        "name": "John Doe",
        "email": "johnDoe@test.com",
        "created_at": "2021-01-01T00:00:00Z",
    },
    {
        "id": 1,
        "name": "Jane Doe",
        "email": "janeDoe@test.com",
        "created_at": "2021-02-01T00:00:00Z",
    },
]

all_posts = [
    {
        "id": 0,
        "title": "how to do graphql",
        "description": "how to make graphql requests",
        "author": all_authors[0],
        "created_at": "2021-01-01T00:00:00Z",
    },
    {
        "id": 1,
        "title": "how to win gpt competition",
        "description": "just make cool stuff",
        "author": all_authors[0],
        "created_at": "2021-01-02T00:00:00Z",
    },
    {
        "id": 2,
        "title": "how to do gpt",
        "description": "how to do machine learning",
        "author": all_authors[1],
        "created_at": "2021-01-3T00:00:00Z",
    },
    {
        "id": 3,
        "title": "how to sleep",
        "description": "steps to sleep more",
        "author": all_authors[1],
        "created_at": "2021-01-04T00:00:00Z",
    },
]


@convert_kwargs_to_snake_case
def list_posts_resolver(obj, info):
    try:
        payload = {"success": True, "posts": all_posts}
    except Exception as error:
        payload = {"success": False, "errors": [str(error)]}
    return payload


@convert_kwargs_to_snake_case
def get_post_resolver(obj, info, id):
    try:
        post = Post.query.get(id)
        payload = {"success": True, "post": post}
    except AttributeError:
        payload = {"success": False, "errors": [f"Post item matching {id} not found"]}
    return payload


@convert_kwargs_to_snake_case
def get_author_resolver(obj, info, id):
    try:
        author = all_authors[id]
        payload = {"success": True, "author": author}
    except AttributeError:
        payload = {"success": False, "errors": [f"Author item matching {id} not found"]}
    return payload


@convert_kwargs_to_snake_case
def create_post_resolver(obj, info, title, description):
    try:
        today = date.today()
        post = {
            "id": len(all_posts) + 1,
            "title": title,
            "description": description,
            "created_at": today.strftime("%Y-%m-%d"),
        }
        all_posts.append(
            post
        )  # add to the list of posts. this not persistent since this is a demo
        payload = {"success": True, "post": post}
    except ValueError:
        payload = {
            "success": False,
            "errors": [
                "Incorrect date format provided. Date should be in the format 'dd-mm-yyyy'"
            ],
        }
    return payload


@convert_kwargs_to_snake_case
def update_post_resolver(obj, info, id, title, description):
    try:
        _id = int(id)  # ensure id is an integer to avoid errors
        post = all_posts[_id - 1]
        if post:
            # this update is not persistent since this is a demo
            post["title"] = title
            post["description"] = description
        payload = {"success": True, "post": post}
    except AttributeError:  # Post not found
        payload = {"success": False, "errors": [f"item matching id {_id} not found"]}
    return payload


@convert_kwargs_to_snake_case
def delete_post_resolver(obj, info, id):
    try:
        _id = int(id)  # ensure id is an integer to avoid errors
        post = all_posts[_id - 1]
        if post:
            # this update is not persistent since this is a demo
            del all_posts[_id - 1]
        payload = {"success": True, "post": post}
    except AttributeError:  # Post not found
        payload = {"success": False, "errors": [f"item matching id {_id} not found"]}
    return payload
