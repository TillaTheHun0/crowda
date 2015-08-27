/// <reference path="../../typings/angularjs/angular.d.ts"/>
angular.module('starter.services', ['firebase'])

.factory('Firebase', ['$firebaseAuth', function($firebaseAuth){
    var ref = new Firebase("https://crowda.firebaseio.com/");
    var firebaseAuth = $firebaseAuth(ref);
    firebaseAuth.$onAuth(function(authData){
      if(authData){
        //setup user data here. May make super factory ie firebase endpoint service
        console.log("logged in as: " + authData.uid);
      }
      else{
        console.log("logged out");
      }
    });
    return {
      auth: function(){
        return firebaseAuth;
      }
    }
  }
])

.factory('Events', function($firebaseAuth){
  //factory for handling events for user. Will include full CRUD for events in backend
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
