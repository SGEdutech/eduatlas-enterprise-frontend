function initMap(lat,lng) {

    let location = {lat: lat, lng: lng};
    let map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: location
    });
    let marker = new google.maps.Marker({
        position: location,
        map: map
    })
    
}

// google.maps.event.addDomListener(window, 'load', initMap)