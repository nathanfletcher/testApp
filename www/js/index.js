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



testFetch.controller("FuelController", function($scope,$http,$ionicLoading){
  $ionicLoading.show({template:"Loading prices..."})
  //Im puting the main operation outside the function so that it runs immediately

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
        })
        $ionicLoading.hide();
  $scope.getData = function (){
  //https://script.google.com/macros/s/AKfycbx2tfQe5F4pEOdFpf99DM8rMWtg_B1JguFxugBIUPWz76IbEpk/exec -- this exec public works
  //https://script.googleusercontent.com/macros/echo?user_content_key=ufZ2RGT4ZbIHnlTLxtGnPxhPklcF6s8iXRSpyVLEpriUujW2KCbETKIugf5Q1kWhi-6g39wg8baH0Jc8nww_ZEh8omlitHHCm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnNB6anUFLacWNXkzaa_kPlm3sFhxsxz4ugmmNikkWj5bxz8Rd12PZMwnOFpDL6kfaA&lib=MTJMUDZTypXfnHVya28c7JCwsu2EIHoHF
    /*$http.get("https://script.google.com/macros/s/AKfycbx2tfQe5F4pEOdFpf99DM8rMWtg_B1JguFxugBIUPWz76IbEpk/exec")
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

FPApp.controller("DieselController", function($scope,$http,$ionicLoading){
  $ionicLoading.show({template:"Loading prices..."})
  //Im puting the main operation outside the function so that it runs immediately

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
        })
        $ionicLoading.hide();
  }

);
