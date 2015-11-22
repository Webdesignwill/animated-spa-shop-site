
define([
  'DefaultShopPage',
  'SelectableView',
  'json!data/sizes.json',
  'json!data/size_dimensions.json',
], function (DefaultShopPage, SelectableView, sizes, sizeDimensions) {

  'use strict';

  return DefaultShopPage.extend({

    size: 'small',

    subViews: [
      {
        view: SelectableView,
        options: {
          el: '#shop-sizing-selectable-miller-pink',
          selectables: sizes
        }
      },
      {
        view: SelectableView,
        options: {
          el: '#shop-sizing-selectable-condition-black',
          selectables: sizes
        }
      }
    ],

    startListening : function () {
      this.listenTo(this.subViews[0].viewInstance, 'change', this.onChangeSize);
      this.listenTo(this.subViews[1].viewInstance, 'change', this.onChangeSize);
    },

    getRenderObject : function () {
      return {
        sizeDimensions : sizeDimensions[this.size]
      };
    },

    onChangeSize : function (size) {
      this.size = size;
      this.render();
    }
  });
});
