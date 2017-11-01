'use strict';

myAngular
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/controleestoque', {
            templateUrl: 'views/consumo/controleestoque.html',
            controller: 'controleestoqueCtrl'
        });
    }])
    .controller('controleestoqueCtrl', function ($scope, produtoService) {
        var ctrl = {
            obs: null, //obs para historico consumo
            qtdConsumida: 0, //quantide para retirar do estoque
            produto: {}, //selecao de produto
            consumo: {}, //selecao do consumo (alterar, gravar)
            nomebusca: null,
            // fClear: function () { //nao usado
            //     // ctrl.unidade = new myapp.model.unidade
            //     //ctrl.fabricante = new myapp.model.fabricante
            //     ctrl.produto = new myapp.model.produto
            //     ctrl.consumo = new myapp.model.consumo
            // },
            //quando digita no campo busca, filtra o grid de consumo
            fChange: function () {
                //modificar os filtros do grid
                if (ctrl.nomebusca.length >= 0)
                    myapp.ds.consumo.filter({
                        logic: "or", filters: [
                            {field: "prodCBar", operator: "contains", value: ctrl.nomebusca},
                            {field: "prodDesc", operator: "contains", value: ctrl.nomebusca},
                            {field: "prodEspe", operator: "contains", value: ctrl.nomebusca}]
                    });
            },
            //chamada antes de abrir a janela de nova entrada em estoque
            fNovaEntrada: function () {
                ctrl.consumo = new myapp.model.consumo
                ctrl.consumo.idProduto = ctrl.produto
                ctrl.obs = null
            },
            //salva dados da janela Entrada
            fSaveConsumo: function () {
                //ajustar tabela grid
                ctrl.consumo.set('prodCBar', ctrl.consumo.idProduto.codigoBarra)
                ctrl.consumo.set('prodDesc', ctrl.consumo.idProduto.descricao)
                ctrl.consumo.set('prodEspe', ctrl.consumo.idProduto.especificacao)
                ctrl.consumo.set('prodUnid', ctrl.consumo.idProduto.idUnidade.unidade)
                //consumo
                //nao serve para alterar pois edicao nao torna objeto dirty
                myapp.ds.consumo.add(ctrl.consumo)
                myapp.ds.consumo.sync()
                //historico-consumo
                var historico = new myapp.model.historicoConsumo
                historico.set('idMaterialRetirado', ctrl.produto)
                historico.set('quantidadeRetirada', ctrl.consumo.quantidadeEmEstoque)
                historico.set('motivoRetirada', ctrl.obs)
                historico.set('idQuemRetirou', myapp.user)
                historico.set('dtRetirada', new Date())
                myapp.ds.historicoConsumo.add(historico)
            },
            //altera a quantidade consumida
            fUpdateConsumo: function () {
                ctrl.consumo.set('quantidadeEmEstoque', ctrl.consumo.quantidadeEmEstoque - ctrl.qtdConsumida);
                myapp.ds.consumo.sync()
                //atualizar histórico
                var historico = new myapp.model.historicoConsumo
                historico.set('idMaterialRetirado', ctrl.produto)
                historico.set('quantidadeRetirada', -1 * ctrl.qtdConsumida)
                historico.set('motivoRetirada', ctrl.obs)
                historico.set('idQuemRetirou', myapp.user)
                historico.set('dtRetirada', new Date())
                myapp.ds.historicoConsumo.add(historico)
            }
        }
        ctrl.produto = produtoService.getProduto()
        $scope.ctrl = ctrl


        //WINDOW ENTRADA
        $scope.wEntradaOptions = {
            title: "Entrada no Estoque",
            width: 600, visible: false, modal: true,
            content: "views/consumo/controleestoqueentrada.html"
        }
        //WINDOW SAIDA
        $scope.wSaidaOptions = {
            title: "Saída do Estoque",
            width: 600, visible: false, modal: true,
            content: "views/consumo/controleestoquesaida.html"
        }

        //GRID KENDO
        $scope.mainGridOptions = {
            dataSource: myapp.ds.consumo,
            //height: 550,
            selectable: "row",
            //filterable: true,
            sortable: true,
            pageable: true,
            reorderable: true,
            resizable: true,
            change: function (e) {
                var selectedRows = this.select() //array
                var dataItem = this.dataItem(selectedRows[0])
                ctrl.consumo = dataItem
                ctrl.produto = dataItem.idProduto
                this.refresh()
            },
            // toolbar: [
            //     {name: "create", text: "Entrada",iconClass: "k-font-icon", imageClass: "k-i-plus"},
            //     {name: "edit", text: "Saída",iconClass: "k-font-icon", imageClass: "k-i-minus"}
            //     ],
            columns: [
                {field: "idConsumo", title: "ID", width: "5%"},
                {field: "prodCBar", title: "Cod.Bar.", width: "10%"},
                {field: "prodDesc", title: "Produto", width: "25%"},
                {field: "prodEspe", title: "Especificação", width: "25%"},
                {field: "prodUnid", title: "Unidade", width: "10%"},
                {field: "dtValidade", title: "Validade", width: "10%", format: myapp.dateformat},
                {field: "quantidadeEmEstoque", title: "Qtd.", width: "5%", validation: {min: 0, required: true}}
            ]
        }

        $scope.fabricanteOptions = {
            dataSource: myapp.ds.fabricante,
            dataTextField: "fabricante",
            dataValueField: "idFabricante",
            autoBind: false,
            filter: "contains",
            change: function (e) {
                var aux = this.dataItem()
                ctrl.consumo.idFabricante = aux == null ? null : aux
                this.refresh()
            }
        }
    });