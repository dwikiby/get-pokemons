document.addEventListener("DOMContentLoaded", () =>{

    let generateBtn = document.querySelector('#generate-pokemon'); //inisialisasi button generate
    generateBtn.addEventListener('click', renderEverything)  //fungsi tombol generate
})

const colors = {
	fire: '#E6B566',
	grass: '#9FC088',
	electric: '#D9CE3F',
	water: '#6886C5',
	ground: '#C1AC95',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#C490E4',
	bug: '#B2B8A3',
	dragon: '#B33030',
	psychic: '#eaeda1',
	flying: '#D3DEDC',
	fighting: '#E6E0D4',
	normal: '#EEE6CE'
};
const main_types = Object.keys(colors);

function renderEverything(){ // fungsi menampilkan semua pokemon
    let allPokemonContainer = document.querySelector('#poke_container')
    allPokemonContainer.innerText = "";
    getPokemon();
}

function getPokemon(){ //fetch pokemon
    fetch('https://pokeapi.co/api/v2/pokemon?limit=30')
    .then(response => response.json())
    .then(function(allpokemon){
        allpokemon.results.forEach(function(pokemon){
            fetchPokemonData(pokemon);
        })
    })
}

function fetchPokemonData(pokemon) { //fetch dari url api
    let url = pokemon.url // <--- this is saving the pokemon url to a variable to use in the fetch. 
                                //Example: https://pokeapi.co/api/v2/pokemon/1/"
    fetch(url)
    .then(response => response.json())
    .then(function(pokeData){
        createPokemon(pokeData)
    })
}


function createPokemon(pokeData){ //Buat Kartu Pokemon

    let allPokemonContainer = document.getElementById('poke_container');
    let pokeContainer = document.createElement("div") //div will be used to hold the data/details for indiviual pokemon.
    pokeContainer.classList.add('card');

    createPokeImage(pokeData.id, pokeContainer);

    let pokeName = document.createElement('h4') 
    pokeName.innerHTML = pokeData.name[0].toUpperCase() + pokeData.name.slice(1); //membuat huruf pertama kapital

    let pokeNumber = document.createElement('p')
    pokeNumber.innerHTML = `#${pokeData.id.toString().padStart(2, '0')}`
   
    const poke_types = pokeData.types.map(type => type.type.name);
    const type = main_types.find(type => poke_types.indexOf(type) > -1);
    const color = colors[type];

    pokeContainer.style.backgroundColor = color; //mengganti bg card pokemon sesuai dengan tipe

    let pokeTypes = document.createElement('p');
    pokeTypes.innerHTML = `Type : ${type}`;

    pokeContainer.append(pokeName, pokeNumber, pokeTypes);   //appending all details to the pokeContainer div
    allPokemonContainer.appendChild(pokeContainer);
           //appending that pokeContainer div to the main div which will                                                             hold all the pokemon cards
}

// Membuat gambar pokemon
function createPokeImage(pokeID, containerDiv){
    let pokeImgContainer = document.createElement('div')
    pokeImgContainer.classList.add('image')

    let pokeImage = document.createElement('img')
    pokeImage.srcset = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeID}.png`;

    pokeImgContainer.append(pokeImage);
    containerDiv.append(pokeImgContainer);
}