angular.module('app').config(function($routeProvider) {
    $routeProvider
        .when('/user/add', {
            templateUrl: './view/user/add.html',
            controller: 'controllerUser',
            resolve: {
                teachingInstitute: function(serviceTeachingInstitute) {
                    return serviceTeachingInstitute.getAll();
                },
                currentUser: () => null
            }
        })
        .when('/user/find', {
            templateUrl: './view/user/find.html',
            controller: 'controllerUser',
            resolve: {
                teachingInstitute: function(serviceTeachingInstitute) {
                    return serviceTeachingInstitute.getAll();
                },
                currentUser: () =>  null
            }
        })
        .when('/user/manage', {
            templateUrl: './view/user/manage.html',
            controller: 'controllerUser',
            resolve: {
                teachingInstitute: function(serviceTeachingInstitute) {
                    return serviceTeachingInstitute.getAll();
                },
                currentUser: function(serviceAuth) {
                    return serviceAuth.getDataLocally();
                }
            }
        })
        .when('/user/table', {
            templateUrl: './view/user/table.html',
            controller: 'controllerUser',
            resolve: {
                teachingInstitute: () =>  null,
                currentUser: () =>  null
            }
        })
        .when('/user/auth', {
            templateUrl: './view/user/auth.html',
            controller: 'controllerAuth'
        });
});