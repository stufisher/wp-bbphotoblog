define(['marionette', 'tpl!templates/share.html'], function(Marionette, template) {

    return Marionette.ItemView.extend({
        template: template,
        templateHelpers: function() {
            var has_media = this.model.get('featured_image') ? 1 : 0
            var guid = has_media ? encodeURIComponent(this.model.get('featured_image').guid) : ''
            return {
                url: encodeURIComponent(bbpb.url+this.model.get('plink')),
                utitle: encodeURIComponent('Stu Fisher | '+this.model.get('title')),
                has_media: has_media,
                guid: guid,
            }
        },
        
        events: {
            'click i': 'showShare',
        },
        
        showShare: function(e) {
            $(e.target).siblings('.icons').toggleClass('active')
        }
        
        
        
    })

})