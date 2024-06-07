// Sticky Header
$(document).ready(function () {
   function updateScroll() {
      if ($(window).scrollTop() >= 80) {
         $(".navbar").addClass('sticky');
      } else {
         $(".navbar").removeClass("sticky");
      }
   }

   $(function () {
      $(window).scroll(updateScroll);
      updateScroll();
   });
});


// menu icon changes
$(document).ready(function () {
   $(".navbar-toggler").click(function () {
      $(this).toggleClass("i-change");
   });
});


// My profile menu change in mobile
$(document).ready(function () {
   if ($(window).width() < 992) {
      $('.topSearch').hide();
   } else {
      $('.topSearch').show();
   }
   $(".btn_Search").click(function () {
      $('.topSearch').toggle();
   })
});


$(".toggle-password").click(function () {

   $(this).toggleClass("icon-eye-view");
   var input = $($(this).attr("toggle"));
   if (input.attr("type") == "password") {
      input.attr("type", "text");
   } else {
      input.attr("type", "password");
   }
});

$(document).ready(function () {

   $('.CarouselHome').owlCarousel({
      center: true,
      items: 2,
      loop: true,
      stagePadding: 50,
      autoplay: true,
      autoPlay: 3000,
      nav: false,
      // navText: ["<img src='images/angel-left.svg'>", "<img src='images/angel-right.svg'>"],
      responsiveClass: true,
      responsive: {
         0: {
            items: 1.4,
            margin: 30,
            stagePadding: 0,
            nav: false,
         },
         600: {
            items: 2,
            margin: 40,
            stagePadding: 0,
         },
         1000: {
            margin: 80,
            stagePadding: 0,
         },
         1400: {
            margin: 120,
         },

      }
   });


   $('.carousel2').owlCarousel({
      // center: true,
      loop: true,
      margin: 15,
      autoplay: true,
      autoPlay: 3000,
      nav: true,
      dots: false,
      // stagePadding: 100,
      navText: ["<img src='images/angel-left.svg'>", "<img src='images/angel-right.svg'>"],
      responsiveClass: true,
      responsive: {
         0: {
            items: 2,
         },
         600: {
            items: 4
         },
         1000: {
            items: 6,
         },
         1400: {
            items: 9,
         },

      }
   });

   // var selector = $('.carousel2');

   // $('.my-next-button').click(function() {
   //   selector.trigger('next.owl.carousel');
   // });

   // $('.my-prev-button').click(function() {
   //   selector.trigger('prev.owl.carousel');
   // });

 

});


// Read More content
$(document).ready(function () {
   // Configure/customize these variables.
   var showChar = 150; // How many characters are shown by default
   var ellipsestext = "";
   var moretext = "More...";
   var lesstext = "Less";


   $('.more').each(function () {
      var content = $(this).html();

      if (content.length > showChar) {

         var c = content.substr(0, showChar);
         var h = content.substr(showChar, content.length - showChar);

         var html = c + '<span class="moreellipses">' + ellipsestext + ' </span><span class="morecontent"><span>' + h + '</span>  <a href="" class="morelink">' + moretext + '</a></span>';

         $(this).html(html);
      }

   });

   $(".morelink").click(function () {
      if ($(this).hasClass("less")) {
         $(this).removeClass("less");
         $(this).html(moretext);
      } else {
         $(this).addClass("less");
         $(this).html(lesstext);
      }
      $(this).parent().prev().toggle();
      $(this).prev().toggle();
      return false;
   });
});

// End Read More content

