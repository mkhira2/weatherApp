var weatherUrl = 'https://api.darksky.net/forecast/2ab8ce24aa16ccb7cde7c733c702e6e1'

var handleCurrent = function(currentWthr) {
    var containerNode = document.querySelector('.weatherContainer')
    containerNode.innerHTML = ''
    containerNode.innerHTML += '<h2 class = "city">' + currentWthr.latitude + ', ' + currentWthr.longitude + '</h2>'
    containerNode.innerHTML += '<h3 class ="summery">' + currentWthr.currently.summary + '</h3>'
    containerNode.innerHTML += '<ul class="weatherInfo"> Temperature: ' + currentWthr.currently.temperature + '</ul>'
    containerNode.innerHTML += '<ul class="weatherInfo"> Humidity: ' + currentWthr.currently.humidity + '</ul>'
    containerNode.innerHTML += '<ul class="weatherInfo"> Dew Point: ' + currentWthr.currently.dewPoint + '</ul>'
    containerNode.innerHTML += '<ul class="weatherInfo"> Cloud Cover: ' + currentWthr.currently.cloudCover + '</ul>'
    containerNode.innerHTML += '<ul class="weatherInfo"> Ozone: ' + currentWthr.currently.ozone + '</ul>'

}

var handleDaily = function(dailyWthr) {
    var containerNode = document.querySelector('.weatherContainer')
    containerNode.innerHTML = ''
    for (var i = 0; i < 7; i++) {
        var currentDay = dailyWthr.daily.data[i]

        containerNode.innerHTML += '<p>' + currentDay.time + ': ' + currentDay.summary + ' Temp Min: ' + currentDay.temperatureMin + ' Temp Max: ' + currentDay.temperatureMax + ' Chance of Rain: ' + currentDay.precipProbability
    }
    successFunction(dailyWthr)
}

var handleHourly = function(hourWthr, minute) {
    var containerNode = document.querySelector('.weatherContainer')
    containerNode.innerHTML = ''
    for (var i = 0; i < 7; i++) {
        var currentHour = hourWthr.hourly.data[i]

        containerNode.innerHTML += '<p>' + currentHour.time + ': ' + currentHour.summary + ' Temp: ' + currentHour.temperature + ' Chance of Rain: ' + currentHour.precipProbability

    }
    successFunction(hourWthr)
}

var controller = function(currentObj) {
        var hashStr = location.hash.substr(1),
            hashParts = hashStr.split('/')
            latitude = hashParts[0],
            longitude = hashParts[1],
            viewType = hashParts[2]
        var promise = $.getJSON(weatherUrl + '/' + latitude + ',' + longitude + '?callback=?')
        console.log(longitude)
        console.log(hashParts)
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
            navigator.geolocation.getCurrentPosition(controller) 
        
        }
    }
window.addEventListener('hashchange', controller)

controller()


