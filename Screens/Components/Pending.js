import React, { useState, useEffect } from 'react'
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
import AsyncStorage from '@react-native-community/async-storage'
import { REACT_NATIVE_APP_API_KEY } from '@env'

const API = REACT_NATIVE_APP_API_KEY

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

export default Pending = (props) => {

    const id = props.mechanicId
    const [bookings, setBookings] = useState([])
    console.log(id)

    useEffect(() => {
        let url = `${API}booking/mechanicBooking/`
        fetch(url + id)
            .then(resp => resp.json())
            .then(resp => setBookings(resp))
            .catch((error) => console.error(error))

    }, [])

    return (

        <View>
            {
                bookings.map((booking, index) => {
                    return (
                        <Card key={index} style={styles.card}>
                            <View style={{ alignItems: 'center' }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ width: 163, alignItems: 'center' }}>
                                        <Text style={styles.nameText}>{booking.User_Name}</Text>
                                    </View>

                                    {/* <View style={{ width: WIDTH / 4.5, backgroundColor: '#F9DB24', marginRight: -(WIDTH / 3.6), alignItems: 'center', justifyContent: 'center', borderTopLeftRadius: 5, borderBottomLeftRadius: 5 }}>
                                            <Text style={{ fontSize: 14, marginBottom: 2, fontWeight: 'bold', color: 'black' }}>{booking.Status}</Text>
                                        </View> */}

                                </View>

                                <View style={{ flexDirection: 'row' }}>
                                    <View>
                                        <Text style={{ fontSize: 15 }}>Service:</Text>
                                    </View>
                                    <View style={{ marginLeft: 4 }}>
                                        <Text style={{ color: 'red', textDecorationLine: 'underline', fontSize: 15 }}>{booking.Mechanic_Speciality}</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', marginTop: 30 }}>
                                <View style={{ width: 160, alignItems: 'center' }}>
                                    <View>
                                        <Text style={{ fontSize: 15, color: 'black' }}>{booking.Requested_Date}</Text>
                                    </View>
                                    <View style={{ marginTop: 2 }}>
                                        <Text style={{ fontSize: 14 }}>Requested Date</Text>
                                    </View>
                                </View>

                                <View style={{ width: 160, alignItems: 'center' }}>
                                    <View>
                                        <Text style={{ fontSize: 15, color: 'black' }}>{booking.Booking_Date}</Text>
                                    </View>
                                    <View style={{ marginTop: 2 }}>
                                        <Text style={{ fontSize: 14 }}>Date of Appointment</Text>
                                    </View>

                                </View>
                            </View>
                            <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'center' }}>

                                <View style={{ width: WIDTH / 2.5, alignItems: 'center' }}>
                                    <TouchableOpacity
                                        style={{
                                            backgroundColor: '#ff000095',
                                            height: HEIGHT / 20,
                                            width: WIDTH / 4,
                                            borderRadius: 30,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexDirection: 'row'
                                        }}
                                    >
                                        <Icon
                                            name='times'
                                            size={16}
                                            style={{
                                                marginLeft: -10,
                                                marginRight: 4
                                            }}
                                        />
                                        <Text style={{ fontSize: 15, color: 'black', marginTop: -1 }}>Cancel</Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={{ width: WIDTH / 2.5, alignItems: 'center' }}>
                                    <TouchableOpacity
                                        style={{
                                            backgroundColor: '#12AD2B',
                                            height: HEIGHT / 20,
                                            width: WIDTH / 4,
                                            borderRadius: 30,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexDirection: 'row'
                                        }}
                                    >
                                        <Icon
                                            name='check'
                                            size={16}
                                            style={{
                                                marginLeft: -10,
                                                marginRight: 4
                                            }}
                                        />
                                        <Text style={{ fontSize: 15, color: 'black', marginTop: -1 }}>Accept</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Card>
                    )
                })
            }
        </View>

    )
}

const styles = StyleSheet.create({
    card: {
        marginBottom: 30,
        padding: 15,
        width: WIDTH - 30,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.9,
        shadowRadius: 5,
        elevation: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        backgroundColor: '#00ff0010'
    },

    nameText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: "black",
        marginLeft: -3,
    }
})