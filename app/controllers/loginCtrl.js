
angular.module('App')

.controller('loginCtrl', ['$scope', '$rootScope', '$location', '$http', '$base64', '$cookieStore', function($scope, $rootScope, $location, $http, $base64, $cookieStore) {

    $scope.login = function() {

        $scope.error = false;
        $scope.dataLoading = true;

        var param = {
            username: $scope.username,
            password: $scope.password
        }

        $http.post('/api/authenticate', param)
            .success(function(data) {
                if (data.success===true) {

                    var authdata = $base64.encode(data.user.username + ':' + data.user.password);

                    $rootScope.globals = {
                        currentUser: {
                            username: data.user.username,
                            token: data.token,
                            authdata: authdata
                        }
                    };

                    $cookieStore.put('globals', $rootScope.globals);
                    $location.path('/dashboard');
                } else {
                    $scope.error = true;
                    $scope.dataLoading = false;
                    $scope.messageError = 'El email o la contraseña son incorrectos';
                }
                console.log(data);
            })
            .error(function(data) {
                console.log('Error:' + data);
            });
    };

}]);
