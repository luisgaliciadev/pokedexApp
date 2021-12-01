import React, { useEffect } from 'react'
import { ActivityIndicator, Image, Text, View } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { FlatList } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { usePokemonPaginated } from '../hooks/usePokemonPaginated';
import { styles } from '../theme/appTheme';

// import Icon from 'react-native-vector-icons/Ionicons';
// import { FadeInImage } from '../components/FadeInImage';
import { PokemonCard } from '../components/PokemonCard';

export const HomeScreen = () => {

    const { top } = useSafeAreaInsets();
    const { isLoading, simplePokemonList, loadPokemons } = usePokemonPaginated();

    useEffect(() => {
        SplashScreen.hide();
    },[])
   
    return (
        <>
            <Image
                source={require('../assets/pokebola.png')}
                style={styles.pokebolaBG}
            />
            <View
                style={{alignItems: 'center'}}
            >
                <FlatList
                    data={simplePokemonList}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(pokemon) => pokemon.id}
                    numColumns={2}
                    ListHeaderComponent={(
                        <Text style={{
                            ...styles.title,
                            ...styles.globalMargin,
                            top: top + 20,
                            marginBottom: top + 20,
                            paddingBottom: 10
                        }}>Pokedex</Text>
                    )}
                    renderItem={({item}) => ( <PokemonCard pokemon={item}/> )} 

                    // Infinite scroll
                    onEndReached={loadPokemons}
                    onEndReachedThreshold={0.4}
                    ListFooterComponent={(
                        <ActivityIndicator 
                            style={{ height: 100}}
                            size={20}
                            color='black'
                        />
                    )}
                />
            </View>
        </>
    )
}
