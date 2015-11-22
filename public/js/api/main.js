define(function (require, exports, module) {
  module.exports = function () {
    return {
      baseUrl                                                          : '/js/api',
      context                                                           : 'api_require',
      paths : {
        config : '../config',
        Api : 'Api',
        CountriesCollection : 'countries/CountriesCollection'
      },
      deps : ['Api']
    };
  };
});
