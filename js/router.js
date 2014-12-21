define(['marionette', 'controller'], function(Marionette, c) {
  var Router = Marionette.AppRouter.extend({
    appRoutes: {
      '': 'home',
      'category/categories/:cat': 'archive',
      'category/categories/:cat/': 'archive',
      'develop': 'develop',
      'photos': 'archives',
      'photos/': 'archives',
      
    },
      
    initialize: function(options) {
        this.route('*notFound', 'page', options.controller.page)        
        this.route(/^(\d\d\d\d)\/(\d\d)\/(\d\d)\/(.*)\//, "single", options.controller.single);
        
    }
  })
       
       
  return new Router({ controller: c })
})