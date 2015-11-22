
define([], function () {

  "use strict";

  var HiddenInput = Backbone.View.extend({

    initialize : function (options) {

      var self = this;
      this.$formChannel = options.$formChannel;

      var validationObject = {};
      validationObject[this.el.name] = options.validation;

      var ValidationModel = Backbone.Model.extend({
        validation : validationObject
      });

      this.subValidationModel = new ValidationModel();

      if(options.displayModel) {
        this.setValidationModel(options.displayModel);
      }

      self.setValidationModel(self.$el.val());

      this.render(options.displayModel);

    },

    setValidationModel : function (value) {

      var self = this;

      this.subValidationModel.set(this.el.name, value, {validate : true});

      this.$formChannel.trigger('content:change', {
        key : self.el.name,
        value : value,
        type : 'textinput',
        isValid : self.subValidationModel.isValid()
      });
    },

    setElements : function () {
      this.$formGroup = this.$el.closest('.form-group');
      this.$helpBlock = this.$formGroup.find('.help-block');
    },

    render : function (displayModel) {
      this.setElements();
      if(displayModel) {
        this.$el.val(displayModel);
      }

      return this;
    },

    clear : function () {
      // noop
    },

    destroy : function () {
      this.stopListening();
      this.$el.off();
      this.$el.remove();
    }

  });

  return HiddenInput;

});