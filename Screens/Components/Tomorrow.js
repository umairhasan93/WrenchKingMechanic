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

const API = REACT_NATIVE_APP_API_KEY
console.log(API)

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

const Tomorrow = (props) => {

    const id = props.mechanicId
    const [todays, setTodays] = useState([])
    console.log(todays)

    useEffect(() => {
        let url = `${API}confirmedbooking/bookingTomorrow/`
        // console.log(url)
        fetch(url + id)
            .then(resp => resp.json())
            .then(resp => {
                setTodays(resp)
                // console.log(todays)
            })
            .catch((error) => console.error(error))

    }, [todays])

    return (
        <View style={{ marginTop: 70 }}>
            {
                (todays.length > 0) ? (
                    todays.map((today, index) => {
                        return (
                            <Card key={index} style={styles.card}>
                                <View style={styles.row}>
                                    <View style={{ flex: 0.35, justifyContent: 'center', backgroundColor: '#00000030', borderRadius: 30 }}>
                                        <Text style={{ alignSelf: 'center', fontSize: 16, color: '#000' }}>{index + 1}.</Text>
                                    </View>
                                    <View style={{ flex: 2, justifyContent: 'center' }}>
                                        <Text style={styles.name}>{today.User_Name}</Text>
                                        <Text style={styles.name}>{today.Model} ({today.Model_Year})</Text>
                                    </View>

                                    {/* <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                        {
                                            (index === 0) ? (
                                                <TouchableOpacity
                                                    style={styles.buttonContainer}
                                                    activeOpacity={0.6}
                                                >
                                                    <Text style={styles.buttonText}>Start</Text>
                                                </TouchableOpacity>
                                            ) : null
                                        }
                                    </View> */}
                                </View>
                            </Card>
                        )
                    })
                ) : (
                    <View style={styles.noBookingTextView}>
                        <Text style={styles.noBookingText}>No Bookings For Tomorrow ...</Text>
                    </View>
                )
            }
        </View >
    )
}

const styles = StyleSheet.create({

    card: {
        padding: 10,
        margin: 10,
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
        borderColor: 'yellow',
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

export default Tomorrow