async function fetchlocation(city){
   const url = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`;
   try{
let res=await fetch(url);   
if(res.status===404){
  alert("City not found");
  return;
   }
   let data=await res.json();
   return data;
   }
   catch(err){
    console.log("err:",err);
   }
} 
async function fetchWeather(lat, lon) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
    try {
      let res = await fetch(url);   
        if (res.status === 404) {
            alert("Weather data not found");
            return;
        }
        let data = await res.json();
        return data;
    } catch (err) {
        console.log("err:", err);
    }
    }
document.getElementById("get").addEventListener("click", async function() {
    const city = document.getElementById("city").value;
    let loc=await fetchlocation(city);
    if (!loc || !loc.results || loc.results.length === 0) {
  alert("City not found");
  return;
}
    let lat=loc.results[0].latitude;
    let lon=loc.results[0].longitude;
    console.log(lat,lon);
   let dat=await fetchWeather(lat,lon);
    console.log(dat);
      document.getElementById("name").value=loc.results[0].name;
   document.getElementById("temp").value=dat.current_weather.temperature+" °C";
    if(dat.current_weather.weathercode===0)
    {
        document.getElementById("desc").value="Clear sky";
          document.getElementsByClassName("info")[0].style.backgroundImage="url('Types-of-clouds-1.jpg')";
             document.getElementsByClassName("info")[0].style.backgroundSize="cover";
    }
    else if(dat.current_weather.weathercode===1 || dat.current_weather.weathercode===2 || dat.current_weather.weathercode===3)
    {
        document.getElementById("desc").value="Mainly clear, partly cloudy, and overcast";
        document.getElementsByClassName("info")[0].style.backgroundImage="url('dark.webp')";
          document.getElementsByClassName("info")[0].style.backgroundSize="cover";
    }
    else if(dat.current_weather.weathercode===45 || dat.current_weather.weathercode===48)
    {
        document.getElementById("desc").value="Fog and depositing rime fog";
    }
   document.getElementById("wind").value=dat.current_weather.windspeed+" km/h";
   document.getElementById("windd").value=dat.current_weather.winddirection+"°";
   document.getElementsByClassName("info")[0].style.display="block"; 
   document.getElementById("latitude").value=lat;
   document.getElementById("longitude").value=lon;
});