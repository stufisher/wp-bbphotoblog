define(['underscore', 'backbone.paginator', 'models/post'], function(_, PageableCollection, Post) {
    
    return PageableCollection.extend({
        model: Post,
        mode: 'infinite',
        url: 'http://stu-fisher.org/wp-json/posts',
            
        state: {
            pageSize: 5,
        },
            
        queryParams: {
            pageSize: 'filter[posts_per_page]',
        },
        
        parseLinks: function (r,xhr) {
            console.log(r, xhr)
            //return r.length ? { next: this.url } : {}
            return { next: this.url }
        },
        
        /*parseState: function(r, q, state, options) {
            return { totalRecords: 188 }
            //return { totalRecords: options.xhr.getResponseHeader('X-WP-Total') }
        },*/
        
        
    })
})