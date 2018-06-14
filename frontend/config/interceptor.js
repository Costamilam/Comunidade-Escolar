angular.module('app').config(function($httpProvider) {
    $httpProvider.interceptors.push(function($q, $location, $injector) {
        return {
            request: function(config) {
                const serviceAuth = $injector.get('serviceAuth');

                let auth = serviceAuth.getDataLocally();
    
                if(auth && auth.token) {
                    config.headers.authorization = `Bearer ${auth.token}`;
                }

                return config;
            },
            responseError: function(rejection) {
                if (rejection.status === 401) {
                    $location.path('user/auth');
                    alert('É necessário se autenticar para acessar ao recurso');
                } else {
                    $location.path(`error/${rejection.status}/${rejection.statusText}/${rejection.data}`);
                }
    
                return $q.reject(rejection);
            }
        };
    });
});