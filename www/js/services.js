/// <reference path="../../typings/angularjs/angular.d.ts"/>
angular.module('starter.services', ['firebase', 'ngResource'])

.factory('Auth', function($resource){
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

.factory('Friends', function(firebaseRef, $firebaseArray, firebaseAuth){
  return $firebaseArray(firebaseRef.child('users').child(firebaseAuth.getUser().uid).child('friends'));
})

.factory('Events', function($firebaseArray, firebaseRef){ //grab events for current user. Maybe use to see ther users events?
  /*
  Schema for Event:
  {
    name: String,
    img: image,
    location: {
      long: num,
      lat: num
    },
    date: date,
    goal: currency,
    current: currency,
    attendees:[users], //will have to implement synchronized array methods here
    url: String
  }
  */
  var events = [
    {
      name: 'Team outing to Velocity Air Sports',
      img: 'http://www.velocityairsports.com/images/VelocityAirSports_logo.jpg',//user would upload image
      location:{//probably wont need to use this rn
        long: 123,
        lat:321
      },
      date: "08/25/15 7:00 PM EST",//could be date object instead.
      goal: 250,
      current: 120,
      attendees: ['bruce@gmail.com', 'tyler@mail.com'], //could be usernames later
      url: 'http://giphy.com/search/nicholas-cage' //url to event page
    },
    {
      name: 'Movies',
      img: 'http://static.boydgaming.net/samstownlv10/media/gallery/ST_Entertain-Movie_Theater-375347-full.jpg',
      location:{//probably wont need to use this rn
        long: 123,
        lat:321
      },
      date: "09/16/15 10:00 PM EST",//could be date object instead.
      goal: 75,
      current: 16,
      attendees: ['bruce@gmail.com', 'malin@gmail.com'], //could be usernames later
      url: 'http://giphy.com/search/nicholas-cage' //url to event page
    },
    {
      name: 'Bonaroo',
      img: 'http://www.bonnaroo.com/sites/default/files/content-files/images/broo-fb.jpg?123',
      location:{//probably wont need to use this rn
        long: 123,
        lat:321
      },
      date: "06/24/16 7:00 PM EST",//could be date object instead.
      goal: 400,
      current: 66,
      attendees: ['bruce@gmail.com', 'malin@gmail.com'], //could be usernames later
      url: 'http://giphy.com/search/nicholas-cage' //url to event page
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
