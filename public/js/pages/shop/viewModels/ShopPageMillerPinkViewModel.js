define([
  'ShopPageViewModel',
  'json!data/moltin.json',
], function (ShopPageViewModel, moltinData) {

  "use strict";

  return ShopPageViewModel.extend({

    defaults : {
      productId : moltinData.productIds[0],
      title : 'Baker Miller Pink',
      price : '',
      description : 'Fusing colour theory and physiology, the Baker \
  Miller Pink hoodie enhances your ability to relax \
  before and after sport by flooding your entire \
  field of vision with an experimental shade of \
  pink. All you have to do to slow your heart rate, \
  your breathing and your brainwaves, is put it \
  on and zip it up. The hoodie combines deep \
  cushioning, thermal insulation and water resistance, \
  with unique Sling Pockets to minimise \
  movement, and a breathable mesh visor that \
  helps you shut your brain up and shut the world \
  out.',
      images: [
        '/assets/img/pages/shop/bmp buying image 1 72 dpi.jpg',
        '/assets/img/pages/shop/bmp buying image 2 72 dpi.jpg',
        '/assets/img/pages/shop/bmp buying image 3 72 dpi.jpg',
        '/assets/img/pages/shop/bmp buying image 4 72 dpi.jpg',
        '/assets/img/pages/shop/bmp buying image 6 72 dpi.jpg',
        '/assets/img/pages/shop/bmp buying image 7 72 dpi.jpg'
      ],
      mobileImages: [
        '/assets/img/pages/shop/mobile/bmp-buying-image-1-72-dpi.jpg',
        '/assets/img/pages/shop/mobile/bmp-buying-image-2-72-dpi.jpg',
        '/assets/img/pages/shop/mobile/bmp-buying-image-3-72-dpi.jpg',
        '/assets/img/pages/shop/mobile/bmp-buying-image-4-72-dpi.jpg',
        '/assets/img/pages/shop/mobile/bmp-buying-image-6-72-dpi.jpg',
        '/assets/img/pages/shop/mobile/bmp-buying-image-7-72-dpi.jpg'
      ],
      sizes: [{title: 's', slug: 'Small'}, {title: 'm', slug: 'Medium'}, {title: 'l', slug: 'Large'}, {title: 'xl', slug: 'Extra Large'}]
    }
  });
});