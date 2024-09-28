const locationsearch = document.getElementById("location-search");
const searchbox = document.getElementsByClassName("searchbox")[0];
const weatherbox = document.getElementsByClassName("weatherbox")[0];
const search = document.getElementById("searchright");
const bodyelement= document.body;
const icon = document.getElementById("weather-icon");

function firstsearch(){
    if (locationsearch.value === ''){
        alert("Please Enter The Location you're looking for");
    }
    else{
        searchbox.style.display='none';
        weatherbox.style.display='block';
        console.log("hi");
        getweather(locationsearch.value);
    }
}
locationsearch.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {    
      firstsearch();
    }
  });

search.addEventListener("keypress", function(event) {

    if (event.key === "Enter") {
      
     
      regsearch();
    }
  });

function regsearch() {
    if (search.value === ""){
        alert("Please Enter The Location you're looking for");
    }
    else{
        getweather(search.value); 
    }
    
}


const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const apikey = "9dd26f422fe086337ab094282a243088";

async function getweather(city){
    const response = await fetch(apiurl+city+"&appid="+apikey);
    let data = await response.json();
    console.log(data);
    if (data.message == "city not found"){
        alert("City not found. please try again");
        searchbox.style.display='block';
        weatherbox.style.display='none';
        return null;
    }

    icon.src="https://openweathermap.org/img/wn/"+data.weather[0].icon+"@2x.png"
    if (data.weather[0].icon==="01d"){
    
        icon.src="images/transparent-sun-icon-simple-orange-sun-icon-with-rays-on-black-backgrou656c49e5ddcb67.4803021817015956219085.png"
    }

    if (data.weather[0].icon.charAt(2)=='n'){
        bodyelement.style.backgroundImage="url('images/wp6680375-clear-sky-wallpapers.jpg')";
        
    }
    else if (data.weather[0].icon.charAt(1)=='4'){
        console.log("hudvjwvf");
        bodyelement.style.backgroundImage="url('images/undefined - Imgur.jpg')";
    }
    else if (data.weather[0].main=="Thunderstorm"){
        bodyelement.style.backgroundImage="url('images/22084-3840x2160-desktop-4k-thunder-wallpaper-photo.jpg')";
    }
    else if (data.weather[0].main=="Drizzle"){
        bodyelement.style.backgroundImage="url('images/wp6734762-cloudy-day-wallpapers.jpg')";
    }
    else if (data.weather[0].main=="Rain" ){
        bodyelement.style.backgroundImage="url('images/rain-desktop-1920-x-1271-caliq0jcnpb89b8i.jpg')";
        icon.src="images/raining.png";
    }
    else if (data.weather[0].main=="Snow"){
        bodyelement.style.backgroundImage="url('images/snow-1920X1080-wallpaper-rjiyg1nldnp98h8i.jpg')";
    }
    else if (data.weather[0].id>=700 && data.weather[0].id<=799 ){
        bodyelement.style.backgroundImage="url('https://external-preview.redd.it/sxmP24bkaEsdCATX18NfpBn8BrMgii7kDjMmoQ5mCHo.jpg?auto=webp&s=1d0fc6d56ae5c1b1c8f958ee34d2c2eea4b50b77')";
        icon.src="https://cdn-icons-png.flaticon.com/512/2675/2675962.png";
    }
    else{
        bodyelement.style.backgroundImage="url('images/sunnybackground.jpeg')";
    }

    document.querySelector(".location").innerHTML= data.name;
    document.querySelector(".temp").innerHTML= Math.round(data.main.temp) + "°C|"+Math.round((data.main.temp*(9/5))+32)+"°F";
    document.querySelector("#humidity-value").innerHTML= data.main.humidity+"%";
    document.querySelector("#wind-value").innerHTML= data.wind.speed+" km/h";
    console.log(data.weather[0].description);
    document.querySelector(".description").innerHTML= data.weather[0].description;
    document.querySelector(".feel").innerHTML= "Feels like "+Math.round(data.main.feels_like)+ "°C|"+Math.round((data.main.feels_like*(9/5))+32)+"°F";
    search.value="";

}
