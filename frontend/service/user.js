angular.module('app').service('serviceUser', function ($http, config) {
	this.addUser = function(user) {
		return $http({
            method: 'POST',
            url: config.domain + '/user',
            data: user
        });
	};

	this.verifyUser = function(username) {
		return $http({
            method: 'GET',
            url: config.domain + `/user/userUsername/${username}`
        });
	};

	this.findUser = function(name, teachingInstitute) {
		return $http({
            method: 'GET',
            url: config.domain + `/user/name/${name}/teachingInstitute/${teachingInstitute}`
        });
	};

	this.changeUser = function(user) {
		return $http({
            method: 'PUT',
            url: config.domain + '/user',
            data: user
        });
    };

	this.deleteUser = function(auth) {
		return $http({
            method: 'DELETE',
            url: config.domain + '/user',
            data: auth
        });
	};
});