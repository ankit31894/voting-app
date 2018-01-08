angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

    // home page
    .when('/', {
        templateUrl: 'views/polls.html',
        controller: 'MainController'
   })

    .when('/poll/:string', {
        templateUrl: 'views/poll.html',
        controller: 'PollController'
    })
    .when('/login/google', {
        controller : function(){
            window.location.replace('/login/google');
        },
        template : "<div></div>"
    })
    .when('/mypolls', {
        templateUrl: 'views/mypolls.html',
        controller: 'MyMainController'
    })
    .when('/logout', {
        controller : function(){
            window.location.replace('/logout');
        },
        template : "<div></div>"
    });

    $locationProvider.html5Mode(true);

}]);
