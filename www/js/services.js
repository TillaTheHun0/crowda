/// <reference path="../../typings/angularjs/angular.d.ts"/>
angular.module('starter.services', ['firebase', 'ngResource'])

//=========API Services=========//

.factory('REST', function($resource){
  var baseUrl = 'http://localhost:3000/api/';
  return{
    login: function(){
      return $resource(baseUrl + 'login', {}, {
        'get': {method: 'GET'},
        'post': {method: 'POST'}
      });
    },
    signup: function(){
      return $resource(baseUrl+ 'signup', {}, {
        'post': {method: 'POST'}
      });
    },
    events: function(){
      return $resource(baseUrl+ 'Events', {}, {
        'get': {method: 'GET'}
      });
    },
    payment: function(){
      return $resource(baseUrl+ 'payment', {username:'@username'}, {
        'get': {method: 'GET', isArray:false}
      });
    }
  }
})


//===========Payment Services===========//

.factory('braintree', function(REST){
  var $braintree = {};
  
  $braintree.clientToken = null;

  Object.keys(braintree).forEach(function(key) {
    console.log(key);
    $braintree[key] = braintree[key];
  });
  
  function getClientToken(params, success, error) {
    return REST.payment().get(params, success, error);
  }

  $braintree.getClientToken = function() {
    return getClientToken();
  };

  $braintree.setupDropin = function(options) {
    getClientToken({username: 'tylerhall'},
    function(value, responseHeaders){
      console.log(value.token);
      braintree.setup(value.token, 'dropin', options);
      console.log('success');
    },
    function(httpResponse){
      console.log(httpResponse.data.error);
    });
  };

  $braintree.setupPayPal = function(options) {
    getClientToken()
      .success(function(token) {
        braintree.setup(token, 'paypal', options);
      })
      .error(function(data, status) {
        console.error('error fetching client token ' + data, status);
      });
  };

  return $braintree;
})

//=======Firebase Services=========//

.factory('firebaseRef', ['$firebaseAuth', function($firebaseAuth){
    return new Firebase("https://crowda.firebaseio.com/");
  }
])

.factory('firebaseAuth', function($firebaseAuth, firebaseRef, $rootScope){
  var firebaseAuth = $firebaseAuth(firebaseRef);
  
  function setCredentials(username){
    $rootScope.globals = {
        username: username
        //more to come here maybe
     }
  };
  //$onAuth listens for changes in authentication state
  firebaseAuth.$onAuth(function(authData){
    if(authData){
      console.log("Already authenticated. Logged in as: " + authData.uid);
      setCredentials(authData.uid);
    }
    else{
      console.log("logged out");
    }
  });
  return{
    getAuth: function(){
      return firebaseAuth;
    },
    unauth: function(){
      firebaseAuth.$unauth();
    },
    setCredentials: setCredentials
  }
})

//=========Utility Services==========//
.factory('Spinner', ['$ionicLoading', function($ionicLoading){   
    return {
      loading: function(){
        $ionicLoading.show({
          template: '<ion-spinner icon="spiral"></ion-spinner>',
          hideOnStateChange: true
        });
      },
      
      hideLoading: function(){
        $ionicLoading.hide();
      }
    }
}])

.factory('Chats', function() {
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png',
    city: 'Charleston'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460',
    city: 'Los Angeles'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg',
    city: 'New York'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png',
    city: 'blah'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png',
    city:'Virginia'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
