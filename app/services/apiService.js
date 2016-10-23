angular.module('App')

.service('apiService', ['$http', '$q', '$sessionStorage', '$localStorage', '$log', '$rootScope', function($http, $q, $sessionStorage, $localStorage, $log, $rootScope) {

    //delete $http.defaults.headers.common['X-Requested-With'];
    //$http.defaults.headers = {'Content-Type': 'application/json;charset=utf-8'};

    this.requestHTTPHeaders = function(token) {
        return {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': 'Bearer ' + token
        }
    }

    // API Services
    /*
        Show list users
    */
    this.allUsers = function(params, callbackFunc) {

        var d = $q.defer();

        //Core.printLog("allUsers Request", params);
        $log.log("allUsers Request: ", params);

        $http({
            method: 'GET',
            url: '/api/user',
            data: {
                request: {
                    id: params.paymentid
                }
            },
            headers: this.requestHTTPHeaders($rootScope.globals.currentUser.token)
        })
        .success(function(responseData) {

            $log.log("allUsers Response: ", responseData);

            if (responseData.success === true) {
                callbackFunc(true, responseData /*SystemError.typeNone*/);
            }
            else {
                callbackFunc(false, {} /*SystemError.findErrorType(responseData)*/);
            }

            d.resolve();
        })
        .error(function(error) {
            console.error(error);
            callbackFunc(false, {} /*SystemError.typeRequestError*/);
            d.reject();
        });

        return d.promise;
    }

}]);
