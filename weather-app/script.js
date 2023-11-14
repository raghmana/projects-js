const apiKey = "0a31bb684f8742a38b9142131231411";
const apiURL = "https://api.weatherapi.com/v1/forecast.json?&days=7&aqi=yes&q=";

const searchBox = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-btn");

checkWeather = async (searchPhrase) => {
    const response = await fetch(apiURL + searchPhrase + `&key=${apiKey}`);
    let data = await response.json();

    console.log(data);

    document.querySelector(".city").innerHTML = data.location.name;
    document.querySelector(".temp").innerHTML = Math.round(data.current.temp_c) + "°C";
    document.querySelector(".temp-feels").innerHTML = "Feels like " + Math.round(data.current.feelslike_c) + "°C";
    document.querySelector(".condition").innerHTML = data.current.condition.text;
    document.querySelector(".humidity").innerHTML = "Humidity: " + Math.round(data.current.humidity) + "%";
    document.querySelector(".wind-speed").innerHTML = "Wind speed: " + Math.round(data.current.wind_kph) + "kph";
    document.querySelector(".image").setAttribute("src", data.current.condition.icon);
    // document.querySelector(".aqi").innerHTML = Math.round(data.current.wind_kph) + "kph";

}

getLocation = () => {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
}

showPosition = (position) => {
    let latLong = position.coords.latitude + ',' + position.coords.longitude;
    checkWeather(latLong);
}

searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
})

getLocation();