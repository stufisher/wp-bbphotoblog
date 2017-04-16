define(['backbone.paginator', 'models/page'], function(PageableCollection, Page) {
    
    return PageableCollection.extend({
        model: Page,
        url: 'http://stu-fisher.org/wp-json/wp/v2/pages',
        mode: 'server',
    })
})