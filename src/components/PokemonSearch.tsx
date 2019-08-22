import React from 'react'
import { useState, useRef } from 'react';
import User from '../interfaces/User.interface';


const PokemonSearch: React.SFC<User> = props => {

    const pokemonRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState<boolean>(false);
    const [pokemon, setPokemon] = useState<Pokemon>(null)

    const onSearch = async () => {
        const inputValue = pokemonRef.current.value;
        if(inputValue === "")return
        let r = await fetch(`https://pokeapi.co/api/v2/pokemon/${inputValue}`)
        if (r.status === 200) {
            let data = await r.json()
            setError(false);
            setPokemon({
                name: data.name,
                numAbilities: data.abilities.length,
                baseXP: data.base_experience,
                imageUrl: data.sprites.front_default

            })
        } else {
            setError(true)
        }
    }

    const { name: userName, numPokemon } = props;

    let resultMarkup;

    if (error) {
        resultMarkup = <p>Pokemon not found, please try again</p>
    } else if (pokemon) {
        resultMarkup = <div>
            <img src={pokemon.imageUrl} alt="pokemon" className="pokemon-image" />
            <p>
                {pokemon.name} has {pokemon.numAbilities} abilities and {pokemon.baseXP} base XP
                </p>
        </div>
    }
    return (
        <div>
            <p>trainer: {userName}{numPokemon && <span>, Pokemon: {numPokemon}</span>}</p>
            <input type="text" ref={pokemonRef} />
            <button onClick={onSearch} className="my-button">
                Search
                </button>
            {resultMarkup}
        </div>
    )
}

export default PokemonSearch


interface Pokemon {
    name: string;
    numAbilities: number;
    baseXP: number;
    imageUrl: string;

}