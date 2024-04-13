const start = async() =>{
    const weatherPromise = await fetch("https://api.weather.gov/gridpoints/MFL/110,50/forecast")
    const weatherData = await weatherPromise.json()
    const ourTemperature = weatherData.properties.periods[0].temperature
    document.querySelector('#temperature-output').textContent = ourTemperature
    
}

start()

const petsArea = async() => {
    const url = "https://learnwebcode.github.io/bootcamp-pet-data/pets.json"
    const petsPromise = await fetch(url)
    const petsData = await petsPromise.json()
    petsData.forEach(pet => {
        console.log(pet.name)
    });
}

petsArea()