// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var testFetch = angular.module('starter', ['ionic', 'starter.controllers','ngCordova'])

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
          templateUrl: 'templates/browse.html',
          controller: 'OmcNews',
          resolve: {
                             theOmcNews: [ "OmcNewsService" , "$stateParams",function(OmcNewsService, $stateParams) {
                                    console.log("inside brwse resolve mentod");
                                    console.log(OmcService.getOmcNews());
                                    return OmcService.getOmcNews();
                             }]
                            }

        }
      }
    })
  .state('app.playlists', {
    url: '/playlists',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlists.html',
        //controller: 'PlaylistsCtrl'
        //controller: 'GetAll'
        //controller: 'FuelController'
        controller: 'EndpointsGetAll',
        resolve: {
                 theOmcs: [ "OmcService" , "$stateParams",function(OmcService, $stateParams) {
                        /*
                       output = OmcService.getOmcs();
                       console.log("resolve method");
                       console.log(output.items);
                        return output.items;
                        */

                        console.log(OmcService.getOmcs());
                        return OmcService.getOmcs();
                 }]
                }
    }
}
  })
  .state('app.diesel', {
     url: '/diesel',
     views: {
       'menuContent': {
       templateUrl: 'templates/diesel.html',
       //controller: 'PlaylistsCtrl',
       //controller: 'FuelController',
       controller: 'EndpointsGetAll',
       resolve: {
                theOmcs: [ "OmcService" , "$stateParams",function(OmcService, $stateParams) {
                       console.log(OmcService.getOmcs());
                       return OmcService.getOmcs();
                }]
               }
       }
     }
  })
  .state('app.kerosene', {
      url: '/kerosene',
      views: {
         'menuContent': {
           templateUrl: 'templates/kerosene.html',
           //controller: 'PlaylistsCtrl'
           //controller: 'FuelController'
           controller: 'EndpointsGetAll',

           resolve: {
                           theOmcs: [ "OmcService" , "$stateParams",function(OmcService, $stateParams) {
                                  console.log(OmcService.getOmcs());
                                  return OmcService.getOmcs();
                           }]
                          }

          }
        }
      })
  .state('app.lpg', {
      url: '/lpg',
      views: {
         'menuContent': {
           templateUrl: 'templates/lpg.html',
           //controller: 'PlaylistsCtrl'
           //controller: 'FuelController'
           controller: 'EndpointsGetAll',
        resolve: {
         theOmcs: [ "OmcService" , "$stateParams",function(OmcService, $stateParams) {
                console.log(OmcService.getOmcs());
                return OmcService.getOmcs();
         }]
        }

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
.controller("FuelController", function($scope,$http,$ionicLoading,$timeout,$ionicPopup){

  // Setup the loader
  $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });


  // Set a timeout to clear loader, however you would actually call the $ionicLoading.hide(); method whenever everything is ready or loaded.
    $timeout(function () {


  //Im puting the main operation outside the function so that it runs immediately
  //setTimeout(this, 3000)

  $http.get("http://fuelpostapp.appspot.com/omcread")
        .success(function(data){
          $scope.omcs = data;

          $ionicLoading.hide();

          $scope.hide = function(){
              $ionicLoading.hide();
            };

          //alert(omcs[0].name);
          //alert($scope.body);
        })
        .error(function(data){
          $scope.err = "Check Iternet connection";
          //alert("Please check your Internet connection and try again");
          var alertPopup = $ionicPopup.alert({
               title: 'Bad Connection',
               template: 'Please check your Internet connection'
             });
             alertPopup.then(function(res) {
               console.log('Bad Internet connection ');
             });
          //alert("Something went wrong with Array in the function in app.js");
        })
        $ionicLoading.hide();
            }, 3000);

})
.controller("AllOMCController", function($scope, omcdata){
    var objarr = [];
    //objarr = list;
    $scope.fill = omcdata;
    //$scope.fs = omcdata.getOmcData;
    alert($scope.fill[0].name);
  }
)
.controller("OmcNews", function($scope,$http,$ionicLoading,$timeout,$ionicPopup,OmcNewsService,theOmcNews){
//https://ajax.googleapis.com/ajax/services/search/news?v=1.0&rsz=8&q=oil%20news%20ghana
  // Setup the loader
  $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });


  // Set a timeout to clear loader, however you would actually call the $ionicLoading.hide(); method whenever everything is ready or loaded.
    $timeout(function () {


  //Im puting the main operation outside the function so that it runs immediately
  //setTimeout(this, 3000)
  if($scope.omcInfo == null){
    $scope.omcInfo = theOmcNews;

  }
        $ionicLoading.hide();
            }, 3000)

  })
