'use strict';

myAngular
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/produto', {
            templateUrl: 'views/consumo/produto.html',
            controller: 'produtoCtrl'
        });
    }])
    .controller('produtoCtrl', function($scope) {
        $scope.mainGridOptions = {
            dataSource: myapp.ds.produto,
            //height: 550,
            filterable: true,
            sortable: true,
            pageable: true,
            editable: true, //incell edition
            toolbar: ["create", "save", "cancel"],
            columns: [
                {field: "codigoBarra", title: "Cód.Barras", width: "10%"},
                {field: "descricao", title: "Descrição"},
                {field: "especificacao", title: "Especificação", width: "25%"},
                {
                    field: "idUnidade", title: "Unidade", width: "10%",
                    editor: myapp.dropdown.unidade,
                    template: "#=(idUnidade===null?null:idUnidade.unidade)#"
                },
                {command: [myapp.btDestroy], title: "", width: "5em"}
            ]
        };
    });