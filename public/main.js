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

    HotelService.all()
    .then(function (response){
    	$scope.hoteles = response;
    }, function (error) {
    	$scope.status = 'Unable to load: ' + error.message;
    });

}]);
angular.module('amApp')
  .factory('HotelService', ['$http', 'API_END_POINT', function($http, API_END_POINT) {

    return {
      all: function() {
        return $http.get( API_END_POINT + 'hoteles/all').then(function(resp) {
          return resp.data
        }, function(error) {
          return error.data
        })
      }
    }

  }])
