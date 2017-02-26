//--------------------------------------------------
//GLOBAL VARIABLES
//--------------------------------------------------
var weatherUrl = 'https://api.darksky.net/forecast/2ab8ce24aa16ccb7cde7c733c702e6e1'
var googleURL = 'http://maps.googleapis.com/maps/api/geocode/json?address='
var containerNode = document.querySelector('.weatherContainer')
var currentNode = document.querySelector('.current')
var dailyNode = document.querySelector('.daily')
var hourlyNode = document.querySelector('.hourly')
var searchInput = document.querySelector(".search")

//--------------------------------------------------
// MOTHERSHIP FUNCTIONS
//--------------------------------------------------

function controller(currentObj) {
       var hashStr = location.hash.substr(1),
           hashParts = hashStr.split('/')
           latitude = hashParts[0],
           longitude = hashParts[1],
           viewType = hashParts[2]
       var promise = $.getJSON(weatherUrl + '/' + latitude + ',' + longitude + '?callback=?')
       if (viewType === 'current') {
           promise.then(handleCurrent)  
       }
       else if (viewType === 'hourly') {
           promise.then(handleHourly)
       }
       else if (viewType === 'daily') {
            promise.then(handleDaily)
           
       }
       else {
           navigator.geolocation.getCurrentPosition(handleCoords)
       }
}

function handleCoords(coordsObj) {
       var lat = coordsObj.coords.latitude
       var lng = coordsObj.coords.longitude
       var hashString = lat + '/' + lng + '/current'
       location.hash = hashString
}

//--------------------------------------------------
//FUNCTIONS THAT WRITE TO EACH PAGE
//--------------------------------------------------

function handleCurrent(currentWeather) {
   containerNode.innerHTML = ''
   containerNode.innerHTML += '<h2>' + "Here's your current weather: " + '<hr></h2>'
                           + '<h3>' + currentWeather.currently.summary + '</h3>'
                           + '<li> Temperature: ' + Math.round(currentWeather.currently.temperature) + ' degrees</li>'
                           + '<li> Chance of Rain: ' + Math.round(currentWeather.currently.precipProbability) + '%</li>'
                           + '<li> Wind Speed: ' + Math.round(currentWeather.currently.windSpeed) + ' mph</li>'
                           + '<li> Humidity: ' + Math.round((currentWeather.currently.humidity * 100)) + '%</li>'
}

function handleHourly(hourlyWeather) {
   containerNode.innerHTML = '<h2>' + "Here's your hourly weather: " + '<hr></h2>'
   for (var i = 0; i < 12; i++) {
       var currentHour = hourlyWeather.hourly.data[i]
       var hourlyTime = moment.unix(currentHour.time).format('h' + ':00' + 'a')
       containerNode.innerHTML += '<p><h3 class="time">' + hourlyTime + ': ' + '</h3></p>'
                               + '<li>' + currentHour.summary + '</li>'
                               + '<li>' + 'Temp: ' + Math.round(currentHour.temperature) + ' degrees</li>'
                               + '<li>' + 'Chance of Rain: ' + Math.round(currentHour.precipProbability) + '%</li>'
                               + '<li> Wind Speed: ' + Math.round(currentHour.windSpeed) + ' mph</li>'
                               + '<li> Humidity: ' + Math.round((currentHour.humidity * 100)) + '%</li>'
                               + '</ br></ br>'

   }
}

function handleDaily(dailyWeather) {
   containerNode.innerHTML = '<h2>' + "Here's your daily weather: " + '<hr></h2>'
   for (var i = 0; i < 7; i++) {
       var currentDay = dailyWeather.daily.data[i]
       var day = moment.unix(currentDay.time).format('dddd')
       containerNode.innerHTML += '<p><h3 class="time">' + day + ': ' + '</h3></p>' 
                               + '<li>' + currentDay.summary + '</li>' 
                               + '<li>' + 'Temp Min: ' + Math.round(currentDay.temperatureMin) + ' degrees</li>'
                               + '<li>' + 'Temp Max: ' + Math.round(currentDay.temperatureMax) + ' degrees</li>'
                               + '<li>' + 'Chance of Rain: ' + Math.round(currentDay.precipProbability) + '%</li>'
                               + '<li> Wind Speed: ' + Math.round(currentDay.windSpeed) + ' mph</li>'
                               + '<li> Humidity: ' + Math.round((currentDay.humidity * 100)) + '%</li>'
                               + '</ br></ br>'
   }
}
//--------------------------------------------------
//HASH ROUTING CHANGE ON BUTTON CLICK
//--------------------------------------------------

currentNode.addEventListener('click', function() {
    var hashStr = location.hash.substr(1),
           hashParts = hashStr.split('/')
           latitude = hashParts[0],
           longitude = hashParts[1],
           viewType = hashParts[2]
           location.hash = latitude + '/' + longitude + '/' + 'current'
})

dailyNode.addEventListener('click', function() {
    var hashStr = location.hash.substr(1),
           hashParts = hashStr.split('/')
           latitude = hashParts[0],
           longitude = hashParts[1],
           viewType = hashParts[2]
           location.hash = latitude + '/' + longitude + '/' + 'daily'
})

hourlyNode.addEventListener('click', function() {
    var hashStr = location.hash.substr(1),
           hashParts = hashStr.split('/')
           latitude = hashParts[0],
           longitude = hashParts[1],
           viewType = hashParts[2]
           location.hash = latitude + '/' + longitude + '/' + 'hourly'
})

//--------------------------------------------------
//SEARCH FUNCTION
//--------------------------------------------------

searchInput.addEventListener('keydown', function(eventObj) {
    if (eventObj.keyCode === 13) {
        var inputValue = eventObj.target.value
        var cityPromise = $.getJSON('https://maps.googleapis.com/maps/api/geocode/json?address=' + inputValue)
        cityPromise.then(handleCityCoords)
        eventObj.target.value = ''
    }
})

function handleCityCoords(apiResponse) {
    var newLat = apiResponse.results[0].geometry.location.lat
    var newLng = apiResponse.results[0].geometry.location.lng
    location.hash = newLat + '/' + newLng + '/current'
}

//--------------------------------------------------
//LETS GET THIS PARTY STARTED
//--------------------------------------------------
window.addEventListener('hashchange', controller)
controller()
