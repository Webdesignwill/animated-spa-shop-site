define(function (require, exports, module) {
  module.exports = function () {
    return {
      baseUrl                                                        : '/js/forms',
      context                                                        : 'forms_require',
      paths : {

        text                                                            : '../libs/require/text.min',
        handlebars                                                : '../libs/handlebars/handlebars',

        valExt                                                          : 'valExt',

        Forms                                                         : 'Forms',
        FormView                                                   : 'FormView',

        // Components
        SelectBox                                                    : 'components/SelectBox',
        AutoComplete                                              : 'components/AutoComplete',
        TextInput                                                     : 'components/TextInput',
        TextArea                                                      : 'components/TextArea',
        NumberInput                                                : 'components/NumberInput',
        HiddenInput                                                  : 'components/HiddenInput'
      },
      deps : ['Forms', 'valExt']
    };
  };
});