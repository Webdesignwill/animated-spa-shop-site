
define([
  'require'
], function (forms_require) {

  "use strict";

  var Forms = function () {

    var formView = {},
          self = this,
          apiResource,
          action,
          done;

    function loadForm () {

      forms_require(['FormView'], function (FormView) {
        formView = new FormView({
          validationModelName : self.options.validationModelName,
          name : self.options.name,
          el : self.options.el,
          displayModel : self.options.displayModel || {}
        });

        formView.$formChannel.on('valid', formValid);
        formView.$formChannel.on('valid-add', formValidAdd);
        formView.$formChannel.on('cancel', formCancel);

        self.options.el.height('auto');
      });
    }

    function formValidAdd (event, options) {
      makeRequest(options, function () {
        self.options.el.height(self.options.el.height());
        self.options.el.fadeOut(150, function () {
          formView.$formChannel.trigger('form:clear');
          formView.destroy();
          loadForm();
          self.options.el.fadeIn(150);
        });
      });
    }

    function formValid (event, options) {
      makeRequest(options, function (result, data, status) {
        done(result, data, status);
      });
    }

    function makeRequest (options, done) {
      apiResource[action](options.validationModel.attributes, function (result, data, status) {
        if(!result) {
          formView.$formChannel.trigger('error', {result : result, data : data});
        }
        done(result, data, status);
      });
    }

    function formCancel () {
      formView.destroy();
      done('close', null, null);
    }

    function clear () {
      formView.clear();
    }

    function destroy () {
      formView.destroy();
    }

    function init (r, options, d) {
      self.options = options;
      apiResource = r;
      action = options.action;
      done = d;

      return loadForm();
    }

    return {
      init : init,
      destroy : destroy
    };

  };

  return Forms;

});