'use strict';

// Declare app level module which depends on views, and components
var myAngular = angular.module('EstoqueX', ['kendo.directives','ngRoute']);

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
