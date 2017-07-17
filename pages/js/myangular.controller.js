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
            {field: "theme", title: "CSS", editor: myapp.dropdown.theme, width: "10%"},
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
            idUnidade: myUnidade.selected
        },
        fClear: function () {
            myUnidade.fClear();
            myProduto.selected = {
                idProdutoConsumo: null, codigoBarra: null,
                descricao: null, especificacao: null,
                idUnidade: myUnidade.selected
            };
        },
        fSelect: function (e) {
            //this é o .kendoComboBox
            if (e.item !== null) {
                myProduto.selected = e.dataItem;
                myUnidade.selected = e.dataItem.idUnidade;
                myConsumo.selected.idProduto = e.dataItem;
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
            //copiar um a um, devido a referencia com myConsumo
            if (e.item !== null) {
                myFabrica.selected.idFabricante = e.dataItem.idFabricante;
                myFabrica.selected.fabricante = e.dataItem.fabricante;
            }
        }
    };
    $scope.fabricante = myFabrica;

    var myConsumo = {
            ds: myapp.ds.consumo,
            selected: {
                idConsumo: null, idProduto: myProduto.selected,
                idFabricante: myFabrica.selected,
                dtFabricacao: null, dtValidade: null,
                quantidadeEmEstoque: null,
                dtQuandoRecebeu: null,
                idQuemRecebeu: null
            },
            fClear: function () {
                myProduto.fClear();
                myFabrica.fClear();
                myConsumo.selected = {
                    idConsumo: null, idProduto: myProduto.selected,
                    idFabricante: myFabrica.selected,
                    dtFabricacao: null, dtValidade: null,
                    quantidadeEmEstoque: null,
                    dtQuandoRecebeu: null, idQuemRecebeu: null
                };
            },
            fSalvar: function () {
                console.log(JSON.stringify(myConsumo.selected));
                myapp.ds.consumo.add(myConsumo.selected);
                myapp.ds.consumo.sync();
                myConsumo.fClear();
            },
            fRequestEnd: function (e) {
                if (e.type=='create') {
                    console.log(JSON.stringify(e.response));
                    myConsumo.selected.idConsumo = e.response.idConsumo;
                    console.log(JSON.stringify(e.response));
                }
            },
            onGridRowSelect: function (data, dataItem, columns) {
                // myConsumo.selected = dataItem;
                // myProduto.selected = dataItem.idProduto;
                // myUnidade.selected = myProduto.selected.idUnidade;
                // myFabrica.selected = dataItem.idFabricante;
                // console.log(JSON.stringify(dataItem));
            }
        }
    ;
    $scope.consumo = myConsumo;
    myapp.ds.consumo.bind('requestEnd',myConsumo.fRequestEnd);

    //GRID KENDO
    $scope.mainGridOptions = {
        dataSource: myapp.ds.consumo,
        //height: 550,
        selectable: "row",
        filterable: true,
        sortable: true,
        pageable: true,
        reorderable: true,
        resizable: true,
        //editable: "inline",
        //toolbar: ["create"],
        columns: [
            {
                field: "idConsumo", title: "ID", width: "10%"
            },
            {
                field: "idProduto", title: "Produto",
                template: "#=idProduto.descricao#", width: "30%"
            },
            {
                field: "idProduto", title: "Especificação",
                template: "#=idProduto.especificacao#", width: "30%"
            },
            {
                field: "idProduto", title: "Unidade",
                template: "#=idProduto.idUnidade.unidade#"
            },
            // {field: "idFabricante", title: "Fabricante"},
            // {field: "dtFabricacao", title: "Dt.Fabric.", format: "{0:dd/MMM/yyyy}"},
            {field: "dtValidade", title: "Dt.Validade", format: "{0:dd/MMM/yyyy}"},
            {field: "quantidadeEmEstoque", title: "Qtd.", validation: {min: 0, required: true}}

            //template: "#=idProduto.descricao idProduto.especificacao#"
            //{field: "fabricante", title: "Fabricante", width: "40%"},
            //{command: [myapp.btEdit, myapp.btDestroy], title: "", width: "8em"}
        ]
    };
});
