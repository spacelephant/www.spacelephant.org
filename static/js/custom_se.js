jQuery(function($) {
  "use strict";

  // Auto close on menu click
  $(".navigation-menu li:not(.dropdown)").on("click", e => {
    let toggleButton = $(".navbar-toggle");
    if (toggleButton) {
      toggleButton.trigger("click");
    }
  });

  // Smooth scroll to anchors
  $('[href^="/#"]:not([href^="/#!"]), [href^="#"]:not([href^="#!"])').on(
    "click",
    e => {
      let target = $(e.currentTarget);
      if (target.tagName === "img") {
        target = target.parent();
      }
      if (target.attr("href")) {
        const anchor = $(target.attr("href").replace("/", ""));
        animateScroll(anchor);
      }
    }
  );

  freezeFloatLineHeight();

  resizeFloatingLineOnOrientationChange();

  scrollToAnchorIfNeeded();

  function animateScroll(anchor) {
    const navHeader = $(".navbar-header");
    const nav = $("#navigation");
    let anchorOffset = anchor.offset();
    let navHeight =
      navHeader.height() +
      parseInt(nav.css("padding-top"), 10) +
      parseInt(nav.css("padding-bottom"), 10);

    if (anchorOffset && navHeight) {
      let scrollTop = anchorOffset.top - navHeight + 1;
      $("html, body").animate(
        {
          scrollTop: scrollTop
        },
        "slow"
      );
    }
  }

  function getFloatLine() {
    return $(".hero-area");
  }

  function freezeFloatLineHeight() {
    let floatLine = getFloatLine();
    if (floatLine) {
      let height = floatLine.height() || 0;
      floatLine.css("height", height).css("min-height", height);
    }
  }

  function resetFloatLineHeight() {
    let floatLine = getFloatLine();
    if (floatLine) {
      floatLine.css("height", "auto").css("min-height", "100vh");
    }
  }

  function resizeFloatingLineOnOrientationChange() {
    $(window).on("orientationchange", _ => {
      resetFloatLineHeight();
      freezeFloatLineHeight();
    });

    // Hack for firefox mobile
    let mqOrientation = window.matchMedia("(orientation: portrait)");
    mqOrientation.addListener(function() {
      resetFloatLineHeight();
      freezeFloatLineHeight();
    });
  }

  function scrollToAnchorIfNeeded() {
    if (location.hash) {
      let anchor = $(location.hash);
      animateScroll(anchor);
    }
  }

});
