define(['marionette', 'collections/posts', 'collections/taxonomies', 'tpl!templates/archives.html', 'tpl!templates/categories.html'], function(Marionette, Posts, Taxonomies, template, cattemplate) {

    var ArchivesItemView = Marionette.ItemView.extend({
        tagName: 'li',
        template: _.template('<a href="<%=plink%>"><img src="<%=_embedded[\'wp:featuredmedia\'][0].media_details.sizes[\'square-small\'].source_url%>" alt="<%=title%>" /></a>'),
        
        onRender: function() {
            var self = this
            require(['image!'+this.model.get('_embedded')['wp:featuredmedia'][0].media_details.sizes['square-small'].source_url], function() {
                self.$el.css('opacity', 1)
            })
        },
    })
    

    var ThumbnailView = Marionette.CollectionView.extend({
        childView: ArchivesItemView,
        tagName: 'ul',
    })
    
    
    
    var CategoriesView = Marionette.ItemView.extend({
        collectionEvents: {
            'add change reset': 'render',
        },
        template: cattemplate,
    })
    
    
    return Marionette.LayoutView.extend({
        className: 'archives',
        template: template,
        regions: {
            cats: '.categories',
            thumbs: '.thumbnails',
        },
        
        events: {
            'click i.fa-refresh': '_refresh_thumbs',
            'click i.fa-times': '_close',
            'click a img': 'closeInner',
            'change select': 'showCat',
        },
        
        initialize: function(options) {
            this.categories = new Taxonomies(null, { taxonomy: 'category' })
            this.categories.fetch()
            
            var h = $(window).height()
            console.log(h, h - 160 - h*0.02)
            var tc = app.mobile() ? 5 : Math.floor(3*(h - 160 - 70 - h*0.02)/60)
            
            this.thumbnails = new Posts(null, { state: { pageSize: tc } })
            this._refresh_thumbs()
        },
        
        showCat: function(e) {
            console.log('trigger select', e, $(e.target).val())
            app.trigger('archive', $(e.target).val())
        },
        
        
        _close: function() {
            this.$el.css('left', '-300px')
            $('.inner').removeClass('left')
            setTimeout(function() {
                app.side.empty()
            }, 300)
        },
        
        closeInner: function() {
            app.trigger('inner:close', true)
        },
        
        _refresh_thumbs: function() {
            this.$el.find('i.fa-refresh').addClass('fa-spin')
            var self = this
            this.thumbnails.fetch({ data: { 'filter[orderby]': 'rand' } }).done(function() {
                self.$el.find('i.fa-refresh').removeClass('fa-spin')
            })
        },
        
        onRender: function() {
            this.cats.show(new CategoriesView({ collection: this.categories }))
            this.thumbs.show(new ThumbnailView({ collection: this.thumbnails }))
            this.$el.css('left', 0)
        },
        
        onDomRefresh: function(){
            var h = $(window).height()
            if (this.$el.height() > h - 160 - (h*0.02) || app.mobile()) this.$el.height($(window).height() - 160 - (h*0.02) - (app.mobile() ? 100 : 0))
        }
        
    })
    
    
    
})