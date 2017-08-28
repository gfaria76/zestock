'use strict';

myAngular
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/lotacoes', {
            templateUrl: 'views/permanente/lotacoes.html',
            controller: 'lotacoesCtrl'
        });
    }])
    .controller('lotacoesCtrl', function($scope) {
        $scope.mainGridOptions = {
            dataSource: myapp.ds.locaisLocacao,
            //height: ,
            filterable: true,
            sortable: true,
            pageable: true,
            editable: "inline",
            toolbar: ["create"],
            columns: [
                {field: "unidadeSetorial", title: "Uni. Setorial"},
                {field: "setor", title: "Setor"},
                {field: "sala", title: "Sala"}
            ]
        };
    });