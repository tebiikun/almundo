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