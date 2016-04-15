var app = angular.module("app", []);

app.controller("MainController", ["$scope", "$http", function($scope, $http) {
  $scope.ticketArray = [];
  $scope.ticket = {};
  $scope.show = false;

  $scope.getTickets = function() {
    $http.get("/ticket").then(function(response) {
      $scope.ticket = {};
      $scope.ticketArray = response.data;
    }); //  $http.get
    $scope.show = true
  };
  $scope.getTickets();
  $scope.add = function(ticket){
    $http.post('/add', ticket).then($scope.getTickets());
  }
  $scope.deleteTicket = function(ticket) {
    $http.delete("/deleteTicket/" + ticket._id).then(function(response) {
      $scope.getTickets()
      console.log("Deleted");
    }); //  $http.delete
  };  //  $scope.delete
}]);