angular.module('app').config(function($routeProvider) {
    $routeProvider
        .when('/teachingInstitute/table', {
            templateUrl: './view/teachingInstitute/table.html',
            controller: 'controllerTeachingInstitute',
            resolve: {
                data: function($rootScope, serviceTeachingInstitute) {
                    if($rootScope.data !== null) {
                        return $rootScope.data;
                    } else {
                        return serviceTeachingInstitute.getAll();
                    }
                }
            }
        })
        .when('/teachingInstitute/find', {
            templateUrl: './view/teachingInstitute/find.html',
            controller: 'controllerTeachingInstitute',
            resolve: {
                data: () => null
            }
        })
});