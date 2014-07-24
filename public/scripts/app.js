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

    $stateProvider.state('home', {
      abstract: true,
      template: '<ui-view/>'
    })

    .state('home.landing', { 
      url: '/',
      controller: 'Landing.controller',
      templateUrl: '/templates/landing.html'
    })

    // Collection

    .state('home.collection', {
      abstract: true,
      controller: 'Collection.controller', 
      templateUrl: '/templates/collection.html'
    })
    
    .state('home.collection.player_bar', { 
      url: '/collection',
      templateUrl: '/templates/player_bar.html',
      controller: 'PlayerBar.controller'
    })
    
    // Album
    
    .state('home.album', {
      abstract: true,
      controller: 'Album.controller',
      templateUrl: '/templates/album.html'
    })

    .state('home.album.player_bar',{
      url: '/album',
      templateUrl: '/templates/player_bar.html',
      controller: 'PlayerBar.controller'
    })

    $stateProvider.state('album', {
      url: '/album',
      controller: 'Album.controller',
      templateUrl: '/templates/album.html'
    })

 }]);




angular
  .module('BlocJams')
  .controller('Landing.controller', ['$scope', function($scope) {

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

angular
  .module('BlocJams')
  .controller('Album.controller', ['$scope', 'SongPlayer', 'ConsoleLogger', function($scope, SongPlayer) {

  $scope.album = angular.copy(albumPicasso);

  var hoveredSong = null;

  $scope.onHoverSong = function(song) {
    hoveredSong = song;
  };

  $scope.offHoverSong = function(song) {
    hoveredSong = null;
  };

  $scope.getSongState = function(song) {
    if (song === SongPlayer.currentSong && SongPlayer.playing) {
      return 'playing';
    }
    else if (song === hoveredSong) {
      return 'hovered';
    }
    return 'default';
  };

  $scope.playSong = function(song) {
    SongPlayer.setSong($scope.album, song);
    SongPlayer.play();
  };

  $scope.pauseSong = function(song) {
    SongPlayer.pause();
  };

  $scope.isStripped = function(song,index) {
    
    var odd = {}; // empty object
    
    odd = index % 2 !== 0; // checking to see if its odd
    
    return odd; // returning true or false (true if its odd)

  };

}]);

angular
  .module('BlocJams')
  .controller('PlayerBar.controller', ['$scope', 'SongPlayer', 'ConsoleLogger', function($scope, SongPlayer, ConsoleLogger) {
  
  $scope.songPlayer = SongPlayer;
  $scope.consoleLogger = ConsoleLogger;
  
  consoleLogger.log();

}]);
 
angular
  .module('BlocJams')
  .service('SongPlayer', function() {
   
   return {
     currentSong: null,
     currentAlbum: null,
     playing: false,
 
     play: function() {
       this.playing = true;
     },
     pause: function() {
       this.playing = false;
     },
     setSong: function(album, song) {
       this.currentAlbum = album;
       this.currentSong = song;
     }
   };
 });

angular
  .module('BlocJams')
  .service('ConsoleLogger', function() {
  
  log: function() {
    console.log("hello world");
  } 
  
 });
