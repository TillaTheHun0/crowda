/// <reference path="../../typings/angularjs/angular.d.ts"/>
angular.module('starter.services', ['firebase', 'ngResource'])

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
    }
  }
})

.factory('firebaseRef', ['$firebaseAuth', function($firebaseAuth){
    return new Firebase("https://crowda.firebaseio.com/");
  }
])

.factory('firebaseAuth', function($firebaseAuth, firebaseRef){
  var firebaseAuth = $firebaseAuth(firebaseRef);
  var userData = {};
  
  //$onAuth listens for changes in authentication state
  firebaseAuth.$onAuth(function(authData){
    if(authData){
      userData = authData;
      console.log("logged in as: " + userData.uid);
    }
    else{
      console.log("logged out");
    }
  });
  return{
    getAuth: function(){
      return firebaseAuth;
    },
    getUser: function(){
      return userData;
    },
    unauth: function(){
      firebaseAuth.$unauth();
    }
  }
})

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

.factory('Events', function($firebaseArray, firebaseRef){ //grab events for current user. Maybe use to see ther users events?
  /*
  Schema for Event:
      {
        "$event_id":{
            "name": "string",
            "description": "string",
            "createDt": "Date",
            "dateOf": "Date",
            "goal": "currency",
            "cur": "currency",
            "admin":["$username"],
            "location":{
                "lat": "number",
                "long": "number",
                "address": "string"
            },
            "members":[
                {
                    "$username":{
                        "status": "statusEnum || string",
                        "text": "string"
                    }
                }
            ],
            "picture": "url????",//any ideas?
            "private": "boolean"
        }
      }
  */
  var events = [
    {
          "name": "Fragile Masculinity",
          "description": "An event for men",
          "createDt": "2015-05-05",
          "dateOf": "2015-05-07",
          "goal": "1000.00",
          "cur": "20.00",
          "admin":["$username"],
          "location":{
              "lat": "32.90011",
              "long": "-79.91577799999999",
              "address": "2387 Clements Ferry Rd, Charleston, SC 29492, United States"
          },
          "members":[
              {
                  "$username":{
                      "status": "yes",
                      "text": "Sure, I guess..."
                  }
              }
          ],
          "picture": "https://derpiboo.ru/dis/mojo-jojo-thread",
          "private": "true"
      }
      ,
      {
          "name": "Mojo Failed",
          "description": "That sounds like a personal problem",
          "createDt": "2015-04-05",
          "dateOf": "2016-05-07",
          "goal": "10300.00",
          "cur": "2054.00",
          "admin":["$username"],
          "location":{
              "lat": "32.90011",
              "long": "-79.91577799999999",
              "address": "2387 Clements Ferry Rd, Charleston, SC 29492, United States"
          },
          "members":[
              {
                  "$username":{
                      "status": "no",
                      "text": "No, I guess..."
                  }
              },
              {
                  "$username":{
                      "status": "maybe",
                      "text": "Not sure, I guess..."
                  }
              }
          ],
          "picture": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS47Eb_CSgq_QShwJgeBKgiKR_RBzKM1ADuzFBalCbSaXVALEfmi8YOIQ",
          "private": "false"
      }
  ];
  
  return { //will actually be wrappers of firebase calls, but for now this will work
    get: function(){
      return events;
    }
    //CRUD
  }
 })

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
