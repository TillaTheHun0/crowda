angular.module('starter.controllers', [])

.controller('LoginCtrl', ["$scope", "Firebase", "$state", function($scope, Firebase, $state, $ionicLoading){
    function authHandler(error, authData){
      if(error){
        console.log("Could not log in user");
      }
      else{
        console.log("logged in successfully with payload: " + authData.uid);
        $state.go("tab.dash")
      }
    };

    $scope.newuser = function(){
      $state.go("newuser");
    }

    $scope.loginUser = function(email, password){
      Firebase.connect().authWithPassword({
        email: email,
        password: password
      }, authHandler);
    };
  }
])

.controller('NewUserCtrl', function($scope, Firebase, $state){
    $scope.createUser = function(email, password){
      $scope.message = null;
      $scope.error = null;

      Firebase.connect().createUser({
          email: email,
          password: password
      }).then(function(UserData){
        $scope.message = "Logged in with uid:  " + UserData.uid;
        $state.go("tab.dash");
      }).catch(function(error){
        $scope.error = error;
      })
    };//end createUser
})

.controller('DashCtrl', function($scope) {})

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

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
