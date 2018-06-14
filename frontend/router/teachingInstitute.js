angular.module('app').config(function($routeProvider) {
    $routeProvider
        .when('/teachingInstitute/table/:page?', {
            templateUrl: './view/teachingInstitute/table.html',
            controller: 'controllerTeachingInstitute',
            resolve: {
                teachingInstitute: function($route, serviceTeachingInstitute) {
                    return serviceTeachingInstitute.find($route.current.params.page ? $route.current.params.page : 1);
                }
            }
        })
        .when('/teachingInstitute/find/:name?', {
            templateUrl: './view/teachingInstitute/find.html',
            controller: 'controllerTeachingInstitute',
            resolve: {
                teachingInstitute: function($route, serviceTeachingInstitute) {
                    return $route.current.params.name ? serviceTeachingInstitute.findByName($route.current.params.name) : null;
                }
            }
        })
});