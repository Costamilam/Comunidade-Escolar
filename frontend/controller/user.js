angular.module('app').controller('controllerUser', function($scope, $location, teachingInstitute, serviceUser, currentUser = undefined) {
	$scope.teachingInstitute = teachingInstitute.data.result;

	if(currentUser) {
		$scope.user = currentUser;
	}

	$scope.addUser = function() {
		serviceUser.addUser($scope.user).then(function(data) {
			delete $scope.user;
			$scope.userAddForm.$setPristine();
			
			$location.path('/user/auth');
		}).catch(function(error) {
			alert('Falha ao cadastrar usuário');
		});
    };

	$scope.verifyUser = function() {
		serviceUser.findUser($scope.user.username).then(function(data) {
			return data;
		}).catch(function(error) {
			alert('Falha ao verificar o nome de usuário');
		});
    };

	$scope.findUser = function() {
		serviceUser.findUser($scope.user.name, $scope.user.teachingInstitute).then(function(data) {
			delete $scope.user;
			$scope.userFindForm.$setPristine();

			$location.path('/user/table');
		}).catch(function(error) {
			alert('Falha ao buscar usuário');
		});
    };

	$scope.changeUser = function() {
		serviceUser.changeUser($scope.user).then(function(data) {
			delete $scope.user;
			$scope.userChangeForm.$setPristine();

			$location.path('/user/table');
		}).catch(function(error) {
			alert('Falha ao atualizar usuário');
		});
    };

	$scope.deleteUser = function() {
		serviceUser.deleteUser($scope.auth).then(function(data) {
			delete $scope.user;
			$scope.userAddForm.$setPristine();

			$location.path('/user/add');
		}).catch(function(error) {
			alert('Falha ao excluir usuário');
		});
	};
});
