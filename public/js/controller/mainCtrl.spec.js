describe('MainController', function() {
    beforeEach(module('MainCtrl'));

    var $controller,logChecker;

    beforeEach(inject(function(_$controller_, _$httpBackend_) {
      // The injector unwraps the underscores (_) from around the parameter names when matching
    $httpBackend = _$httpBackend_;
    $controller = _$controller_;
    polGetter=$httpBackend.when('GET', '/polls')
                            .respond([]);
    logChecker=$httpBackend.when('GET', '/checklogged')
                            .respond("1");
    }));

    it('checks whether polls are assigning correctly', function() {
        var $scope = {};
        var d=[{pollText:"Test Me!",userId:"test",createdAt:new Date}];
        polGetter.respond(d);
        $httpBackend.expectGET('/polls' );
        var controller = $controller('MainController', { $scope: $scope });
        $httpBackend.flush();
        expect($scope.polls).toEqual(d);


    });
    it('checks if user is logged in changing status to true', function() {
        var $scope = {};
        $httpBackend.expectGET('/checklogged');
        var controller = $controller('MainController', { $scope: $scope });
        $httpBackend.flush();
        expect($scope.logged).toEqual(true);
    });
    it('checks if user is logged in changing status to true', function() {
        var $scope = {};
        logChecker.respond("0");
        var controller = $controller('MainController', { $scope: $scope });
        $httpBackend.flush();
        expect($scope.logged).toEqual(undefined);
    });
    it('checks if inserting poll is working', function() {
        var $scope = {};
        var d={pollText:"Test Me!",userId:"test",createdAt:new Date};
        var controller = $controller('MainController', { $scope: $scope });
        $httpBackend.expectPOST('/insertpoll').respond(d);
        $scope.submit({preventDefault:function(){}})
        $httpBackend.flush();
        expect($scope.polls).toEqual([d]);
    });
});
