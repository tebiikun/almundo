var amApp = angular.module("amApp", ['ui.router', 'ng', 'amApp.constants'])
.config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider){

		$stateProvider
        .state('home', {
          url: '/',
          templateUrl: 'views/home.html',
          controller: 'HotelController'
        })

        $urlRouterProvider.otherwise('/')
	}
]);
angular.module('amApp.constants', [])
  	.constant('API_END_POINT', 'http://localhost:3000/api/')
	.constant('FILTER_ALL_STARS', 'allStars')
	.constant('FILTER_STARS', 'stars')
  	.constant('FILTER_NAME', 'name')

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
'use strict'

angular
  	.module('amApp')
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
	})
angular.module('amApp')
  .factory('HotelService', ['$http', 'API_END_POINT', function($http, API_END_POINT) {

    return {
      hoteles: function(name, stars) {
        let queryFilter = 'name='+ name + '&stars=' + stars;
        return $http.get( API_END_POINT + 'hoteles/?'+queryFilter).then(function(resp) {
          return resp.data
        }, function(error) {
          return error.data
        })
      }
    }

  }])
