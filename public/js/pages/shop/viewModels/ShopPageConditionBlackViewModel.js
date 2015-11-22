define([
  'ShopPageViewModel',
  'json!data/moltin.json'
], function (ShopPageViewModel, moltinData) {

  "use strict";

  return ShopPageViewModel.extend({

    defaults : {
      productId : moltinData.productIds[1],
      title : 'Condition Black',
      price : '',
      description : "Designed to help you push your limits in the \
mountains, Condition Black combines a \
highly flexible, breathable soft shell, with a \
ceramic outer skin that's so tough it can \
survive falls of 120kmph and scar rock. In the \
event of disaster, articulated Ceraspace \
panels behave like skin to limit heat loss, glow \
in the dark instructions appear for when \
your brain and body start shutting down, \
and magnetic Survival Pockets turn your \
body into its own heat pack to protect your \
vital organs and critical arteries.",
      images: [
        '/assets/img/pages/shop/cb buying image 1 72 dpi.jpg',
        '/assets/img/pages/shop/cb buying image 2 72 dpi.jpg',
        '/assets/img/pages/shop/cb buying image 3 72 dpi.jpg',
        '/assets/img/pages/shop/cb buying image 5 72 dpi.jpg',
        '/assets/img/pages/shop/cb buying image 6 72 dpi.jpg'
      ],
      mobileImages: [
        '/assets/img/pages/shop/mobile/cb-buying-image-1-72-dpi.jpg',
        '/assets/img/pages/shop/mobile/cb-buying-image-2-72-dpi.jpg',
        '/assets/img/pages/shop/mobile/cb-buying-image-3-72-dpi.jpg',
        '/assets/img/pages/shop/mobile/cb-buying-image-5-72-dpi.jpg',
        '/assets/img/pages/shop/mobile/cb-buying-image-6-72-dpi.jpg'
      ],
      sizes: [{title: 's', slug: 'Small'}, {title: 'm', slug: 'Medium'}, {title: 'l', slug: 'Large'}, {title: 'xl', slug: 'Extra Large'}]
    }
  });
});
