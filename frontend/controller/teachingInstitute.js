angular.module('app').controller('controllerTeachingInstitute', function($rootScope, $scope, $location, teachingInstitute, serviceTeachingInstitute) {

	if(teachingInstitute !== null) {
		$scope.data = teachingInstitute.data;
		$rootScope.data = null;
	}

	$scope.findByName = function() {
		serviceTeachingInstitute.findByName($scope.teachingInstitute.name).then(function(data) {
			delete $scope.teachingInstitute;
			$scope.teachingInstituteFindForm.$setPristine();

			$rootScope.data = data.data;
			
			$location.path('/teachingInstitute/table');
		}).catch(function(error) {
			alert('Falha ao buscar instituições de ensino');
		});
    };
});
