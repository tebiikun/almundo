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
  // .constant('API_END_POINT', 'http://localhost:8080/trader/')
  .constant('API_END_POINT', 'http://localhost:3000/api/')

angular.module('amApp')
.controller("HotelController", [ '$scope', '$http', 'HotelService', 
	function($scope, $http, HotelService){

	$scope.filterHotel = true;
	$scope.filterStar = true;
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
			for(filter in $scope.filterArrayStars){
				console.log($scope.filterArrayStars[filter].filterValue);
				$scope.filterArrayStars[filter].value = false;
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
});
angular.module('amApp')
  .factory('HotelService', ['$http', 'API_END_POINT', function($http, API_END_POINT) {

    return {
      all: function(query) {
        console.log(query);
        return $http.get( API_END_POINT + 'hoteles/?'+query).then(function(resp) {
          return resp.data
        }, function(error) {
          return error.data
        })
      }
    }

  }])
