'use strict';

myAngular
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/home', {
            templateUrl: 'views/about/home.html',
            controller: 'homeCtrl',
        });
    }])
    .controller('homeCtrl', function ($scope) {
        $scope.message = 'Zéstock - Constole de Estoque do Zé'
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://estagio.ufms.br/wp-login.php",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded",
                "cache-control": "no-cache",
                "postman-token": "6bd3c31e-3d8a-2269-f98a-653de3debac4"
            },
            "data": {
                "log": "gedson.faria",
                "pwd": "qazmko22."
            }
        }

        $.ajax(settings).done(function (response) {
            console.log(response);
        });
    });