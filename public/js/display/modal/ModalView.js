
define([
  'App',
  'require',
  'handlebars',
  'text!js/display/modal/templates/modal.tpl'
], function (App, app_require, handlebars, template) {

  "use strict";

  var Modal = Backbone.View.extend({

    subView : {},
    sizes : {
      small : 'modal-sm',
      large : 'modal-lg'
    },

    initialize : function () {
      var self = this;
      App.on('modal:open', function (options) {
        self.setModalSize(options.size);
        if(options.view) {
          self.load(options);
        } else if(options.template) {
          self.renderTemplate(options);
        }
      });
      App.on('modal:close', function (event) {
        self.$el.modal('hide');
      });
      this.$el.on('hidden.bs.modal', function (e) {
        self.close();
      });

      this.render();
      this.setElements();
    },

    setModalSize : function (size) {
      for(var key in this.sizes) {
        this.$modalDialog.removeClass(this.sizes[key]);
      }
      if(this.sizes[size]) {
        this.$modalDialog.addClass(this.sizes[size]);
      }
    },

    setElements : function () {
      this.$modalBody = this.$el.find('.modal-body');
      this.$modalDialog = this.$el.find('.modal-dialog');
    },

    load : function (options) {
      var self = this;
      app_require([options.view], function (View) {
        var view = new View({
          el : self.$modalBody,
          options : options,
          cb : function closeModal () {
            this.$el.modal('hide');
          }
        });
        self.subView = view;
      });

      this.$el.modal();
    },

    renderTemplate : function (options) {
      var tpl = handlebars.compile(options.template);
      var compiled = tpl(options.model.attributes);
      this.$modalBody.html(compiled);
      this.$el.modal();
    },

    render : function () {
      this.$el.html(template);
      return this;
    },

    close : function () {
      if(typeof this.subView.close === 'function') this.subView.close();
      this.subView = {};
    }
  });

  return Modal;

});