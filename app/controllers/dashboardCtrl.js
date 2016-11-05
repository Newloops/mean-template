
angular.module('App')

.controller('dashboardCtrl',
    ['$scope', 'apiService', '$cookieStore', '$location',
    function($scope, apiService, $cookieStore, $location) {

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
            $location.path('/login');

        }

    }
]);
