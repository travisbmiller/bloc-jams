var albumPicasso = {
  name: 'The Colors',
  artist: 'Pablo Picasso',
  label: 'Cubism',
  year: '1881',
  albumArtUrl: 'images/album-placeholder.png',
  songs: [
      { name: 'Blue', length: '4:26', audioUrl: '/music/placeholders/blue' },
       { name: 'Green', length: '3:14', audioUrl: '/music/placeholders/green' },
       { name: 'Red', length: '5:01', audioUrl: '/music/placeholders/red' },
       { name: 'Pink', length: '3:21', audioUrl: '/music/placeholders/pink' },
       { name: 'Magenta', length: '2:15', audioUrl: '/music/placeholders/magenta' }
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
  .controller('Collection.controller', ['$scope', 'SongPlayer', function($scope, SongPlayer) {
  

  $scope.albums = [];

  for (var i = 0; i < 33; i++) {
     $scope.albums.push(angular.copy(albumPicasso));
   }

   $scope.playAlbum = function(album){
    SongPlayer.setSong(album, album.songs[0]);
   }
  


}]);

angular
  .module('BlocJams')
  .controller('Album.controller', ['$scope', 'SongPlayer', function($scope, SongPlayer ) {
  


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
  .controller('PlayerBar.controller', ['$scope', 'SongPlayer',  function($scope, SongPlayer) {
  
  $scope.songPlayer = SongPlayer;
  
}]);
 
angular
  .module('BlocJams')
  .service('SongPlayer', function() {
    var currentSoundFile = null;
    var trackIndex = function(album, song) {
        return album.songs.indexOf(song);
    };

   return {
    currentSong: null,
    currentAlbum: null,
    playing: false,
    
 
    play: function() {
      this.playing = true;
      currentSoundFile.play();
    },
    pause: function() {
      this.playing = false;
      currentSoundFile.pause();
    },
    setSong: function(album, song) {
      if (currentSoundFile) {
        currentSoundFile.stop();
      }
       
      this.currentAlbum = album;
      this.currentSong = song;
      currentSoundFile = new buzz.sound(song.audioUrl, {
        formats: [ "mp3" ],
        preload: true
       });

      this.play();
    },
    next: function() {
      var currentTrackIndex = trackIndex(this.currentAlbum, this.currentSong);
      currentTrackIndex++;
      
      if (currentTrackIndex >= this.currentAlbum.songs.length) {
        currentTrackIndex = 0;
      }
      
      var song = this.currentAlbum.songs[currentTrackIndex];
      this.setSong(this.currentAlbum, song);
    },
    previous: function(){
      var currentTrackIndex = trackIndex(this.currentAlbum, this.currentSong);
      currentTrackIndex--;
      
      if (currentTrackIndex < 0) {
        currentTrackIndex = this.currentAlbum.songs.length - 1;
      }

      var song = this.currentAlbum.songs[currentTrackIndex];
      this.setSong(this.currentAlbum, song);
    },
  };
});

angular
  .module('BlocJams')
  .directive('slider', function(){
    
    var updateSeekPercentage = function($seekBar, event) {
     var barWidth = $seekBar.width();
     var offsetX =  event.pageX - $seekBar.offset().left;
 
     var offsetXPercent = (offsetX  / $seekBar.width()) * 100;
     offsetXPercent = Math.max(0, offsetXPercent);
     offsetXPercent = Math.min(100, offsetXPercent);
 
     var percentageString = offsetXPercent + '%';
     $seekBar.find('.fill').width(percentageString);
     $seekBar.find('.thumb').css({left: percentageString});
    }

    return {
     templateUrl: '/templates/directives/slider.html', 
     replace: true,
     restrict: 'E',
     link: function(scope, element, attributes) {
      
        var $seekBar = $(element);
   
        $seekBar.click(function(event) {
          updateSeekPercentage($seekBar, event);
        });
   
        $seekBar.find('.thumb').mousedown(function(event){
        $seekBar.addClass('no-animate');
   
        $(document).bind('mousemove.thumb', function(event){
            updateSeekPercentage($seekBar, event);
        });
   
          //cleanup
        $(document).bind('mouseup.thumb', function(){
          $seekBar.removeClass('no-animate');
          $(document).unbind('mousemove.thumb');
          $(document).unbind('mouseup.thumb');
        });
   
      });
    }
   };
  });

angular
  .module('BlocJams')
  .directive('clickme', function(){

  return {
     templateUrl: '/templates/directives/clickme.html', 
     replace: true,
     restrict: 'E',
     link: function(scope, element, attributes) {
      
      $clickMe = element;

      $clickMe.click(function(){
       alert("it worked! Ya!");
      });
    }
  }
});

angular
  .module('BlocJams')
  .directive('classify', function(){

    

  return {
    replace: true,
    restrict: 'EAC',
    link: function(scope, element, attributes) {
      
      
      var classInput = $(element).text();
      $(element).addClass(classInput);
  
    }
  }
});

  angular
  .module('BlocJams')
  .directive('counthovertime', function(){

    

  return {
    templateUrl: '/templates/directives/clickme.html',
    replace: true,
    restrict: 'A',
    link: function(scope, element, attributes) {
      
      var $hovedElement = element,
                  count = 0,
              timerIsOn = 0,
                      t;
      
      // this add 1 to the counter and then refirers every sec adding 1 to the counter
      var countTimer = function(){
        count = count + 1;
        
        t = setTimeout(function(){countTimer()}, 1000);
      };

      var startTimer = function() {
          timerIsOn = 1;
          countTimer();
      };

      var stopTimer = function() {
        clearTimeout(t);
        timerIsOn = 0;
      };

      $hovedElement.hover(function(){
          
          // setting count back to 0 for new hover
          if (count !== 0) {
            count = 0;
          }
          
          //firing countTimer after 1 sec of hover time
          setTimeout(function(){ startTimer() }, 1000);

        }, function(){

          // stop out timer
          stopTimer();

          // hover off will console log count
          console.log("You hoved over this element for " + count + " seconds");
          
        }
      )  
    }  
  }
});

 
