
define([
  'handlebars',
  'text!templates/option.tpl'
], function (handlebars, template) {

  "use strict";

  var SelectBox = Backbone.View.extend({

    initialize : function (options) {

      var self = this;
      this.$formChannel = options.$formChannel;

      var validationObject = {};
      validationObject[this.el.name] = options.validation;

      var ValidationModel = Backbone.Model.extend({
        validation : validationObject
      });

      this.subValidationModel = new ValidationModel();

      self.listenTo(this.subValidationModel, 'validated', function (isValid, model, errors) {
        self.renderValidation(isValid, errors);
      });

      this.$el.on('change', function () {
        self.setValidationModel();
      });

      if(this.$el.data('ajax')) {
        app_require(['App'], function (App) {
          self.App = App;
          App.Api.get(self.$el.data('collection')).then(function (collection) {

            collection.fetch({
              beforeSend : collection.beforeSending
            });

            self.listenToOnce(collection, 'sync', function (collection) {
              self.renderOptions(options.displayModel, collection);
            });
          });
        });
      } else {
        this.render(options.displayModel);
      }
    },

    setValidationModel : function () {

      var value = this.el.options[this.el.selectedIndex].getAttribute('data-value');
      var selectedText = this.el.options[this.el.selectedIndex].value;
      var self = this;

      this.subValidationModel.set(this.el.name, value, {validate : true});

      this.$formChannel.trigger('content:change', {
        key : self.el.name,
        value : value,
        type : 'select',
        isValid : self.subValidationModel.isValid(),
        selectedText : selectedText
      });
    },

    get : function (model, lookup) {
      if (!lookup) return model;
      var propsArr = lookup.split('.');
      var prop = propsArr.splice(0, 1);
      return this.get(model[prop], propsArr.join('.'));
    },

    setElements : function () {
      this.$formGroup = this.$el.closest('.form-group');
      this.$helpBlock = this.$formGroup.find('.help-block');
    },

    renderOptions : function (displayModel, collection) {
      var self = this,
          docFrag = document.createDocumentFragment(),
          display;

      function renderTemplate (item) {

        display = self.get(item.attributes, self.$el.data('display'));

        var renderObject = {
          display : display,
          value : self.get(item.attributes, self.$el.data('value')),
          lookup : self.get(item.attributes, self.$el.data('lookup')),
          isSelected : display === self.$el.data('default')
        };

        var tpl = handlebars.compile(template);
        var compiled = tpl(renderObject);

        return compiled;
      }

      collection.each(function (item, index, collection) {
        docFrag.appendChild($(renderTemplate(item))[0]);
      });

      this.$el.append(docFrag);
      this.render(displayModel);

    },

    render : function (displayModel, collection) {

      this.setElements();

      var $option,
          lookup;

      if(displayModel) {
        if(this.$el.data('ajax')) {
          lookup = typeof displayModel === 'string' ? displayModel : this.get(displayModel, this.$el.data('lookup'));
        } else {
          lookup = typeof displayModel === 'string' ? displayModel : displayModel[this.el.name];
        }
        $option = this.$el.find('option[data-value="' + lookup + '"]');
        $option.attr('selected', true);
        this.setValidationModel();
      }

      if(this.$el.data('default')) {
        this.setValidationModel();
      }

      this.attachChosen();

      return this;
    },

    attachChosen : function () {
      this.$el.chosen({
        width:'100%'
      }).change(function () {
        // noop
      });
    },

    renderValidation : function (isValid, errors) {
      this.$formGroup[isValid ? 'removeClass' : 'addClass']('has-error');
      this.$helpBlock.html(isValid ? "" : errors[this.el.name]);
    },

    clear : function () {
      this.$el.find('option:selected').prop('selected', false);
    },

    destroy : function () {
      this.stopListening();
      this.$el.off();
      this.$el.remove();
    }

  });

  return SelectBox;

});
