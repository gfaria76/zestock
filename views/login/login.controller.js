'use strict';

myAngular
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'views/login/login.view.html',
            controller: 'loginCtrl'
        });
    }])
    .controller('loginCtrl', function ($scope, $location, AuthenticationService) {
        var vm = $scope;
        AuthenticationService.Logout();
        vm.login = function () {
            vm.loading = true;
            AuthenticationService.Login(vm.username, vm.password, function (result) {
                if (result === true) {
                    $location.path('/');
                } else {
                    vm.error = 'Username or password is incorrect';
                    vm.loading = false;
                }
            })
        }
    });