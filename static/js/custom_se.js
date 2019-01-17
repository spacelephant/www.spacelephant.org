jQuery(function ($) {
    "use strict";

    // Auto close on menu click
    $(".navigation-menu li:not(.dropdown)").on("click", e => {
        let toggleButton = $(".navbar-toggle");
        if (toggleButton) {
            toggleButton.trigger('click');
        }
    })
    

    // Smooth scroll to anchors
    $('[href^="/#"]:not([href^="/#!"]), [href^="#"]:not([href^="#!"])').on('click', (e) => {
        let target = $(e.currentTarget);
        if (target.tagName === 'img') {
          target = target.parent();
        }
        if (target.attr('href')) {
          const anchor = $(target.attr('href').replace('/', ''));
          animateScroll(anchor);
        }
      });

      function animateScroll(anchor) {
        const navHeader = $('.navbar-header');
        const nav = $('#navigation');
        let anchorOffset = anchor.offset();
        let navHeight = navHeader.height() + parseInt(nav.css('padding-top'), 10) + parseInt(nav.css('padding-bottom'), 10);
      
        if (anchorOffset && navHeight) {
          let scrollTop = anchorOffset.top - navHeight + 1;
          $('html, body').animate(
            {
              scrollTop: scrollTop,
            },
            'slow',
          );
        }
      }

});