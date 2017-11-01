'use strict';

myAngular
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/saidaestoque', {
            templateUrl: 'views/consumo/saidaestoque.html',
            controller: 'saidaestoqueCtrl'
        });
    }])
    .controller('saidaestoqueCtrl', function ($scope) {
        myapp.ds.consumo.filter({field: "quantidadeEmEstoque", operator: "gt", value: 0});
        myapp.ds.consumo.sort({field: "dtValidade", dir: "asc"});
        myapp.ds.historicoConsumo.fetch();
        var saidaEstoque = {
            selected: {
                idConsumo: null, dtFabricacao: null, dtValidade: null, quantidadeEmEstoque: null,
                dtQuandoRecebeu: null, idFabricante: null,
                idProduto: {
                    idProdutoConsumo: null, codigoBarra: null, descricao: null, especificacao: null,
                    idUnidade: {idUnidade: null, unidade: null}
                },
                idQuemRecebeu: null
            },
            historico: {
                idHistoricoConsumo: null,
                idMaterialRetirado: {},
                quantidadeRetirada: 0,
                motivoRetirada: "",
                idQuemRetirou: {},
                dtRetirada: null
            },
            mainGridOptions: {
                dataSource: myapp.ds.consumo,
                //height: 550,
                selectable: "row",
                // filterable: true,
                sortable: true,
                pageable: true,
                reorderable: true,
                resizable: true,
                editable: "inline",
                //toolbar: ["create"],
                columns: [
                    {field: "idConsumo", title: "ID", width: "5%", editable: false},
                    {
                        field: "idProduto", title: "Produto", editable: false,
                        template: "#=idProduto.descricao#", width: "25%"
                    },
                    {
                        field: "idProduto", title: "Especificação", editable: false,
                        template: "#=idProduto.especificacao#", width: "25%"
                    },
                    {
                        field: "idProduto", title: "Unidade", width: "8%", editable: false,
                        template: "#=idProduto.idUnidade.unidade#"
                    },
                    {
                        field: "idProduto", title: "Fabricante", editable: false,
                        template: "#=(idFabricante==null?null:idFabricante.fabricante)#", width: "15%"
                    },
                    // {field: "idFabricante", title: "Fabricante"},
                    // {field: "dtFabricacao", title: "Dt.Fabric.", format: "{0:dd/MMM/yyyy}"},
                    {
                        field: "dtValidade", title: "Dt.Validade", width: "10%", editable: false,
                        format: myapp.dateformat
                    },
                    {field: "quantidadeEmEstoque", title: "Qtd.", validation: {min: 0, required: true}},
                    {command: [myapp.btEdit], title: "", width: "5em"}


                    //template: "#=idProduto.descricao idProduto.especificacao#"
                    //{field: "fabricante", title: "Fabricante", width: "40%"},
                ],
                change: function (e) {
                    console.log(JSON.stringify("change " + e.action));
                    var selectedRows = this.select();
                    var selectedDataItems = [];
                    for (var i = 0; i < selectedRows.length; i++) {
                        var dataItem = this.dataItem(selectedRows[i]);
                        selectedDataItems.push(dataItem);
                    }
                    for (var item in saidaEstoque.selected)
                        saidaEstoque.selected[item] = selectedDataItems[0][item];
                    this.refresh()
                    // $scope.historico.idMaterialRetirado=selectedDataItems[0].idProduto;
                }
            },
            filters: {
                codDesc: "",
                fAll: function () {
                    myapp.ds.consumo.filter({field: "quantidadeEmEstoque", operator: "gt", value: -1});
                },
                fStock: function () {
                    myapp.ds.consumo.filter({field: "quantidadeEmEstoque", operator: "gt", value: 0});
                },
                fSearch: function () {
                    myapp.ds.consumo.filter({
                        logic: "or",
                        filters: [
                            // {field:"idProduto.codigoBarra", operator:"contains", value: this.codDesc},
                            {field: "idProduto.descricao", operator: "contains", value: this.codDesc},
                            {field: "idProduto.especificacao", operator: "contains", value: this.codDesc}
                        ]
                    });
                    console.log(JSON.stringify(myapp.ds.consumo.filter()));
                }
            },
            fRetirar: function () {
                this.historico.idHistoricoConsumo = null;
                this.historico.quantidadeRetirada *= -1;
                this.historico.idMaterialRetirado = this.selected;
                this.historico.idQuemRetirou = myapp.user;
                this.historico.dtRetirada = new Date();
                console.log(JSON.stringify(this.historico));
                myapp.ds.historicoConsumo.add(this.historico);
                myapp.ds.historicoConsumo.sync();

                // this.selected.quantidadeEmEstoque -= this.historico.quantidadeRetirada;
                // myapp.ds.consumo.set(this.selected);
                var dataItem = myapp.ds.consumo.get(this.selected.idConsumo);
                var qtd = dataItem.quantidadeEmEstoque + this.historico.quantidadeRetirada;
                dataItem.set("quantidadeEmEstoque", qtd);
                console.log(myapp.ds.consumo.hasChanges());
                myapp.ds.consumo.sync();
            }
        };
        $scope.saidaEstoque = saidaEstoque;
    });
