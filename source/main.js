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