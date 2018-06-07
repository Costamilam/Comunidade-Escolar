angular.module('app').config(function($routeProvider) {
    $routeProvider
        .when('/event/add', {
            templateUrl: './view/event/add.html',
            controller: 'controllerEvent',
            resolve: {
                currentEvent: () => null,
                teachingInstitute: function(serviceTeachingInstitute) {
                    return serviceTeachingInstitute.getAll();
                }
            }
        })
        .when('/event/find', {
            templateUrl: './view/event/find.html',
            controller: 'controllerEvent',
            resolve: {
                currentEvent: () => null,
                teachingInstitute: function(serviceTeachingInstitute) {
                    return serviceTeachingInstitute.getAll();
                }
            }
        })
        .when('/event/manage/:id', {
            templateUrl: './view/event/manage.html',
            controller: 'controllerEvent',
            resolve: {
                currentEvent: function(serviceEvent, $route) {
                    return serviceEvent.findById($route.current.params.id);
                },
                teachingInstitute: function(serviceTeachingInstitute) {
                    return serviceTeachingInstitute.getAll();
                }
            }
        })
        .when('/event/table', {
            templateUrl: './view/event/table.html',
            controller: 'controllerEvent',
            resolve: {
                currentEvent: function($rootScope) {
                    return $rootScope;
                },
                teachingInstitute: () => null
            }
        })
        .when('/event/my', {
            templateUrl: './view/event/my.html',
            controller: 'controllerEvent',
            resolve: {
                currentEvent: function(serviceEvent, serviceAuth) {
                    let auth = serviceAuth.getDataLocally();

                    if(auth === null || auth._id === undefined) {
                        alert('Conecte-se para poder gerenciar seus eventos');

                        return null;
                    } else {
                        return serviceEvent.findByUser(auth._id);
                    }
                },
                teachingInstitute: () => null
            }
        })
        .when('/event/:id', {
            templateUrl: './view/event/event.html',
            controller: 'controllerEvent',
            resolve: {
                currentEvent: function(serviceEvent, $route) {
                    return serviceEvent.findById($route.current.params.id);
                },
                teachingInstitute: () => null
            }
        })
});