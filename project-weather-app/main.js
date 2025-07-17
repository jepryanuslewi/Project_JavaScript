const apiKey = '3b8b95281214463d9f48e15161d5b17e';

// ambil dom element
const loc = document.getElementById('location');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const iconDisplay = document.getElementById('weather-icon');

async function getWeather(Latitude, Longtitude) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${Latitude}&lon=${Longtitude}&units=metric&appid=${apiKey}`;
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data);
        loc.textContent = data.name;
        temperature.innerHTML = `Temperature: <span>${data.main.temp}°C</span>`;
        description.innerHTML = `Description: <span>${data.weather[0].description}</span>`;
        const iconCode = data.weather[0].icon;
        // console.log(iconCode);
        iconDisplay.innerHTML = `<img src="https://openweathermap.org/img/wn/${iconCode}.png" alt="Weather Icon">`;
    } catch (error) {
        console.log('error: ', error);
    }
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) =>{
            const latitude = position.coords.latitude;
            const longtitude = position.coords.longitude;
            getWeather(latitude, longtitude);
        }, error =>{
            alert('fail to get your location, please enable your location service')
        })
    } else{
        alert('your browser does not support geolocation')
    }
}

window.onload = getLocation;