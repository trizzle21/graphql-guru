from ariadne import convert_kwargs_to_snake_case

# all the resolvers we need
all_posts = [
    {
        "id": 1,
        "title": "how to do graphql",
        "description": "how to make graphql requests",
        "created_at": "2021-01-01T00:00:00Z",
    },
    {
        "id": 2,
        "title": "how to win gpt competition",
        "description": "just make cool stuff",
        "created_at": "2021-01-02T00:00:00Z",
    },
    {
        "id": 3,
        "title": "how to do gpt",
        "description": "how to do machine learning",
        "created_at": "2021-01-3T00:00:00Z",
    },
    {
        "id": 4,
        "title": "how to sleep",
        "description": "steps to sleep more",
        "created_at": "2021-01-04T00:00:00Z",
    },
]


@convert_kwargs_to_snake_case
def list_posts_resolver(obj, info):
    try:
        print(all_posts)
        payload = {"success": True, "posts": all_posts}
    except Exception as error:
        payload = {"success": False, "errors": [str(error)]}
    return payload


@convert_kwargs_to_snake_case
def get_post_resolver(obj, info, id):
    try:
        post = Post.query.get(id)
        payload = {"success": True, "post": post.to_dict()}
    except AttributeError:
        payload = {"success": False, "errors": [f"Post item matching {id} not found"]}
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
        payload = {"success": True, "post": post.to_dict()}
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
        post = all_posts[id - 1]
        if post:
            post["title"] = title
            post["description"] = description
        payload = {"success": True, "post": post.to_dict()}
    except AttributeError:  # Post not found
        payload = {"success": False, "errors": ["item matching id {id} not found"]}
    return payload
