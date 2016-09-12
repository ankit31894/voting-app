var poll=angular.module('PollCtrl', [])
poll.controller('PollController',['$scope','$http','$routeParams','myhttp', function($scope,$http,$routeParams,myhttp) {
    $scope.selected={};
    var pollId = $routeParams.string;
    $scope.formData={
      pollId:pollId,
      optionText:''
    }
    $scope.votes=[];
    $scope.optionText=[];
    $scope.counter=0;
    $scope.options=[];
    ($scope.getPoll=function(){
        _getPoll=true;
        E_getPoll="";
        myhttp.fetch({
            url:"/pollDetail/"+pollId,
            method:'GET'
        }).then(
        function(data,status){
            if(data==null)return;
            $scope.options=data.options;
            console.log(data);
            $scope.selected.option=$scope.options[0];
            c();
        },function(err){
            $scope.E_getPoll=err;
        }).finally(function(){
            $scope._getPoll=false;

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
        if(err.code!==401)$scope.E_getLoggedStatus="Can't Check whether you are logged In";
      }).finally(function(){
          $scope._getLoggedStatus=false;
      });
    })();
    $scope.submitOption=function(){
        $scope._submitOption=true;
        $scope.E_submitOption="";
        myhttp.fetch({
            url: "/insertoption",
            method: "POST",
            data: {optionText:$scope.formData.optionText,pollId:pollId}
        }).then(function(d){
            $scope.options=d.options;
            $scope.selected.option=$scope.options[0];
            c();
        },function(err){
            $scope.E_submitOption=err;
        }).finally(function(){
            $scope._submitOption=false;
        });
    };
    $scope.insertVote=function(){
        $scope._insertVote=true;
        $scope.E_insertVote="";
        myhttp.fetch({
            url: "/insertvote",
            method: "POST",
            data: {optionId:$scope.selected.option._id}
        }).then(function(d){
            $scope.selected.option.votes++;
            c();
        },function(err){
            $scope.E_insertVote=err;
        }).finally(function(){
            $scope._insertVote=false;
        });
    };
    function c(){
      $scope.optionText=$scope.options.map(function(e){
        return e.optionText;
      })
      $scope.votes=$scope.options.map(function(e){
        return e.votes;
      })
    var ctx = document.getElementById("myChart");
    var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: $scope.optionText,
            datasets: [{
                label: '# of Votes',
                data: $scope.votes
            }]
        }
    });
  }

}]);
