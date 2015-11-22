
define([
  'App',
  'require',
  'handlebars',
  'Responsiveness'
], function (App, app_require, handlebars, Responsiveness) {

  "use strict";

  var Page = Backbone.View.extend({

    // @TODO: Only used once. Better move to loadTemplate method
    templatesDir: 'templates/page/',

    // @TODO: Eventually animation classes should be moved to PageTransition class
    className : 'page',

    deferred : undefined,
    model : undefined,
    $container : undefined,
    form : undefined,
    template : undefined,
    subViews : [],
    viewModels : [],
    rendered : false,

    initialize : function (options) {

      // default options to empty Object
      options = options || {};

      this.deferred = $.Deferred();
      this.model = options.model;
      this.$container = options.$container;
      this.$el.addClass(options.id);

      // instantiate ViewModels
      this.initViewModels();

      // post initialization
      this.postInitialize(options);

      // load partials and template set in config
      $.when(this.loadTemplate()).done(this.render.bind(this));

    },

    initViewModels : function () {
      var i = 0;
      this.viewModels.forEach(function (ViewModel) {
        if (_.isFunction(ViewModel)) {
          var obj = {};
          obj.instance = new ViewModel();
          obj.viewModel = ViewModel;
          this.viewModels[i++] = obj;
        }
      }.bind(this));
    },

    postInitialize : function (options) {
      // noop
    },

    loadTemplate : function () {

      var deferred = $.Deferred();

      app_require(['text!' + this.templatesDir + this.model.get('template') + '.tpl'], function (template) {
        this.template = template;
        deferred.resolve();
      }.bind(this));

      return deferred;
    },

    startListening : function () {
      // noop
    },

    getViewModelsJSON : function () {
      var ret = {};
      this.viewModels.forEach(function (viewModel) {
        ret = $.extend(ret, viewModel.instance.toJSON());
      });
      return ret;
    },

    getRenderObject : function () {
      return {};
    },

    render : function () {

      var renderObject = {
        page : this.model.attributes
      };

      // merge in extra view data
      renderObject = $.extend(renderObject, this.getViewModelsJSON(), this.getRenderObject());

      var tpl = handlebars.compile(this.template);
      var compiled = tpl(renderObject);

      this.$el.html(compiled);

      // append to parent
      // @TODO: Better do this from App only once using a promise
      if (!this.rendered) {
        this.$container.html(this.el);
        this.rendered = true;
      }

      this.renderSubViews();

      this.setElements();

      this.stopListening();
      this.startListening();

      this.postRender();

      this.deferred.resolve();

      return this;
    },

    postRender : function () {
      // noop
    },

    setElements : function () {
      // noop
    },

    // @TODO: Rename viewInstance to instance
    renderSubViews : function () {
      if (_.isArray(this.subViews)) {
        this.removeSubViews();
        this.subViews.forEach(function (subView) {
          var options, view;
          if (!subView.viewInstance) {
            options = $.extend({el: this.el}, subView.options);
            subView.viewInstance = new subView.view(options);
          }
          subView.viewInstance.render();
        }.bind(this));
      }
    },

    // @TODO: Rename viewInstance to instance
    removeSubViews : function () {
      if (_.isArray(this.subViews)) {
        this.subViews.forEach(function (subView) {
          if (subView.viewInstance) {
            subView.viewInstance.remove();
            delete subView.viewInstance;
          }
        });
      }
    },

    // @TODO: Return deferred.state()
    // @LINK: https://api.jquery.com/deferred.state/
    ready : function () {
      return this.deferred;
    },


    // methods originally from pageExt.js

    // @TODO: Return promise
    before : function (done) {
      done();
    },

    // @TODO: Return promise
    close : function (done) {

      // forms
      if (this.form) {
        this.form.destroy();
        delete this.form;
      }

      // remove all subviews
      this.removeSubViews();

      // Calls stopListening() and self.$el.remove()
      this.remove();

      // reset cookie view logic
      $('#app-content').show();
      $('#cookie-message').addClass('hidden');

      done();
    }
  });

  return Page;

});
