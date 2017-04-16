define(['underscore', 'backbone.paginator', 'models/comment'], function(_, PageableCollection, Comment) {
    
    return PageableCollection.extend({
        model: Comment,
        mode: 'infinite',
        url: function() {
            return 'http://stu-fisher.org/wp-json/wp/v2/comments?post='+this.post
        },
        
        initialize: function(models, options) {
            if (options && options.post) this.post = options.post

        },
        
        state: {
            pageSize: 10,
        },
    })
})