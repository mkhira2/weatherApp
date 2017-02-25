var weatherUrl = 'https://api.darksky.net/forecast/2ab8ce24aa16ccb7cde7c733c702e6e1'
var containerNode = document.querySelector('.weatherContainer')
var currentNode = document.querySelector('.current')
var dailyNode = document.querySelector('.daily')
var hourlyNode = document.querySelector('.hourly')

var handleCoords = function(coordsObj) {
       var lat = coordsObj.coords.latitude
       var lng = coordsObj.coords.longitude
       var hashString = lat + '/' + lng + '/current'
       location.hash = hashString
}

var handleCurrent = function(currentWeather) {
   containerNode.innerHTML = ''
   containerNode.innerHTML += '<h2 class = "city">' + currentWeather.latitude + ', ' + currentWeather.longitude + '</h2>'
                           + '<h3 class ="summary">' + currentWeather.currently.summary + '</h3>'
                           + '<ul class="weatherInfo"> Temperature: ' + Math.round(currentWeather.currently.temperature) + '</ul>'
                           + '<ul class="weatherInfo"> Humidity: ' + Math.round(currentWeather.currently.humidity) + '</ul>'
                           + '<ul class="weatherInfo"> Dew Point: ' + Math.round(currentWeather.currently.dewPoint) + '</ul>'
                           + '<ul class="weatherInfo"> Cloud Cover: ' + Math.round(currentWeather.currently.cloudCover) + '</ul>'
                           + '<ul class="weatherInfo"> Ozone: ' + Math.round(currentWeather.currently.ozone) + '</ul>'
}

var handleDaily = function(dailyWeather) {
   containerNode.innerHTML = ''
   for (var i = 0; i < 7; i++) {
       var currentDay = dailyWeather.daily.data[i]
       containerNode.innerHTML += '<p>' + currentDay.time + ': ' + currentDay.summary + ' Temp Min: ' + Math.round(currentDay.temperatureMin) + ' Temp Max: ' + Math.round(currentDay.temperatureMax) + ' Chance of Rain: ' + Math.round(currentDay.precipProbability)
   }
}

var handleHourly = function(hourlyWeather) {
   containerNode.innerHTML = ''
   for (var i = 0; i < 7; i++) {
       var currentHour = hourlyWeather.hourly.data[i]
       containerNode.innerHTML += '<p>' + currentHour.time + ': ' + currentHour.summary + ' Temp: ' + Math.round(currentHour.temperature) + ' Chance of Rain: ' + Math.round(currentHour.precipProbability)

   }
}

var controller = function(currentObj) {
       var hashStr = location.hash.substr(1),
           hashParts = hashStr.split('/')
           latitude = hashParts[0],
           longitude = hashParts[1],
           viewType = hashParts[2]
       var promise = $.getJSON(weatherUrl + '/' + latitude + ',' + longitude + '?callback=?')
       if (viewType === 'current') {
           promise.then(handleCurrent)  
       }
       else if (viewType === 'daily') {
            promise.then(handleDaily)
           
       }
       else if (viewType === 'hourly') {
           promise.then(handleHourly)
       }
       else {
           navigator.geolocation.getCurrentPosition(handleCoords)
       }
}

window.addEventListener('hashchange', controller)

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

controller()