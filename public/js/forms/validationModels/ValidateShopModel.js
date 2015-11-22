
define([],

function () {

  "use strict";

  var ValidateShopModel = Backbone.Model.extend({
    validation : {
      first_name : [{
        required : true,
        msg : 'Please enter your first name'
      }],
      last_name : [{
        required : true,
        msg : 'Please enter your last name'
      }],
      email : [{
        required : true,
        msg : 'Please provide an email address'
      },{
        pattern : 'email',
        msg : 'Please enter a valid email address'
      }],
      addressno : [{
        required : true,
        msg : 'Please enter the number of the address the item will be shipped to'
      }],
      street : [{
        required : true,
        msg : 'Please enter the street the item will be shipped to'
      }],
      city : [{
        required : true,
        msg : 'Please enter the city where the item will be shipped to'
      }],
      country : [{
        required : true,
        msg : "We don't currently ship to your country, but are working hard to change this. Please email us at shipping@vollebak.com and tell us where you're from. Over the next 12 months we will be expanding the number of countries we ship to based on demand."
      }],
      postcode : [{
        required : true,
        msg : 'Please enter the postcode of the address where the item will be shipped to'
      }],
      shipping_first_name : [{
        required : false,
        msg : 'Please enter the first name of the person who will receive the item'
      }],
      shipping_last_name : [{
        required : false,
        msg : 'Please enter the last name of the person who will receive the item'
      }],
      shipping_addressno : [{
        required : false,
        msg : 'Please enter the number of the address that the card is registered to'
      }],
      shipping_postcode : [{
        required : false,
        msg : 'Please enter the postcode of the address where the item will be shipped to'
      }],
      shipping_street : [{
        required : false,
        msg : 'Please enter the street that the card is registered to'
      }],
      shipping_city : [{
        required : false,
        msg : 'Please enter the city name that the card is registered to'
      }],
      shipping_country : [{
        required : false,
        msg : 'Please enter the country that the card is registered to'
      }],
      cardnumber : [{
        required : true,
        msg : 'Please enter the card number'
      },{
        creditcard : 1,
        msg : 'Please enter a valid card number'
      }],
      expirydate : [{
        required : true,
        msg : 'Please enter the card expiry date'
      },{
        pattern : 'expirydate',
        msg : 'Please enter a valid expiry date like mm/yy'
      }],
      cvv : [{
        required : true,
        msg : 'Please enter the card CVV number (on the back)'
      },{
        pattern : 'cvv',
        msg : 'Please enter a valid CVV number'
      },{
        maxLength : 3,
        msg : 'Please enter a valid CVV number'
      },{
        minLength : 3,
        msg : 'Please enter a valid CVV number'
      }]
    }
  });

  return ValidateShopModel;

});
