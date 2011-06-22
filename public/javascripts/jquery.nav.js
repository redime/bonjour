(function($) {
  $.fn.navigator = function() {
    return this.each(function() {
      
      var navbar = $(this);
      
      var menus = navbar.children('ul').children('li');
      var menuTitles = navbar.children('ul').children('li').children('a');
      var menuDescr = navbar.children('ul').children('li').data('description');

      var submenus = navbar.children('ul').children('li').children().not('a');

      var panel = $('<div class="panel" />').appendTo(navbar);

      var initialized = false;
      var offset = null;

      var initializer = function() {
        offset = ($.browser.msie) ? navbar.position().left : null;

        panel.width(navbar.width());
        panel.offset({ left: offset });
        panel.css('margin-left', '-1px');
        
        $('<div />').appendTo(panel).append('<h1 />', '<p />');

        submenus.filter('div').each(function() {
          $(this).width(panel.width() - panel.children('div').outerWidth() - 16);

          if ($(this).parent().position().left < panel.children('div').outerWidth()) {
            $(this).offset({ left: offset + 8 });
          } else {
            $(this).offset({ left: offset + panel.children('div').outerWidth() + 8 });
          }
        });

        initialized = true;
      };

      var showMenu = function(e) {
        var menu = e.data;

        if (e.type == 'mouseenter' && panel.is(':hidden') ||
          menu.is('.selected')) {
          return;
        }

        if (!initialized) {
          initializer();
        }

        var content = menu.children().not('a');
        var title = menu.children('a').text();
        var descr = menu.data('description');

        panel.find('div > h1').html(title);
        panel.find('div > p').html(descr);

        if (menu.position().left - offset < panel.children('div').outerWidth()) {
          panel.addClass('right-align');
        } else {
          panel.removeClass('right-align');
        }

        menus.removeClass('selected');
        menu.addClass('selected');
        if (panel.is(':hidden')) {
          panel.fadeIn(250);
          content.fadeIn(250);
        } else {
          submenus.fadeOut(150);
          content.fadeIn(250);
        }
      };

      var hideMenus = function() {
        menus.removeClass('selected');
        submenus.fadeOut(150);
        panel.fadeOut(250);
      };

      var bindEvents = function() {
        $('html').bind('click', function(e) {
          hideMenus();
        });

        navbar.bind('click', function(e) {
          e.stopPropagation();
        });

        menus.each(function() {
          $(this).bind('click', $(this), showMenu);
          $(this).bind('mouseenter', $(this), showMenu);
        });
      };

      bindEvents();
    });
  };
})(jQuery);