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
