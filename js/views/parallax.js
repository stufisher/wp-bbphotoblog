define(['marionette', 'jquery', 'skrollr', 'skrollr-css', 'views/parallaxitem', 'tpl!templates/parallax.html'], function(Marionette, $, skrollr, skrollrCSS, ParallaxItemView, template) {
    
    return Marionette.CompositeView.extend({
        className: 'content parallax',
        childView: ParallaxItemView,
        template: template,
        
        
        initialize: function(options) {
            this.collection = options.collection.fullCollection
            this.scroll = true
            
            var self = this
            app.on('parallax:scroll', function(val) {
                console.log('setting scrolling', val)
                self.scroll = val
            })

            this.listenTo(this.collection.pageableCollection, 'sync', this.onSync, this)
            this.listenTo(app, 'skrollr:scroll', this.scrollTo, this)
        },
        
        onSync: function() {
            console.log('on sync')
            this._refresh()
        },
        
        
        scrollTo: function(options) {
            if (options.position !== undefined) {
                var pos = options.position
            } else {
                var pos = this.skrollr.relativeToAbsolute(options.element[0], 'top', 'top')
            }
            
            this.skrollr.animateTo(pos, _.extend({ duration: 300 }, options))
        },
        
        _refresh: function() {
            if (this.skrollr) {
                window.skrefresh()
                this.skrollr.refresh()
            }
        },

        onRender: function(){
            console.log('p render')
            var self = this
            this.isLoading = false
            $(window).unbind('scroll').scroll(function() {
                if (!app.mobile()) $(window).scrollTop() > 100 ? $('.header').addClass('scrolled') : $('.header').removeClass('scrolled')
                
                var bottom = $(window).scrollTop() + $(window).height()
                var bottomcol = self.$el.offset().top + self.$el.height() - 1000
            
                if (self.scroll && !self.isLoading && bottom > bottomcol) {
                    self.isLoading = true
                    self.collection.pageableCollection.getNextPage({ remove: false }).done(function() {
                        self.isLoading = false
                    })
                }
            })
        },
        
        destroy: function() {
            $(window).unbind('scroll')
        },
        
        onDomRefresh: function() {
            console.log('dom ref')
            this._refresh()
        },
        
        onShow: function() {
            console.log('p show')
            var self = this
            $(function() {
                console.log('sk init')
                window.skrefresh()
                self.skrollr = skrollr.init({
                    forceHeight: false,
                    render: function(data) {
                        if (app.mobile()) {
                            if (self.scroll && !self.isLoading && data.curTop > data.maxTop - 800 && data.maxTop > 0) {
                                self.isLoading = true
                                self.collection.pageableCollection.getNextPage({ remove: false }).done(function() {
                                    self.isLoading = false
                                })
                                
                            }
                        }
                    }
                })
            })
        }
    })
    
})