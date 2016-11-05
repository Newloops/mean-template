
angular.module('App')

.controller('dashboardCtrl',
    ['$scope', '$rootScope', 'apiService', '$cookieStore', '$location',
    function($scope, $rootScope, apiService, $cookieStore, $location) {

        console.log("Estoy pasando por aquí");

        apiService.allUsers({}, function(response, data){

            if(response === true){

                $scope.users = data.user;

            }else{

                console.log("Mal");

            }

        });

        $scope.logout = function() {

            $cookieStore.remove('globals');
            $rootScope.globals = "";
            $location.path('/login');

        }

    }
]);
