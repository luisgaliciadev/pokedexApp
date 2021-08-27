import React, { useRef, useState } from 'react'
import { Text, TouchableOpacity, View, StyleSheet, Dimensions, Image } from 'react-native';
import { SimplePokemon } from '../interfaces/pokemonInterfaces';
import { FadeInImage } from './FadeInImage';
import { useEffect } from 'react';
import ImageColors from 'react-native-image-colors';
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width

interface Props {
    pokemon: SimplePokemon
}

export const PokemonCard = ({pokemon}: Props) => {

    const [bgColor, setBgColor] = useState('grey');
    const isMounted = useRef(true);
    const navigation = useNavigation();

    useEffect(() => {
       ImageColors.getColors(pokemon.picture, {
        fallback: 'grey',
        // cache: true,
        // key: 'unique_key',
      })
      .then( colors => {
        if (!isMounted.current) return;

        if(colors.platform === 'android') {
            setBgColor(colors.dominant || 'grey');
        } 

        if(colors.platform === 'ios') {
            setBgColor(colors.background || 'grey');
        } 
      });

      return () => {
          isMounted.current = false;
      }

    }, [])

    return (
        <View>
            {/* <Text>{pokemon.name}</Text> */}
            
            <TouchableOpacity
                activeOpacity={0.5}
                onPress={ () => navigation.navigate('PokemonScreen', {simplePokemon: pokemon, color: bgColor})}
            >
                <View style= {{
                    ...styles.cardContainer,
                    width: windowWidth * 0.4,
                    backgroundColor: bgColor
                }}>
                    <View>
                        <Text style={{...styles.name}}>
                            {pokemon.name}
                            {'\n#' + pokemon.id}
                        </Text>
                    </View>

                    <View style={{...styles.pokebolaContainer}}>
                        <Image 
                            source={require('../assets/pokebola-blanca.png')}
                            style={{...styles.pokebola}}
                        />
                    </View>

                    <FadeInImage
                        uri={pokemon.picture}
                        style={{
                            ...styles.pokemonImg
                        }}
                    />

                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        marginHorizontal: 10,
        height: 120,
        width: 160,
        marginBottom: 25,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

elevation: 10,
    },
    name: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        top: 20,
        left: 10
    },
    pokebola: {
        width: 100,
        height: 100,
        position: 'absolute',
        right: -25,
        bottom: -20
    },
    pokemonImg: {
        width: 100,
        height: 100,
        position: 'absolute',
        right: -8,
        bottom: 0
    },
    pokebolaContainer: {
        height: 110,
        width: 110,
        position: 'absolute',
        bottom: 0,
        right: 0,
        overflow: 'hidden',
        opacity: 0.5
    }
})
