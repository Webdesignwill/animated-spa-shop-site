
define([
  'App',
  'require',
  'handlebars',
  'AudioModalView',
  'Page',
  'Responsiveness',
  'BakerMillerPinkCanvas',
  'ConditionBlackCanvas',
], function (App, app_require, handlebars, AudioModalView, Page, Responsiveness, BakerMillerPinkCanvas, ConditionBlackCanvas) {

  "use strict";

  var ArticlePage = Page.extend({

    // @TODO: Ugly to have hardcoded header height of 60px
    headerHeight : 60,

    audioModalView : undefined,

    events : {
      'click .open-article' : 'open',
      'click .play-audio' : 'play'
    },

    open : function (e) {

      e.preventDefault();


      this.$articleContent.show();

      var scrollTop = this.$articleContent.offset().top - this.headerHeight;
      var $hideButton = this.$hideButton;
      $('html, body').animate({
        scrollTop: scrollTop
      }, 350, function () {
        $hideButton.fadeOut();
      });
    },

    setElements : function () {
      this.$window = $(window);
      this.$articleHeader = this.$('.article-header');
      this.$articleContent = this.$('.article-content');
      this.$hideButton = this.$('.hide-button');
    },

    postRender : function () {
      var height = this.$window.height();
      if (Responsiveness.isDesktop()) {
        height -= this.headerHeight;
      }
      this.$articleHeader.css('min-height', height);
    },

    getRenderObject: function () {
      var port = window.location.port ? ':' + window.location.port : '';
      //var url = 'http://' + window.location.hostname + port + window.location.pathname + window.location.hash;
      var texts = [
        "Vollebak's Baker Miller Pink hoodie hacks your central nervous system to help you relax pre and post sport",
        "Vollebak's Baker Miller Pink soundtrack hacks your central nervous system to help you relax pre and post sport",
        "Vollebak's Condition Black Jacket is so tough it can scar rock. Read more at",
        "Vollebak's Condition Black soundtrack helps athletes acclimatise to life and death situations. Test it at"
      ];
      var urls = [
        'http://bit.ly/1NruKCc',
        'http://bit.ly/1Ma8s4o',
        'http://bit.ly/1NXRbSD',
        'http://bit.ly/1MXiZEZ'
      ];

      var text, url;
      // @TODO: A bit dangerous, cause this might break when hashes change
      switch (window.location.hash) {
        case '#!/products/baker-miller-hoodie':
          text = texts[0];
          url = urls[0];
          break;
        case '#!/soundtrack/baker-miller':
          text = texts[1];
          url = urls[1];
          break;
        case '#!/products/condition-black-jacket':
          text = texts[2];
          url = urls[2];
          break;
        case '#!/soundtrack/condition-black':
          text = texts[3];
          url = urls[3];
          break;
      }

      return {
        shareText: text,
        shareURL: encodeURIComponent(url)
      };
    },

    play : function (e) {
      e.preventDefault();

      // do not initialize multiple audio views
      if (this.audioModalView) {
        this.audioModalView.show();
        return;
      }

      this.audioModalView = new AudioModalView({
        src : $(e.target).data('audiosrc')
      });
      $('.audio-container > .inner').append(this.audioModalView.$el);
    },

    remove : function () {
      if (this.audioModalView) {
        this.audioModalView.remove();
      }
      Backbone.View.prototype.remove.call(this);
    }

  });

  return ArticlePage;

});
