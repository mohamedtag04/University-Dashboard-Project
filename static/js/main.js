(function($) {

	"use strict";

	var fullHeight = function() {

		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function(){
			$('.js-fullheight').css('height', $(window).height());
		});

	};
	fullHeight();

	$('#sidebarCollapse').on('click', function () {
      $('#sidebar').toggleClass('active');
  });

})(jQuery);



$(document).ready(function() {
	$('.components a').click(function() {
	  var target = $(this).data('target');
	  $('.content-section').hide();
	  $('#' + target).show();
	});
  });

  $(document).ready(function() {
	// Hide all content sections initially
	$('.content-section').hide();
  
	// Show the "CSAI school" section
	$('#csai-school').show();
  
	// Add the 'active' class to the "CSAI school" button
	$('.components a[data-target="csai-school"]').addClass('active');
  
	// Handle click events on nav links
	$('.components a').click(function(e) {
	  e.preventDefault(); // Prevent the default action
  
	  // Remove the 'active' class from all nav links
	  $('.components a').removeClass('active');
  
	  // Add the 'active' class to the clicked nav link
	  $(this).addClass('active');
  
	  // Hide all content sections
	  $('.content-section').hide();
  
	  // Show the content section that corresponds to the clicked nav link
	  $('#' + $(this).data('target')).show();
	});
  });

  $(document).ready(function() {
	// Hide all content sections initially
	$('.content-section').hide();
  
	// Show the "CSAI school" section
	$('#csai-school').show();
  
	// Handle click events on nav links
	$('.nav-link').click(function(e) {
	  e.preventDefault(); // Prevent the default action
  
	  // Remove the 'active' class from the current active nav item
	  $('.nav-item.active').removeClass('active');
  
	  // Add the 'active' class to the nav item that was clicked
	  $(this).parent('.nav-item').addClass('active');
  
	  // Hide all content sections
	  $('.content-section').hide();
  
	  // Show the content section that corresponds to the clicked nav link
	  $('#' + $(this).data('target')).show();
	});
  });


  