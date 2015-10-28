// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var testFetch = angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
  .state('app.playlists', {
    url: '/playlists',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlists.html',
        //controller: 'PlaylistsCtrl'
        controller: 'FuelController'
      }
    }
  })
  .state('app.diesel', {
     url: '/diesel',
     views: {
       'menuContent': {
       templateUrl: 'templates/diesel.html',
       //controller: 'PlaylistsCtrl'
       controller: 'FuelController'
       }
     }
  })
  .state('app.kerosene', {
      url: '/kerosene',
      views: {
         'menuContent': {
           templateUrl: 'templates/kerosene.html',
           //controller: 'PlaylistsCtrl'
           controller: 'FuelController'
          }
        }
      })
  .state('app.omcs', {
        url: '/omcs',
        views: {
           'menuContent': {
             templateUrl: 'templates/omcs.html',
             //controller: 'FuelController'
             controller: 'AllOMCController'
            }
          }
        })
  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  })
  .state('app.chats', {
        url: '/chats',
        views: {
          'menuContent': {
            templateUrl: 'templates/tab-chats.html',
            controller: 'ChatsCtrl'
          }
        }
  })
  .state('app.chat-detail', {
        url: '/chats/:chatId',
        views: {
          'menuContent': {
            templateUrl: 'templates/chat-detail.html',
            controller: 'ChatDetailCtrl'
          }
        }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/playlists');
})
.controller("FuelController", function($scope,$http,$ionicLoading){
  $ionicLoading.show({template:"Loading prices..."});

  //Im puting the main operation outside the function so that it runs immediately
  //setTimeout(this, 3000)
  $http.get("http://fuelpostapp.appspot.com/omcread")
        .success(function(data){
          $scope.omcs = data;
          //alert(omcs[0].name);
          //alert($scope.body);
        })
        .error(function(data){
          $scope.err = "Check Iternet connection";
          //alert("Please check your Internet connection and try again");
           $scope.showAlert = function() {
               var alertPopup = $ionicPopup.alert({
                 title: 'Don\'t eat that!',
                 template: 'It might taste good'
               });
               alertPopup.then(function(res) {
                 console.log('Thank you for not eating my delicious ice cream cone');
               });
             };
          //alert("Something went wrong with Array in the function in app.js");
        })
        $ionicLoading.hide();
  $scope.getData = function (){
  /*
  $http.get("https://script.google.com/macros/s/AKfycbx2tfQe5F4pEOdFpf99DM8rMWtg_B1JguFxugBIUPWz76IbEpk/exec")
      .success(function(data){
        $scope.omcs = data;
        //alert(omcs[0].name);
        //alert($scope.body);
      })
      .error(function(data){
        $scope.omcName = "Errorrrr";
        //alert("Unsuccessful");
        //alert("Something went wrong with Array in the function in app.js");
      })*/
  }

})
.controller("AllOMCController", function($scope, omcdata){
    var objarr = [];
    //objarr = list;
    $scope.fill = omcdata;
    //$scope.fs = omcdata.getOmcData;
    alert($scope.fill[0].name);
  }
);

