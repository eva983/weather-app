
const form = document.querySelector('form');
const input = document.querySelector('input');
const weatherDiv = document.querySelector('.weather');
var isCelsius = true;
const apiKey = 'ca8e21b89659e03af9b59c2ba194cd4d';

form.addEventListener('submit', (event) => {
	event.preventDefault();
	const cityName = input.value.trim();
	getWeather(cityName);
});

async function getWeather(cityName) {
	const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
	try {
		const response = await fetch(url);
		const data = await response.json();
		showWeather(data);
	} catch (error) {
		console.log('Error:', error);
	}
}


function toggleTemperature() {
  isCelsius = !isCelsius;
  showWeather(lastData);
  var tempToggleBtn = document.getElementById("temp-toggle");
  if (isCelsius) {
    tempToggleBtn.textContent = "°F";
  } else {
    tempToggleBtn.textContent = "°C";
  }
}

function showWeather(data) {
	lastData=data;
	if (data.cod === "404") {
		  // show error message and hide weather data
	weatherDiv.innerHTML=`
	<div class="weather-content">
	<p id="error-message" style="display: block;">404 ERROR<br>City not found</p>
	</div`;

	
	}
	else {
	
	const cityName = data.name;
	
	if (isCelsius) {
		var temperature= data.main.temp + "°C";
		var feels_like=data.main.feels_like + "°C";

	  } else {
		var temperature = (data.main.temp * 9/5 + 32) + "°F";
		var feels_like=(data.main.feels_like * 9/5 + 32)+ "°F";
	  }
	const description = data.weather[0].description;
	const humidity=data.main.humidity;
    const imgsrc= "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
    const date_time= getDateTime(data.dt, data.timezone);
   console.log(typeof(date_time));


	
	
	weatherDiv.innerHTML = `
	
		<h2><svg class="loc-icon"  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-fill" viewBox="0 0 16 16">
		<path fill-rule="evenodd" d="M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999zm2.493 8.574a.5.5 0 0 1-.411.575c-.712.118-1.28.295-1.655.493a1.319 1.319 0 0 0-.37.265.301.301 0 0 0-.057.09V14l.002.008a.147.147 0 0 0 .016.033.617.617 0 0 0 .145.15c.165.13.435.27.813.395.751.25 1.82.414 3.024.414s2.273-.163 3.024-.414c.378-.126.648-.265.813-.395a.619.619 0 0 0 .146-.15.148.148 0 0 0 .015-.033L12 14v-.004a.301.301 0 0 0-.057-.09 1.318 1.318 0 0 0-.37-.264c-.376-.198-.943-.375-1.655-.493a.5.5 0 1 1 .164-.986c.77.127 1.452.328 1.957.594C12.5 13 13 13.4 13 14c0 .426-.26.752-.544.977-.29.228-.68.413-1.116.558-.878.293-2.059.465-3.34.465-1.281 0-2.462-.172-3.34-.465-.436-.145-.826-.33-1.116-.558C3.26 14.752 3 14.426 3 14c0-.599.5-1 .961-1.243.505-.266 1.187-.467 1.957-.594a.5.5 0 0 1 .575.411z"/>
	  </svg> ${cityName}</h2>
		<h4>${date_time}</h4>
		<img class="weather-icon" src="${imgsrc}">
		<div class="weather-content">
		<p>${temperature} with ${description} </p>
		<p>feels like ${feels_like} </p>
		<p>${humidity}% humidity</p>
		
		
		</div>

	`;
	weatherDiv.style.display = 'block';
	}
}

function getDateTime(dt, timezone) {
	const date = new Date((dt + timezone) * 1000);
	const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false, timeZoneOffset: timezone};
	const dateTimeStr = date.toLocaleString(undefined, options);
	return dateTimeStr;
  }


  function getLocation() {
	if (navigator.geolocation) {
	  navigator.geolocation.getCurrentPosition(showPosition);
	} else {
	  alert("Geolocation is not supported by this browser.");
	}
  }
  
  function showPosition(position) {
	const latitude = position.coords.latitude;
	const longitude = position.coords.longitude;
	console.log(latitude,longitude);
	// Do something with the user's latitude and longitude
	getWeatherLatLon(latitude,longitude);
	
  }

  async function getWeatherLatLon(lat,lon) {

	const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
	
	try {
		const response = await fetch(url);
		const data = await response.json();
		showWeather(data);
	} catch (error) {
		console.log('Error:', error);
	}
}