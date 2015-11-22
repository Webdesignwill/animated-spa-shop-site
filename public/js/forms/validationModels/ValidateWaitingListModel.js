
define([],

function () {

  "use strict";

  return Backbone.Model.extend({
    validation : {
      name : [{
        required : true,
        msg : 'Please enter your name'
      }],
      email : [{
        required : true,
        msg : 'Please provide an email address'
      },{
        pattern : 'email',
        msg : 'Please enter a valid email address'
      }],
      country : [{
        required : true,
        msg : 'Please select the country the item will be shipped to'
      }]
    }
  });
});
