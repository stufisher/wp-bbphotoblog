define(['marionette', 'collections/pages', 'collections/posts', 'collections/headeritems', 'views/header', 'views/nav', 'views/parallax'], function(Marionette, Pages, Posts, HeaderItems, HeaderView, NavView, ParallaxView) {

    // Polyfill bind for iPad
    if (!Function.prototype.bind) {
        Function.prototype.bind = function(oThis) {
            if (typeof this !== 'function') {
                throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
            }
            
            var aArgs = Array.prototype.slice.call(arguments, 1),
            fToBind = this,
            fNOP = function() {},
            fBound = function() {
                return fToBind.apply(this instanceof fNOP && oThis
                    ? this
                    : oThis,
                    aArgs.concat(Array.prototype.slice.call(arguments)));
            };
            
            fNOP.prototype = this.prototype;
            fBound.prototype = new fNOP();
            
            return fBound;
        };
    }
    
    
    window.app = new Marionette.Application()
    
    app.addRegions({
        content: '.main',
        header: '.nav',
        inner: '.inner_content',
        side: '.sidebar',
        nav: '.navigation',
    })
    
    app.addInitializer(function() {
        app.posts = new Posts()
        app.pages = new Pages()
        
        var fetch = app.pages.fetch().done(function() {
            console.log('pages', app.pages.where({ parent: 0 }))
            app.header.show(new HeaderView({collection: new HeaderItems(app.pages.where({parent: 0}))}))
        })
        
        app.content.show(new ParallaxView({ collection: app.posts }))
        app.nav.show(new NavView())
        
        require(['router'], function() {
            fetch.done(function() {
                app.trigger('ready')
            })
        })
    })
    
    app.on('inner:close', function(nav) {
        app.inner.$el.find('.inner').css('left', '-4000px')
        setTimeout(function() {
            app.inner.empty()
            if (!nav) app.navigate('')
        }, 300)
    })
    
    app.on('title', function(title) {
        window.title = title
    })
    
    app.mobile = function() {
        return $(window).width() < 600
    }

    app.navigate = function(route,  options){
        options || (options = {});
        Backbone.history.navigate(route, options);
    }
    
    
    // Show a single post
    app.single = function(options) {
        app.trigger('parallax:scroll', false)
        $('.navigation').hide()
        app.content.$el.find('section').css('opacity', 0)
        setTimeout(function() {
            if (app.posts.length) app.posts.fullCollection.reset()
            app.posts.state.pageSize = 1
            app.posts.queryParams['filter[category_name]'] = ''
            _.extend(app.posts.queryParams, options)
            app.posts.fetch({ cache: false }).done(function() {
                if (options.callback) options.callback()
            })
        }, 300)
    }
    
    // Scrolling Page
    app.multiple = function(options) {
        app.trigger('parallax:scroll', true)
        if (!app.mobile()) $('.navigation').show()
        app.content.$el.find('section').css('opacity', 0)
        setTimeout(function() {
            app.posts.fullCollection.reset()
            app.posts.state.currentPage = 1
            app.posts.state.pageSize = 5
            app.posts.queryParams['filter[category_name]'] = ''
            _.extend(app.posts.queryParams, options)
            app.posts.fetch({ reset: true }).done(function() {
                if (options.callback) options.callback()
            })
        }, 300)
    }
    
    app.on('ready', function() {
      console.log('starting')
      if(Backbone.history){
          Backbone.history.start({ pushState: true });
          
          // Only need this for pushState enabled browsers
          if (Backbone.history && Backbone.history._hasPushState) {
              var $document = $(window.document);
              var openLinkInTab = false;
              
              var is_relative_to_page = function(href) {
                  return href.match(/^\/|(http:|https:|ftp:|mailto:|javascript:)/) === null;
              };
              
              var is_routable = function(href) {
                  return href.indexOf("#") === -1 && (is_relative_to_page(href) || href.indexOf(Backbone.history.root) === 0);
              };
              
              $document.keydown(function(e) {
                  if (e.ctrlKey || e.keyCode === 91) {
                      openLinkInTab = true;
                  }
              });
              
              $document.keyup(function(e) {
                  openLinkInTab = false;
              });
              
              $document.on("click", "a", function(e) {
                  var href =  $(this).attr("href");
                  console.log('routable', is_routable(href))
                  if (is_routable(href)) {
                      e.preventDefault();
                      Backbone.history.navigate(href, true);
                  }
              });
          }
          
          // Analytics
          Backbone.history.on('route', function() {
              var url = Backbone.history.root + Backbone.history.getFragment()
              if (_gaq) _gaq.push(['_trackPageview', url])
          })
      }
    })

    return app
})