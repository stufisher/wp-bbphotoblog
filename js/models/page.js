define(['backbone'], function(Backbone) {

  return Backbone.Model.extend({
    idAttribute: 'id',
      
    defaults: {
        plink: '',
    },
      
    initialize: function(options) {
        this.on('change', this._add_plink, this)
        this._add_plink()
    },
      
    _add_plink: function() {
        this.set('plink', '/' + this.get('slug'))
    },
  })
       
})