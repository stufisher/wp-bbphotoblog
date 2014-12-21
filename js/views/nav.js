define(['marionette', 'tpl!templates/nav.html'], function(Marionette, template) {

    return Marionette.ItemView.extend({
        template: template,
        
        events: {
            'click .top i': 'top',
            'click .next i': 'nextImage',
            'click .prev i': 'prevImage',
        },

        top: function(e) {
            this.animate({ position: 0 })
        },
        
        nextImage: function(e) {
            var n = this._nearest().next('section')
            if (n && n.offset()) this.animate({ element: n })
        },
        
        prevImage: function(e) {
            var p = this._nearest().prev('section')
            if (p && p.offset()) this.animate({ element: p })
        },
        
        
        animate: function(options) {
            console.log('anim', options)
            if (app.mobile()) app.trigger('skrollr:scroll', options)
            else $('body').animate({ scrollTop: options.position !== undefined ? options.position : options.element.offset().top }, 300);
        },
        
        keyPress: function(e) {
            if (e.keyCode == 38 || e.keyCode == 40) e.preventDefault()
            if (e.keyCode == 40) this.nextImage()
            if (e.keyCode == 38) this.prevImage()
        },
        
        _nearest: function() {
            var min = 9999999
            var el = null
            $('section').each(function(i, e) {
                var diff = Math.abs($(e).offset().top - $(window).scrollTop())
                if (diff < min) {
                    el = e
                    min = diff
                }
            })

            return $(el)
        },
      
        
        onRender: function() {
            $(window).unbind('keydown').bind('keydown', this.keyPress.bind(this))
        },
        
        
        destroy: function() {
            $(window).unbind('keydown')
        },
        
    })
    

})