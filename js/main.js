let cityThisDay = document.getElementById("cityThisDay");
let tempThisDay = document.getElementById("tempThisDay");
let descThisDay = document.getElementById("descThisDay");
let umberella = document.getElementById("umberella");
let wind = document.getElementById("wind");
let compas = document.getElementById("compas");
let umberellaDesc = document.getElementById("umberellaDesc");
let windDesc = document.getElementById("windDesc");
let compaDesc = document.getElementById("compaDesc");
let searchInput = document.getElementById("searchInput");
let button = document.getElementById("button");
let descImg = document.getElementById("descImg");
let thisDay = document.getElementById("thisDay");
let thisDate = document.getElementById("thisDate");
let nextDat = document.getElementById("nextDat");
let NextNextDay = document.getElementById("NextNextDay");
let Day2MaxTemp = document.getElementById("Day+1MaxTemp");
let Day2minTemp = document.getElementById("Day+1minTemp");
let Day2Desc = document.getElementById("Day+1Desc");
let day2imgdes = document.getElementById("day2imgdes");
let day3MaxTemp = document.getElementById("day3MaxTemp");
let day3MinTemp = document.getElementById("day3MinTemp");
let day3desc = document.getElementById("day3desc");
let day3Imgdesc = document.getElementById("day3Imgdesc");

// main variable
let newDate = new Date();
let days = [
  "Sundays",
  "Mondays",
  "Tuesdays",
  "Wednesdays",
  "Thursdays",
  "Fridays",
  "Saturdays",
];
let monthes = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July	",
  "August",
  "September",
  "October",
  "November",
  "December",
];

async function getWeather(city='cairo') {
  let apiRespose = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=e34cd4dd46884d30983114130230708&q=${city}&days=3`
  );
  let finalResponse = await apiRespose.json();

  displayInformation(finalResponse);
}

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
function displayInformation(finalResponse) {
  // todo write day1 in header card
  thisDay.innerHTML = `${days[newDate.getDay()]}`;
  thisDate.innerHTML = `${newDate.getDate()}${monthes[newDate.getMonth()]}`;
  // todo >> write information weather for the frist day
  cityThisDay.innerHTML = finalResponse.location.name;
  tempThisDay.innerHTML = finalResponse.current.temp_c + ` <sup>o</sup>C`;
  descThisDay.innerHTML = finalResponse.current.condition.text;
  let srcImg = finalResponse.current.condition.icon;
  descImg.setAttribute("src", srcImg);
  windDesc.innerHTML = Math.round(finalResponse.current.wind_kph) + " km/h";
  compaDesc.innerHTML = finalResponse.current.wind_dir;
  umberellaDesc.innerHTML = finalResponse.current.precip_in;
  // todo write day2 in header card
  let NmberNextDay = newDate.getDay() + 1;
  nextDat.innerHTML = `${days[NmberNextDay]}`;
  // todo >> write information weather for the second day
  Day2MaxTemp.innerHTML = `${finalResponse.forecast.forecastday[1].day.maxtemp_c}  <sup>o</sup>C`;
  Day2minTemp.innerHTML = `${finalResponse.forecast.forecastday[1].day.mintemp_c} <sup>o</sup>C`;
  Day2Desc.innerHTML = `${finalResponse.forecast.forecastday[1].day.condition.text}`;
  let Img2Src = finalResponse.forecast.forecastday[1].day.condition.icon;
  day2imgdes.setAttribute("src", Img2Src);
  // todo write day3 in header card
  let NmberNextNextDay = newDate.getDay() + 2;
  // todo >> write information weather for the third day
  NextNextDay.innerHTML = `${days[NmberNextNextDay]}`;
  day3MaxTemp.innerHTML = `${finalResponse.forecast.forecastday[2].day.maxtemp_c}  <sup>o</sup>C`;
  day3MinTemp.innerHTML = `${finalResponse.forecast.forecastday[2].day.mintemp_c} <sup>o</sup>C`;
  day3desc.innerHTML = `${finalResponse.forecast.forecastday[2].day.condition.text}`;
  let Img3Src = (day3Imgdesc.innerHTML =
    finalResponse.forecast.forecastday[2].day.condition.icon);
  day3Imgdesc.setAttribute("src", Img3Src);
}
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!third card
//////////////////////////////todo:Events
button.addEventListener("click", () => {
  getWeather(searchInput.value);
});
searchInput.addEventListener("input", () => {
  getWeather(searchInput.value);
});
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!third card
// ////////////////////todo::get location from user
function getCurrentLocationWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      getWeather(
        [position.coords.latitude, position.coords.longitude].join(",")
      );
    });
  }
}
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!third card
////////////////////////////// todo: function searrchCity
function searchCity() {
  if (searchInput.value == "") {
    getCurrentLocationWeather();
  } else if (searchInput.value != "") {
    getWeather();
  }
}
getWeather()
searchCity();


