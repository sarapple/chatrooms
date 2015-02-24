// put the angular objects moduel in variable
var App = angular.module('App', ['ngRoute']);
App.config(function($routeProvider, $locationProvider){
	$routeProvider
		.when('/',
		{
			templateUrl: '/clientviews/partials/oct.html',
		    // controller: 'appController'
		})
		.when('/oct',
		{
			templateUrl: '/clientviews/partials/oct.html',
		    // controller: 'appController'
		})
		.when('/jan',
		{
			templateUrl: '/clientviews/partials/jan.html',
		    // controller: 'appController'
		})
		.when('/feb',
		{
			templateUrl: '/clientviews/partials/feb.html',
		    // controller: 'appController'
		})
		.otherwise({
			redirectTo: '/'
		});
});
