angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

    // home page
    .when('/', {
        templateUrl: 'views/polls.html',
        controller: 'MainController',
        css: 'css/polls.css'
   })

    .when('/poll/:string', {
        templateUrl: 'views/poll.html',
        controller: 'PollController',
        css: 'css/poll.css'
    })
    .when('/login/google', {
        controller : function(){
            window.location.replace('/login/google');
        },
        template : "<div></div>"
    })
    .when('/mypolls', {
        templateUrl: 'views/mypolls.html',
        controller: 'MyMainController',
        css:'css/polls.css'
    })
    .when('/logout', {
        controller : function(){
            window.location.replace('/logout');
        },
        template : "<div></div>"
    });

    $locationProvider.html5Mode(true);

}]);
