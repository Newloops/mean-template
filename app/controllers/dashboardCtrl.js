
angular.module('App')

.controller('dashboardCtrl',
    ['$scope', 'apiService',
    function($scope, apiService) {

        console.log("Estoy pasando por aquí");

        apiService.allUsers({}, function(response, data){

            if(response === true){

                $scope.users = data.user;

            }else{

                console.log("Mal");

            }

        });

    }
]);
