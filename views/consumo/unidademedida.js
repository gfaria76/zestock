'use strict';

myAngular
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/unidademedida', {
            templateUrl: 'views/consumo/unidademedida.html',
            controller: 'unidadeMedidaCtrl'
        });
    }])
    .controller('unidadeMedidaCtrl', function($scope) {
        $scope.mainGridOptions = {
            dataSource: myapp.ds.unidade,
            //height: 550,
            filterable: true,
            sortable: true,
            pageable: true,
            editable: "inline",
            toolbar: ["create"],
            columns: [
                {field: "idUnidade", title: "ID", width: "10%"},
                {field: "unidade", width: "40%"},
                {command: [myapp.btEdit, myapp.btDestroy], title: "", width: "8em"}
            ]
        };
    });