let temperature=document.getElementById("temperature");
let city=document.getElementById("city");
let cityText=document.getElementById("cityText");

const tempButton=document.getElementById("tempButton");

tempButton.addEventListener('click',async (event)=>{
    event.preventDefault();
    cityText.textContent=city.value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=a377b3b0296a17afd72bf5f4602be6a6&units=metric`;
    const response= await fetch(url);
    const data=await response.json();
    const temp=data.main.temp;
    temperature.textContent=temp;
})
