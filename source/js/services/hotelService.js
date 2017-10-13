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
