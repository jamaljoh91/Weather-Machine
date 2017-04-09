const appId = 'ba8fc8f463641a0aef8551a39feef1f9';

const place = document.querySelector('#place');
const temp = document.querySelector('#temp');
const outlook = document.querySelector('#outlook');
const extraInfo = document.querySelector('#extraInfo');
const image = document.querySelector('#image');

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    const endpoint = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${appId}&units=imperial`;
    $.getJSON(endpoint, function(data) {
      showWeather(data);
      // convertDegree(data);
    })
  });
}

let degreeArray = [];

function showWeather(weatherData) {
  console.log(weatherData);
  const tempDegree = Math.round(weatherData.main.temp);
  degreeArray.push(tempDegree);
  const outlookInfo = weatherData.weather[0].main;
  //Location
  place.innerHTML = `${weatherData.name}, ${weatherData.sys.country}`;
  //Temperature
  temp.innerHTML = `<span id="degree">${tempDegree}</span>&deg<button onclick="convertDegree()" id="degreeConverter">F</button>`;
  //Forecast
  outlook.innerHTML = `Forecast: ${outlookInfo}`;
  //Forecast Details
  extraInfo.innerHTML = `Extended Forecast: ${weatherData.weather[0].description}`;
  //Forecast Image
  if (outlookInfo === 'Clouds') {
    image.innerHTML = '<i class="wi wi-cloudy"></i>'
  }
  else if (outlookInfo === 'Rain') {
    image.innerHTML = '<i class="wi wi-rain"></i>'
  }
  else if (outlookInfo === 'Snow') {
    image.innerHTML = '<i class="wi wi-snow-wind"></i>'
  }
  else if (outlookInfo === 'Clear') {
    image.innerHTML = '<i class="wi wi-day-sunny"></i>'
  }
  else if (outlookInfo === 'Drizzle') {
    image.innerHTML = '<i class="wi wi-sprinkle"></i>'
  }
  else if (outlookInfo === 'Thunderstorm') {
    image.innerHTML = '<i class="wi wi-thunderstorm"></i>'
  }
  else if (outlookInfo === 'Mist') {
    image.innerHTML = '<i class="wi wi-fog"></i>'
  }
  else {
    image.innerHTML = '<i class="wi wi-na"></i>'
  }
}

let isCelsius = false;

function convertDegree() {
  const degreeElement = document.querySelector('#degree');
  const degree = degreeElement.innerText;
  const degreeConverterElement = document.querySelector('#degreeConverter');
  let convertedDegree = 0;
  //Convert to Celsius
  if (!isCelsius) {
    convertedDegree = (degree - 32) / 1.8;
    degreeElement.innerHTML = Math.floor(convertedDegree);
    degreeConverterElement.innerHTML = 'C';
  }
  //Convert to Farenheight
  else {
    degreeElement.innerHTML = degreeArray[0];
    degreeConverterElement.innerHTML = 'F';
  }
  //Flip the status
  isCelsius = !isCelsius;
}
