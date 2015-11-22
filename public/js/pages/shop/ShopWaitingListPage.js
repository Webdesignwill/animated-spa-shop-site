
define([
  'App',
  'DefaultShopPage',
  'MoltinModel'
], function (App, DefaultShopPage, MoltinModel) {

  "use strict";

  return DefaultShopPage.extend({

    // @TODO: setup forms automatically in Page
    form : undefined,

    showForm : true,

    postInitialize : function () {

      DefaultShopPage.prototype.postInitialize.call(this);

      var cart = App.get('moltin').get('cart');
      if (_.isUndefined(cart) || cart.contents.length === 0) {
        App.get('Router').navigate('!/shop', {trigger : true});
      }
    },

    getRenderObject : function () {
      return {
        showForm : this.showForm
      };
    },

    postRender : function () {

      DefaultShopPage.prototype.postRender.call(this);
      
      if (_.isUndefined(this.form) && this.showForm) {
        this.form = new App.Forms();
        this.setupForm();
      }
    },

    setupForm : function () {

      this.form.init(this, {
        name : this.model.get('name'),
        validationModelName : 'ValidateWaitingListModel',
        action : 'onSubmit',
        el : this.$el.find('form')
      }, function (result, data, status) {
      });
    },

    onSubmit : function (validationObj, done) {
      App.get('moltin').createUser(validationObj.name, validationObj.email, validationObj.country).done(
        function (order) {
          done(true, {}, 200);
          this.showSuccess();
        }.bind(this),
        function (err) {
          done(false, {}, 500);
        }
      );
    },

    showSuccess : function () {
      this.form.destroy();
      this.showForm = false;
      this.render();
    }
  });
});
