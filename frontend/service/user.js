angular.module('app').service('serviceUser', function ($http, config) {
	this.add = function(user) {
		return $http({
            method: 'POST',
            url: config.domain + '/user',
            data: user
        });
	};

	this.verifyUsername = function(username) {
		return $http({
            method: 'GET',
            url: config.domain + `/user/username/${username}`
        });
	};

	this.find = function(name, teachingInstitute) {
		return $http({
            method: 'GET',
            url: config.domain + `/user/name/${name || ''}/teachingInstitute/${teachingInstitute || ''}`
        });
	};

	this.change = function(user) {
		return $http({
            method: 'PUT',
            url: config.domain + '/user',
            data: user
        });
    };

	this.delete = function(id) {
		return $http({
            method: 'DELETE',
            url: config.domain + `/user/${id}`
        });
	};
});