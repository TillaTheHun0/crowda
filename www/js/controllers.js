/// <reference path="../../typings/angularjs/angular.d.ts"/>
angular.module('starter.controllers', [])

.controller('LoginCtrl', ["$scope", "firebaseAuth", "firebaseRef", "$state", "$ionicLoading", "$ionicModal", function($scope, firebaseAuth, firebaseRef, $state, $ionicLoading, $ionicModal){
    
    $scope.userData = firebaseAuth.getAuth().$getAuth();
    
    angular.element(document).ready(function(){
      if($scope.userData){
        loading();
        $state.go("tab.dash")
      }
    });
    
    //ion spinner
    function loading(){
      $ionicLoading.show({
        template: '<ion-spinner icon="spiral"></ion-spinner>',
        hideOnStateChange: true
      });
    };

    function hideLoading(){
      $ionicLoading.hide();
    }

    //ionicModal
    $ionicModal.fromTemplateUrl('templates/new-user.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });
    	
    //store username in factory maybe
    $scope.loginUser = function(email, password){
      loading();
      firebaseAuth.getAuth().$authWithPassword({
        email: email,
        password: password
      }).then(function(authData) {
          $state.go("tab.dash");
      }).catch(function(error) {
          console.error("Authentication failed:", error);
          hideLoading();
      })
    };

    $scope.createUser = function(email, password){
      //use these to display on login page later
      $scope.message = null;
      $scope.error = null;
      loading();
      firebaseAuth.getAuth().$createUser({
          email: email,
          password: password
      }).then(function(UserData){
        console.log("Created User with uid:  " + UserData.uid);
        firebaseRef.child("users").child(UserData.uid).set({
          email: email
        });
      }).catch(function(error){
        console.log(error);
      })
      $scope.modal.hide();
      hideLoading();
    };//end createUser
  }
])

.controller('DashCtrl', function($scope, $state) {
  $scope.newEvent = function(){
    $state.go('tab.new-event');
  };
})

.controller('NewEventCtrl', function($scope, $state){
  
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function(firebaseAuth, $state, $scope) {
  $scope.settings = {
    enableFriends: true
  };
  
   $scope.logoutUser = function(){
      firebaseAuth.unauth();
      $state.go("login");
    };
    
});
