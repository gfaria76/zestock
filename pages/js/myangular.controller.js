/* global myAngular, myapp, kendo */



myAngular.controller("emprestimoCtrl", function ($scope) {
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

myAngular.controller("bemPermanenteCtrl", function ($scope) {
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

myAngular.controller("pedidosCtrl", function ($scope) {
    $scope.mainGridOptions = {
        dataSource: myapp.ds.emprestimoBemPermanente,
        //height: ,
        filterable: true,
        sortable: true,
        pageable: true,
        editable: "inline",
        toolbar: ["create"],
        columns: [
            {
                field: "idNumPatrimonio", title: "Bem permanente", width: "30%",
                template: "#=idNumPatrimonio.descricaoBem#"
            },
            {field: "idSolicitante", title: "Solicitante"},
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
            // editable: "inline",
            // toolbar: ["create"],
            columns: [
                {field: "dtStatus", title: "Data Status"},
                {
                    field: "idStatus", title: "Status",
                    template: "#=idStatus.descricao#"
                },
                {
                    field: "idResponsavel", title: "Responsavel",
                    template: "#=idResponsavel.nomeUsuario#"
                }
            ]
        };
    };
});

myAngular.controller("lotacoesCtrl", function ($scope) {
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










