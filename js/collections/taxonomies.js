define(['backbone.paginator'], function(PageableCollection) {
    
    var Taxonomy = Backbone.Model.extend({
        idAttribute: 'id',
    })
    
    return PageableCollection.extend({
        model: Taxonomy,
        url: function() {
            return 'http://stu-fisher.org/wp-json/wp/v2/categories'
        },
        mode: 'server',
    })
})