import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage'

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

const DrawerFooter = () => {
    const navigation = useNavigation()

    const handleSubmit = () => {
        AsyncStorage.clear()
        navigation.replace('Auth')
    }
    return (

        <View style={{ marginTop: 115 }}>
            <TouchableOpacity onPress={() => handleSubmit()} activeOpacity={0.3}>
                <View style={styles.logoutContainer}>
                    <Icon style={styles.Logouticons} name="sign-out-alt" size={18} />
                    <Text style={styles.logoutText}> Logout </Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    logoutContainer: {
        height: HEIGHT / 15,
        marginTop: HEIGHT / 15,
        marginBottom: 10,
        marginLeft: -10,
        flexDirection: 'row',
        paddingLeft: WIDTH / 13
    },

    Logouticons: {
        // marginLeft: 30,
        marginTop: 2,
        color: '#ff000095',
    },

    logoutText: {
        marginLeft: 5,
        fontSize: 15,
        color: 'gray',
    },

})

export default DrawerFooter