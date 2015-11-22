
define([], function () {

  "use strict";

  var AutoComplete = Backbone.View.extend({

    initialize : function (options) {

      this.lookup = this.$el.data('lookup');

      this.setDefaultValue = true;

      var self = this;
      this.$formChannel = options.$formChannel;

      var validationObject = {};
      validationObject[this.el.name] = options.validation;

      var ValidationModel = Backbone.Model.extend({
        validation : validationObject
      });

      this.subValidationModel = new ValidationModel();

      if(options.displayModel) {
        this.setDefaultValue = false;
        this.setValidationModel(options.displayModel);
      }

      self.render();
      self.setListeners();
      self.setupAutocomplete();
    },

    setListeners : function () {
      this.listenTo(this.subValidationModel, 'validated', function (isValid, model, errors) {
        this.renderValidation(isValid, errors);
      }, this);
    },

    setValidationModel : function (model) {

      var self = this;
      var value = model.Code;

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

    render : function () {
      this.setElements();
      return this;
    },

    setupAutocomplete : function () {

      var self = this;

      this.$el.autocomplete({
        serviceUrl : '/js/data/ISO_3166-1-alpha-2.json',
        showNoSuggestionNotice : true,
        deferRequestBy : 100,
        onSearchStart : function () {
          $(this).closest('.autocomplete').addClass('searching');
        },
        onSearchComplete : function () {
          $(this).closest('.autocomplete').removeClass('searching');
        },
        onInvalidateSelection : function () {
          self.setValidationModel({Code : undefined});
        },
        onSelect : function (suggestion) {
          self.setValidationModel(suggestion.model);
        },
        transformResult: function(data) {
          return {
            suggestions: $.map(JSON.parse(data), function (model) {
              return {
                value: self.get(model, self.lookup),
                model : model
              };
            })
          };
        }
      });
    },

    get : function (model, lookup) {
      if (!lookup) return model;
      var propsArr = lookup.split('.');
      var prop = propsArr.splice(0, 1);
      return this.get(model[prop], propsArr.join('.'));
    },

    renderValidation : function (isValid, errors) {
      this.$formGroup[isValid ? 'removeClass' : 'addClass']('has-error');
      this.$helpBlock.html(isValid ? "" : errors[this.el.name]);
    },

    clear : function () {
      this.$el.val('');
    },

    destroy : function () {
      if(this.$el.autocomplete() !== true) {
        this.$el.autocomplete().dispose();
      }
      this.stopListening();
      this.$el.off();
      this.$el.remove();
    }

  });

  return AutoComplete;

});