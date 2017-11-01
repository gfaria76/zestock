'use strict';

myAngular
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/historico', {
            templateUrl: 'views/consumo/historicoConsumo.html',
            controller: 'historicoConsumoCtrl'
        });
    }])
    .controller('historicoConsumoCtrl', function ($scope) {
        var historicoConsumo = {
            selected: {
                idHistoricoConsumo: null, idMaterialRetirado: null, quantidadeRetirada: null,
                motivoRetirada: null, idQuemRetirou: null, dtRetirada: null
            },
            mainGridOptions: {
                dataSource: myapp.ds.historicoConsumo,
                //height: 550,
                selectable: "row",
                filterable: false,
                sortable: true,
                pageable: true,
                reorderable: true,
                resizable: true,
                editable: "inline",
                //toolbar: ["create"],
                columns: [
                    {field: "idHistoricoConsumo", title: "ID", width: "5%"},
                    {
                        field: "idMaterialRetirado", title: "Produto",
                        template: "#=idMaterialRetirado.idProduto.descricao#", width: "25%"
                    },
                    {
                        field: "idMaterialRetirado", title: "Especificação",
                        template: "#=idMaterialRetirado.idProduto.especificacao#", width: "25%"
                    },
                    {
                        field: "quantidadeRetirada", title: "Qtd.", validation: {
                        min: 0, required: true
                    }
                    },
                    {
                        field: "motivoRetirada", title: "Justificativa", width: "10%"
                    },
                    {
                        field: "idQuemRetirou", title: "Usuario",
                        template: "#=idQuemRetirou.nomeUsuario#", width: "15%"
                    },
                    {field: "dtRetirada", title: "Dt.Alteração", width: "10%", format: myapp.dateformat}]
            }
        };
        $scope.historicoConsumo = historicoConsumo;
    });