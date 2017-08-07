/* global myAngular, myapp, kendo */

myAngular.controller("userCtrl", function ($scope) {
    $scope.mainGridOptions = {
        dataSource: myapp.ds.usuario,
        //height: ,
        filterable: true,
        sortable: true,
        pageable: true,
        editable: "inline",
        toolbar: ["create"],
        columns: [
            {
                field: "registroFuncional", title: "SIAPE", width: "10%",
                editor: function (container, options) {
                    $('<input required name="' + options.field + '"/>')
                        .appendTo(container)
                        .kendoNumericTextBox({
                            spinners: false
                        });
                }
            },
            {field: "nomeUsuario", title: "Nome", width: "30%"},
            {field: "email", title: "e-mail"},
            {field: "senha", title: "Senha", width: "10%", template: "****"},
            {
                field: "theme",
                title: "CSS",
                editor: myapp.dropDown(myThemes.DropDownList.dataSource, "text", "value").editor,
                width: "10%"
            },
            {command: [myapp.btEdit, myapp.btDestroy], title: "", width: "8em"}
        ]
    };
});

myAngular.controller("homeCtrl", function ($scope) {
    $scope.message = "Hello Word by Zés";
});

myAngular.controller("fabricCtrl", function ($scope) {
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

myAngular.controller("unidadeCtrl", function ($scope) {
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

myAngular.controller("produtoCtrl", function ($scope) {
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

myAngular.controller("entradaestoqueCtrl", function ($scope) {
    var myUnidade = {
        ds: myapp.ds.unidade,
        selected: {idUnidade: null, unidade: null},
        fClear: function () {
            myUnidade.selected = {idUnidade: null, unidade: null};
        }
    };
    $scope.unidade = myUnidade;

    var myProduto = {
        ds: myapp.ds.produto,
        selected: {
            idProdutoConsumo: null, codigoBarra: null,
            descricao: null, especificacao: null,
            idUnidade: null
        },
        fClear: function () {
            myUnidade.fClear();
            myProduto.selected = {
                idProdutoConsumo: null, codigoBarra: null,
                descricao: null, especificacao: null,
                idUnidade: null
            };
        },
        fSelect: function (e) {
            //this é o .kendoComboBox
            if (e.item !== null) {
                myProduto.selected = e.dataItem;
                myUnidade.selected = e.dataItem.idUnidade;
                myConsumo.selected.dtQuandoRecebeu = new Date();
                //if (e.dataItem.nome !== null)
                //    mycontact.setFilter(e.dataItem);
            }
            //console.log(JSON.stringify(e.dataItem));
            //console.log(JSON.stringify(myUnidade.selected));
            //console.log(JSON.stringify(myConsumo.selected));
        },
        fChange: function () {
        }
    };
    $scope.produto = myProduto;

    var myFabrica = {
        ds: myapp.ds.fabricante,
        selected: {idFabricante: null, fabricante: null},
        fClear: function () {
            myFabrica.selected = {idFabricante: null, fabricante: null};
        },
        fSelect: function (e) {
            //this é o .kendoComboBox
            if (e.item !== null) {
                myFabrica.selected = e.dataItem;
            }
        }
    };
    $scope.fabricante = myFabrica;

    var myConsumo = {
            ds: myapp.ds.consumo,
            selected: {
                idConsumo: null, idProduto: null,
                idFabricante: null,
                dtFabricacao: null, dtValidade: null,
                quantidadeEmEstoque: null,
                dtQuandoRecebeu: null,
                idQuemRecebeu: null
            },
            fClear: function () {
                myProduto.fClear();
                myFabrica.fClear();
                myConsumo.selected = {
                    idConsumo: null, idProduto: null,
                    idFabricante: null,
                    dtFabricacao: null,
                    dtValidade: null,
                    quantidadeEmEstoque: null,
                    dtQuandoRecebeu: null, idQuemRecebeu: null
                };
            },
            fSalvar: function () {
                if (myProduto.selected.descricao != null) {
                    myConsumo.selected.idProduto = myProduto.selected;
                }
                if (myFabrica.selected.fabricante != null) {
                    myConsumo.selected.idFabricante = myFabrica.selected;
                }
                console.log(JSON.stringify(myConsumo.selected));
                myapp.ds.consumo.add(myConsumo.selected);
                myapp.ds.consumo.sync();
                //myConsumo.fClear();
            },
        // fRequestEnd: function(e){
        //     var i,newdate;
        //     // console.log(JSON.stringify(e.type));
        //     // console.log(JSON.stringify(e.sender));
        //     // console.log(JSON.stringify(e.response));
        //     if(e.type=='read') {
        //         // for (i = 0; i < e.response.length; i++) {
        //         //     e.response[i].dtQuandoRecebeu = new Date(e.response[i].dtQuandoRecebeu);
        //         // }
        //     }else if(e.type=='create'){
        //         console.log(JSON.stringify("requestEnd: "+ e.response));
        //
        //         // e.response.dtQuandoRecebeu = new Date(e.response.dtQuandoRecebeu);
        //     }
        // },
            onGridRowSelect: function (data, dataItem, columns) {
                myConsumo.selected = dataItem;
                myProduto.selected = dataItem.idProduto;
                myUnidade.selected = myProduto.selected.idUnidade;
                myFabrica.selected = dataItem.idFabricante;
                // console.log(JSON.stringify(dataItem));
            }
    };
    $scope.consumo = myConsumo;
    // myapp.ds.consumo.bind('requestEnd', myConsumo.fRequestEnd);

    //GRID KENDO
    $scope.mainGridOptions = {
        dataSource: myapp.ds.consumo,
        //height: 550,
        selectable: "row",
        //filterable: true,
        //sortable: true,
        pageable: true,
        reorderable: true,
        resizable: true,
        editable: "inline",
        //toolbar: ["create"],
        columns: [
            {field: "idConsumo", title: "ID", width: "5%"},
            {
                field: "idProduto", title: "Produto",
                template: "#=idProduto.descricao#", width: "25%"
            },
            {
                field: "idProduto", title: "Especificação",
                template: "#=idProduto.especificacao#", width: "25%"
            },
            {
                field: "idProduto", title: "Unidade", width: "10%",
                template: "#=idProduto.idUnidade.unidade#"
            },
            {field: "quantidadeEmEstoque", title: "Qtd.", width: "5%"},
            // {field: "idFabricante", title: "Fabricante"},
            // {field: "dtFabricacao", title: "Dt.Fabric.", format: "{0:dd/MMM/yyyy}"},
            {field: "dtValidade", title: "Dt.Validade", width: "10%", format: myapp.dateformat},
            {field: "quantidadeEmEstoque", title: "Qtd.", validation: {min: 0, required: true}},
            {field: "dtQuandoRecebeu", title: "Entrada", width: "15%", format: myapp.datetimeformat},
            {command: [myapp.btDestroy], title: "", width: "8em"}

            //template: "#=idProduto.descricao idProduto.especificacao#"
            //{field: "fabricante", title: "Fabricante", width: "40%"},
        ]
    };
});

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










