const urlBase = "https://api.openweathermap.org/data/2.5/weather"
const API_KEY = '02f0bb7310cc4940fc30ed77bb453c84'
const kelvin = 273.15;

// Usar AddEventListener para crear un nodo en el boton cuando el usuario haga click
document.getElementById("searchButton").addEventListener('click', () => {
    const city = document.getElementById("cityInput").value;

    if(city){
        //API Mostrara los datos del clima
        fetchWeather(city)
    } else {
        alert("Ingresa una ciudad valida")
    }
})

// Llamar a la API para que pase el archivo json
function fetchWeather(city){
    fetch(`${urlBase}?q=${city}&appid=${API_KEY}&lang=sp`)
    .then(data => data.json())
    .then(data => showData(data))
}

// Funcion para capitalizar primera letra
function capitalize(text){
    text.trim()
    const firstLetter = text.charAt(0)
    const rest = text.slice(1)
    return `${firstLetter.toUpperCase()}${rest}`
}

// Funcion para extraer los datos
function showData(data){
    // Vaciamos el div
    const response = document.getElementById("response")
    response.innerHTML = " "

    // Extraemos los datos del json
    const cityName = data.name
    const country = data.sys.country
    const temp = data.main.temp
    const humedad = data.main.humidity
    const descripcion = data.weather[0].description
    const icon = data.weather[0].icon
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`

    //Creamos los elementos en JS
    const cityInfo = document.createElement('h2')
    cityInfo.textContent = `${cityName} ${country}`
    response.appendChild(cityInfo)
    
    const condicionInfo = document.createElement('p')
    condicionInfo.textContent = `Temperatura: ${Math.floor(temp - kelvin)}°C | Humedad: ${humedad}%`
    response.appendChild(condicionInfo)
    
    const imagen = document.createElement('img')
    imagen.src = iconUrl
    response.append(imagen)
    
    const reporte = document.createElement('span')
    reporte.classList.add("reporte")
    reporte.textContent = "Reporte del clima: "

    const descripcionInfo = document.createElement('span')
    descripcionInfo.textContent = `${capitalize(descripcion)}` 
    
    const meteoroInfo = document.createElement('p')
    meteoroInfo.appendChild(reporte)
    meteoroInfo.appendChild(descripcionInfo)


    response.append(meteoroInfo)
}




