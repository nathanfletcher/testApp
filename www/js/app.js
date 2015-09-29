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
          controller: 'PlaylistsCtrl'
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
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/playlists');
});


testFetch.controller("FuelController",function($scope,$http){

  $scope.getData = function (){
  //https://script.google.com/macros/s/AKfycbx2tfQe5F4pEOdFpf99DM8rMWtg_B1JguFxugBIUPWz76IbEpk/exec -- this exec public works
  //https://script.googleusercontent.com/macros/echo?user_content_key=ufZ2RGT4ZbIHnlTLxtGnPxhPklcF6s8iXRSpyVLEpriUujW2KCbETKIugf5Q1kWhi-6g39wg8baH0Jc8nww_ZEh8omlitHHCm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnNB6anUFLacWNXkzaa_kPlm3sFhxsxz4ugmmNikkWj5bxz8Rd12PZMwnOFpDL6kfaA&lib=MTJMUDZTypXfnHVya28c7JCwsu2EIHoHF
    $http.get("https://script.google.com/macros/s/AKfycbx2tfQe5F4pEOdFpf99DM8rMWtg_B1JguFxugBIUPWz76IbEpk/exec")
      .success(function(data){
        $scope.omcs = data;
        //alert(omcs[0].name);
        //alert($scope.body);
      })
      .error(function(data){
        $scope.omcName = "Errorrrr";
        alert("Unsuccessful");
        //alert("Something went wrong with Array in the function in app.js");
      })
  }


  /*
  //https://cors-test.appspot.com/test
  $http.get(' unction(resp) {

      $scope.userID = resp.data.body;
      alert('hello '+$scope.userID);
    }, function(err) {
      console.error('ERR', err);
      alert('Error');
      // err.status will contain the status code
    })
    */
});
