'use strict';

myAngular
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/emprestimo', {
            templateUrl: 'views/permanente/emprestimo.html',
            controller: 'emprestimoCtrl'
        });
    }])
    .controller('emprestimoCtrl', function($scope) {
        myapp.ds.emprestimoBemPermanente.fetch()
        myapp.ds.fasesEmprestimoBemPermanente.fetch()
        myapp.ds.statusEmprestimoBemPermanente.fetch()
        var ctrl = {
            bemPermanente:{},
            empPermanente: {}, //selecao de produto
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
                    myapp.ds.bemPermanente.filter({
                        logic: "or", filters: [
                            {field: "numPatrimonio", operator: "contains", value: ctrl.nomebusca},
                            {field: "descricaoBem", operator: "contains", value: ctrl.nomebusca},
                            {field: "salaAlocacao.setor", operator: "contains", value: ctrl.nomebusca}]
                    });
            },
            //chamada antes de abrir a janela de nova entrada em estoque
            fNovaEntrada: function () {
                ctrl.empPermanente = new myapp.model.emprestimoBemPermanente;
                ctrl.empPermanente.set('idNumPatrimonio' , ctrl.bemPermanente);
            },
            //salva dados da janela Entrada
            fSaveConsumo: function () {
                var pendente =  myapp.ds.statusEmprestimoBemPermanente.get(1)
                //ajustar tabela grid
                ctrl.empPermanente.set('idStatusEmprestimo',pendente)
                //emprestimoBemPermanente
                //nao serve para alterar pois edicao nao torna objeto dirty
                console.log(JSON.stringify(ctrl.empPermanente))
                myapp.ds.emprestimoBemPermanente.add(ctrl.empPermanente)
                myapp.ds.emprestimoBemPermanente.sync()
                //historico-emprestimo
                var historico = new myapp.model.fasesEmprestimoBemPermanente
                historico.set('idPedidoEmprestimo', ctrl.empPermanente)
                historico.set('dtStatus' , new Date())
                historico.set('idStatus', pendente)
                historico.idResponsavel = myapp.user
                myapp.ds.fasesEmprestimoBemPermanente.add(historico)
                console.log(JSON.stringify(historico))
                myapp.ds.fasesEmprestimoBemPermanente.sync()
            }
        };
        $scope.ctrl = ctrl;

        //WINDOW ENTRADA
        $scope.wEntradaOptions = {
            title: "Novo Emprestimo",
            width: 600, visible: false, modal: true,
            content: "views/permanente/addemprestimo.html"
        }

        //GRID KENDO
        $scope.mainGridOptions = {
            dataSource: myapp.ds.bemPermanente,
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
                ctrl.bemPermanente = dataItem
                this.refresh()
            },
            // toolbar: [
            //     {name: "create", text: "Entrada",iconClass: "k-font-icon", imageClass: "k-i-plus"},
            //     {name: "edit", text: "Saída",iconClass: "k-font-icon", imageClass: "k-i-minus"}
            //     ],
            columns: [
                {field: "idBemPermanente", title: "ID", width: "5%"},
                {field: "numPatrimonio", title: "Num. Património", width: "10%"},
                {field: "descricaoBem", title: "Permanente", width: "25%"},
                {field: "salaAlocacao", title: "Setor Alocado",
                 template:"#=salaAlocacao.setor#", width: "10%"},
                {field: "salaAlocacao", title: "Sala Alocado",
                    template:"#=salaAlocacao.sala#", width: "10%"},
                {field: "observacao", title: "Observação", width: "10%"},
                {field: "idEstadoConservacao", title: "Estado",
                 template: "#=idEstadoConservacao.descricaoEstadoFisico#", width: "10%"}
            ]
        };
    });
