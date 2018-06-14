angular.module('app', ['ngRoute']);

angular.module('app').run(function($rootScope) {
    $rootScope.data = null;
});

angular.module('app').config(function($routeProvider) {
    $routeProvider.when('/', {
            templateUrl: './view/home.html'
        })
});

angular.module('app').directive("formatDate", function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attribute, modelController) {
            modelController.$formatters.push(function(modelValue) {
                if (modelValue){
                    return new Date(modelValue);
                } else {
                    return null;
                }
            });
        }
    };
});