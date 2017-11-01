'use strict';

myAngular
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/listapendentes', {
            templateUrl: 'views/permanente/listapendentes.html',
            controller: 'listaPendentesCtrl'
        });
    }])
    .controller('listaPendentesCtrl', function ($scope) {
        myapp.ds.emprestimoBemPermanente.filter({
            field: "idStatusEmprestimo.descricao",
            operator: "eq",
            value: "PENDENTE"
        });
        myapp.ds.statusEmprestimoBemPermanente.fetch();
        $scope.mainGridOptions = {
            dataSource: myapp.ds.emprestimoBemPermanente,
            //height: ,
            filterable: true,
            sortable: true,
            persistSelectable: true,
            pageable: true,
            editable: "inline",
            // selectable: "row",
            columns: [
                {selectable: true, width: "50px"},
                {
                    field: "idNumPatrimonio", title: "Bem permanente", width: "30%",
                    template: "#=idNumPatrimonio.descricaoBem#"
                },
                {
                    field: "idSolicitante", title: "Solicitante",
                    template: "#=idSolicitante.nomeUsuario#"
                },
                {field: "dtPrevistaRetirada", title: "Data de retirada"},
                {field: "dtPrevistaDevolucao", title: "Data de devolução"},
                {
                    field: "idStatusEmprestimo", title: "Status",
                    template: "#=idStatusEmprestimo.descricao#"
                }
            ],
            // change: function(args){
            //     var list = args.sender.select();
            //     var gridList = [];
            //     for(var i=0; i<list.length; i++)
            //         gridList.push(args.sender.dataItem(list[i]))
            //
            //     console.log(gridList)
            // },
            fAprovarTodos: function () {
                var grid = $("#gridPendentes").data("kendoGrid");
                var list = grid.select();
                var gridList = [];
                for(var i=0; i<list.length; i++){
                    gridList.push(grid.dataItem(list[i]))
                }
                var aprovado = myapp.ds.statusEmprestimoBemPermanente.get(2);
                for(var i=0; i<gridList.length; i++) {
                    var item = gridList[i];
                    item.set("idStatusEmprestimo",aprovado);
                    console.log(JSON.stringify(item.idStatusEmprestimo));
                    var fase = new myapp.model.fasesEmprestimoBemPermanente;
                    fase.set("idPedidoEmprestimo",item);
                    fase.set("dtStatus", new Date());
                    fase.set("idStatus",aprovado);
                    fase.set("idResponsavel",myapp.user);
                    myapp.ds.fasesEmprestimoBemPermanente.add(fase);
                }
                myapp.ds.emprestimoBemPermanente.sync();
                myapp.ds.fasesEmprestimoBemPermanente.sync();
                console.log(gridList)

            }
        };
    });