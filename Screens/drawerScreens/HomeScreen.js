import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    ImageBackground,
    Dimensions,
} from 'react-native';
import { Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome'
import MenuButton from '../Components/NavigationDrawerHeader'
import AsyncStorage from '@react-native-community/async-storage'
import { REACT_NATIVE_APP_API_KEY } from '@env'
import { LocalNotification } from '../services/LocalNotification'
import Pending from '../Components/Pending'

const API = REACT_NATIVE_APP_API_KEY

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

const HomeScreen = ({ navigation }) => {

    const [mechanic, setMechanic] = useState([])
    const [bookings, setBookings] = useState('')


    // console.log(name)
    const id = mechanic.contactNo
    // console.log(id)
    // console.log(bookings);

    const handlePress = () => {
        LocalNotification()
    }

    const loading = () => {
        if (bookings.length > 0) {
            LocalNotification()
        }

    }

    const display = () => {
        if (bookings.length > 0) {
            return (
                <Pending mechanicId={id} />
            )
        }
    }

    useEffect(() => {
        AsyncStorage.getItem('mechanic').then(data => {
            setMechanic(JSON.parse(data))
        })

        let url = `${API}booking/mechanicBooking/`
        fetch(url + id)
            .then(resp => resp.json())
            .then(resp => setBookings(resp))
            .catch((error) => console.error(error))

    }, [])



    return (
        <SafeAreaView style={{ flex: 1 }}>
            {loading()}
            <View style={{
                flexDirection: 'row',
                backgroundColor: '#E41B17',
                borderBottomRightRadius: 20,
                borderTopLeftRadius: 20,
                height: 50,
                paddingTop: 6,
                shadowColor: '#000000',
                shadowOffset: {
                    width: 0,
                    height: 5,
                },
                shadowOpacity: 10,
                shadowRadius: 10,
                elevation: 10,
            }}>
                <MenuButton onPress={() => navigation.openDrawer()} />
                <Text style={styles.headerText}>Wrench King</Text>
            </View>

            <View style={{ alignItems: 'center', paddingTop: 20, paddingBottom: 20 }}>
                {display()}
            </View>


        </SafeAreaView >
    );
};

const styles = StyleSheet.create({

    headerText: {
        fontSize: 24,
        alignItems: "center",
        marginLeft: 60,
        marginTop: 2,
        color: 'white',
        fontWeight: 'bold',
    },



})

export default HomeScreen;