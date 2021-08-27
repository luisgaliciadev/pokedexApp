import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, StyleProp, ViewStyle } from 'react-native';
import { View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/Ionicons'
import { useDevouncedValue } from '../hooks/useDevouncedValue';

interface Props {
    onDebounce: (value: string) => void;
    style?: StyleProp<ViewStyle>
}

export const SearchInput = ({ style, onDebounce }: Props) => {

    const [textValue, setTextValue] = useState('');
    const { devauncedValue } = useDevouncedValue(textValue, 1000);

    useEffect(() => {
        onDebounce(devauncedValue);
    }, [devauncedValue])

    return (
        <View style={{...styles.container, ...style as any}}>
            <View style={{...styles.textBackground}}>
                <TextInput
                    placeholder="Search"
                    style={{...styles.textInput}}
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={textValue}
                    onChangeText={setTextValue}
                />

                <Icon name="search-outline" color="grey" size={30}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'red'
    },
    textBackground: {
        paddingHorizontal: 10,
        backgroundColor: '#F3F1F3',
        borderRadius: 50,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.41,
        shadowRadius: 9.11,

        elevation: 14,
    },
    textInput: {
        flex: 1,
        fontSize: 18,
        top: 1
    }
});
