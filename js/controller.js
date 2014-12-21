define(['marionette', 'views/page', 'views/archives', 'views/develop'], function(Marionette, PageView, ArchivesView, DevelopView) {
    
    var controller = {
        /* 
         Default home page
        */
        home: function() {
            console.log('home')
            app.trigger('header:unselect')
            app.trigger('inner:close', true)
            //app.content.$el.addClass('loading loading-holder')
            app.multiple({
                'filter[orderby]': 'date',
                callback: function() {
                    //require(app.posts.map(function(e) { return 'image!'+e.get('featured_image').guid }), function() {
                        //app.content.$el.removeClass('loading loading-holder')
                    //})
                },
            })
        },
        
        
        /*
         Single Page
        */
        page: function(path) {
            path = path.replace(/\/$/, "");
            var slug = path.split('/').pop();
            app.single({
                'filter[orderby]': 'rand',
            })
            console.log('loading page', slug)
            app.inner.show(new PageView({ model: app.pages.findWhere({ slug: slug }) }))
            app.side.empty()
        },

        
        /*
         Single Post from permalink
        */
        single: function(y,m,d,slug) {
            app.trigger('header:unselect')
            console.log('single post', y,m,d,slug)
            app.single({
                'filter[name]': slug,
            })
            app.inner.empty()
        },
        
        
        /*
         An archive based on category, year, month, etc
        */
        archive: function(category) {
            app.multiple({ 'filter[category_name]': category, callback: function() { app.inner.empty() } })
            //app.trigger('title', category)
            console.log('single archive')
        },
        
        /*
         Archives Page
        */
        archives: function() {
            console.log('archives')
            app.single({
                'filter[orderby]': 'rand',
            })
            app.inner.show(new PageView({ side: true, className: 'inner left', model: app.pages.findWhere({ slug: 'photos' }) }))
            app.side.show(new ArchivesView())
        },
        
        
        /*
         Custom 'Developer' page
        */
        develop: function() {
            console.log('Develop')
            app.single({
                'filter[orderby]': 'rand',
            })
            
            app.inner.show(new DevelopView({ model: app.pages.findWhere({ slug: 'develop' }) }))
            app.side.empty()
        },
    }
    
    app.addInitializer(function() {
        app.on('archive', function(slug) {
            controller.archive(slug)
            app.navigate('/categories/category/'+slug)
        })
        
        app.on('home', function() {
            controller.home()
        })
    })
    
    return controller
})