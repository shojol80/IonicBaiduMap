angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope,$http) {
      // Set the global API key
 $scope.$watch('$viewContentLoaded', function(){
 
     L.Mapzen.apiKey = "mapzen-M6Sq5AM";

      // Add a map to the #map div
      // Center on the Pigott building at Seattle University
        $scope.map = L.Mapzen.map("map", {
        center: ['23.7231','90.4086'],
        zoom: 16,
      });

var marker = L.marker(new L.LatLng('23.7231','90.4086'), {
    draggable: true
})
.bindPopup('Circle marker draggable')
.addTo($scope.map);
marker.on("dragend", function(e) {
    var marker = e.target;
   var position = marker.getLatLng();

    //console.log(position.lat);
   updateMarker(position.lat, position.lng);
      //alert(e._latlng);
    //console.log(e);

    //alert("s");
});


   function updateMarker(lat, lng) {


 marker.setLatLng([lat, lng]).bindPopup("loading place name...").openPopup();

$http({
        method: "GET",
        url: 'http://nominatim.openstreetmap.org/reverse?format=json&lat='+lat+'&lon='+lng+'&zoom=18&addressdetails=0'
      })
      .then(
          function (response) {
              console.log(response.data.display_name);
              $scope.location=response.data.display_name;
              marker.setLatLng([lat, lng]).bindPopup(response.data.display_name).openPopup();



         document.getElementsByClassName("leaflet-pelias-input")[0].value=response.data.display_name;
      



          },  
          function (error) {
              console.log('error');
          }
      );

        //return false;
    }

$scope.map.on('click', function(e) {
    //alert(e.latlng);
    updateMarker(e.latlng.lat, e.latlng.lng);
});





      // Disable autocomplete and set parameters for the search query
      var geocoderOptions = {
        autocomplete: true,
        expanded: true,
        params: {
          sources: 'wof'
        }
      };

      // Add the geocoder to the map, set parameters for geocoder options
     $scope.geocoder = L.Mapzen.geocoder(geocoderOptions);
     $scope.geocoder.addTo($scope.map);
     $scope.geocoder.addTo($scope.map).on('select', function (e) {
      console.log(e);
       updateMarker(e.latlng.lat, e.latlng.lng);
    }); 


 });


})

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
})
  .controller('LoginCtrl', function($scope,$state) {
    $scope.loginName = '';
    $scope.loginPassword = '';
    $scope.init = function(){};
    $scope.login = function(){
      console.log($scope.loginName);
      console.log($scope.loginPassword);
      if($scope.loginName =='admin'&&$scope.loginPassword =='admin'){
        $state.go("tab.dash");
      }
    }
  })

  .controller('SetupCtrl', function($scope) {
    //TODO
  })

;
