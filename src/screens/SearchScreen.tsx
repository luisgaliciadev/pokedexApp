import React, { useEffect, useState } from 'react'
import { Text, View, Platform, FlatList, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Loading } from '../components/Loading';
import { PokemonCard } from '../components/PokemonCard';
import { SearchInput } from '../components/SearchInput';
import { usePokemonSearch } from '../hooks/usePokemonSearch';
import { styles } from '../theme/appTheme'
import { SimplePokemon } from '../interfaces/pokemonInterfaces';

const screenWidth = Dimensions.get('window').width;

export const SearchScreen = () => {

    const { top } = useSafeAreaInsets();
    const {isFetching, simplePokemonList} = usePokemonSearch();
    const [pokemonFiltered, setPokemonFiltered] = useState<SimplePokemon[]>([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        if(search.length === 0) {
            return setPokemonFiltered([]);
        }

        if(isNaN(Number(search))) {
            setPokemonFiltered(
                simplePokemonList.filter(
                    (poke) => poke.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
                )
            )
        } else {
            const pokemon = simplePokemonList.find(poke => poke.id === search);
            if (pokemon) {
                setPokemonFiltered([pokemon]);
            } else {
                setPokemonFiltered([]);
            }
        }

    }, [search])

    if (isFetching) {
        return (
           <Loading/>
        )
    }

    return (
        <View style={{
            flex: 1,
            // marginTop : (Platform.OS === 'ios') ? top :top + 10,
            marginHorizontal: 20 
        }}>
            <SearchInput 
                onDebounce={(value) => setSearch(value)}
                style={{
                    position: 'absolute',
                    zIndex: 999,
                    width: screenWidth - 40,
                    top: (Platform.OS === 'ios') ? top :top + 15
                }}
            />
            
            <FlatList
                    data={pokemonFiltered}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(pokemon) => pokemon.id}
                    numColumns={2}
                    ListHeaderComponent={(
                        <Text style={{
                            ...styles.title,
                            ...styles.globalMargin,
                            paddingBottom: 10,
                            marginTop: top + 60
                        }}>{search}</Text>
                    )}
                    renderItem={({item}) => ( <PokemonCard pokemon={item}/> )} 
                />
        </View>
    )
}
