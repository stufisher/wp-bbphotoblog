define(['underscore', 'backbone.paginator', 'models/post'], function(_, PageableCollection, Post) {
    
    return PageableCollection.extend({
        model: Post,
        mode: 'infinite',
        url: 'http://stu-fisher.org/wp-json/wp/v2/posts?_embed=1',
            
        state: {
            pageSize: 5,
        },
    })
})