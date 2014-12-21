define(['marionette', 'jquery', 'views/share', 'tpl!templates/page.html', 'mp'], function(Marionette, $, ShareView, template) {

    return Marionette.ItemView.extend({
        template: template,
        className: 'inner opaque',
        
        events: {
            'click a.close': 'closeView'
        },
        
        closeView: function(e) {
            e.preventDefault()
            app.trigger('inner:close')
        },
        
        initialize: function(options) {
            if (options && options.side) this.className = 'inner left'
        },
        
        onDomRefresh: function(){
            var h = $(window).height()
            console.log('page height', this.$el.height(), h, this.$el)
            if (this.$el.height() > h - 160 - (h*0.02) || app.mobile()) this.$el.height($(window).height() - 160 - (h*0.02))
            this.$el.css('left', 0)
                
            this.$el.find('.wp-caption').magnificPopup({
                delegate: 'a', type: 'image',
            })
            
            this.$el.find('.gallery').magnificPopup({
                delegate: 'a', type: 'image',
                gallery: {
                    enabled: true,
                    navigateByImgClick: true,
                }
            })
            
            var share = new ShareView({ model: this.model })
            this.$el.find('.share').html(share.render().$el)
        }
    })

})