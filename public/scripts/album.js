

var albumPicasso = {
  name: 'The Colors',
  artist: 'Pablo Picasso',
  label: 'Cubism',
  year: '1881',
  albumArtUrl: '/images/album-placedholder.png',
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

var currentlyPlayingSong = null;

var createSongRow = function(songNumber, songName, songLength) {
  var template =
      '<tr>'
    + '  <td class="song-number col-md-1" data-song-number="' + songNumber + '">' + songNumber + '</td>'
    + '  <td class="col-md-9">' + songName + '</td>'
    + '  <td class="col-md-2">' + songLength + '</td>'
    + '</tr>'
    ;

  var $row = $(template);

  var onHover = function(event) {
    
    songNumberCell = $(this).find('.song-number');
    
    songNumber = songNumberCell.data('song-number');
    
    if (songNumber !== currentlyPlayingSong) {
      songNumberCell.html('<a class="album-song-button"><i class="fa fa-play"></i></a>');
    }
  
  };

  var offHover = function(event) {
    
    songNumberCell = $(this).find('.song-number');
    
    songNumber = songNumberCell.data('song-number');
    
    if (songNumber !== currentlyPlayingSong) {
      songNumberCell.html(songNumber);
    }
  
  };

  var clickHandler = function(event){
    
    songNumber = $(this).data('song-number');

    if (currentlyPlayingSong !== null) {
       // Revert to song number for currently playing song because user started playing new song.
       currentlyPlayingCell = $('.song-number[data-song-number="' + currentlyPlayingSong + '"]');
       currentlyPlayingCell.html(currentlyPlayingSong);
     }
 
     if (currentlyPlayingSong !== songNumber) {
       // Switch from Play -> Pause button to indicate new song is playing.
       $(this).html('<a class="album-song-button"><i class="fa fa-pause"></i></a>');
       currentlyPlayingSong = songNumber;
     }
     else if (currentlyPlayingSong === songNumber) {
       // Switch from Pause -> Play button to pause currently playing song.
       $(this).html('<a class="album-song-button"><i class="fa fa-play"></i></a>');
       currentlyPlayingSong = null;
     }

  };


  $row.find('.song-number').click(clickHandler);
  $row.hover( onHover , offHover );
  return $row;

};

var changeAlbumView = function(album) {
  var songs = album.songs,
      $albumTitle = $('.album-title'),
      $albumArtist = $('.album-artist'),
      $albumMate = $('.album-meta-info'),
      $songList = $('.album-song-listing');


  $albumTitle.text(album.name);

  
  $albumArtist.text(album.artist);


  $albumMate.text(album.year + " on " + album.label);
 

  $songList.empty();
  
  for (var i = 0; i < songs.length; i++) {
    
    var songData = songs[i],
        $newRow = createSongRow(i+1, songData.name, songData.length);
    
    $songList.append($newRow);
  } 

};

var updateSeekPercentage = function($seekBar, event) {
  var barWidth = $seekBar.width();
  var offsetX = event.pageX - $seekBar.offset().left;

  var offsetXPercent = (offsetX  / $seekBar.width()) * 100;
  offsetXPercent = Math.max(0, offsetXPercent);
  offsetXPercent = Math.min(100, offsetXPercent);

  var percentageString = offsetXPercent + '%';
  $seekBar.find('.fill').width(percentageString);
  $seekBar.find('.thumb').css({left: percentageString});
}

var setupSeekBars = function(){

  $seekBars = $('.player-bar .seek-bar');
  $seekBars.click(function(){
    updateSeekPercentage($(this), event);
  });

  $seekBars.find('.thumb').mousedown(function(event){
    var $seekBar = $(this).parent();
    
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

};

var albums = [albumPicasso,albumMarconi];
    var count = 0;
    
    $('.album-placeholder').click(function(){
      if (count > albums.length -2 ){
        count = 0;
      } else {
        count = count + 1;
      }
      changeAlbumView(albums[count]);
      
    });





if (document.URL.match(/\/album.html/)) {
   // Wait until the HTML is fully processed.
   $(document).ready(function() {
    
    changeAlbumView(albums[count]);
    setupSeekBars();
    


   });
 }





