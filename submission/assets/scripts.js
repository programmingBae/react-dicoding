const pokemonImages = document.querySelectorAll('.pokeImage');
const pokemonNames = document.querySelectorAll('.pokeName');


const fetchPoke = async() => {

    for (let i = 0; i < pokemonImages.length; i++){
        let response = await fetch("https://pokeapi.co/api/v2/pokemon/"+(i+1));
        let data = await response.json();
        console.log(data.species.name)
        let name = data.species.name;
        name = name.charAt(0).toUpperCase()+name.slice(1,data.species.name.length);
        pokemonNames[i].innerHTML = name;
        pokemonImages[i].setAttribute("src",
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+(i+1)+".png")
    }
}

fetchPoke()

