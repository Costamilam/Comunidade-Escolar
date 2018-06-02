angular
    .module('appDataPOA', [])
    .controller('controllerDataPOA', ['$scope', '$http', '$templateCache', function($scope, $http, $templateCache) {
        $scope.currentActivity = 'index';
        
        $scope.dataResponse = {};
        $scope.dataSend = {};

        $scope.dialog = document.getElementsByTagName('dialog')[0];

        $scope.getDataPOA = function() {
            $scope.dataResponse = {};
            
            for(let resource of ['c003f659-dc05-4e64-8a5a-0f730ac8cff2', 'c2da9ff7-94c8-43af-8141-d03f8d325739', '9b019d7c-1956-4cf8-bc75-9041284d5d81']) {
                $http({
                    method: 'GET', 
                    url: `http://datapoa.com.br/api/action/datastore_search?resource_id=${resource}&limit=500`, 
                    cache: $templateCache
                })
                .then(function(response) {
                    if ($scope.dataResponse == {}) {
                        response.data.result = response.data.result.records;
                        $scope.dataResponse = response;
                    } else {
                        $scope.dataResponse.data.result = $scope.dataResponse.data.result.concat(response.data.result.records);
                    }
                })
                .catch(error => console.error(error));
            }
        }

        $scope.submitData = function(method, url) {
            let auth = sessionStorage.userToken ? sessionStorage.userToken : "";

            $http({
                headers: {
                    Authorization: sessionStorage.userToken || ""
                },
                method: method,
                url: url,
                data: $scope.dataSend
            })
            .then(function(response) {
                if(response.data.result && response.data.result[0].userToken && response.data.result[0].user_id && response.data.result[0].userName) {
                    sessionStorage.userToken = response.data.result[0].userToken;
                    sessionStorage.userToken = response.data.result[0].user_id;
                    sessionStorage.userToken = response.data.result[0].userName;
                }

                $scope.dataResponse = response;

                $scope.currentActivity = 'dinamicTable';

                $scope.dialog.setAttribute('open', '');
            })
            .catch(function(error) {
                $scope.dataResponse = error;

                $scope.dialog.setAttribute('open', '');
            });
        }
    }]);