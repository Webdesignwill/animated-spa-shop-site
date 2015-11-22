
define([
  'Backbone',
  'Moltin',
  'json!data/moltin.json',
  'jsCookie',
  'CountriesCollection'
], function (Backbone, Moltin, moltinData, Cookies, CountriesCollection) {

  var MoltinModel = Backbone.Model.extend({

    countryCodeURL: 'https://www.vollebak.com/request-info.php',

    // @TODO: Config hardcoded values when Vollebak's Moltin account is set up
    publicId : moltinData.publicId,
    productIds : moltinData.productIds,
    gateway : moltinData.gateway,

    defaults : {

      // products
      products : [],

      // cart
      cart : undefined,
      total_items : '',
      subtotal : '-',
      tax : '-',
      total : '-',
      qtyProduct0 : 0,
      qtyProduct1 : 0,

      // shipping
      shipping : undefined,
      shippingSlug : undefined,

      // order
      order : undefined,
      cartPayed : undefined,

      // selected size
      selectedSize : undefined
    },

    // Moltin instance returned from authentication
    moltin : undefined,

    initialize : function () {

      if (Cookies.get('cookies_accepted') !== 'accepted') {
        return;
      }

      var moltin = new Moltin({publicId : this.publicId});
      try {
        moltin.Authenticate(function () {

          this.moltin = moltin;

          // Initialize products, shipping and cart
          // @LINK: http://stackoverflow.com/questions/6538470/jquery-deferred-waiting-for-multiple-ajax-requests-to-finish
          $.when.apply($, [this.initCurrencies(), this.initProducts(), this.initShipping(), this.initCart()])
            .done(
              function () {
                if (_.isUndefined(this.get('currency')) && !_.isUndefined(this.get('countryCode'))) {
                  this.setCurrency(this.getCurrencyFromCountryCode(this.get('countryCode')));
                }
              }.bind(this)
            )
            .fail(
              function () {

              }
            );
        }.bind(this));
      } catch (err) {

        this.handleError(err);
      }

      // this.setCurrencyFromIP();
    },

    setCurrencyFromIP: function () {
      $.ajax({
        url: this.countryCodeURL,
        crossDomain: true
      }).always(function (data) {
        this.set('countryCode', data.countryCode);
        this.setCurrency(this.getCurrencyFromCountryCode(data.countryCode));
      }.bind(this));
    },

    getCurrencyFromCountryCode: function (countryCode) {

      var country, currency;

      country = CountriesCollection.find(function (item) {
        return item.get('Code') === countryCode;
      });
      if (country && (currency = country.get('currency'))) {
        return currency;
      }
      // default to USD
      return 'UUU';
    },

    setCurrency: function (currency) {
      var code;
      var currencies = this.get('currencies');
      if (_.isUndefined(currencies)) return;
      currencies.forEach(function (elem) {
        if (elem.code === currency) {
          code = currency;
        }
      });
      if (code) {
        this.set('currency', code);
        this.moltin.Currency.Set(code);
        this.initShipping();
        this.initCart();
        this.initProducts();
      }
    },

    initCurrencies : function () {

      var deferred = $.Deferred();

      this.moltin.Currency.List(
        null,
        function (currencies) {
          this.set('currencies', currencies);
          deferred.resolve(currencies);
        }.bind(this),
        function (err) {

          this.handleError(err);
          deferred.reject(err);
        }
      );

      return deferred;
    },

    initProducts : function () {

      var deferred = $.Deferred();

      this.moltin.Product.Search(
        {},
        function (products) {
          this.set('products', products);
          deferred.resolve(products);
        }.bind(this),
        function (err) {

          this.handleError(err);
          deferred.reject(err);
        }.bind(this)
      );

      return deferred;
    },

    initCart : function () {

      var deferred = $.Deferred();

      this.moltin.Cart.Contents(
        function (cart) {

          this.set('cart', cart);
          this.set('total_items', cart.total_items);
          this.set('subtotal', cart.totals.post_discount.formatted.without_tax);
          this.set('tax', cart.totals.post_discount.formatted.tax);
          this.set('total', cart.totals.post_discount.formatted.with_tax);

          var i = 0;
          this.productIds.forEach(function (id) {
            var content = this._getCartContent(id);
            var quantity = 0;
            if (content) {
              quantity = content.quantity;
            }
            this.set('qtyProduct' + i++, quantity);
          }.bind(this));

          deferred.resolve(cart);

        }.bind(this),
        function (err) {

          this.handleError(err);
          deferred.reject(err);
        }.bind(this)
      );

      return deferred;
    },

    initShipping : function () {

      var deferred = $.Deferred();

      this.moltin.Shipping.List(
        null,
        function (shipping) {
          shipping = shipping.filter(function (obj) {
            return obj.title !== 'WAITING_LIST';
          }).reverse();
          this.set('shipping', shipping);
          deferred.resolve(shipping);
        }.bind(this),
        function (err) {

          this.handleError(err);
          deferred.reject(err);
        }.bind(this)
      );

      return deferred;
    },

    resetCart : function () {
      this.set('cart', undefined);
      this.set('total_items', '');
      this.set('subtotal', '-');
      this.set('tax', '-');
      this.set('total', '-');
      this.set('qtyProduct', 0);
      this.set('qtyProduct1', 0);
    },

    deleteCart : function () {

      var deferred = $.Deferred();

      this.moltin.Cart.Delete(
        function () {
          this.resetCart();
          deferred.resolve();
        }.bind(this),
        function (err) {

          this.handleError(err);
          deferred.reject(err);
        }.bind(this)
      );

      return deferred;
    },

    incrementCart : function (productId, quantity, modifierTitle) {

      quantity = quantity ? parseInt(quantity, 10) : 1;

      var modifier = modifierTitle ? [this._getModifier(productId, modifierTitle)] : null;

      var deferred = $.Deferred();

      this.moltin.Cart.Insert(productId, quantity, modifier,
        function (item) {
          this.initCart();
          deferred.resolve();
        }.bind(this),
        function (err) {

          this.handleError(err);
          deferred.resolve(err);
        }.bind(this)
      );

      return deferred;
    },

    _getCartContent : function (productId) {

      var contents = this.get('cart').contents;
      var cartContent;

      Object.keys(contents).forEach(function (key) {
        var content = contents[key];
        if (content.id === productId) {
          cartContent = content;
          cartContent.key = key;
        }
      });

      return cartContent;
    },

    createUser : function (name, email, countryCode) {

      var deferred = $.Deferred();

      var customer = {
        first_name : ' ',
        last_name : name,
        email : email,
        group : moltinData.waitingListGroupId
      };

      var billTo = {
        first_name :  ' ',
        last_name : name,
        address_1 : ' ',
        address_2 : '',
        city : ' ',
        county : ' ',
        country : countryCode,
        postcode : ' ',
        phone : ''
      };

      var shipTo = {
        first_name : ' ',
        last_name : name,
        address_1 : ' ',
        address_2 : '',
        city : '',
        county : '',
        country : countryCode,
        postcode : ' ',
        phone : ''
      };

      var shipping = 'waiting-list';

      this.completeCard(customer, billTo, shipTo, shipping)
        .done(function (order) {

          // order.overall_total_with_taxed_shipping = order.totals.subtotal.rounded + this.get('shipping_rounded');
          this.deleteCart().then(function () {
            deferred.resolve(order);
          }.bind(this))
          .fail(function (err) {

            this.handleError(err);
            deferred.resolve(err);
          }.bind(this));
        }.bind(this));

      return deferred;
    },

    // @TODO: Handle errors
    // @TODO: Check if cart is not empty
    checkout : function (validationObject, done) {

      var deferred = $.Deferred();

      var customer = {
        first_name : validationObject.first_name,
        last_name : validationObject.last_name,
        email : validationObject.email
      };

      var billTo = {
        first_name : validationObject.first_name,
        last_name : validationObject.last_name,
        address_1 : validationObject.street,
        address_2 : validationObject.addressno,
        city : validationObject.city,
        county : '',
        // @TODO: implement select input
        country : validationObject.country,
        postcode : validationObject.postcode,
        phone : ''
      };

      var shipTo = {
        first_name : validationObject.shipping_first_name || validationObject.first_name,
        last_name : validationObject.shipping_last_name || validationObject.last_name,
        address_1 : validationObject.shipping_street || validationObject.street,
        address_2 : validationObject.shipping_addressno || validationObject.addressno,
        city : validationObject.shipping_city || validationObject.city,
        county : '',
        // @TODO: implement select input
        country : validationObject.shipping_country || validationObject.country,
        postcode : validationObject.shipping_postcode || validationObject.postcode,
        phone : ''
      };

      var expiry = this._getExpiry(validationObject.expirydate);
      var card = {
        number : validationObject.cardnumber,
        expiry_month : expiry.month,
        expiry_year : expiry.year,
        cvv : validationObject.cvv
      };

      var shipping = this.get('shippingSlug');

      // @TODO: Implement proper promise chaining
      this.completeCard(customer, billTo, shipTo, shipping)
        .done(function (order) {
          var tots = order.totals.subtotal.rounded + order.shipping.data.price.data.rounded.with_tax,
              currencySymbol = order.totals.subtotal.formatted.slice(0, 1);

          order.total_withouttaxonproducts_buttaxonshipping_formatted = currencySymbol + tots;
          order.correct_shipping_price = currencySymbol + order.shipping.data.price.data.rounded.with_tax;
          this.set('order', order);
          this.pay(order.id, card).done(function (checkout) {
            this.set('cartPayed', this.get('cart'));
            this.deleteCart().done(function () {
              // callback to Form
              done(true, {}, 200);
            }.bind(this));
          }.bind(this)).fail(function (error, message) {
            done(false, {error : error, message : message});
          });
        }.bind(this)).fail(function (order) {

        });
    },

    completeCard : function (customer, billTo, shipTo, shipping) {

      var deferred = $.Deferred();

      this.moltin.Cart.Complete(
        {
          gateway: this.gateway,
          customer: customer,
          bill_to: billTo,
          ship_to: shipTo,
          shipping: shipping
        },
        function (order) {
          deferred.resolve(order);
        },
        function (err) {
          this.handleError(err);
          deferred.reject(err);
        }.bind(this)
      );

      return deferred;
    },

    pay : function (orderId, checkoutData) {

      var deferred = $.Deferred();

      this.moltin.Checkout.Payment(
        'purchase',
        orderId,
        {
          data: checkoutData
        },
        function (checkout) {
          deferred.resolve(checkout);
        },
        function (err, message) {
          this.handleError(err, message);
          deferred.reject(err, message);
        }.bind(this)
      );

      return deferred;
    },

    getShippingPriceUnformatted: function () {
      var shipping, slug, price;
      if ((shipping = this.get('shipping')) && (slug = this.get('shippingSlug'))) {
        shipping.forEach(function (item) {
          if (item.slug === slug) {
            price = item.price.data.rounded.with_tax;
          }
        });
      }
      return price;
    },

    getShippingPrice: function (slug) {
      var shipping, slug, price = '';
      if ((shipping = this.get('shipping')) && (slug = this.get('shippingSlug'))) {
        shipping.forEach(function (item) {
          if (item.slug === slug) {
            price = item.price.data.formatted.with_tax;
          }
        });
      }
      return price;
    },

    handleError : function (err) {

    },

    _getProduct : function (productId) {

      var products = this.get('products');

      if (_.isUndefined(products)) {
        return undefined;
      }

      var ret;
      products.forEach(function (product) {
        if (product.id === productId) {
          ret = product;
        }
      });
      return ret;
    },

    _getModifier : function (productId, title) {

      var product = this._getProduct(productId);

      if (_.isUndefined(product)) {
        return undefined;
      }

      if (_.isUndefined(product.modifiers) || _.isNull(product.modifiers)) {
        return undefined;
      }

      var ret;
      Object.keys(product.modifiers).forEach(function (key) {
        Object.keys(product.modifiers[key].variations).forEach(function (variationKey) {
          var variation = product.modifiers[key].variations[variationKey];
          if (variation.title === title) {
            ret = {};
            ret[key] = variationKey;
          }
        });
      });
      return ret;
    },

    _getExpiry : function (date) {

      var month = date.substring(0, date.indexOf('/'));
      var year = date.substring(date.indexOf('/') + 1, date.length);
      if (year.length === 2) {
        year = '20' + year;
      }

      return {
        month : month,
        year : year
      };
    }
  });

  return MoltinModel;
});
