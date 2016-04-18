var app = angular.module("app", []);

app.controller("MainController", ["$scope", "$http", function($scope, $http) {
  $scope.ticketArray = [];
  $scope.ticket = {};
  $scope.edit = false;
  $scope.toggle = true;
  $scope.count = 0;
  $scope.getTickets = function() {
    $http.get("/ticket").then(function(response) {
      $scope.ticket = {};
      $scope.ticketArray = response.data;
    });
  };
  $scope.getTickets();
  $scope.add = function(ticket){
    $http.post('/add', ticket).then($scope.getTickets());
  }
  $scope.change = function(ticket){
    $scope.count++;
    if($scope.count%2===0){
    $http.put('/change/' + ticket._id, ticket);
  }
  }
  $scope.deleteTicket = function(ticket) {
    $http.delete("/deleteTicket/" + ticket._id).then(function(response) {
      $scope.getTickets()
      console.log("Deleted");
    }); //  $http.delete
  };  //  $scope.delete
}]);