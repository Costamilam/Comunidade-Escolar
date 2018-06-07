angular.module('app', ['ngRoute']);

angular.module('app').run(function($rootScope) {
    $rootScope.data = null;
});

angular.module('app').config(function($routeProvider) {
    //Outhers redirect (404)
    $routeProvider.otherwise({redirectTo: "/"});
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