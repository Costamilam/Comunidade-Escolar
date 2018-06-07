angular.module('app').controller('controllerEvent', function($rootScope, $scope, $location, teachingInstitute, currentEvent, serviceEvent, serviceAuth) {
	if(teachingInstitute !== null) {
		$scope.teachingInstitute = teachingInstitute.data;
	}
	if(currentEvent !== null) {
		$scope.event = currentEvent.data;
	}

	$scope.add = function() {
		let auth = serviceAuth.getDataLocally();

		if(auth === null || auth._id === undefined) {
			alert('Conecte-se para poder cadastrar eventos');

			$location.path('/user/auth');
		} else {
			$scope.event.user = auth._id;

			serviceEvent.add($scope.event).then(function(data) {
				delete $scope.event;
				$scope.eventAddForm.$setPristine();

				$location.path('/event/my');
			}).catch(function(error) {
				alert('Falha ao cadastrar evnto');
			});
		}
    };

	$scope.find = function() {
		serviceEvent.find($scope.event).then(function(data) {
			delete $scope.event;
			$scope.eventFindForm.$setPristine();

			$rootScope.data = data.data;

			$location.path('/event/table');
		}).catch(function(error) {
			alert('Falha ao buscar evnto');
		});
    };

	$scope.change = function() {
		serviceEvent.change($scope.event[0]).then(function(data) {
			delete $scope.event;
			$scope.eventChangeForm.$setPristine();

			$location.path('/event/my');
		}).catch(function(error) {
			alert('Falha ao atualizar evnto');
		});
    };

	$scope.delete = function() {
		console.log($scope.event[0]._id)
		serviceEvent.delete($scope.event[0]._id).then(function(data) {
			delete $scope.event;
			$scope.eventChangeForm.$setPristine();

			$location.path('/event/my');
		}).catch(function(error) {
			alert('Falha ao excluir evnto');
		});
	};
});
