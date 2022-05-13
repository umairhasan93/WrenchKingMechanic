import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ToastAndroid,
    Modal,
    ScrollView,
    StyleSheet,
    Dimensions,
} from "react-native"
import { Card } from 'react-native-paper';
import { REACT_NATIVE_APP_API_KEY } from '@env'
import Services from '../ServicesScreen'
import { useNavigation } from '@react-navigation/native';


const API = REACT_NATIVE_APP_API_KEY

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

const Today = (props) => {

    const navigation = useNavigation()

    const id = props.mechanicId
    const [todays, setTodays] = useState([])

    useEffect(() => {
        let url = `${API}confirmedbooking/bookingToday/`
        console.log(id)
        fetch(url + id)
            .then(resp => resp.json())
            .then(resp => {
                setTodays(resp)
                // console.log(todays)
            })
            .catch((error) => console.error(error))

    }, [])

    const displayButton = () => {
        return (
            <TouchableOpacity
                style={styles.buttonContainer}
                activeOpacity={0.6}
                onPress={navigation.navigate('ServicesScreen')}
            >
                <Text style={styles.buttonText}>Start</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.page}>
            <View style={{ marginTop: 70 }}>
                {
                    (todays.length > 0) ? (
                        todays.map((today, index) => {
                            return (
                                <Card key={index} style={index === 0 ? styles.activeCard : styles.card}>
                                    <View style={styles.row}>
                                        <View style={{ flex: 0.45, justifyContent: 'center', backgroundColor: '#00000030', borderRadius: 30 }}>
                                            <Text style={{ alignSelf: 'center', fontSize: 16, color: '#000' }}>{index + 1}.</Text>
                                        </View>
                                        <View style={{ flex: 2, justifyContent: 'center' }}>
                                            <Text style={styles.name}>{today.User_Name}</Text>
                                            <Text style={styles.name}>{today.Model} ({today.Model_Year})</Text>
                                            {/* <Text>{today._id}</Text> */}
                                        </View>

                                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                            {
                                                (index === 0) ? (
                                                    // displayButton()
                                                    <TouchableOpacity
                                                        style={styles.buttonContainer}
                                                        activeOpacity={0.6}
                                                        onPress={() => navigation.navigate('ServicesScreen', {
                                                            username: today.User_Name,
                                                            usernumber: today.User_Number,
                                                            mechanicname: today.Mechanic_Name,
                                                            mechanicnumber: today.Mechanic_Number,
                                                            idd: today._id
                                                        })}
                                                    >
                                                        <Text style={styles.buttonText}>Start</Text>
                                                    </TouchableOpacity>
                                                ) : null
                                            }
                                        </View>
                                    </View>
                                </Card>
                            )
                        })
                    ) : (
                        <View style={styles.noBookingTextView}>
                            <Text style={styles.noBookingText}>No Bookings For Today ...</Text>
                        </View>
                    )
                }
            </View>
        </View >
    )
}

const styles = StyleSheet.create({

    card: {
        padding: 10,
        margin: 10,
        // marginTop: 100,
        borderRadius: 7,
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
        borderColor: '#42c71a',
        backgroundColor: '#fff'
    },

    activeCard: {
        padding: 10,
        margin: 10,
        // marginTop: 100,
        borderRadius: 7,
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
        borderColor: 'dodgerblue',
        backgroundColor: '#fff'
    },

    row: {
        flexDirection: 'row',
        flex: 1,
    },

    name: {
        fontSize: 16,
        color: '#000',
        marginLeft: (WIDTH / 20)
    },

    date: {
        fontSize: 15,
        color: "#000",
        marginLeft: (WIDTH / 20)
    },

    buttonContainer: {
        backgroundColor: 'dodgerblue',
        width: WIDTH / 5,
        height: WIDTH / 13,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },

    buttonText: {
        fontSize: 16,
        color: 'white',
    },

    noBookingTextView: {
        marginTop: 200,
        alignItems: 'center'
    },

    noBookingText: {
        fontSize: 20,
        color: '#e61025'
    }

})

export default Today