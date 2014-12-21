define(['underscore', 'backbone.paginator', 'models/comment'], function(_, PageableCollection, Comment) {
    
    return PageableCollection.extend({
        model: Comment,
        mode: 'infinite',
        url: function() {
            return 'http://stu-fisher.org/wp-json/posts/'+this.post+'/comments/'
        },
        
        initialize: function(models, options) {
            if (options && options.post) this.post = options.post

        },
        
        state: {
            pageSize: 10,
        },
            
        /*queryParams: {
        pageSize: 'filter[posts_per_page]',
        },*/
            
        parseLinks: function (r,xhr) {
            return { next: this.url }
        },
        
    })
})