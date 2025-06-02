$(document).ready(function () {
  const $images = $(".galleryimage img"),
    $overlay = $(".overlay"),
    $overlayImg = $overlay.find(".content img"),
    $closeBtn = $("#close"),
    $closePrev = $("#closePrev"),
    $closeNext = $("#closeNext"),
    $nextBtn = $("#next"),
    $prevBtn = $("#prev"),
    $prevImage = $("#prevImage img"),
    $nextImage = $("#nextImage img"),
    $sections = $("section"),
    $navLinks = $(".nav-link");

  let currentIndex;

  function showOverlay() {
    $overlay.removeClass("d-none");
    $overlayImg.show();
  }

  function hideOverlay() {
    $overlay.addClass("d-none");
    $overlayImg.hide();
  }

  function setOverlayImage(index) {
    const $current = $images.eq(index);
    const $prev = $images.eq((index - 1 + $images.length) % $images.length);
    const $next = $images.eq((index + 1) % $images.length);
    $overlayImg.attr("src", $current.attr("src"));
    $prevImage.fadeIn(400).attr("src", $prev.attr("src"));
    $nextImage.fadeIn(400).attr("src", $next.attr("src"));
  }

  function preloadImages() {
    $images.each(function () {
      const preloadedImg = new Image();
      preloadedImg.src = $(this).attr("src");
    });
  }

  $images.on("click", function () {
    currentIndex = $images.index(this);
    setOverlayImage(currentIndex);
    showOverlay();
  });

  function changeSlide(direction, fade = false) {
    if (fade) {
      $overlayImg.fadeOut(200, function () {
        currentIndex = (currentIndex + direction + $images.length) % $images.length;
        setOverlayImage(currentIndex);
        $overlayImg.fadeIn(200);
      });
    } else {
      currentIndex = (currentIndex + direction + $images.length) % $images.length;
      setOverlayImage(currentIndex);
    }
  }

  $nextImage.on("click", function (e) {
    e.stopPropagation();
    changeSlide(1);
  });

  $prevImage.on("click", function (e) {
    e.stopPropagation();
    changeSlide(-1);
  });

  $nextBtn.on("click", function () {
    changeSlide(1);
  });

  $prevBtn.on("click", function () {
    changeSlide(-1);
  });

  $closeNext.on("click", function () {
    changeSlide(1, true);
  });

  $closePrev.on("click", function () {
    changeSlide(-1, true);
  });

  $closeBtn.on("click", hideOverlay);

  $overlay.on("click", function (e) {
    if (e.target === this) {
      hideOverlay();
    }
  });

  $(document).on("keydown", function (e) {
    if (!$overlay.hasClass("d-none")) {
      if (e.key === "ArrowRight") changeSlide(1);
      else if (e.key === "ArrowLeft") changeSlide(-1);
      else if (e.key === "Escape") hideOverlay();
    }
  });

  $(window).on("scroll", function () {
    const scrolled = $(this).scrollTop();
    const $header = $("#header");
    const $text = $("#text");

    if ($header.length) {
      $header.toggleClass("scrooled", scrolled >= 160);
    }
    if ($text.length && scrolled >= 250) {
      $text.addClass("animate");
    }

    let currentSectionId = "";
    $sections.each(function () {
      const top = $(this).offset().top - 68;
      const height = $(this).outerHeight();
      if (scrolled >= top && scrolled < top + height) {
        currentSectionId = $(this).attr("id");
      }
    });

    $navLinks.each(function () {
      $(this).toggleClass("active", $(this).attr("href") === `#${currentSectionId}`);
    });
  });

  new Typed("#element", {
    strings: [
      "Front End Developer",
      "Web Designer",
      "Web Developer",
      "UI/UX Designer",
    ],
    typeSpeed: 100,
    backSpeed: 100,
    loop: true,
  });

  console.log(
    "%cYousef Elkilani",
    "color:#fff;background:#f00;border:5px solid #000;border-radius:30px;padding:25px 60px;font-size:30px"
  );

  preloadImages();
});
