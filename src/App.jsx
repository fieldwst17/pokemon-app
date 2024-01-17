import "./App.css";
import { useState } from "react";
import axios from "axios";

function App() {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonChosen, setPokemonChosen] = useState(false);
  const [pokemon, setPokemon] = useState({
    name: "",
    species: "",
    img: "",
    hp: "",
    attack: "",
    defense: "",
    type: "",
  });

  const searchPokemon = () => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then((response) => {
        const types = response.data.types.map((type) => type.type.name);
        setPokemon({
          name: pokemonName,
          species: response.data.species.name,
          img: response.data.sprites.front_default,
          hp: response.data.stats[0].base_stat,
          attack: response.data.stats[1].base_stat,
          defense: response.data.stats[2].base_stat,
          type: types.join(", "),
        });
        setPokemonChosen(true);
      })
      .catch((error) => {
        console.error("Error fetching data from API:", error);
        setPokemonChosen(false);
      });
  };

  return (
    <div className="App">
      <div className="TitleSection">
        <h1>Pokemon API</h1>
        <input
          type="text"
          onChange={(e) => {
            setPokemonName(e.target.value);
          }}
        />
        <button onClick={searchPokemon}>Search Pokemon</button>
      </div>

      <div className="DisplaySection">
        {!pokemonChosen ? (
          <h1>Please choose a Pokemon</h1>
        ) : (
          <div>
            <h1>{pokemon.name}</h1>
            <img src={pokemon.img} alt={pokemon.name} />
            <h3>Species: {pokemon.species}</h3>
            <h4>HP: {pokemon.hp}</h4>
            <h4>Attack: {pokemon.attack}</h4>
            <h4>Defense: {pokemon.defense}</h4>
            <p>Type: {pokemon.type}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
