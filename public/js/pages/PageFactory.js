
define(['App'], function (App) {

    "use strict";

    var PageFactory = function () {

      function closeCurrentPage () {

        var $deferred = $.Deferred();

        var page = App.get('page');
        if(page && typeof page.view.close === 'function') {
          return page.view.close(function () {
            $deferred.resolve();
          });
        } else {
          $deferred.resolve();
        }
        return $deferred.promise();
      }

      function openNextPage (page, done) {
        if (typeof page.before === 'function') {
          return page.before(done);
        }
        done();
      }

      function beforePageChange ($container) {

        var $deferred = $.Deferred();

        $container.css({
          'height' : $container.height()
        });

        TweenLite.to($container[0], 0.7, {
          opacity : 0,
          onComplete : function () {
            $deferred.resolve();
          }
        });

        return $deferred.promise();

      }

      function afterPageChange ($container) {
        $container.css({
          'height' : 'auto'
        });

        var scrollToElement = $container.height() < 20 ? 0 : $container.offset().top;

        if(App.get('gotohome', true)) {
          scrollToElement = 0;
          App.set('gotohome', false);
        }

        if(App.get('cookiebar:showing')) {
          App.set('cookiebar:showing', false);
          $container.css('opacity', 1);
          return;
        }

        $('html, body').scrollTop(scrollToElement - 60);
        TweenLite.to($container[0], 0.7, {
          opacity : 1,
          onComplete : function () {
            $container.removeClass('page-changing');
          }
        });
      }

      function transition ($container, produce) {
        $container.addClass('page-changing');
        $.when(beforePageChange($container)).then(function () {
          $.when(closeCurrentPage()).then(function () {
            $.when(produce()).then(function () {
              afterPageChange($container);
            });
          });
        });
      }

      this.make = function ($container, pageModel, Page, identifier) {

        App.set({
          nextPage : {
            id : pageModel.get('id'),
            model : pageModel
          },
          prevPage : {
            id : App.get('page', 'id'),
            model : App.get('page', 'model')
          }
        });

        function produce () {

          var $deferred = $.Deferred();

          var page = new Page({
            model : pageModel,
            id : pageModel.get('name') + '-page',
            identifier : identifier || null,
            $container : $container
          });

          $.when(page.ready()).then(function () {
            openNextPage(page, function () {
              App.set('page', {
                id : pageModel.get('id'),
                view : page,
                model : pageModel
              });
            });

            $deferred.resolve();

          });

          return $deferred.promise();

        }

        transition($container, produce);

      };
    };

    return PageFactory;

});
