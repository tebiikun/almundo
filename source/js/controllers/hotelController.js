angular.module('amApp')
.controller("HotelController", [ '$scope', '$http', 'HotelService', 'FILTER_ALL_STARS', 'FILTER_STARS', 'FILTER_NAME', 
	function($scope, $http, HotelService, FILTER_ALL_STARS, FILTER_STARS, FILTER_NAME){

	$scope.filterHotel = true;
	$scope.filterStar = true;
	$scope.filterMaster = true;


	$scope.filterAllStars = {
		value:true,
		filterType: FILTER_ALL_STARS
	}

	$scope.nameFilter = {
		value: '',
		filterType:FILTER_NAME
	}

	$scope.filterArrayStars = [
		{
			filterValue:5,
			value:false,
			filterType:FILTER_STARS
		},
		{
			filterValue:4,
			value:false,
			filterType:FILTER_STARS
		},
		{
			filterValue:3,
			value:false,
			filterType:FILTER_STARS
		},
		{
			filterValue:2,
			value:false,
			filterType:FILTER_STARS
		},
		{
			filterValue:1,
			value:false,
			filterType:FILTER_STARS
		}

	];

	$scope.checkboxFilter=[];

	/*	si el tipo de filtro es distinto de allStars		*/
	/*  recorro y armo la query sino			 			*/
	/* 	descheckeo todo los filtros de estrellas			*/

	$scope.setFilters = function(typeFilter){
		var queryFilter = '';
		

		if(typeFilter == FILTER_STARS){
			$scope.checkboxFilter =[];
			$scope.filterAllStars.value = false;
			for(filter in $scope.filterArrayStars){
				if($scope.filterArrayStars[filter].value == true){
					
					$scope.checkboxFilter.push($scope.filterArrayStars[filter].filterValue);
				}
			}
		} else{
			if(typeFilter == FILTER_ALL_STARS){
				$scope.checkboxFilter=[]
				for(filter in $scope.filterArrayStars){
					$scope.filterArrayStars[filter].value = false;
				}
			}
			
		}

		HotelService.hoteles($scope.nameFilter.value, $scope.checkboxFilter.toString())
	    .then(function (response){
    		$scope.hoteles = response;
	    }, function (error) {
	    	$scope.status = 'Unable to load: ' + error.message;
	    });
	}

    HotelService.hoteles($scope.nameFilter.value, $scope.checkboxFilter.toString())
    .then(function (response){
    	$scope.hoteles = response;
    }, function (error) {
    	$scope.status = 'Unable to load: ' + error.message;
    });



}]);