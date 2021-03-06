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
		serviceEvent.delete($scope.event[0]._id).then(function(data) {
			delete $scope.event;
			$scope.eventChangeForm.$setPristine();

			$location.path('/event/my');
		}).catch(function(error) {
			alert('Falha ao excluir evnto');
		});
	};

	$scope.addParticipant = function() {
		let auth = serviceAuth.getDataLocally();

		if(auth === null || auth._id === undefined) {
			alert('Conecte-se para poder participar de eventos');

			$location.path('/user/auth');
		} else {
			let object = {
				eventId: $scope.event[0]._id,
				userId: auth._id
			};

			serviceEvent.addParticipant(object).then(function(data) {
				if($scope.event[0].participant === undefined) {
					$scope.event[0].participant = [];
				}
				
				$scope.event[0].participant.push(auth);

				$scope.show = true;
			}).catch(function(error) {
				alert('Falha ao cadastrar evnto');
			});
		}
	}

	$scope.deleteParticipant = function() {
		let auth = serviceAuth.getDataLocally();

		if(auth === null || auth._id === undefined) {
			alert('Conecte-se para poder participar e sair de eventos');

			$location.path('/user/auth');
		} else {
			serviceEvent.deleteParticipant($scope.event[0]._id, auth._id).then(function(data) {
				for(let i = 0; i < $scope.event[0].participant.length; i++) {
					if($scope.event[0].participant[i]._id === auth._id) {
						$scope.event[0].participant.splice(i, 1);
					}
				}

				$scope.show = false;
			}).catch(function(error) {
				console.log(error)
				alert('Falha ao cadastrar evnto');
			});
		}
	}

	$scope.isParticipant = function() {
		if(!$scope.event || !$scope.event[0] || !$scope.event[0].participant) {
			return false;
		}

		let auth = serviceAuth.getDataLocally();

		for(let element of $scope.event[0].participant) {
			return element._id === auth._id ? true : false;
		};

		return false;
	}

	$scope.show = $scope.isParticipant();
});
