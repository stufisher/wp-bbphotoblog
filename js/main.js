require.config({
  paths: {
    underscore: 'vendor/underscore.min',
    backbone: 'vendor/backbone/backbone',
    marionette: 'vendor/backbone/backbone.marionette',
    'backbone.paginator': 'vendor/backbone/backbone.paginator',
    
    jquery: 'vendor/jquery/jquery-1.9.1.min',
    mp: 'vendor/jquery/jquery.magnific-popup',
    
    skrollr: 'vendor/skrollr',
    'skrollr-css': 'vendor/skrollr.stylesheets',

  },
  shim: {    
    underscore: {
        exports: '_'
    },
  
    jquery: {
        exports: '$',
    },
    
    mp: {
        deps: ['jquery'],
    },
    
    backbone: {
      exports: 'Backbone',
        deps: ['jquery', 'underscore']
    },
    marionette: {
      exports: 'Backbone.Marionette',
        deps: ['backbone']
    },
    'backbone.paginator': {
      exports: 'Backbone.PagableCollection',
        deps: ['backbone']
    },
    
    'skrollr-css': {
        deps: ['skrollr'],
    },
    
  },
})

require(['app'], function(app) {
    "use strict"
    app.start()
})
