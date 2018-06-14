angular.module('app').controller('controllerTeachingInstitute', function($rootScope, $scope, $location, $routeParams, teachingInstitute, serviceTeachingInstitute) {
	if(teachingInstitute !== null) {
		$scope.data = teachingInstitute.data.result;
		$scope.max = teachingInstitute.data.count;
	}

	$scope.page = parseInt($routeParams.page) || 1;

	$scope.findByName = function() {
		$location.path(`/teachingInstitute/find/${$scope.teachingInstitute.name}`)
    };
});
