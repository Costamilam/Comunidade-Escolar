angular.module('app').service('serviceTeachingInstitute', function ($http, config) {
	this.getTeachingInstitute = function() {
		return $http({
            method: 'GET',
            url: config.domain + '/teachingInstitute'
        });
	};
});