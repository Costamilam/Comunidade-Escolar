angular.module('app').controller('controllerAuth', function($scope, $location, serviceAuth) {
	$scope.authenticate = function() {
		serviceAuth.authenticate($scope.auth).then(function(data) {
			delete $scope.auth;
            $scope.userAuthForm.$setPristine();

            serviceAuth.setDataLocally(data);

			$location.path('/user/manage');
		}).catch(function(error) {
			alert('Usuário ou senha inválidos');
		});
    };
});
