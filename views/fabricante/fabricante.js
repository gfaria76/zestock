'use strict';

myAngular
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/fabricante', {
            templateUrl: 'views/fabricante/fabricante.html',
            controller: 'fabricanteCtrl'
        });
    }])
    .controller('fabricanteCtrl', function($scope) {
        $scope.mainGridOptions = {
            dataSource: myapp.ds.fabricante,
            //height: 550,
            filterable: true,
            sortable: true,
            pageable: true,
            editable: "inline",
            toolbar: ["create"],
            columns: [
                {field: "idFabricante", title: "ID", width: "10%"},
                {field: "fabricante", title: "Fabricante", width: "40%"},
                {command: [myapp.btEdit, myapp.btDestroy], title: "", width: "8em"}
            ]
        };
    });