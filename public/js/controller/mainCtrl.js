var mainApp=angular.module('MainCtrl', []);
mainApp.controller('MainController', function($scope,$http,myhttp) {
  $scope.formData={pollText:''};
  ($scope.getPolls=function(){
      $scope.polls=[];
      $scope._getPolls=true;  //start from _ means loading flag for that function name
      $scope.E_getPolls="";  //start from E_ means error string for that function name
      myhttp.fetch({
          url:'/polls',method:'GET'
      }).then(function(d){
          console.log(d);
          $scope.polls=d;
      },function(err){
          $scope.E_getPolls=err;
      }).finally(function(){
          $scope._getPolls=false;
      });
  })();
  ($scope.getLoggedStatus=function(){
      $scope._getLoggedStatus=true;
      $scope.E_getLoggedStatus="";
      myhttp.fetch({
          url:'/checklogged',method:'GET'
      }).then(function(d){
          if(d=="1")
            $scope.logged=true;
      },function(err){
        if(err.status!==401)$scope.E_getLoggedStatus="Can't Check whether you are logged In";
      }).finally(function(){
          $scope._getLoggedStatus=false;
      });
  })();
  $scope.insertPoll=function(){
      $scope._insertPoll=true;
      $scope.E_insertPoll="";
      myhttp.fetch({
          url:'/insertpoll',method:'POST',data:$scope.formData
      }).then(function(d){
          d.noOfVotes=0;
          d.noOfOptions=0;
          $scope.polls.unshift(d);
      },function(err){
          $scope.E_insertPoll=err;
      }).finally(function(){
          $scope._insertPoll=false;
      });
  };

});
mainApp.factory('myhttp', function($http,$q) {

   return {
        fetch: function(req) {
            var deferred = $q.defer();
             //return the promise directly.
             $http(req)
               .then(function(result) {
                    deferred.resolve(result.data)
                },function(err){
                    deferred.reject(err.data)
                });
            return deferred.promise;

        }
   }
});
