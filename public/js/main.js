var app_require = require.config({

  baseUrl: '/',
  context: 'app_require',

  packages: [{
    name: 'forms',
    location: 'js/forms'
  }, {
    name: 'api',
    location: 'js/api'
  }],

  paths: {

    // libs
    jquery: 'js/libs/jquery/jquery.min',
    jquerychosen: 'js/libs/jquery/jquery.chosen.min',
    jqueryautocomplete: 'js/libs/jquery/jquery.autocomplete.min',
    jquerysteller: 'js/libs/jquery/jquery.steller',
    Backbone: 'js/libs/backbone/backbone.min',
    Validation: 'js/libs/backbone/backbone.validation.min',
    underscore: 'js/libs/underscore/underscore.min',
    handlebars: 'js/libs/handlebars/handlebars',
    text: 'js/libs/require/text.min',
    domReady: 'js/libs/require/domReady',
    json: 'js/libs/require/json',
    bootstrap: 'js/libs/bootstrap/bootstrap.min',
    Responsiveness: 'js/bootstrap/responsiveness',
    Moltin: 'js/libs/moltin/moltin',
    WOW: 'js/libs/wow/wow.min',
    perlin: 'js/libs/perlin/perlin',
    paper: 'js/libs/paper/paper-full',
    jsCookie: 'js/libs/js-cookie/js.cookie',

    App: 'js/App',
    Router: 'js/Router',
    PageFactory: 'js/pages/PageFactory',
    Sitemap: 'js/Sitemap',
    Preloader: 'js/Preloader',

    /* Site models */
    PageModel: 'js/models/PageModel',

    /* Pages */
    Page: 'js/pages/Page',
    DefaultPage: 'js/pages/DefaultPage',
    ArticlePage: 'js/pages/ArticlePage',
    ExperimentPage: 'js/pages/ExperimentPage',
    ExperimentConditionBlackPage: 'js/pages/ExperimentConditionBlackPage',
    PhilosophyPage: 'js/pages/PhilosophyPage',
    /* Pages Shop */
    DefaultShopPage: 'js/pages/shop/DefaultShopPage',
    ShopIndexPage: 'js/pages/shop/ShopIndexPage',
    ShopPage: 'js/pages/shop/ShopPage',
    ShopPageConditionBlack: 'js/pages/shop/ShopPageConditionBlack',
    ShopPageMillerPink: 'js/pages/shop/ShopPageMillerPink',
    ShopShippingPage: 'js/pages/shop/ShopShippingPage',
    ShopDetailsPage: 'js/pages/shop/ShopDetailsPage',
    ShopEReceiptPage: 'js/pages/shop/ShopEReceiptPage',
    ShopSizingPage: 'js/pages/shop/ShopSizingPage',
    ShopWaitingListPage: 'js/pages/shop/ShopWaitingListPage',

    /* Views */
    PreLoaderView: 'js/display/preloader/PreLoaderView',
    BodyView: 'js/display/body/BodyView',
    MainMenuView: 'js/display/mainmenu/MainMenuView',
    SidebarView: 'js/display/sidebar/SidebarView',
    HeaderView: 'js/display/header/HeaderView',
    AudioModalView: 'js/display/audio/AudioModalView',
    VideoPlayerView: 'js/display/video/VideoPlayerView',
    ModalView: 'js/display/modal/ModalView',

    /* ViewModels */
    HeaderViewModel: 'js/display/header/HeaderViewModel',
    ShopViewModel: 'js/pages/shop/viewModels/ShopViewModel',
    ShopPageViewModel: 'js/pages/shop/viewModels/ShopPageViewModel',
    ShopPageConditionBlackViewModel: 'js/pages/shop/viewModels/ShopPageConditionBlackViewModel',
    ShopPageMillerPinkViewModel: 'js/pages/shop/viewModels/ShopPageMillerPinkViewModel',

    /* SubViews / Partials */
    CheckoutView: 'js/pages/shop/subViews/CheckoutView',
    CounterView: 'js/pages/shop/subViews/CounterView',
    GalleryView: 'js/pages/shop/subViews/GalleryView',
    SelectableView: 'js/pages/shop/subViews/SelectableView',

    /* canvas */
    BakerMillerPinkCanvas: 'js/canvas/BakerMillerPinkCanvas',
    ConditionBlackCanvas: 'js/canvas/ConditionBlackCanvas',
    ConditionBlackCanvasBackground: 'js/canvas/ConditionBlackCanvas/Background',
    ConditionBlackCanvasAsset: 'js/canvas/ConditionBlackCanvas/Asset',

    /* Forms */
    CountriesCollection: 'js/api/countries/CountriesCollection',

    /* Moltin */
    MoltinModel: 'js/moltin/MoltinModel'
  },
  shim: {
    'Backbone': {
      deps: ['jquery', 'underscore', 'handlebars'],
      exports: "Backbone"
    },
    'handlebars': {
      exports: 'Handlebars'
    },
    'bootstrap': {
      deps: ['jquery'],
      exports: 'bootstrap'
    },
    'jquerychosen': ['jquery'],
    'jqueryautocomplete': ['jquery'],
    'jquerysteller' : ['jquery'],
    'Moltin': {
      exports: 'Moltin'
    },
    'perlin': {
      exports: 'perlin'
    },
    'paper': {
      exports: 'paper'
    }
  },
  deps: ['jquery', 'underscore', 'Backbone', 'domReady', 'bootstrap', 'Validation', 'Moltin', 'jquerychosen', 'jqueryautocomplete', 'jquerysteller', 'WOW', 'jsCookie', 'text!templates/page/home.tpl'],
  callback: function($, _, Backbone, domReady, bootstrap) {
    domReady(function() {
      app_require(['App', 'PreLoaderView'], function (App, PreLoaderView) {
          new PreLoaderView();
          App.load();
        });
    });
  }
});
