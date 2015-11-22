
define([
  'Backbone',
  'handlebars',
  'text!templates/partials/selectable.tpl'
], function (Backbone, handlebars, template) {

  "use strict";

  return Backbone.View.extend({

    selected : undefined,
    selectables : undefined,

    events : {
      'click a' : 'onClickA'
    },

    initialize : function (options) {
      options = options || {};
      this.selected = options.selected;
      this.selectables = options.selectables;
    },

    getRenderObject : function () {
      return {
        selectables: this.selectables
      };
    },

    // @TODO: Compile template only once
    render : function () {
      var tpl = handlebars.compile(template);
      var compiled = tpl(this.getRenderObject());
      this.$el.html(compiled);
      this.setElements();
      return this;
    },

    setElements : function () {
      this.$a = this.$('a');
    },

    onClickA : function (event) {

      event.preventDefault();

      var $elem = $(event.currentTarget);

      this.setSelected($elem.attr('data-selectable'));
      this.selectElement($elem);
    },

    setSelected : function (value) {

      if (this.selected !== value) {
        this.selected = value;
        this.trigger('change', this.selected);
      }
    },

    selectElement : function ($elem) {
      this.$a.removeClass('selectable-selected');
      $elem.addClass('selectable-selected');
    }
  });
});
