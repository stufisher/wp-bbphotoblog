define(['backbone'], function(Backbone) {

    var HeaderItem = Backbone.Model.extend({ isSelected: false })

    return Backbone.Collection.extend({
        model: HeaderItem,
            
        initialize: function() {
            this.on('change:isSelected', this.onSelectedChanged, this);
        },
            
        onSelectedChanged: function(model) {
            this.each(function(model) {
                if (model.get('isSelected') === true && !model._changing) {
                    model.set({isSelected: false})
                }
            })
            this.trigger('selected:change')
        },
        
        unSelect: function() {
            this.each(function(model) {
                model.set({isSelected: false})
            })
            this.trigger('selected:change')
        }
        
    })

})