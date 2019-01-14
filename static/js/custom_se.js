jQuery(function ($) {
    "use strict";

    // Auto close on menu click
    $(".navigation-menu li:not(.dropdown)").on("click", e => {
        let toggleButton = $(".navbar-toggle");
        if (toggleButton) {
            toggleButton.trigger('click');
        }
    })
    

});