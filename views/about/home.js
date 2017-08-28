'use strict';

myAngular
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/home', {
            template: '<div class="jumbotron text-center">\n' +
            '        <h1>Home Page</h1>\n' +
            '        <p>{{ message }}</p>\n' +
            '</div>',
            controller: 'homeCtrl',
            requireLogin: false
        });
    }])
    .controller('homeCtrl', function($scope) {
        $scope.message = 'Zéstock - Constole de Estoque do Zé'
    });