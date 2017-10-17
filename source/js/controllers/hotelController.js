angular.module('amApp')
.controller("HotelController", [ '$scope', '$http', 'HotelService', 'FILTER_ALL_STARS', 'FILTER_STARS', 'FILTER_NAME',
	function($scope, $http, HotelService, FILTER_ALL_STARS, FILTER_STARS, FILTER_NAME){

	var $ctrl = this

	$ctrl.filterHotel = true;
	$ctrl.filterStar = true;
	$ctrl.filterMaster = true;

	$ctrl.filterAllStars = {
		value:true,
		filterType: FILTER_ALL_STARS
	}

	$ctrl.nameFilter = {
		value: '',
		filterType:FILTER_NAME
	}

	$ctrl.filterArrayStars = [
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

	$ctrl.checkboxFilter=[];

	/*	si el tipo de filtro es distinto de allStars		*/
	/*  recorro y armo la query sino			 			*/
	/* 	descheckeo todo los filtros de estrellas			*/

	$scope.setFilters = function(typeFilter){

		if(typeFilter == FILTER_STARS){
			$ctrl.checkboxFilter =[];
			$ctrl.filterAllStars.value = false;
			for(filter in $ctrl.filterArrayStars){
				if($ctrl.filterArrayStars[filter].value == true){
					$ctrl.checkboxFilter.push($ctrl.filterArrayStars[filter].filterValue);
				}
			}
			/* ************************************************************************* */
			/* si quito seleccion de todas las estrellas se selecciona por defecto TODAS */
			/* ************************************************************************* */
			if($ctrl.checkboxFilter.length == 0){
				$ctrl.filterAllStars.value = true;
			}
		} else{
			/* ************************************************************************* */
			/* si selecciono TODAS descheckeo todos los otros filtros estrellas			 */
			/* ************************************************************************* */
			if(typeFilter == FILTER_ALL_STARS){
				$ctrl.checkboxFilter=[]
				for(filter in $ctrl.filterArrayStars){
					$ctrl.filterArrayStars[filter].value = false;
				}
			}
			
		}

		HotelService.hoteles($ctrl.nameFilter.value, $ctrl.checkboxFilter.toString())
	    .then(function (response){
    		$scope.hoteles = response;
	    }, function (error) {
	    	$scope.status = 'Unable to load: ' + error.message;
	    });
	}

    HotelService.hoteles($ctrl.nameFilter.value, $ctrl.checkboxFilter.toString())
    .then(function (response){
    	$scope.hoteles = response;
    }, function (error) {
    	$scope.status = 'Unable to load: ' + error.message;
    });



}]);