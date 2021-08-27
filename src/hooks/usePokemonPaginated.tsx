import { useEffect, useRef, useState } from "react";
import { pokemonApi } from '../api/pokemonApi';
import { PokemonPaginateRespose, SimplePokemon, Result } from '../interfaces/pokemonInterfaces';

export const usePokemonPaginated = () => {

    const [isLoading, setIsLoading] = useState(true)
    const [simplePokemonList, setSimplePokemonList] = useState<SimplePokemon[]>([])
    const nextPageUrl = useRef('https://pokeapi.co/api/v2/pokemon?limit=40')
    const loadPokemons = async() => {
        setIsLoading(true);
        const response = await pokemonApi.get<PokemonPaginateRespose>(nextPageUrl.current);
        nextPageUrl.current = response.data.next;
        mapPokemonList(response.data.results);
    };

    const mapPokemonList = (pokemonList: Result[]) => {
        const newPokemonList: SimplePokemon[] = pokemonList.map( ( { name, url}) => {
            const urlParst = url.split('/');
            const id = urlParst[urlParst.length - 2];
            const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
            return {
                id,
                picture,
                name
            }
        });

        setSimplePokemonList([
            ...simplePokemonList,
            ...newPokemonList
        ]);
        setIsLoading(false);
    }

    useEffect(() => {
        loadPokemons();  
    }, [])

    return {
        isLoading,
        simplePokemonList,
        loadPokemons
    }
    

}
