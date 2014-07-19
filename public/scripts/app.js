var albumPicasso = {
  name: 'The Colors',
  artist: 'Pablo Picasso',
  label: 'Cubism',
  year: '1881',
  albumArtUrl: 'images/album-placeholder.png',
  songs: [
      {name: 'Blue', length: '4:26'},
      {name: 'Green', length: '3:14'},
      {name: 'Red', length: '5:01'},
      {name: 'Pink', length: '3:21'},
      {name: 'Magenta', length: '2:15'}
    ]
};

var albumMarconi = {
  name: 'The Telephone',
  artist: 'Guglielmo Marconi',
  label: 'EM',
  year: '1909',
  albumArtUrl: '/images/album-placedholder.png',
  songs: [
      {name: 'Hello, Operator', length: '1:01'},
      {name: 'Ring, ring, ring', length: '5:01'},
      {name: 'Fits in your pocket', length: '3:21'},
      {name: 'Con yo uhear me now?', length: '3:14'},
      {name: 'Wrong phone number', length: '2:15'}
    ]
};


angular
  .module('BlocJams', ['ui.router']) //array means DEFINE THE MODULE
  .config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $stateProvider.state('landing', { //$templateCache
      url: '/',
      controller: 'Landing.controller',
      templateUrl: '/templates/landing.html'
    });

    $stateProvider.state('collection', {
      url: '/collection',
      controller: 'Collection.controller', 
      templateUrl: '/templates/collection.html'
    });

    $stateProvider.state('collection.playerbar', {
      templateUrl: '/templates/player_bar.html'
    });

    $stateProvider.state('song', {
      url: '/song',
      templateUrl: '/templates/song.html'
    });  


 }]);




angular
  .module('BlocJams')
  .controller('Landing.controller', ['$scope', function($scope) {

  console.log("Landing.controller");
  $scope.blocTitle = "Bloc Jams";
  $scope.subText = "Turn the music up!";
 
  $scope.subTextClicked = function() {
    $scope.subText += '!';
  };
 
  $scope.shufflePictures = function(o) {
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
  };

 $scope.albumURLs = [
     '/images/album-placeholders/album-1.jpg',
     '/images/album-placeholders/album-2.jpg',
     '/images/album-placeholders/album-3.jpg',
     '/images/album-placeholders/album-4.jpg',
     '/images/album-placeholders/album-5.jpg',
     '/images/album-placeholders/album-6.jpg',
     '/images/album-placeholders/album-7.jpg',
     '/images/album-placeholders/album-8.jpg',
     '/images/album-placeholders/album-9.jpg',
   ];

 }]);

angular
  .module('BlocJams')
  .controller('Collection.controller', ['$scope', function($scope) {
    
  $scope.albums = [];

  for (var i = 0; i < 33; i++) {
     $scope.albums.push(angular.copy(albumPicasso));
   }

  

}]);



