define(['backbone'], function(Backbone) {

  return Backbone.Model.extend({
    idAttribute: 'ID',
      
    defaults: {
        plink: '',
    },
      
    initialize: function(options) {
        this.on('change', this._add_plink, this)
        this._add_plink()
    },
      
    _add_plink: function() {
        // Urgh :(
        var d = new Date(this.get('date'))
        var y = d.getFullYear(), m = d.getMonth()+1, da = d.getDate()
        this.set('plink', '/' + y + '/' + (m < 10 ? '0'+m : m) + '/' +  (da < 10 ? '0'+da : da) + '/' + this.get('slug') + '/')
    },
  })
       
})