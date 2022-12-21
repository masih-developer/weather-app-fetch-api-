const $ = document;
const weatherInput = $.querySelector(".weather__input");
const weatherCountry = $.querySelector(".weather__country");
const weatherDate = $.querySelector(".weather__date");
const weatherTemp = $.querySelector(".weather__temp");
const weatherStatus = $.querySelector(".weather__status");
const weatherMinmax = $.querySelector(".weather__minmax-temp");

const regionData = (e) => {
    if (e.keyCode === 13) {
        if (weatherInput.value.trim() !== "") {
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${weatherInput.value}&appid=88ea514b3767a52d8446cbdc209c2e82`)
                .then((res) => res.json())
                .then((data) => {
                    if (data.cod === 200) {
                        console.log(data);
                        weatherCountry.innerHTML = `${data.name}, ${data.sys.country}`;
                        weatherDate.innerHTML = getDate();
                        weatherTemp.innerHTML = `${kelvinToCelsius(data.main.temp)}°c`;
                        weatherStatus.innerHTML = data.weather[0].main;
                        weatherMinmax.innerHTML = `${kelvinToCelsius(data.main.temp_min)}°c / ${kelvinToCelsius(data.main.temp_max)}°c`;
                    } else {
                        alert(data.message);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            alert("Please enter the values ​​correctly");
        }
    }
};

const getDate = () => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let date = new Date();
    let day = date.getDay();
    let monthDay = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();

    return `${days[day]} ${monthDay} ${months[month]} ${year}`;
};

const kelvinToCelsius = (param) => {
    return Math.floor(param - 273.15);
};

weatherInput.addEventListener("keydown", regionData);
