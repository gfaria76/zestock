'use strict';

myAngular
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/historicobens', {
            templateUrl: 'views/permanente/historicobens.html',
            controller: 'historicoBensCtrl'
        })
    }])
    .controller('historicoBensCtrl', function ($scope) {
        $scope.mainGridOptions = {
            dataSource: myapp.ds.fasesEmprestimoBemPermanente,
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
                {field: "idFasesEmprestimo", title: "ID", width: "5%"},
                {
                    field: "idPedidoEmprestimo", title: "Num. Património",
                    template: "#=idPedidoEmprestimo.idNumPatrimonio.numPatrimonio#", width: "10%"
                },
                {
                    field: "idPedidoEmprestimo", title: "material",
                    template: "#=idPedidoEmprestimo.idNumPatrimonio.descricaoBem#", width: "35%"
                },
                {
                    field: "dtStatus", title: "Data", width: "25%"
                },
                {
                    field: "idStatus", title: "Status",
                    template: "#=idStatus.descricao#", width: "10%"
                },
                {
                    field: "idResponsavel", title: "Responsavel",
                    template: "#=idResponsavel.nomeUsuario#", width: "10%"
                }
            ]
        };
    });