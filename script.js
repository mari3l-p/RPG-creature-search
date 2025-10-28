const searchInput = document.getElementById('search-input')
const searchBtn = document.getElementById('search-button')

const info = document.getElementById('info')
const creatureName = document.getElementById('creature-name')
const creatureId = document.getElementById('creature-id')
const weightDiv = document.getElementById('weight')
const heightDiv = document.getElementById('height')
const typesDiv = document.getElementById('types')

const abilities = document.querySelectorAll('#special-info span')

const switchMode = document.getElementById('switch')
const body = document.querySelector('body')

async function searchCreature() {
    try {
        // check for for a value submitted
        if (searchInput.value === '') {
            alert('Enter a value')
            return;
        }

        const inputValue = searchInput.value.trim().toLowerCase()

        const response = await fetch(`https://rpg-creature-api.freecodecamp.rocks/api/creature/${inputValue}`)

        const data = await response.json()
        fetchData(data)


    } catch (err){
        console.error('Problem fetching data', err)
        alert("Creature not found")
    }
}


function fetchData(data) {
    info.classList.remove('hidden')
    const {id, name, weight, height, special, stats, types} = data;

    creatureName.textContent = `${name.toUpperCase()}`
    creatureId.textContent = `#${id}`
    weightDiv.textContent = `Weight: ${weight}`
    heightDiv.textContent = `Height: ${height}`;

    typesDiv.innerHTML = ''; // Clear previous content
    types.forEach(type => {
        const typeElement = document.createElement('span'); // Could also be 'span' or any other element
        typeElement.textContent = type.name.toUpperCase() + ' ';
        typesDiv.appendChild(typeElement);
    });

    abilities.forEach((abilitie, index) => {
        if (stats[index]) {
            abilitie.textContent = `${stats[index].base_stat}`
        }
    })

}


let turned = false

function toggleMode() {
    turned = !turned
    if (turned) {
        switchMode.innerHTML = `
        <span id="switch">
            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-toggle-on" viewBox="0 0 16 16">
                <path d="M5 3a5 5 0 0 0 0 10h6a5 5 0 0 0 0-10zm6 9a4 4 0 1 1 0-8 4 4 0 0 1 0 8"/>
            </svg>
        </span>`
        body.classList.add('dark')
    } else {
        switchMode.innerHTML = `
        <span id="switch">
            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-toggle-off" viewBox="0 0 16 16">
                <path d="M11 4a4 4 0 0 1 0 8H8a5 5 0 0 0 2-4 5 5 0 0 0-2-4zm-6 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8M0 8a5 5 0 0 0 5 5h6a5 5 0 0 0 0-10H5a5 5 0 0 0-5 5"/>
            </svg>
        </span>`
        body.classList.remove('dark')
    }
}


searchBtn.addEventListener('click', searchCreature)
switchMode.addEventListener('click', toggleMode)

window.addEventListener('keydown', (e) => e.key === 'Enter' ? searchCreature() : '')