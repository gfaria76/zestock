'use strict';

myAngular
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'views/login/login.html',
            controller: 'loginCtrl'
        });
    }])
    .service('SessionService', function() { })
    .controller('loginCtrl', function($scope) {

        $scope.login = function () {
            $scope.dataLoading = true;
            AuthenticationService.Login($scope.username, $scope.password, function (response) {
                if (response.success) {
                    AuthenticationService.SetCredentials($scope.username, $scope.password);
                    $location.path('/');
                } else {
                    $scope.error = response.message;
                    $scope.dataLoading = false;
                }
            });
        }

    })