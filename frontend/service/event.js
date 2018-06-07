angular.module('app').service('serviceEvent', function ($http, config) {
	this.add = function(event) {
		return $http({
            method: 'POST',
            url: config.domain + '/event',
            data: event
        });
    };

	this.find = function(event) {
		return $http({
            method: 'GET',
            url: config.domain + `/event/name/${event.name || ''}/place/${event.place || ''}/date/${event.date || ''}`
        });
	};

	this.findById = function(id) {
		return $http({
            method: 'GET',
            url: config.domain + `/event/id/${id}`
        });
	};

	this.findByUser = function(id) {
		return $http({
            method: 'GET',
            url: config.domain + `/event/user/${id}`
        });
	};

	this.change = function(event) {
		return $http({
            method: 'PUT',
            url: config.domain + '/event',
            data: event
        });
    };

	this.delete = function(id) {
		return $http({
            method: 'DELETE',
            url: config.domain + `/event/${id}`
        });
	};
});