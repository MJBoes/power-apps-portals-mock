// Jquery with no conflict
jQuery(document).ready(function($) {
	//social
	$('header .social a.social-toggle').click(function() {
		if ($('header .social').hasClass('down')) $('header .social').removeClass('down');
		else $('header .social').addClass('down');
	});
});