.controller("ShareController", function($scope, $cordovaSocialSharing) {

    $scope.shareAnywhere = function() {
        $cordovaSocialSharing.share("Check out the latest fuel prices on the new FuelPost App", "FuelPost App", "http://gloriousgroup.net/wp-content/uploads/2014/11/1247_Gas-Station1.jpg", "http://kcutlife.appspot.com/#/app/playlists");
    }

    $scope.shareViaTwitter = function(message, image, link) {
        $cordovaSocialSharing.canShareVia("twitter", message, image, link).then(function(result) {
            $cordovaSocialSharing.shareViaTwitter(message, image, link);
        }, function(error) {
            alert("Cannot share on Twitter");
        });
    }

})
.factory("OmcService", function($http){
console.log("Initial value of allOmcs[]");
  var allOmcs;
console.log(allOmcs);

  return {
          getOmcs: function(){

                        //Putting AppEngine Endpoints Javascript code here - Start
                           if(allOmcs==null || allOmcs == "undefined"){
                           console.log("this.allOmc is null!!!!!")
                            return  $http.get("https://fuelpostapp.appspot.com/_ah/api/fuelpost/v1/omccollection")
                                    .then(function(res) {
                                                //console.log(res.data.items) // shows the array
                                                var output = [];
                                                output = res.data.items;
                                                //console.log("output variable ");
                                                //console.log(output);
                                                this.allOmcs = output;
                                                //console.log("new value of allOmcs after putting it in");
                                                //console.log(this.allOmcs);
                                                //return this.allOmcs;
                                                //console.log("see what I'm returning in the getOmcs function");
                                                //console.log(allOmcs);
                                                return output;
                                            });
                            }

                              /*
                                  gapi.client.fuelpost.getAllOmcAlphabetical().execute(function(resp) {
                                                          return resp.items;
                                                  });
                              */



                         //Putting AppEngine Endpoints Javascript code here - End
                         /*
                         $http.get('https://fuelpostapp.appspot.com/_ah/api/fuelpost/v1/omccollection').success(function(data){
                          allOmcs = data;
                          return allOmcs.items;
                         });
                         allOmcs = https://fuelpostapp.appspot.com/_ah/api/fuelpost/v1/omccollection
                         */
                       },

          getOmc: function(name){
                      for(i=0;i<allOmcs.length;i++){
                      				if(allOmcs[i].name == name){
                      					return users[i];
                      				}
                      }
                      return null;
          }

}
})
.factory("OmcNewsService", function($http){
console.log("OMC NEWS VALUE");
  var allOmcs;
console.log(allOmcs);

  return {
          getOmcNews: function(){

                        //Putting AppEngine Endpoints Javascript code here - Start
                           console.log("getOmcNews function is null!!!!!")
                            return  $http.get("https://ajax.googleapis.com/ajax/services/search/news?v=1.0&num=8&q=oil%20news%20ghana")
                                    .then(function(res) {
                                                //console.log(res.data.items) // shows the array
                                                var output = [];
                                                output = res.data.results;
                                                console.log("NEWS output variable ");
                                                console.log(output);
                                                this.allOmcs = output;
                                                //console.log("new value of allOmcs after putting it in");
                                                //console.log(this.allOmcs);
                                                //return this.allOmcs;
                                                //console.log("see what I'm returning in the getOmcs function");
                                                //console.log(allOmcs);
                                                return output;
                                            });


                              /*
                                  gapi.client.fuelpost.getAllOmcAlphabetical().execute(function(resp) {
                                                          return resp.items;
                                                  });
                              */



                         //Putting AppEngine Endpoints Javascript code here - End
                         /*
                         $http.get('https://fuelpostapp.appspot.com/_ah/api/fuelpost/v1/omccollection').success(function(data){
                          allOmcs = data;
                          return allOmcs.items;
                         });
                         allOmcs = https://fuelpostapp.appspot.com/_ah/api/fuelpost/v1/omccollection
                         */
                       },

          getOmc: function(name){
                      for(i=0;i<allOmcs.length;i++){
                      				if(allOmcs[i].name == name){
                      					return users[i];
                      				}
                      }
                      return null;
          }

}
})
.controller("GetAll", function($scope, $stateParams, OmcService, $ionicLoading,$timeout,$ionicPopup) {
// Setup the loader
  $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });

     $timeout(function () {


    //Im puting the main operation outside the function so that it runs immediately
    //setTimeout(this, 3000)

  OmcService.getOmcs().then(function(stuff){
    var realData = stuff;
    $scope.omcs = realData;
	},function(error){

          $scope.err = "Check Iternet connection";
          //alert("Please check your Internet connection and try again");
          var alertPopup = $ionicPopup.alert({
               title: 'Bad Connection',
               template: 'Please check your Internet connection'
             });
             alertPopup.then(function(res) {
               console.log('Bad Internet connection ');
             });
	}	)
	$ionicLoading.hide();
                }, 2000);;
})
.controller("EndpointsGetAll", function($scope, $stateParams, OmcService, $ionicLoading,$timeout,$ionicPopup, theOmcs) {
// Setup the loader
    console.log("this is the Endpoints controller output");
    console.log(theOmcs);

  $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });

  $timeout(function () {


    //Im puting the main operation outside the function so that it runs immediately
    //setTimeout(this, 3000)



    //Putting AppEngine Endpoints Javascript code here - Start
    if ($scope.omcs == null){

    $scope.omcs = theOmcs;


    /*
    gapi.client.fuelpost.getAllOmcAlphabetical().execute(function(resp) {
                            $scope.omcs = resp.items;
                    });
    */
    /*
      $http.get("https://fuelpostapp.appspot.com/_ah/api/fuelpost/v1/omccollection")
            .success(function(data){
              $scope.omcs = data.items;

              $ionicLoading.hide();

              $scope.hide = function(){
                  $ionicLoading.hide();
                };

              //alert(omcs[0].name);
              //alert($scope.body);
            });
     */
    }
    else{

    }
    //Putting AppEngine Endpoints Javascript code here - End

	$ionicLoading.hide() }, 2000);
});

