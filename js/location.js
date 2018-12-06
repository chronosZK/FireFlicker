function initMap() {
    
    var map, infoWindow;

    //----------locate at Malaysia center-------------
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 4.316324, lng: 102.153190},
        zoom: 7
    });
    infoWindow = new google.maps.InfoWindow;

    db.collection("Marker").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            var services = doc.data().service.replace(/_/gi,'<br>');
            var marker = new google.maps.Marker({
                position: {lat: parseFloat(doc.data().latitude), lng: parseFloat(doc.data().longitude)},
                content: '<p><b>Service Available:</b><p><p>'+services +'</p>',
                map: map
            });
        
            if (marker.content) {
                var infoWindow = new google.maps.InfoWindow({
                    content:marker.content
                });
        
                marker.addListener('click', function(){
                    infoWindow.open(open, marker);
                });
            }
        });
    });
    
}

//Failed to get geolocation on HTML5
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                          'Error: The Geolocation service failed.' :
                          'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}

