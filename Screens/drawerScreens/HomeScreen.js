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
import Todos from '../TODOS'
import Services from '../ServicesScreen'

const API = REACT_NATIVE_APP_API_KEY
// console.log(REACT_NATIVE_APP_API_KEY)

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

const HomeScreen = ({ navigation }) => {

    const [mechanic, setMechanic] = useState([])
    const [bookings, setBookings] = useState([])


    // console.log(name)
    const id = mechanic.contactNo
    // console.log(id)
    // console.log(bookings);

    // const handlePress = () => {
    //     LocalNotification()
    // }

    const loading = () => {
        if (bookings.length > 0) {
            for (var i = 0; i <= bookings.length; i++) {
                LocalNotification()
            }
        }

    }

    const display = () => {
        console.log(bookings.length)

        if (bookings.length < 1) {
            return (
                <Todos mechanicId={id} />
            )
        } else {
            return (
                <Pending mechanicId={id} />
            )

        }
    }

    useEffect(() => {
        AsyncStorage.getItem('mechanic').then(data => {
            setMechanic(JSON.parse(data))
        })

        let url = `${API}booking/mechanicPendingBooking/`
        console.log(url)
        // console.log(url + id)

        fetch(url + id)
            .then(resp => resp.json())
            .then(resp => setBookings(resp))
            .catch((error) => console.error(error))

    }, [bookings])



    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'lavender' }}>
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

            <View style={{ flex: 1 }}>
                {/* {display()}

                <Services mechanicId={id} /> */}
                <TouchableOpacity onPress={() => navigation.navigate('PendingScreen', {
                    number: { id }
                })}>
                    <Card style={styles.card}>
                        <View style={{ flexDirection: 'row' }}>
                            <View>
                                <Icon
                                    name='chevron-right'
                                    size={25}
                                    color='red'
                                />
                            </View>
                            <View style={{ alignItems: 'center', marginTop: -2, marginLeft: 10 }}>
                                <Text style={{ fontSize: 20, color: '#000', fontWeight: 'bold' }}>PENDING REQUEST</Text>
                            </View>
                            <View style={styles.pendingNumbers}>
                                <Text style={styles.pendingNumbersText}>{bookings.length}</Text>
                            </View>
                        </View>
                    </Card>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('TodosScreen', { number: id })}>
                    <Card style={styles.card}>
                        <View style={{ flexDirection: 'row' }}>
                            <View>
                                <Icon
                                    name='chevron-right'
                                    size={25}
                                    color='red'
                                />
                            </View>
                            <View style={{ alignItems: 'center', marginTop: -2, marginLeft: 10 }}>
                                <Text style={{ fontSize: 20, color: '#000', fontWeight: 'bold' }}>TODOS</Text>
                            </View>
                        </View>
                    </Card>
                </TouchableOpacity>


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

    card: {
        height: HEIGHT / 10,
        width: WIDTH / 1.05,
        marginTop: 30,
        borderBottomRightRadius: 20,
        borderTopRightRadius: 20,
        paddingTop: 20,
        paddingLeft: 15
    },

    pendingNumbers: {
        backgroundColor: 'red',
        height: 35,
        width: 35,
        borderRadius: 17,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 120,
        marginTop: -30
    },

    pendingNumbersText: {
        color: 'white',
        fontSize: 16
    },


})

export default HomeScreen;