define(['backbone', 'models/page'], function(Backbone, Page) {
    
    return Backbone.Collection.extend({
        model: Page,
        url: 'http://stu-fisher.org/wp-json/pages',
    })
})