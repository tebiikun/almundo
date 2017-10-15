angular.module('amApp')
.controller("HotelController", [ '$scope', '$http', 'HotelService', 
	function($scope, $http, HotelService){

	$scope.filterHotel = true;
	$scope.filterStar = true;
	$scope.filterMaster = true;


	$scope.filterAllStars = true;
	$scope.nameFilter = '';
	$scope.filterArrayStars = [
		{
			filterValue:5,
			value:false
		},
		{
			filterValue:4,
			value:false
		},
		{
			filterValue:3,
			value:false
		},
		{
			filterValue:2,
			value:false
		},
		{
			filterValue:1,
			value:false
		}

	];

	/*	si el tipo de filtro es distinto de all				*/
	/*  recorro y armo la query sino			 			*/
	/* 	descheckeo todo los filtros de estrellas			*/
	$scope.setFilters = function(typeFilter){
		var queryFilter = '';
		var checkboxFilter = [];

		if(typeFilter == 'stars'){
			$scope.filterAllStars = false;
			for(filter in $scope.filterArrayStars){
				if($scope.filterArrayStars[filter].value == true){

					checkboxFilter.push($scope.filterArrayStars[filter].filterValue);
				}
			}
		} else{
			if(typeFilter == 'all'){
				for(filter in $scope.filterArrayStars){
					$scope.filterArrayStars[filter].value = false;
				}
			}
			
		}

		queryFilter = 'name='+ $scope.nameFilter + '&stars=' + checkboxFilter.toString();

		HotelService.all(queryFilter)
	    .then(function (response){
    		$scope.hoteles = response;
	    }, function (error) {
	    	$scope.status = 'Unable to load: ' + error.message;
	    });
	}

    HotelService.all()
    .then(function (response){
    	$scope.hoteles = response;
    }, function (error) {
    	$scope.status = 'Unable to load: ' + error.message;
    });



}])

.directive('starDirective', [function() {
	return {
	  templateUrl: 'views/directives/star.html'
	};
}])

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
});