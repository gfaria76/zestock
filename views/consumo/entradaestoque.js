'use strict';

myAngular
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/entradaestoque', {
            templateUrl: 'views/consumo/entradaestoque.html',
            controller: 'entradaestoqueCtrl'
        });
    }])
    .controller('entradaestoqueCtrl', function($scope) {

        var myUnidade = {
            ds: myapp.ds.unidade,
            selected: {idUnidade: null, unidade: null},
            fClear: function () {
                myUnidade.selected = {idUnidade: null, unidade: null};
            }
        };
        $scope.unidade = myUnidade;

        var myProduto = {
            codBarrasOptions: {
                dataSource: "produto.ds",
                dataTextField: "codigoBarra",
                dataValueField: "codigoBarra",
                select: "produto.fSelect",
                filter: "contains",
                noDataTemplate: $("#noDataTemplate").html()
            },
            descricaoOptions: {
                dataTextField:"descricao",
                dataValueField:"idProdutoConsumo",
                dataSource: "produto.ds",
                autoBind:true,
                autoWidth:true,
                filter:"contains",
                select:"produto.fSelect",
                change:"produto.fChange",
                template:'#: data.descricao# / #: data.especificacao#'
            },
            popupEditor: {
                title:"Novo item",
                width:1000, height:450,
                modal:true,
                visible:true
                // content:{url:"/views/consumo/produtoform.html"}
            },
            ds: myapp.ds.produto,
            selected: {
                idProdutoConsumo: null, codigoBarra: null,
                descricao: null, especificacao: null,
                idUnidade: null
            },
            noItem:true,
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
                    myProduto.noItem=false;
                    //if (e.dataItem.nome !== null)
                    //    mycontact.setFilter(e.dataItem);
                }
                //console.log(JSON.stringify(e.dataItem));
                //console.log(JSON.stringify(myUnidade.selected));
                //console.log(JSON.stringify(myConsumo.selected));
            },
            fChange: function () {
            },
            fAddProduto: function (widgetId, value) {
                console.log(JSON.stringify(myProduto.selected))
                // $scope.dialog.open()
            },
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