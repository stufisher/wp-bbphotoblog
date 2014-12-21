define(['marionette'], function(Marionette) {

    var HeaderItemView = Marionette.ItemView.extend({
        template: _.template('<a href="/<%=slug%>"><%=title%></a>'),
        tagName: 'li',
        events: { 'click': 'select' },
        
        initialize: function(options) {
          this.model.on('change:isSelected', this.onSelectedChanged.bind(this))
        },
        
        onSelectedChanged: function() {
          this.model.get('isSelected') ? this.$el.addClass('current') : this.$el.removeClass('current')
        },
          
        select: function(e) {
          this.model.get('isSelected') ? this.model.set({isSelected: false}) : this.model.set({isSelected: true});
        }
    })
    
    
    return Marionette.CompositeView.extend({
        tagName: 'div',
        childView: HeaderItemView,
        childViewContainer: 'ul',
        template: _.template('<span class="search"><input type="search" name="s" /></span><a class="open" href="#"><i class="fa fa-bars fa-2x"></i> <span>Menu</span></a><ul></ul>'),
        
        events: {
            'click a.open': 'toggleMenu',
            'click li a': 'closeMenu',
            'click .search': 'showSearch',
            'keyup @ui.search': 'search',
            'change @ui.search': 'search',
            'blur @ui.search': 'search',
        },
        
        ui: {
            search: 'input[name=s]',
        },
        
        initialize: function(options) {
            this.listenTo(app, 'title', this.setTitle, this)
            this.listenTo(app, 'header:unselect', this.unSelect, this)
            this.search = _.debounce(this.search, 300)
            this._last_search = ''
        },
        
        showSearch: function(e) {
            this.ui.search.toggleClass('active')
        },
        
        search: function(e) {
            var v = this.ui.search.val()
            console.log('search', v)
            
            if (v != this._last_search) {            
                v ? this.ui.search.addClass('active') : this.ui.search.removeClass('active')
                
                app.trigger('inner:close')
                app.multiple({
                    'filter[s]': v,
                    'filter[orderby]': 'date',
                })
            }
            
            this._last_search = v
        },
        
        unSelect: function() {
            this.collection.unSelect()
        },
        
        setTitle: function(title) {
            console.log('set title', this.$el, this.$el.siblings('h1 span'))
            this.$el.parent().siblings('h1').find('span').text(title)
        },
        
        toggleMenu: function(e) {
            e.preventDefault()
            console.log('toggle', this.$el)
            this.$el.toggleClass('open')
            $('.header').removeClass('scrolled')
        },
        
        closeMenu: function(e) {
            this.$el.removeClass('open')
        }
        
    })

})