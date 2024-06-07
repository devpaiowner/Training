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
 
  // Submenu 
 $(document).ready(function () {
	if ($(window).width() < 992) {
	   $('.submenu').hide();
	} else {
	   $('.submenu').show();
	}
	var children = $('.navbar-nav .nav-item a').filter(function () {
	   return $(this).nextAll().length > 0
	})
	$('<span class="toChild"><i class="icon-arrow-down"></i></span>').insertAfter(children)
	$('.navbar-nav .toChild').on('click touch', function (e) {
	   if ($(window).width() < 992) {
		  $(this).next().slideToggle(300);
		  $(this).closest('li').siblings().find('ul').hide()
	   } else {
		  $(this).closest('li').siblings().find('ul').show()
	   }
 
	});
 })
 
  // Slider
 $(document).ready(function () {
	$('.slider').owlCarousel({
		items: 1,
		loop: true,
		dots: false,
		nav:true,
		autoplay: true,
		autoplayTimeout: 5000,
		autoplayHoverPause: false,
		navText: ["<i class='icon-arrow-left'></i>", "<i class='icon-arrow-right'></i>"],
	 })

	$('.client').owlCarousel({
	   loop: true,
	   autoplay: true,
	   margin: 10,
	   dots: false,
	   autoplayTimeout: 5000,
	   autoplayHoverPause: false,
	   navText: ["<i class='fa-solid fa-angle-left'></i>", "<i class='fa-solid fa-chevron-right'></i>"],
	   responsive: {
		  0: {
			 items: 2,
		  },
		  768: {
			 items: 3,
		  },
		  1200: {
			 items: 4,
		  }
	   }
	})
 });