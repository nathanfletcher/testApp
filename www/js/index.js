var FPApp = angular.module("FPApp", ["ionic"]);

FPApp.service("FPSvc", ["$http", "$rootScope", FPSvc]);

FPApp.controller("FPCtrl",
    ["$scope", "$sce",
     "$ionicLoading", "$ionicListDelegate", "$ionicPlatform",
     "FPSvc", FPCtrl]);

function FPCtrl($scope, $sce, $ionicLoading, $ionicListDelegate, $ionicPlatform, FPSvc) {

    $ionicLoading.show({template: "Loading blogs..."});

    $scope.deviceReady = false;

    $ionicPlatform.ready(function() {
        $scope.$apply(function() {
            $scope.deviceReady = true;
        });
    });

    $scope.blogs = [];
    $scope.params = {};

    $scope.$on("FPApp.blogs", function(_, result) {
        result.posts.forEach(function(b) {
            $scope.blogs({
                name: b.author.name,
                /*avatar_URL: b.author.avatar_URL,
                title: $sce.trustAsHtml(b.title),
                URL: b.URL,
                excerpt: $sce.trustAsHtml(b.excerpt),
                featured_image: b.featured_image*/
            });
        });

        $scope.params.before = result.date_range.oldest;

        $scope.$broadcast("scroll.infiniteScrollComplete");
        $scope.$broadcast("scroll.refreshComplete");
        $ionicLoading.hide();
    });

    $scope.loadMore = function() {
        FPSvc.loadBlogs($scope.params);
    }
    $scope.reload = function() {
        $scope.blogs = [];
        $scope.params = {};
        FPSvc.loadBlogs();
    }

    $scope.show = function($index) {
        cordova.InAppBrowser.open($scope.blogs[$index].URL, "_blank", "location=no");
    }
    $scope.share = function($index) {
        $ionicListDelegate.closeOptionButtons();
        window.socialmessage.send({
            url: $scope.blogs[$index].URL
        });
    }

}

function FPSvc($http, $rootScope) {
    this.loadBlogs = function(params) {
    //WordPress freshly pressed JSON link https://public-api.wordpress.com/rest/v1/freshly-pressed/
        $http.get("https://script.google.com/macros/s/AKfycbx2tfQe5F4pEOdFpf99DM8rMWtg_B1JguFxugBIUPWz76IbEpk/exec", {
                params: params})
            .success(function(result) {
                $rootScope.$broadcast("FPApp.blogs", result);
            });
    }
}


//Working on services from this point on so that I can pass data between views


//This is the one that should be working to pull all OMC's from database
FPApp.controller("DieselController", function($scope,$http,$ionicLoading){
  $ionicLoading.show({template:"Loading prices..."})
  //Im puting the main operation outside the function so that it runs immediately
  // Apps script sample data JSON Beta link https://script.google.com/macros/s/AKfycbx2tfQe5F4pEOdFpf99DM8rMWtg_B1JguFxugBIUPWz76IbEpk/exec
  $http.get("http://localhost:8888/omcsave")
        .success(function(data){
          $scope.omcs = data;
          //alert(omcs[0].name);
          //alert($scope.body);
        })
        .error(function(data){
          $scope.omcName = "Errorrrr";
          //alert("Unsuccessful");
          //alert("Something went wrong with Array in the function in app.js");
        })
        $ionicLoading.hide();
  }

)

//This controller shows and hides details
testFetch.controller("toggleShowCtrl",function($scope) {
                                          $scope.myVar = true;
                                          $scope.otherVar=false;
                                          $scope.toggle = function() {
                                              $scope.myVar = !$scope.myVar;
                                              $scope.otherVar = !$scope.otherVar;
                                          }
                                          });
