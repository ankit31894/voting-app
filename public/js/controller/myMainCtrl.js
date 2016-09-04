var mainApp=angular.module('MyMainCtrl', []);
mainApp.controller('MyMainController', function($scope,$http,myhttp) {
  $scope.formData={pollText:''};
  ($scope.getPolls=function(){
      $scope.polls=[];
      $scope._getPolls=true;  //start from _ means loading flag for that function name
      $scope.E_getPolls="";  //start from E_ means error string for that function name
      myhttp.fetch({
          url:'/getmypolls',method:'GET'
      }).then(function(d){
          $scope.polls=d;
      },function(err){
          $scope.E_getPolls=err;
      }).finally(function(){
          $scope._getPolls=false;
      });
  })();
  $scope.removePoll=function(id,key){
    _removePoll=true;
    E_removePoll="";
    myhttp.fetch({
        url:"/removepoll/"+id,
        method:'POST'
    }).then(
        function(data,status){
        $scope.polls.splice(key,1);
    },function(err){
        $scope.E_removePoll=err;
    }).finally(function(){
        $scope._removePoll=false;

    });
  };

  $scope.share=function($event){
      $event.preventDefault();
      var $this=$event.currentTarget;
      window.open($this.href, $this.title,'width=500,height=300');
      return false;
  };


  ($scope.getLoggedStatus=function(){
      $scope._getLoggedStatus=true;
      $scope.E_getLoggedStatus="";
      myhttp.fetch({
          url:'/checklogged',method:'GET'
      }).then(function(d){
          if(d=="1")
            $scope.logged=true;
      },function(err){
          $scope.E_getLoggedStatus=err;
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
