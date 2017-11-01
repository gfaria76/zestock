'use strict';

myAngular
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/pedidos', {
            templateUrl: 'views/permanente/pedidos.html',
            controller: 'pedidosCtrl'
        });
    }])
    .controller('pedidosCtrl', function($scope) {
        myapp.ds.emprestimoBemPermanente.filter({});
        $scope.mainGridOptions = {
            dataSource: myapp.ds.emprestimoBemPermanente,
            //height: ,
            filterable: true,
            sortable: true,
            pageable: true,
            editable: "inline",
            columns: [
                {
                    field: "idNumPatrimonio", title: "Bem permanente", width: "30%",
                    template: "#=idNumPatrimonio.descricaoBem#"
                },
                {
                    field: "idSolicitante", title: "Solicitante",
                    template: "#=idSolicitante.nomeUsuario#"
                },
                {field: "dtPrevistaRetirada", title: "Data de retirada"},
                {field: "dtPrevistaDevolucao", title: "Data de devolução"},
                {command: [myapp.btEdit, myapp.btDestroy], title: "", width: "8em"}
            ]
        };
        $scope.detailGridOptions = function (dataItem) {
            var aux = myapp.dsi.fasesEmprestimoBemPermanente;
            aux.filter = {
                field: "idPedidoEmprestimo.idPedidoEmprestimo",
                operator: "eq",
                value: dataItem.idPedidoEmprestimo
            };
            var dsaux = new kendo.data.DataSource(aux);
            return {
                dataSource: dsaux,
                //height: ,
                // filterable: true,
                // sortable: true,
                // pageable: true,
                editable: "inline",
                // toolbar: ["create"],
                columns: [
                    {field: "dtStatus", title: "Data Status"},
                    {
                        field: "idStatus", title: "Status",
                        template: "#=idStatus.descricao#"
                    },
                    {
                        field: "idResponsavel", title: "Responsavel",
                        template: "#=idResponsavel.nomeUsuario#",
                        editable: false
                    }
                ]
            };
        };
    });