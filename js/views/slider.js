define(['marionette',
    'tpl!templates/slider.html',
    'tpl!templates/slideritem.html'
    ], function(Marionette, template, itemtemplate) {

    
    var SliderItemView = Marionette.ItemView.extend({
        tagName: 'figure',
        template: itemtemplate,
        
        onRender: function() {
            var f = this.model.get('featured_image')
            if (f) this.$el.find('.img').css('background-image', 'url('+f.guid+')')
        },
    })
    
    
    return Marionette.CompositeView.extend({
        className: 'inner opaque',
        template: template,
        childView: SliderItemView,
        childViewContainer: '.slider',
        childViewOptions: function() {
            return {
                templateHelpers: {
                    parent: this.model.get('slug')
                }
            }
        },
        
        onDomRefresh: function(){
            var viewport = app.mobile() ? 1 : 4;
            var len = this.collection.length + viewport
            var figw = 100/len
            var slidew = len/viewport*100
            
            this.$el.find('.slider').css('width', slidew+'%')//.height($(window).height()*(app.mobile() ? 0.3 : 0.4))
            this.$el.find('.slider figure').css('width', figw+'%').height($(window).height()*(app.mobile() ? 0.25 : 0.35))
            
            this.$el.find('.slider').append(this.$el.find('.slider figure').slice(0,viewport).clone())
            
            var iterations = Math.floor(len / viewport)
            var rem = len % viewport
            
            var keyframes = []
            var keyframes2 = []
            var controls = []
            var step = 100/((iterations-1+(rem?1:0))*2)
            _.each(_.range(iterations), function(e,i) {
                keyframes.push((step*i*2)+'% { left: -'+(100*i)+'%}')
                keyframes.push((step*(i*2+1.5))+'% { left: -'+(100*i)+'%}')
                
                keyframes2.push((step*i*2)+'% { width: 0 }')
                keyframes2.push((step*(i*2+1.5))+'% { width: 100%}')
                keyframes2.push((step*(i*2+1.50000001))+'% { width: 0%}')
                
                controls.push('<label for="nav'+controls.length+'"></label><input type="radio" name="nav" value="nav'+controls.length+'" />')
            })
        
            if (rem) {
                keyframes.push((step*2*iterations)+'% { left: -'+((iterations-1+(rem/viewport))*100)+'% }')
                controls.push('<label for="nav'+controls.length+'"></label><input type="radio" name="nav" value="nav'+controls.length+'" />')
            }
                
            $('head').append('<style type="text/css">@-webkit-keyframes slider {'+keyframes.join('')+'}@-webkit-keyframes progress {'+keyframes2.join('')+'}</style>')


            this.$el.find('.slider_wrap').prepend(controls.join(''))
        }
                    
        _iterate: function() {
            
        },
            
    })
    

})
