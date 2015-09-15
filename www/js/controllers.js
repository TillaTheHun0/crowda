/// <reference path="../../typings/angularjs/angular.d.ts"/>
angular.module('starter.controllers', [])

.controller('LoginCtrl', ["$scope", "firebaseAuth", "firebaseRef", "Spinner", "$state", "$ionicModal", function($scope, firebaseAuth, firebaseRef, Spinner, $state, $ionicModal){
    
    angular.element(document).ready(function(){
      $scope.userData = firebaseAuth.getAuth().$getAuth();
      if($scope.userData){
        Spinner.loading();
        $state.go("tab.dash")
      }
    });

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
    	  
    $scope.loginUser = function(email, password){
      Spinner.loading();
      firebaseAuth.getAuth().$authWithPassword({
        email: email,
        password: password
      }).then(function(authData) {
          $state.go("tab.dash");
      }).catch(function(error) {
          console.error("Authentication failed:", error);
          Spinner.hideLoading();
      })
    };
    
  }
])

.controller('NewUserCtrl', function($scope, $state, firebaseRef, firebaseAuth, Spinner, $ionicModal){
  
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
      firebaseAuth.getAuth().$createUser({
        email: email,
        password: password
      }).then(function(auth){
        console.log("Created user with uid: " + auth.uid);
        firebaseAuth.getAuth().$authWithPassword({
          email: email,
          password: password
        }).then(function(auth){
          //pop up modal for user name here
          Spinner.hideLoading();
          $scope.modal.show();
        })
      }).catch(function(error){
        $scope.emailTaken = true;
        Spinner.hideLoading();
      })
    };//end createUser
    
    $scope.addUser = function(username){
      var auth = firebaseAuth.getUser();
      firebaseRef.child('username_lookup').child(username).set(auth.uid, function(error){
        if(error){
          $scope.usernameTaken = true;
        }
        else{
          firebaseRef.child('users').child(auth.uid).set({
            username: username,
            provider: firebaseAuth.getUser().provider,
            email: escapeEmail(firebaseAuth.getUser().password.email)
          }, function(){
            $scope.modal.hide();
            $state.go('tab.dash');
          })
        }
      })
    }
})

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
