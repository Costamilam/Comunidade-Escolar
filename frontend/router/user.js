angular.module('app').config(function($routeProvider) {
    $routeProvider
        .when('/user/add', {
            templateUrl: './view/user/add.html',
            controller: 'controllerUser',
            resolve: {
                teachingInstitute: function(serviceTeachingInstitute) {
                    return serviceTeachingInstitute.getTeachingInstitute();
                }
            }
        })
        .when('/user/find', {
            templateUrl: './view/user/find.html',
            controller: 'controllerUser',
            resolve: {
                teachingInstitute: function(serviceTeachingInstitute) {
                    return serviceTeachingInstitute.getTeachingInstitute();
                }
            }
        })
        .when('/user/manage', {
            templateUrl: './view/user/manage.html',
            controller: 'controllerUser',
            resolve: {
                teachingInstitute: function(serviceTeachingInstitute) {
                    return serviceTeachingInstitute.getTeachingInstitute();
                },
                currentUser: function(serviceAuth) {
                    return serviceAuth.getDataLocally();
                }
            }
        })
        .when('/user/auth', {
            templateUrl: './view/user/auth.html',
            controller: 'controllerAuth'
        })

        //Outhers redirect (404)
        .otherwise({redirectTo: "/"});
});