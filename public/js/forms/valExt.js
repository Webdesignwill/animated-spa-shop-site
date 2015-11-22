define([], function() {

  "use strict";

  var msg = "Please enter a valid credit card number";

  function luhnCheck(value) {
    var i, digit, even = false, check = 0;

    for (i = value.length - 1; i >= 0; i--) {
      digit = parseInt(value.charAt(i));
      if (even) {
        if ((digit *= 2) > 9) digit -= 9;
      }
      check += digit;
      even = !even;
    }

    return (check % 10) === 0;
  }

  _.extend(Backbone.Model.prototype, Backbone.Validation.mixin);

  _.extend(Backbone.Validation.patterns, {
    expirydate: /^(0[1-9]|1[0-2])\/(([0-9]{4}|[0-9]{2})$)/,
    cvv: /^[0-9]{3,4}$/
  });

  _.extend(Backbone.Validation.validators, {
    creditcard: function(value, attr, customValue, model) {

      if (/[^0-9-]+/.test(value)) return msg;

      value = value.replace(/ /g, "");
      value = value.replace(/\D/g, "");

      if (!luhnCheck(value)) return msg;

      var validTypes = 0x0001 | 0x0002 | 0x0004 | 0x0008 | 0x0010 | 0x0020 | 0x0040 | 0x0080;

      // MasterCard
      if (validTypes & 0x0001 && /^(51|52|53|54|55)/.test(value)) {
        return value.length == 16 ? undefined : msg;
      }
      // VISA
      if (validTypes & 0x0002 && /^(4)/.test(value)) {
        return value.length == 16 ? undefined : msg;
      }
      // AMEX
      if (validTypes & 0x0004 && /^(34|37)/.test(value)) {
        return value.length == 15 ? undefined : msg;
      }
      // DinersClub
      if (validTypes & 0x0008 &&
        /^(300|301|302|303|304|305|36|38)/.test(value)) {
        return value.length == 14 ? undefined : msg;
      }
      // Enroute
      if (validTypes & 0x0010 && /^(2014|2149)/.test(value)) {
        return value.length == 15 ? undefined : msg;
      }
      // Discover
      if (validTypes & 0x0020 && /^(6011)/.test(value)) {
        return value.length == 16 ? undefined : msg;
      }
      // JCB
      if (validTypes & 0x0040 && /^(3)/.test(value)) {
        return value.length == 16 ? undefined : msg;
      }
      // JCB
      if (validTypes & 0x0040 && /^(2131|1800)/.test(value)) {
        return value.length == 15 ? undefined : msg;
      }
      // Unknown
      if (validTypes & 0x0080) {
        return undefined;
      }

      return msg;

    }

  });

});