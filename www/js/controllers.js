/// <reference path="../../typings/angularjs/angular.d.ts"/>
angular.module('starter.controllers', [])

.controller('LoginCtrl', ["$scope", "firebaseAuth", "Spinner", "$state", "$ionicModal", "REST", 
  function($scope, firebaseAuth, Spinner, $state, $ionicModal, REST){
    
    angular.element(document).ready(function(){
      $scope.userData = firebaseAuth.getAuth().$getAuth();
      if($scope.userData){
        Spinner.loading();
        $state.go("tab.dash")
      }
    });
    
    $scope.errorMes = "";
    //ionicModal
    $ionicModal.fromTemplateUrl('templates/new-user.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });
    
    
    function goToDash(error){
      console.log("done");
      Spinner.hideLoading();
      $scope.modal.hide();
      $state.go('tab.dash');
    };
    
    $scope.newUser = function(){
      $state.go('new-user');
    };
    	  
    $scope.loginUser = function(username, password){
      Spinner.loading();
      REST.login().post({username: username, password: password},
        function(value, responseHeaders){
          firebaseAuth.getAuth().$authWithCustomToken(value.token)
            .then(
              function(authData){
                Spinner.hideLoading();
                $state.go("tab.dash");
              })
            .catch(
              function(error){
                console.log(error);
              });
        },
        function(httpResponse){
          Spinner.hideLoading();
          console.log("Authentication failed" + httpResponse.data);
          $scope.errorMes = "Invalid username and/or password";
          $scope.error = true;
        }
      );
    };
    
  }
])

.controller('NewUserCtrl', function($scope, $state, Spinner, $ionicModal, REST){
    
    $ionicModal.fromTemplateUrl('templates/username.html', {
      scope: $scope,
      animation: 'zoomInUp',   
    }).then(function(modal){
      $scope.modal = modal;
    })
  
    function escapeEmail(email){
      return email.replace('.', ',');
    };
    
    $scope.createUser = function(email, username, password){
      Spinner.loading();
      REST.signup().post({username: username, password: password, email: email, provider: "password"},
        function(value, responseHeaders){
          $state.go('login');
        },
        function(httpResponse){
          Spinner.hideLoading();
          console.log("Failed to create account: " + httpResponse.data.error);
          $scope.errorMes = httpResponse.data.error;
          $scope.error = true
        })
    }
})

.controller('DashCtrl', function($scope, $state, REST) {
  REST.events().get().$promise.then(function(data) {
    console.log(JSON.stringify(data.events));
    $scope.events = data.events; 
  });
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
