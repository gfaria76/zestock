'use strict';

myAngular
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'views/login/login.html',
            controller: 'loginCtrl'
        });
    }])
    .service('SessionService', function() { })
    .controller('loginCtrl', function($scope) { })