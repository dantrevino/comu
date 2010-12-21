function success(position) {
  var s = document.querySelector('#status');
  
  if (s.className == 'success') {
    // not sure why we're hitting this twice in FF, I think it's to do with a cached result coming back    
    return;
  }
  
  s.innerHTML = "found you! " + position.coords.latitude + "," + position.coords.longitude;
  s.className = 'success';
  
  var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
  var myOptions = {
    zoom: 15,
    center: latlng,
    mapTypeControl: false,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(document.getElementById("mapcanvas"), myOptions);
  
  var marker = new google.maps.Marker({
      position: latlng, 
      map: map, 
      title:"You are here!"
  });
} // success

function error(msg) {
  var s = document.querySelector('#status');
  s.innerHTML = typeof msg == 'string' ? msg : "failed";
  s.className = 'fail';
} //error

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(success, error);
} else {
  error('not supported');
}

var news = 'http://query.yahooapis.com/v1/public/yql/dantrevino/uwn-latest?format=json&diagnostics=true';
$.getJSON( news, function (data) {
  for (var i=0;i < data.query.count; i++) {
    $('#news').append("<p><a href='" + data.query.results.rss[i].channel.item.link + "'>" + data.query.results.rss[i].channel.item.title + "</a>");
  }
});

var planet = 'http://query.yahooapis.com/v1/public/yql/dantrevino/planet-latest-10?format=json&diagnostics=true';
$.getJSON( planet, function (data) {
  for (var i=0;i < data.query.count; i++) {
    $('#planet').append("<p><a href='" + data.query.results.rss[i].channel.item.link + "'>" + data.query.results.rss[i].channel.item.title + "</a>");
  }
});  

var hof = 'http://query.yahooapis.com/v1/public/yql/dantrevino/hof-latest?format=json&diagnostics=true';
$.getJSON( hof, function (data) {
  count = data.query.count;
    $('#hof').append(data.query.results.rss[count-1].channel.item.description);
});  

//$('#eventpage').bind({
//    'swipeleft':  function() {
//      $.mobile.changePage($('#newspage'));
//    },
//    'click': function() {
//      alert("clicked");
//    }
//});

var venues = 'http://loco.ubuntu.com/services/teams/13';
$.getJSON( venues, function (data) {
    alert(data.name);
//    for (var i=0; i < venulist.length; i++ ) {
//        $('#venues').append(venuelist[i] + "<br />");                    
//    }
});


