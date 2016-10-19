
angular.module('App')

.controller('loginCtrl', ['$scope', '$rootScope', '$location', 'AuthenticationService', '$http', function($scope, $rootScope, $location, AuthenticationService, $http) {

    $scope.login = function() {

        $scope.error = false;
        $scope.dataLoading = true;

        var param = {
            username: $scope.username,
            password: $scope.password
        }

        $http.post('/api/user', param)
            .success(function(data) {
                if ($scope.username === data.username && $scope.password === data.password) {

                    var authdata = $base64.encode($scope.username + ':' + $scope.password);

                    $rootScope.globals = {
                        currentUser: {
                            username: $scope.username,
                            authdata: authdata
                        }
                    };

                    $cookieStore.put('globals', $rootScope.globals);
                    $location.path('/');
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
