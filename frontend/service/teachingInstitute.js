angular.module('app').service('serviceTeachingInstitute', function ($http, config) {
	this.getAll = function() {
		return $http({
            method: 'GET',
            url: config.domain + '/teachingInstitute'
        });
    };
    
	this.findByName = function(name) {
		return $http({
            method: 'GET',
            url: config.domain + `/teachingInstitute/name/${name}`
        });
	};
});