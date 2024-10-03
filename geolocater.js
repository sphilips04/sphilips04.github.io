let locationReceived = false;
console.log("updated");

function getLocation() {
    // Check if the browser supports geolocation
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        document.getElementById('location').innerHTML = "Geolocation is not supported by this browser.";
    }
}

const checkPositionTimer = setInterval(function() {

        const colors = ["red", "green", "blue", "yellow", "purple", "orange"];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        document.getElementById('title').style.color = randomColor;

        if (!locationReceived) {
            return;
        }
        navigator.geolocation.getCurrentPosition(showPosition, showError);

    }, 1000);

function showPosition(position) {

    locationReceived = true;
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
    switch(error.code) {
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
