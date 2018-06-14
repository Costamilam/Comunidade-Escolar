angular.module('app').controller('controllerUser', function($rootScope, $scope, $location, teachingInstitute, currentUser, serviceUser, serviceAuth) {
	if(teachingInstitute !== null) {
		$scope.teachingInstitute = teachingInstitute.data;
	}
	if(currentUser !== null) {
		$scope.user = currentUser;
	}

	$scope.add = function() {
		serviceUser.add($scope.user).then(function(data) {
			delete $scope.user;
			$scope.userAddForm.$setPristine();
			
			$location.path('/user/auth');
		}).catch(function(error) {
			alert('Falha ao cadastrar usuário');
		});
    };

	$scope.verifyUsername = function() {
		serviceUser.verifyUsername($scope.user.username).then(function(data) {
			document.getElementsByName('username')[0].setAttribute('valid', JSON.parse(data.data));

			$scope.userAddForm.$invalid = !JSON.parse(data.data);
		}).catch(function(error) {
			alert('Falha ao verificar o nome de usuário');
		});
    };

	$scope.find = function() {
		serviceUser.find($scope.user.name, $scope.user.teachingInstitute).then(function(data) {
			console.log($scope.user.teachingInstitute)
			delete $scope.user;
			$scope.userFindForm.$setPristine();

			$rootScope.data = data.data;

			$location.path('/user/table');
		}).catch(function(error) {
			alert('Falha ao buscar usuário');
		});
    };

	$scope.change = function() {
		serviceUser.change($scope.user).then(function(data) {
			delete $scope.user;
			$scope.userChangeForm.$setPristine();

			serviceAuth.deleteDataLocally;

			$location.path('/user/auth');
		}).catch(function(error) {
			alert('Falha ao atualizar usuário');
		});
    };

	$scope.delete = function() {
		serviceUser.delete($scope.user._id).then(function(data) {
			delete $scope.user;
			$scope.userChangeForm.$setPristine();

			serviceAuth.deleteDataLocally;

			$location.path('/user/add');
		}).catch(function(error) {
			alert('Falha ao excluir usuário');
		});
	};

	$scope.getAge = function(birth) {
		return new Date(Date.now() - new Date(birth).getTime()).getUTCFullYear() - 1970;
	}

	$scope.getGender = function(gender) {
		return JSON.parse(gender) ? 'Masculino' : 'Feminino';
	}
});
