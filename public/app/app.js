var myNinjaApp = angular.module('myNinjaApp', ['ngRoute', 'ngAnimate']);


myNinjaApp.config(['$routeProvider', function($routeProvider) {

    $routeProvider
        .when('/home', {
            templateUrl: 'views/home.html',
            controller: 'NinjaController'
        })
        .when('/contact', {
            templateUrl: 'views/contact.html',
            controller: 'NinjaController'
        })
        .when('/directory', {
            templateUrl: 'views/directory.html',
            controller: 'NinjaController'
        }).otherwise({
            redirectTo: '/home'
        })
}])

myNinjaApp.run(function() {

});

myNinjaApp.directive('kevinWongkin', [function() {

    return {
        restrict: 'E',
        scope: {
            ninjas: '=',
            title: '='
        },
        templateUrl: 'views/random.html',
        transclude: true,
        replace: true,
        controller: function($scope) {
            $scope.random = Math.floor(Math.random() * 4);
        }
    };
}]);

myNinjaApp.controller('NinjaController', ['$scope', '$http', function($scope, $http) {

    $scope.message = 'hey yall';
    $scope.ninjas;
    $scope.removeNinja = function(ninja) {
        this.ninja.available = false;
    }

    $scope.removeAll = function() {
        $scope.ninjas = [];
    }

    $scope.addNinja = function() {
        $scope.ninjas.push({
            name: $scope.newninja.name,
            belt: $scope.newninja.belt,
            rate: parseInt($scope.newninja.rate),
            available: true
        })
        $scope.newninja.name = '';
        $scope.newninja.belt = '';
        $scope.newninja.rate = '';
    }

    $http({
        method: 'GET',
        url: 'data/ninjas.json'
    }).then(function(success) {
        $scope.ninjas = success.data;
    }, function(error) {
        console.log(error)
    });
}]);