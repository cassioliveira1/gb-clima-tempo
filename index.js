document.querySelector(".find").addEventListener("submit", async (event) => {
    event.preventDefault() // Impede recarregar a página

    let input = document.querySelector("#searchInput").value

    if (input !== "") {
        clearInfo()
        showWarning("Carregando...")

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=1a8e985bf162e74036c9d59249800666&units=metric&lang=pt_br`

        // Fazendo a requisição à API
        let results = await fetch(url)
        let json = await results.json()

        if (json.cod === 200) {
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp.toFixed(0),
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed.toFixed(0),
                windAngle: json.wind.deg,
                weatherDescription: json.weather[0].description
            })
        } else {
            clearInfo()
            showWarning("Localização não encontrada.")
        }
    } else {
        clearInfo()
    }
})

function showInfo(json) {
    showWarning("")
    document.querySelector(".title").innerHTML = `${json.name}, ${json.country}`
    document.querySelector(".tempInfo").innerHTML = `${json.temp} <sup>ºC</sup`
    document.querySelector(".windInfo").innerHTML = `${json.windSpeed} <span>km/h</span>`
    document.querySelector(".temp img").setAttribute("src", `https://openweathermap.org/img/wn/${json.tempIcon}@2x.png`)
    document.querySelector(".windPoint").style.transform = `rotate(${json.windAngle - 90}deg)`
    document.querySelector(".result").style.display = "block"

    // Formatação das strings da Descrição do clima

    const wordsOfDescription = json.weatherDescription.split(" ")
    for (let i = 0; i < wordsOfDescription.length; i++) {
        wordsOfDescription[i] = wordsOfDescription[i][0].toUpperCase() + wordsOfDescription[i].substring(1)
    }
    wordsOfDescription.join()
    
    document.querySelector(".description").innerHTML = wordsOfDescription.join(" ")
}


function clearInfo() {
    showWarning("")
    document.querySelector(".result").style.display = "none"
}

const showWarning = (msg) => {
    document.querySelector(".alert").innerHTML = msg
}