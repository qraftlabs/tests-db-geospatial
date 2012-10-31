define(["jquery",
		"/js/router.js",
		"/js/dashboard.js",
		"/js/routes/layers.js",
		"/js/lib/jquery.validate.js",
		"/js/lib/jquery.uniform.js",
		"/packages/chosen/chosen/chosen.jquery.js",
		"/packages/bootstrap/js/bootstrap-tooltip.js",
		"/packages/bootstrap/js/bootstrap-alert.js",
		"/packages/bootstrap/js/bootstrap-button.js",
		"/packages/bootstrap/js/bootstrap-carousel.js",
		"/packages/bootstrap/js/bootstrap-collapse.js",
		"/packages/bootstrap/js/bootstrap-dropdown.js",
		"/packages/bootstrap/js/bootstrap-modal.js",
		"/packages/bootstrap/js/bootstrap-popover.js",
		"/packages/bootstrap/js/bootstrap-scrollspy.js",
		"/packages/bootstrap/js/bootstrap-tab.js",
		"/packages/bootstrap/js/bootstrap-transition.js",
		"/packages/bootstrap/js/bootstrap-typeahead.js"], function($, router, dashboard, layers) {
  
	router.init([dashboard, layers]);
	$('select').chosen();

});