define(['backbone'], function(Backbone) {

  Backbone.emulateHTTP = true;
    
  return Backbone.Model.extend({
    idAttribute: 'ID',
      
    defaults: {
        url: '',
    },
      
    validation: {
        comment_author_email: {
            required: true,
            pattern: 'email'
        },
      
        comment_author_url: {
            required: false,
            pattern: 'url',
        },
      
        comment_author: {
            required: true,
        },
      
        comment_content: {
            required: true,
        },
      
        comment_post_ID: {
            required: true,
        },
      
    },
      
    urlRoot: function() {
        var id = this.get('ID') || ''
        return 'http://stu-fisher.org/wp-json/posts/'+this.get('post')+'/comments'+(id ? '/'+id : '')
    }
  })
       
})