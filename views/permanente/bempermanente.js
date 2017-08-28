'use strict';

myAngular
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/bempermanente', {
            templateUrl: 'views/permanente/bempermanente.html',
            controller: 'bemPermanenteCtrl'
        });
    }])
    .controller('bemPermanenteCtrl', function($scope) {
        $scope.mainGridOptions = {
            dataSource: myapp.ds.bemPermanente,
            //height: ,
            filterable: true,
            sortable: true,
            pageable: true,
            editable: "inline",
            toolbar: ["create"],
            columns: [
                {
                    field: "numPatrimonio", title: "Num. Patrimônio", width: "10%"
                },
                {field: "descricaoBem", title: "Nome Patrimonio", width: "30%"},
                {field: "dtEntrada", title: "Data Entrada"},
                {
                    field: "salaAlocacao", title: "Sala",
                    template: "#=(salaAlocacao===null?null:salaAlocacao.setor)#"
                },
                {field: "observacao", title: "observacao"},
                {
                    field: "idEstadoConservacao", title: "Est.Cons.",
                    template: "#=(idEstadoConservacao===null?null:idEstadoConservacao.descricaoEstadoFisico)#"
                },
                {
                    field: "idCoResponsavel", title: "Co-Responsavel",
                    template: "#=(idCoResponsavel===null?null:idCoResponsavel.nomeUsuario)#"
                },
                {command: [myapp.btEdit, myapp.btDestroy], title: "", width: "8em"}
            ]
        };
    });