angular.module('app').config(function($routeProvider) {
    $routeProvider
        .when('/error/:status/:statusText/:message', {
            templateUrl: './view/error.html',
            controller: 'controllerError',
            resolve: {
                info: function($route) {
                    return {
                        status: $route.current.params.status,
                        statusText: $route.current.params.statusText,
                        message: $route.current.params.message
                    };
                }
            }
        })
        .otherwise({
            redirectTo: "/error/404/Not Found/Página não encontrada"
        });
});
