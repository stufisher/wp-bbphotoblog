define(['backbone'], function(Backbone) {

  Backbone.emulateHTTP = true;
    
  return Backbone.Model.extend({
    idAttribute: 'id',
      
    defaults: {
        url: '',
    },
      
    validation: {
        author_email: {
            required: true,
            pattern: 'email'
        },
      
        author_url: {
            required: false,
            pattern: 'url',
        },
      
        author_name: {
            required: true,
        },
      
        content: {
            required: true,
        },
      
        post: {
            required: true,
        },
      
    },
      
    urlRoot: function() {
        var id = this.get('id') || ''
        return 'http://stu-fisher.org/wp-json/wp/v2/comments'+(id ? '/'+id : '')+'?post='+this.get('post')
    }
  })
       
})