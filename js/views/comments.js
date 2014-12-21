define(['marionette', 'tpl!templates/comment.html'], function(Marionette, template) {
    
    return Marionette.ItemView.extend({
        template: template,
        tagName: 'li',
    })
    
})
