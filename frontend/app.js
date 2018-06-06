angular.module('app', ['ngRoute']);

angular.module('app').run(function($rootScope) {
    $rootScope.data = null;
});