/* global myAngular */

function config($routeProvider, $locationProvider) {
    // Leia a Nota sobre o HTML5Mode posteriormente
    $locationProvider.html5Mode({
        enabled: false,
        requireBase: false
        //rewriteLinks: false
    });
    //$locationProvider.

    $routeProvider
            // Rota para a Home
            .when('/', {
                templateUrl: "pages/home.html",
                controller: "homeCtrl"
            })
            .when('/usuario', {
                templateUrl: 'pages/usuario.html',
                controller: 'userCtrl'
            })
            .when('/fabricante', {
                templateUrl: 'pages/fabricante.html',
                controller: 'fabricCtrl'
            })
            .when('/unidademedida', {
                templateUrl: 'pages/unidademedida.html',
                controller: 'unidadeCtrl'
            })
            .when('/produto', {
                templateUrl: 'pages/produto.html',
                controller: 'produtoCtrl'
            })
            .when('/entradaestoque', {
                templateUrl: 'pages/entradaestoque.html',
                controller: 'entradaestoqueCtrl'
            })
        .when('/saidaestoque', {
            templateUrl: 'pages/saidaestoque.html',
            controller: 'saidaestoqueCtrl'
        })
        .when('/emprestimo', {
            templateUrl: 'pages/emprestimo.html',
            controller: 'emprestimoCtrl'
        })
        .when('/listagem', {
            templateUrl: 'pages/listagem.html',
            controller: 'bemPermanenteCtrl'
        })
        .when('/pedidos', {
            templateUrl: 'pages/pedidos.html',
            controller: 'pedidosCtrl'
        })

            // Caso não seja nenhum desses, 
            // redirecione para a rota '/'
            .otherwise({redirectTo: '/consumo'});
}

myAngular.config(config);