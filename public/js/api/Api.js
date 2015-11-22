define([
 'require'
], function (api_require) {

 "use strict";

 var Api = function () {

   this.get = function (module) {
     var deferred = $.Deferred();
     api_require([module], function (module) {
       if(module.ready) {
         module.ready().then(function () {
           deferred.resolve(module);
         });
       } else {
         deferred.resolve(module);
       }
     });
     return deferred.promise();
   };

   return this;
 };

 return new Api();

});
