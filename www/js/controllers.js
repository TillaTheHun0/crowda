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
      $scope.error = false;
      loading();
      firebaseAuth.getAuth().$createUser({
          email: email,
          password: password
      }).then(function(UserData){
        console.log("Created User with uid:  " + UserData.uid);
        firebaseRef.child("users").child(UserData.uid).set({
          //more data later
          email: email
        });
        hideLoading();
        $scope.modal.hide();
      }).catch(function(error){
        $scope.error=true;
        console.log(error);
        hideLoading();
      })
    };//end createUser
  }
])

.controller('DashCtrl', function($scope, $state) {
  $scope.newEvent = function(){
    $state.go('tab.new-event');
  };
})

.controller('NewEventCtrl', function($scope, $state, firebaseRef, firebaseAuth, $ionicModal){
  $scope.location=false;
  
  $scope.invitees=[];
  $scope.friendQuery=[];
  
  $scope.addUser = function(user){
    $scope.invitees.push(user);
  }
  
  $scope.getFriends = function(){
    //firebaseArrays  
  };
  
  $scope.cancel= function(){
    $state.go("tab.dash");
  };
  
  $scope.createCrowd = function(){
    
  };
  
  $scope.addLocation = function(){
    //open modal for adding location
    $scope.location=!$scope.location;
  };
  
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

.controller('AccountCtrl', function(Friends, firebaseAuth, $state, $scope) {
  $scope.settings = {
    enableFriends: true
  };
  
   $scope.logoutUser = function(){
      firebaseAuth.unauth();
      $state.go("login");
    };
    
   $scope.friends = Friends;
   console.log($scope.friends);
});
