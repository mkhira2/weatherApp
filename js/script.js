var weatherUrl = 'https://api.darksky.net/forecast/3ede8c29fd14bdd93c445d4e5ebb81e7/29.7604,-95.3698?callback=?'
var weatherPromise = $.getJSON(weatherUrl)


var handleCoords = function(coordsObj) {
    var lat = coordsObj.latitude
    var lng = coordsObj.longitude
    hashString = lat + '/' + lng + '/'
    location.hash = hashString + location.hash.substr(1)
}

var handleError = function(err) {
    console.log('Error!', err)
}

var handleCurrent = function(currentWthr) {
    var containerNode = document.querySelector('.weatherContainer')
    containerNode.innerHTML = ''
    containerNode.innerHTML += '<h2 class = "city">' + currentWthr.latitude + ', ' + currentWthr.longitude + '</h2>'
    containerNode.innerHTML += '<h3 class ="summary">' + currentWthr.currently.summary + '</h3>'
    containerNode.innerHTML += '<ul class="weatherInfo"> Temperature: ' + currentWthr.currently.temperature + '</ul>'
    containerNode.innerHTML += '<ul class="weatherInfo"> Humidity: ' + currentWthr.currently.humidity + '</ul>'
    containerNode.innerHTML += '<ul class="weatherInfo"> Dew Point: ' + currentWthr.currently.dewPoint + '</ul>'
    containerNode.innerHTML += '<ul class="weatherInfo"> Cloud Cover: ' + currentWthr.currently.cloudCover + '</ul>'
    containerNode.innerHTML += '<ul class="weatherInfo"> Ozone: ' + currentWthr.currently.ozone + '</ul>'
    handleCoords(currentWthr)
}

var handleDaily = function(dailyWthr) {
    var containerNode = document.querySelector('.weatherContainer')
    containerNode.innerHTML = ''
    for (var i = 0; i < 7; i++) {
        var currentDay = dailyWthr.daily.data[i]

        containerNode.innerHTML += '<p>' + currentDay.time + ': ' + currentDay.summary + ' Temp Min: ' + currentDay.temperatureMin + ' Temp Max: ' + currentDay.temperatureMax + ' Chance of Rain: ' + currentDay.precipProbability
    }
    handleCoords(dailyWthr)
}

var handleHourly = function(hourWthr, minute) {
    var containerNode = document.querySelector('.weatherContainer')
    containerNode.innerHTML = ''
    for (var i = 0; i < 7; i++) {
        var currentHour = hourWthr.hourly.data[i]
        containerNode.innerHTML += '<p>' + currentHour.time + ': ' + currentHour.summary + ' Temp: ' + currentHour.temperature + ' Chance of Rain: ' + currentHour.precipProbability
    }
    handleCoords(hourWthr)
}

var controller = function() {
    var hashStr = location.hash.substr(1),
        hashParts = hashStr

    latitude = hashParts[0],
        longitude = hashParts[1],
        viewType = hashParts[1]

    if (hashParts === 'current') {
        weatherPromise.then(handleCurrent)
    } else if (hashParts === 'daily') {
        weatherPromise.then(handleDaily)
    } else if (hashParts === 'hourly') {
        weatherPromise.then(handleHourly)
    }
    // else {
    // 	navigator.geolocation.getCurrentPosition(handleCoords, handleError)
    // 	return
    // }
}
window.addEventListener('hashchange', controller)

controller()

// var handleCoords = function(coordsObj) {
// 	var lat = coordsObj.coords.latitude
// 	var	lng = coordsObj.coords.longitude
// 	var	hashString = lat + '/' + lng + '/current'
// 	location.hash = hashString
// }

// console.log(location.hash)

// var handleError = function(err) {
// 	console.log('Error!', err)
// }

// var handleCurrent = function(currentWeather) {
// 	var containerNode = document.querySelector('.weatherContainer')
// 	containerNode.innerHTML = '<p>' + currentWeather.currently.temperature + '</p>'
// 	// var fullURL = baseURL + '/' + latitude + ',' + longitude
// 	// containerNode.innerHTML = '<p>Here is the current temperature: ' + currentWeather.currently.temperature + '</p>'
// }

// var handleDaily = function(latitude,longitude) {
// 	var containerNode = document.querySelector('.weatherContainer')
// 	var fullURL = baseURL + '/' + latitude + ',' + longitude
// 	containerNode.innerHTML = '<p>gonna show you the Daily weather at ' + latitude + ', ' + longitude + '</p>'
// }

// var handleHourly = function(latitude,longitude) {
// 	var containerNode = document.querySelector('.weatherContainer')
// 	var fullURL = baseURL + '/' + latitude + ',' + longitude
// 	containerNode.innerHTML = '<p>gonna show you the Hourly weather at ' + latitude + ', ' + longitude + '</p>'
// }

// var controller = function() {
// 	var hashStr = location.hash.substr(1),
// 		hashParts = hashStr.split('/'),
// 		latitude = hashParts[0],
// 		longitude = hashParts[1],
// 		viewType = hashParts[2]

// 	if (hashParts.length < 3) {
// 		// if there is not enough information currently in the hash,
// 		 	// then get the user's current location, and write 
// 		 	// a new hash accordingly
// 		navigator.geolocation.getCurrentPosition(handleCoords, handleError)
// 		return // leave the controller. the controller will run again when
// 		// handleCoords causes another hashchange
// 	}

// 	if (viewType === 'current') {
// 		handleCurrent(latitude,longitude)
// 	}

// 	else if (viewType === 'daily') {
// 		handleDaily(latitude,longitude)
// 	}

// 	else if (viewType === 'hourly') {
// 		handleHourly(latitude,longitude)
// 	}
// }

// window.addEventListener('hashchange', controller)

// weatherPromise.then(handleCurrent)

// controller()
