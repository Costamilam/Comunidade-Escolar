angular.module('app').config(function($routeProvider) {
    $routeProvider
        .when('/teachingInstitute/table', {
            templateUrl: './view/teachingInstitute/table.html',
            controller: 'controllerTeachingInstitute',
            resolve: {
                teachingInstitute: function($rootScope, serviceTeachingInstitute) {
                    if($rootScope.data !== null) {
                        return $rootScope;
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
                teachingInstitute: () => null
            }
        })
});