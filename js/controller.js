define(['marionette', 'collections/pages', 'collections/taxonomies', 'views/page', 'views/archives', 'views/develop'], function(Marionette, Pages, Taxonomies, PageView, ArchivesView, DevelopView) {
    
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
                'orderby': 'date',
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
                // 'orderby': 'rand',
            })
            console.log('loading page', slug)

            var pages = new Pages()
            pages.queryParams.slug = slug
            pages.fetch().done(function() {
                app.inner.show(new PageView({ model: pages.at(0) }))
            })
            app.side.empty()
        },

        
        /*
         Single Post from permalink
        */
        single: function(y,m,d,slug) {
            app.trigger('header:unselect')
            console.log('single post', y,m,d,slug)
            app.single({
                'slug': slug,
            })
            app.inner.empty()
        },
        
        
        /*
         An archive based on category, year, month, etc
        */
        archive: function(category) {
            var categories = new Taxonomies()
            categories.queryParams.slug = category
            categories.fetch().done(function() {
                app.multiple({ 'categories': categories.at(0).get('id'), callback: function() { app.inner.empty() } })
            })
            console.log('single archive')
        },
        
        /*
         Archives Page
        */
        archives: function() {
            console.log('archives')
            app.single({
                'filter[orderby]': 'rand',
                // 'orderby': 'rand',
            })

            var pages = new Pages()
            pages.queryParams.slug = 'photos'
            pages.fetch().done(function() {
                app.inner.show(new PageView({ side: true, className: 'inner left', model: pages.at(0) }))
            })

            app.side.show(new ArchivesView())
        },
        
        
        /*
         Custom 'Developer' page
        */
        develop: function() {
            console.log('Develop')
            app.single({
                'filter[orderby]': 'rand',
                // 'orderby': 'rand',
            })
            
            var pages = new Pages()
            pages.queryParams.slug = 'develop'
            pages.fetch().done(function() {
                app.inner.show(new DevelopView({ model: pages.at(0) }))
            })

            
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