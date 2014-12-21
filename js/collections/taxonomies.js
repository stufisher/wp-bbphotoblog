define(['underscore', 'backbone'], function(_, Backbone) {
    
    var Post = Backbone.Model.extend({
        idAttribute: 'ID',
    })
    
    return Backbone.Collection.extend({
        model: Post,
        url: function() {
            return 'http://stu-fisher.org/wp-json/taxonomies'+(this.taxonomy ? '/'+this.taxonomy+'/terms' : '')
        },
        
        initialize: function(models, options) {
            if (options && options.taxonomy) this.taxonomy = options.taxonomy
        },
    })
})