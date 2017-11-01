'use strict';

myAngular
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/usuario', {
            templateUrl: 'views/usuario/usuario.html',
            controller: 'userCtrl'
        });
    }])
    .controller('userCtrl', function($scope) {
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
                    editor: myapp.dropDown("", "text", "value").editor,
                    width: "10%"
                },
                {command: [myapp.btEdit, myapp.btDestroy], title: "", width: "8em"}
            ]
        };
    });