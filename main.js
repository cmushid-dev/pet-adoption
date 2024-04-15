const template = document.querySelector('#pet-card-template')
const wrapper = document.createDocumentFragment()

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
        const clone = template.content.cloneNode(true)

        clone.querySelector('h3').textContent = pet.name
        clone.querySelector('.pet-description').textContent = pet.description
        clone.querySelector('.pet-age').textContent = createAgeText(pet.birthYear)

        if (!pet.photo) pet.photo = "images/anonyme.jpg"

        clone.querySelector('.pet-card-photo img').src = pet.photo
        clone.querySelector('.pet-card-photo img').alt = `A ${pet.species} named ${pet.name}.`

        wrapper.appendChild(clone)
    });
    document.querySelector('.list-of-pets').appendChild(wrapper)
}

petsArea()

const createAgeText = (birthYear) => {
    const currentYear = new Date().getFullYear()
    const age = currentYear - birthYear

    if (age == 1) return "1 year old"
    if (age == 0) return "Less than a year old"
    
    return `${age} years old`
}

//Pet filter button code
const allbuttons = document.querySelectorAll('.pet-filter button')

allbuttons.forEach(el => {
    el.addEventListener("click", handleButtonClick)
})

function handleButtonClick(e) {
    // Remove active class from any and all buttons
    allbuttons.forEach(el => el.classList.remove("active"))

    // Add active class to the specific button that just got clicked
    e.target.classList.add("active")

    // actually filter the pets down below
}