'use strict';

myAngular
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/produto', {
            templateUrl: 'views/consumo/produto.html',
            controller: 'produtoCtrl'
        });
    }])
    .controller('produtoCtrl', function ($scope, produtoService) {
        var ctrl = {
            nomebusca: null,
            produto: null,
            fChange: function () {
                //modificar os filtros do grid
                if (ctrl.nomebusca.length >= 0)
                    myapp.ds.produto.filter({
                        logic: "or", filters: [
                            {field: "codigoBarra", operator: "contains", value: ctrl.nomebusca},
                            {field: "descricao", operator: "contains", value: ctrl.nomebusca},
                            {field: "especificacao", operator: "contains", value: ctrl.nomebusca}]
                    });
            }
        }
        $scope.ctrl = ctrl
        $scope.mainGridOptions = {
            dataSource: myapp.ds.produto,
            //height: 550,
            //filterable: true,
            sortable: true,
            pageable: true,
            selectable: "row",
            editable: "inline", //incell edition
            change: function (e) {
                var selectedRows = this.select() //array
                var dataItem = this.dataItem(selectedRows[0])
                ctrl.produto = dataItem
                produtoService.setProduto(dataItem)
                produtoService.getProdutoByGtins('7891000142202');
                this.refresh()
            },
            toolbar: ["create"],
            columns: [
                {field: "codigoBarra", title: "Cód.Barras", width: "15%"},
                {field: "descricao", title: "Descrição", width: "30%"},
                {field: "especificacao", title: "Especificação", width: "30%"},
                {
                    field: "idUnidade", title: "Unidade", width: "15%",
                    editor: myapp.dropdown.unidade,
                    template: "#=(idUnidade==null?null:idUnidade.unidade)#"
                },
                {command: [myapp.btEdit], title: "", width: "10%"}
            ]
        }
    })
    .factory('produtoService', function ($http) {
        var produto = new myapp.model.produto
        var url = "https://api.cosmos.bluesoft.com.br"
        var config = {
            "url": "https://api.cosmos.bluesoft.com.br/gtins/7891000142202",
            "method": "GET",
            "headers": {
                "x-cosmos-token": "MdXzMoFPh1KbDRfZ8_Bdpg",
                'Content-Type': 'application/json'
            }
        }
        return {
            getProduto: function () {
                return produto
            },
            setProduto: function (prod) {
                produto = prod
            },
            getProdutoByGtins: function (gtins) {
                //config.url = url + '/gtins/' + gtins
                //config.url = "https://cosmos.bluesoft.com.br/produtos/7891000142202"
                $http(config)
                    .then(function (response) {
                        console.log(response)
                    })
            }
        }
    });