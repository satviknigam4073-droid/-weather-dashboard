document.getElementById('search-btn').addEventListener('click', function() {
    const city = document.getElementById('city-input').value;
    
    if (city === "") {
        alert("Please enter a city name first!");
        return;
    }

    const apiKey = 'b737d2f9bf80db266cd9738c82eb5599'; 
    const url = `https://openweathermap.org{city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("City not found");
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('location-name').innerText = `${data.name}, ${data.sys.country}`;
            // Fixed line: weather arrays require the [0] index accessor to parse descriptions correctly
            document.getElementById('weather-desc').innerText = data.weather[0].description;
            document.getElementById('temperature').innerText = Math.round(data.main.temp);
            document.getElementById('humidity-val').innerText = `${data.main.humidity}%`;
            document.getElementById('wind-val').innerText = `${Math.round(data.wind.speed * 3.6)} km/h`;
        })
        .catch(error => {
            alert("Error: City not found. Please check spelling!");
            console.error(error);
        });
});
