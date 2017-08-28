'use strict';

myAngular
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/emprestimo', {
            templateUrl: 'views/permanente/emprestimo.html',
            controller: 'emprestimoCtrl'
        });
    }])
    .controller('emprestimoCtrl', function($scope) {
        var myBemPermanente = {
            ds: myapp.ds.bemPermanente,
            selected: {
                idBemPermanente: null, descricaoBem: null,
                dtEntrada: null, salaAlocacao: null,
                observacao: null, numPatrimonio: null,
                idEstadoConservacao: null,
                idCoResponsavel: null
            },
            fClear: function () {
                myLocaisLocacao.fClear();
                myEstadoBemPermanente.fClear()
                myBemPermanente.selected = {
                    idBemPermanente: null, descricaoBem: null,
                    dtEntrada: null, salaAlocacao: null,
                    observacao: null, numPatrimonio: null,
                    idEstadoConservacao: null,
                    idCoResponsavel: null
                };
            },
            fSelect: function (e) {
                //this é o .kendoComboBox
                if (e.item !== null) {
                    myBemPermanente.selected = e.dataItem;
                }
            }
        };
        $scope.bemPermanente = myBemPermanente;

        var myEstadoBemPermanente = {
            ds: myapp.ds.estadoBemPermanente,
            selected: {
                idEstadoBemPermanente: null,
                descricaoEstadoFisico: null
            },
            fClear: function () {
                myEstadoBemPermanente.selected = {
                    idEstadoBemPermanente: null,
                    descricaoEstadoFisico: null
                };
            }
        };
        $scope.estadoBemPermanente = myEstadoBemPermanente;

        var myLocaisLocacao = {
            ds: myapp.ds.locaisLocacao,
            selected: {
                idLocaLotacao: null,
                unidadeSetorial: null,
                setor: null,
                sala: null
            },
            fClear: function () {
                myLocaisLocacao.selected = {
                    idLocaLotacao: null,
                    unidadeSetorial: null,
                    setor: null,
                    sala: null
                };
            }
        };
        $scope.locaisLocacao = myLocaisLocacao;

        var myEmprestimoBemPermanente = {
            ds: myapp.ds.emprestimoBemPermanente,
            selected: {
                idPedidoEmprestimo: null,
                justificativa: null,
                dtPrevistaRetirada: null,
                dtPrevistaDevolucao: null,
                idSolicitante: null,
                idNumPatrimonio: null
            },
            fClear: function () {
                myBemPermanente.fClear();
                myEmprestimoBemPermanente.selected = {
                    idPedidoEmprestimo: null,
                    justificativa: null,
                    dtPrevistaRetirada: null,
                    dtPrevistaDevolucao: null,
                    idSolicitante: null,
                    idNumPatrimonio: null
                };
            },
            fSalvar: function () {
                if (myBemPermanente.selected.descricaoBem != null) {
                    myEmprestimoBemPermanente.selected.idNumPatrimonio = myBemPermanente.selected;
                }
                console.log(JSON.stringify(myEmprestimoBemPermanente.selected));
                myapp.ds.emprestimoBemPermanente.add(myEmprestimoBemPermanente.selected);
                myapp.ds.emprestimoBemPermanente.sync();
                //myConsumo.fClear();
            }
        };
        $scope.emprestimoBemPermanente = myEmprestimoBemPermanente;

        //GRID KENDO
        // $scope.mainGridOptions = {
        //     dataSource: myapp.ds.emprestimoBemPermanente,
        //     //height: 550,
        //     //selectable: "row",
        //     //filterable: true,
        //     //sortable: true,
        //     pageable: true,
        //     reorderable: true,
        //     resizable: true,
        //     editable: "inline",
        //     toolbar: ["create"],
        //     columns: [
        //         {
        //             field: "idPedidoEmprestimo", title: "ID", width: "10%"},
        //
        //         {   field: "idNumPatrimonio", title: "Bem Permanente",
        //             template: "#=idNumPatrimonio.idNumPatrimonio.descricaoBem#", width: "30%"},
        //
        //         {   field: "idSolicitante", title: "Solicitante",
        //             template: "#=idSolicitante.idUsuario.nomeUsuario#", width: "30%"},
        //
        //         {field: "justificativa", title: "Justificativa", width: "30%"},
        //
        //         {field: "dtPrevistaRetirada", title: "Dt.Prev.Ret.", format: "{0:dd/MMM/yyyy}"},
        //
        //         {field: "dtPrevistaDevolucao", title: "Dt.Prev.Dev", format: "{0:dd/MMM/yyyy}"},
        //
        //         {command: [myapp.btEdit, myapp.btDestroy], title: "", width: "8em"}
        //     ]
        // };
    });