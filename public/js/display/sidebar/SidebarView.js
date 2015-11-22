
define([
  'App',
  'handlebars',
  'text!js/display/sidebar/templates/sidebar.tpl'
], function (App, handlebars, template) {

  "use strict";

  var SidebarView = Backbone.View.extend({

    events : {
      'click a' : 'anchor',
      'click .close' : 'close'
    },

    initialize : function () {
      this.render();
    },

    render : function () {
      var tpl = handlebars.compile(template);
      var compiled = tpl({});

      this.$el.html(compiled);
      this.setElements();

      return this;
    },

    setElements: function () {
      this.$li = this.$('> ul > li');
    },

    close : function (e) {
      e.preventDefault();
      this.$el.find('.expanded').removeClass('expanded');
      App.trigger('sidebar:toggle');
    },

    anchor : function (e) {
      var $target = $(e.target),
          $li = $target.closest('li'),
          self = this;

      if($target.data('home')) {
        App.set('gotohome', true);
      }

      var isExpanded;

      if($target.hasClass('drop-down')) {
        e.preventDefault();
        isExpanded = $li.hasClass('expanded');
        if (!isExpanded) {
          $li.addClass('expanded');
          setTimeout(function () {
            $li.addClass('show-sub');
          }, 250);
        } else {
          this.$li.removeClass('show-sub');
          setTimeout(function () {
            self.$li.removeClass('expanded');
          }, 250);
        }
      } else {
        this.$el.find('.expanded').removeClass('expanded');
        App.trigger('sidebar:toggle');
      }
    }

  });

  return SidebarView;

});
