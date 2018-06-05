angular.module('app').service('serviceAuth', function ($http, config) {
	this.authUser = function(auth) {
		return $http({
            method: 'POST',
            url: config.domain + '/auth',
            data: auth
        });
    };
    
    this.setDataLocally = function(data) {
        delete data.data.password;
        
        sessionStorage.user = JSON.stringify(data.data);
    }

    this.getDataLocally = function() {
        let user = JSON.parse(sessionStorage.user);

        user.birth = new Date(user.birth);
        user.gender = JSON.parse(user.gender);

        return user;
    }

    this.deleteDataLocally = function() {
        delete sessionStorage.user;
    }
});