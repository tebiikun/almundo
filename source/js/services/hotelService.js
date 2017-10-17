angular.module('amApp')
  .factory('HotelService', ['$http', 'API_END_POINT', function($http, API_END_POINT) {

    return {
      hoteles: function(name, stars) {
        var queryFilter = 'name='+ name + '&stars=' + stars;
        return $http.get( API_END_POINT + 'hoteles/?'+queryFilter).then(function(resp) {
          return resp.data
        }, function(error) {
          return error.data
        })
      }
    }

  }])
