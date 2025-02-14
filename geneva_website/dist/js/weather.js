function getWeather() {
    //AJAX call
    var request = new XMLHttpRequest();
    const APIkey = "8892375987fe2623b2bfe85633f0a2aa";
    const lat = "46.2044";
    const lon = "6.1432";
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}&units=metric`;

    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
            var jsonWeather = JSON.parse(request.responseText);
            weatherInfo(jsonWeather); // Passing the parsed JSON to weatherInfo
        }
    };

    request.open("GET", url, true); //asynchronous request
    request.send();
}

function weatherInfo(jsonWeather) {
    const { main, weather, wind} = jsonWeather;
    const iconCode = weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`; //getting the current weather icon

    let dayOrNight;
    //checking for day or night
    if (iconCode.includes('n')){
        dayOrNight = "Night";
    }
    else{
        dayOrNight = "Day";
    }

    let windDir;

    // Wind direction conversion 
    if (wind.deg >= 0 && wind.deg < 45){
        windDir = "North";
    }
    else if (wind.deg >= 45 && wind.deg < 135){
        windDir = "East";
    }
    else if (wind.deg >= 135 && wind.deg < 225){
        windDir = "South";
    } 
    else if (wind.deg >= 225 && wind.deg < 315){
        windDir = "West";
    }
    else{
        windDir = "North";
    } 

    let weatherDescription = weather[0].description.toLowerCase();
    //switch statement to get background image based on current weather keywords.
    switch (true) {
        case weatherDescription.includes("cloud"):
            document.getElementsByClassName("weatherContainer")[0].style.backgroundImage = 
                "url('https://images.pexels.com/photos/158163/clouds-cloudporn-weather-lookup-158163.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')";
            break;
    
        case weatherDescription.includes("rain"):
            document.getElementsByClassName("weatherContainer")[0].style.backgroundImage = 
                "url('https://www.freevector.com/uploads/vector/preview/7040/FreeVector-Rain-Background.jpg')";
            break;
    
        case weatherDescription.includes("clear"):
            document.getElementsByClassName("weatherContainer")[0].style.backgroundImage = 
                "url('https://wallpapers.com/images/featured/clear-sky-0ke2itg1dzw1rcj0.jpg')";
            break;
    
        case weatherDescription.includes("sun"):
            document.getElementsByClassName("weatherContainer")[0].style.backgroundImage = 
                "url('https://png.pngtree.com/thumb_back/fh260/background/20230930/pngtree-immersive-3d-depiction-of-sunny-weather-with-clouds-image_13534870.png')";
            break;
    
        case weatherDescription.includes("snow"):
            document.getElementsByClassName("weatherContainer")[0].style.backgroundImage = 
                "url('https://c.wallhere.com/photos/d1/08/snowflake_blue_winter_white_snow_weather_background_snowstorm-1091485.jpg!d')";
            break;
    
        case weatherDescription.includes("wind"):
            document.getElementsByClassName("weatherContainer")[0].style.backgroundImage = 
                "url('https://img.freepik.com/premium-photo/cirrus-clouds-weaving-across-blue-beautiful-weather-colorful-sky-texture-wallpaper_1295756-6804.jpg')";
            break;
    
        case weatherDescription.includes("mist") || weatherDescription.includes("fog"):
            document.getElementsByClassName("weatherContainer")[0].style.backgroundImage = 
                "url('https://wallpapers.com/images/featured/foggy-forest-background-0b2wzqmmnqk08eye.jpg')";
            break;
    
        default:
            //if no keywords detected default to a natural color.
            document.getElementsByClassName("weatherContainer")[0].style.backgroundColor = "lightblue";
    }

    //clearing all previous contents in the following divs to prevent duplicate data
    document.getElementById("weather").innerHTML = "";
    document.getElementById("weatherSubL").innerHTML = "";
    document.getElementById("weatherStatus").innerHTML = "";

    const weatherHtml = `

        <div class="weatherBox">
            <img src="assets/img/hot.png" alt="High Temperature Icon" class="weatherIcon">

            <div class="weatherBoxText">
                <div id="weatherHeader">High</div>
                <div id="weatherValues">${Math.round(main.temp_max)}°C</div>
            </div>
        </div> 

        <div class="weatherBox">
            <img src="assets/img/cold.png" alt="Low Temperature Icon" class="weatherIcon">
            
            <div class="weatherBoxText">
                <div id="weatherHeader">Low</div>
                <div id="weatherValues">${Math.round(main.temp_min)}°C</div>
            </div>
        </div>

        <div class="weatherBox">
            <img src="assets/img/feellike.ico" alt="Feels Like Temperature Icon" class="weatherIcon">

            <div class="weatherBoxText">
                <div id="weatherHeader">Feels Like</div>
                <div id="weatherValues">${Math.round(main.feels_like)}°C</div>
            </div>
        </div> 
        
        <div class="weatherBox">
            <img src="assets/img/humidity.ico" alt="Humidity Icon" class="weatherIcon">
            
            <div class="weatherBoxText">
                <div id="weatherHeader">Humidity</div>
                <div id="weatherValues">${main.humidity}%</div>
            </div>
        </div>

        <div class="weatherBox">
            <img src="assets/img/windspeed.png" alt="Wind Speed Icon" class="weatherIcon">
            
            <div class="weatherBoxText">
                <div id="weatherHeader">Wind Speed</div>
                <div id="weatherValues">${wind.speed}m/s</div>
            </div>
        </div>

        <div class="weatherBox">
            <img src="assets/img/winddir.png" alt="Wind Speed Icon" class="weatherIcon">
            
            <div class="weatherBoxText">
                <div id="weatherHeader">Wind Direction</div>
                <div id="weatherValues">${windDir}</div>
            </div>
        </div>
    `;
    document.getElementById("weather").innerHTML = weatherHtml;


    const weatherTitleL = `    
        <img id="weatherImg" src="${iconUrl}" alt="${weather[0].description}">
        <div class="currentTemp">${Math.round(main.temp)}°C</div>
        <div class="dayOrNight"> | ${dayOrNight}</div>
    `;
    document.getElementById("weatherSubL").innerHTML += weatherTitleL;

    const weatherTitleR = `
        <div id="weatherDescription">${weather[0].description}</div>
    `;
    document.getElementById("weatherStatus").innerHTML = weatherTitleR;
}

getWeather();
setInterval(getWeather, 60000); // updating weather data every minute