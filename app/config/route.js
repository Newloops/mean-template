angular.module('App')

.config(['$routeProvider', function($routeProvider) {

    $routeProvider

        .when('/login', {
            controller: 'loginCtrl',
            templateUrl: 'app/views/public/login.html'
        })

        .when('/dashboard', {
            controller: 'dashboardCtrl',
            templateUrl: 'app/views/private/home.html'
        })

        .otherwise({
            redirectTo: '/login'
        });

}])

.run(['$rootScope', '$location', '$cookieStore', '$http', function($rootScope, $location, $cookieStore, $http) {

    $rootScope.globals = $cookieStore.get('globals') || {};

    $rootScope.$on('$locationChangeStart', function(event, next, current) {
        if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
            console.log("Estoy pasando por aquí");
            $location.path('/login');
        }
    });
}]);
