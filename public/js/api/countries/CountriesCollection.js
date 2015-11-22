define([
], function () {

 "use strict";

 var CountriesCollection = Backbone.Collection.extend({

  name : 'countries',
  url: 'js/api/countries/countries.json',

  initialize: function () {
    this.fetch();
  }
 });

 return new CountriesCollection();

});
