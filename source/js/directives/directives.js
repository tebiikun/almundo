'use strict'

angular
  	.module('amApp')
	.directive('rating', function() {
		return {
		  scope: {
		    rate: '='
		  },
		  templateUrl: 'views/directives/star.html',
		  link: function(scope, element, attrs) {
		    scope.range = new Array(scope.rate);
		  }
		};
	})

	.directive('lens', function() {
		return {
		  templateUrl: 'views/directives/lens.html'
		};
	})