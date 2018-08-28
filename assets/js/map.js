const map = (() => {

    function initMap(lat, lng, idOfDiv) {
        let location = {lat: lat, lng: lng};
        let map = new google.maps.Map(document.getElementById(idOfDiv), {
            zoom: 15,
            center: location
        });
        let marker = new google.maps.Marker({
            position: location,
            map: map
        })

    }

    function getGeocode(address) {
        return $.ajax({
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyC8fHii6yy5NABpk8Isz-FRkYEdQHYvLg4`,
        });
    }

    function render(address, idOfDiv) {
        getGeocode(address).then(data => {
            let lat = data.results[0].geometry.location.lat;
            let lng = data.results[0].geometry.location.lng;
            initMap(lat, lng, idOfDiv)
        });
    }

    return {render};
})();