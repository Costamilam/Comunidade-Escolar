angular.module('app').controller('controllerError', function($scope, info) {
    $scope.status = info.status;
    $scope.statusText = info.statusText;
    $scope.message = info.message;
});
