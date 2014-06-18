

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


var createSongRow = function(songNumber, songName, songLength) {
  var template =
      '<tr>'
    + '  <td class="col-md-1">' + songNumber + '</td>'
    + '  <td class="col-md-9">' + songName + '</td>'
    + '  <td class="col-md-2">' + songLength + '</td>'
    + '</tr>'
    ;

  return $(template);
};

var changeAlbumView = function(album) {
  var songs = album.songs,
      $albumTitle = $('.album-title'),
      $albumArtist = $('.album-artist'),
      $ablumMate = $('.album-meta-info'),
      $songList = $('.album-song-listing');


  $albumTitle.text(album.name);

  
  $albumArtist.text(album.artist);


  $ablumMate.text(album.year + " on " + album.label);
 

  $songList.empty();
  
  for (var i = 0; i <songs.length; i++) {
    
    var songData = songs[i],
        $newRow = createSongRow(i+1, songData.name, songData.length);
    
    $songList.append($newRow);
  }

};







if (document.URL.match(/\/album.html/)) {
   // Wait until the HTML is fully processed.
   $(document).ready(function() {
    
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
    
    
    changeAlbumView(albums[count]);

    console.log(count);


   });
 }





