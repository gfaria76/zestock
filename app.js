'use strict';

// Declare app level module which depends on views, and components
var myAngular = angular.module('EstoqueX', ['kendo.directives', 'ngRoute', 'ngStorage', 'ngMessages']);

myAngular
    .config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
        //$locationProvider.hashPrefix('!');
        $locationProvider.html5Mode({
            enabled: false,
            requireBase: false
            //rewriteLinks: false
        });
        $routeProvider.otherwise({redirectTo: '/login'});
    }]);

kendo.culture("pt-BR");
$(document).ready(function () {
    $("#menu").kendoMenu();
    myapp.notification = $('#notification')
        .kendoNotification({
            position: {top: 20, right: 20},
            stacking: "down",
            width: 300
        })
        .data("kendoNotification");
});
