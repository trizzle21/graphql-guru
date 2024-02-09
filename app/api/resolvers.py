from ariadne import convert_kwargs_to_snake_case

# all the resolvers we need
all_posts = [
    {'id': 1, 'title': 'how to do graphql', 'description': 'how to make graphql requests', 'created_at': '2021-01-01T00:00:00Z'},
    {'id': 2, 'title': 'how to win gpt competition', 'description': 'just make cool stuff', 'created_at': '2021-01-02T00:00:00Z'},
    {'id': 3, 'title': 'how to do gpt', 'description': 'how to do machine learning', 'created_at': '2021-01-3T00:00:00Z'},
    {'id': 4, 'title': 'how to sleep', 'description': 'steps to sleep more', 'created_at': '2021-01-04T00:00:00Z'},
]

def listPosts_resolver(obj, info):
    try:
        print(all_posts)
        payload = {
            'success': True,
            'posts': all_posts
        }
    except Exception as error:
        payload = {
            'success': False,
            'errors': [str(error)]
        }
    return payload



@convert_kwargs_to_snake_case
def getPost_resolver(obj, info, id):
    try:
        post = Post.query.get(id)
        payload = {
            &quot;success&quot;: True,
            &quot;post&quot;: post.to_dict()
        }
    except AttributeError:  # todo not found
        payload = {
            &quot;success&quot;: False,
            &quot;errors&quot;: [&quot;Post item matching {id} not found&quot;]
        }
    return payload