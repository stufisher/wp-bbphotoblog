define(['marionette', 'backbone', 'models/comment', 'collections/comments', 'views/comments', 'views/share',
    'tpl!templates/parallaxitem.html',
    'vendor/backbone/backbone-validation'
    ], function(Marionette, Backbone, Comment, Comments, CommentsView, ShareView, template) {
    
    return Marionette.CompositeView.extend({
        template: template,
        tagName: 'section',
        
        childView: CommentsView,
        childViewContainer: 'ol',
        
        className: function(){
            return 'anim'+(this.model.collection.fullCollection.indexOf(this.model)%3+1)
        },
        
        ui: {
            'name': 'input[name=comment_author]',
            'email': 'input[name=comment_author_email]',
            'url': 'input[name=comment_author_url]',
            'comment': 'textarea[name=comment_content]',
        },
        
        events: {
            'click i.fa-comments': 'toggleComments',
            'click a.submit': 'addComment',
        
            'change input':  'validateField',
            'change textarea': 'validateField',
            'blur input':  'validateField',
            'blur textarea':   'validateField',
            'keyup input':  'validateField',
            'keyup textarea':  'validateField',
        },
        
        collectionEvents: {
            'reset change add delete': 'commentCount',
        },
        
        initialize: function(options) {
            var self = this
            this.className.bind(this)
            this.collection = new Comments([], { post: this.model.get('ID') })
            this.collection.fetch()
            
            _.extend(Comment.prototype, Backbone.Validation.mixin)
            this.newComment()
            
            this.$el.addClass('loading loading-holder')
        },
        
        
        newComment: function() {
            this.comment = new Comment({
                comment_post_ID: this.model.get('ID'),
                post: this.model.get('ID'),
            })
        },
        
        commentCount: function() {
            this.$el.find('.count').text(this.collection.length)
        },
        
        
        validateField: function(e) {
            var attr = $(e.target).attr('name')
            var val = $(e.target).val()
            
            var error = this.comment.preValidate(attr, val)
            if (error) this.invalid(e.target, error)
            else this.valid(e.target)
        },
        
        invalid: function(attr, error) {
            $(attr).removeClass('fvalid').addClass('ferror')
            if (!$(attr).prev('span.errormessage').length) $(attr).before('<span class="errormessage">'+error+'</span>')
                else $(attr).prev('span.errormessage').text(error)
                    },
            
        valid: function(attr) {
            $(attr).removeClass('ferror').addClass('fvalid').prev('span.errormessage').remove()
        },
        
        
        addComment: function(e) {
            e.preventDefault()
            console.log('name', this.ui.name.val())
            
            this.comment.set({
                comment_author: this.ui.name.val(),
                comment_author_email: this.ui.email.val(),
                comment_author_url: this.ui.url.val(),
                comment_content: this.ui.comment.val(),
            })
            
            var valid = this.comment.isValid(true);
            this.$el.find('.submit').next('span.errormessage').remove()
            
            if (valid) {
                this.$el.find('.submit i').addClass('fa-spinner')
                var self = this
                var resp = this.comment.save(null, {
                    success: function() {
                        self.collection.add(self.comment.clone())
                        self.newComment()
                        self.ui.name.val('')
                        self.ui.comment.val('')
                        self.ui.email.val('')
                        self.$el.find('.submit i').removeClass('fa-spinner')
                    },
                    error: function() {
                        self.$el.find('.submit i').removeClass('fa-spinner')
                        if (!self.$el.find('.submit').next('span.errormessage').length) self.$el.find('.submit').after('<span class="errormessage">Your comment could not be submitted, please try again</span>')
                        console.log('comment error')
                    },
                })
                console.log('save comment', resp)
                
            } else {
                _.each(this.ui, function(e,i) {
                    console.log({ target: e })
                    this.validateField({ target: e })
                }, this)
            }
            
        },
        
        toggleComments: function(e) {
            this.$el.find('.comments').toggleClass('show')
        },
        
        onRender: function() {
            var h = $(window).height()
            //this.$el.find('.container, .image').height($(window).width()*0.66666667)
            this.$el.find('.container, .image').height(h)
            //this.$el.find('.curtain').height($(window).height()*0.5)
            this.$el.find('.comments ol').css('max-height', h*(app.mobile() ? 0.28 : 0.4))
            
            if (app.mobile()) {
                if ('mobile' in this.model.get('featured_image').attachment_meta.sizes) var img = this.model.get('featured_image').attachment_meta.sizes.mobile.url
                else if ('medium' in this.model.get('featured_image').attachment_meta.sizes) var img = this.model.get('featured_image').attachment_meta.sizes.medium.url
                else var img = this.model.get('featured_image').guid
                
            } else var img = this.model.get('featured_image').guid

            this.$el.find('.image').css('background-image', 'url('+img+')')            
            var self = this
            require(['image!'+img], function() {
                self.$el.removeClass('loading loading-holder')
                self.$el.find('.wrap').css('opacity', 1)
            })
            
            var share = new ShareView({ model: this.model })
            this.$el.find('.share').html(share.render().$el)
        },
                
    })
    
})