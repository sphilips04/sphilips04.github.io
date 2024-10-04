console.log("test");

function getLocation() {
    // Check if the browser supports geolocation
    if (navigator.geolocation) {
        // Watch for changes in location
        navigator.geolocation.watchPosition(showPosition, showError, {
            enableHighAccuracy: true, 
            maximumAge: 0
        });
    } else {
        document.getElementById('location').innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const accuracy = position.coords.accuracy;

    document.getElementById('location').innerHTML =
        `<p>Latitude: ${latitude}</p>
         <p>Longitude: ${longitude}</p>
         <p>Accuracy: ${accuracy} meters</p>`;
}

function showError(error) {
    let message = '';
    switch (error.code) {
        case error.PERMISSION_DENIED:
            message = "User denied the request for Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            message = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            message = "The request to get user location timed out.";
            break;
        case error.UNKNOWN_ERROR:
            message = "An unknown error occurred.";
            break;
    }
    document.getElementById('location').innerHTML = `<p>Error: ${message}</p>`;
}

// Start getting the location
getLocation();
