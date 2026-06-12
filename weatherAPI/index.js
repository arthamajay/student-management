let temperature=document.getElementById("temperature");
let city=document.getElementById("city");
let cityText=document.getElementById("cityText");
let temp=document.getElementById("temp");

const tempButton=document.getElementById("tempButton");

tempButton.addEventListener('click', async (event) => {
    event.preventDefault();
    const cityName=city.value.trim();
    cityText.textContent=cityName;

    const url=`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=a377b3b0296a17afd72bf5f4602be6a6&units=metric`;
    
    try {
        const response=await fetch(url);
        if (response.status=404) 
            throw new Error('City not found');

        const data=await response.json();
        temp.textContent=data.main.temp;
    } catch(err){
        temp.textContent="Invalid City name";
    }
});
