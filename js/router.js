define(['marionette', 'controller'], function(Marionette, c) {
  var Router = Marionette.AppRouter.extend({
    appRoutes: {
      '': 'home',
      'categories/category/:cat': 'archive',
      'categories/category/:cat/': 'archive',
      'develop': 'develop',
      'develop/': 'develop',
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