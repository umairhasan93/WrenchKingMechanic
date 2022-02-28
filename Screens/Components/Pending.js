import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Modal,
    ToastAndroid
} from 'react-native';
import { Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AsyncStorage from '@react-native-community/async-storage'
import { REACT_NATIVE_APP_API_KEY } from '@env'

const API = REACT_NATIVE_APP_API_KEY

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

export default Pending = (props) => {

    const id = props.mechanicId

    const showToastWithGravity = () => {
        ToastAndroid.showWithGravity(
            'Booking Confirmed',
            ToastAndroid.LONG,
            ToastAndroid.CENTER
        );
    };

    const [selectedHour, setSelectedHour] = useState(8)
    const [selectedMinutes, setSelectedMinutes] = useState(0)
    const [meridiem, setMeridiem] = useState('a.m')
    const [isPressed, setIsPressed] = useState(false)
    const [bookings, setBookings] = useState([])
    const [modalVisible, setModalVisible] = useState(false);
    const [identifier, setIdentifier] = useState('')
    const [username, setUsername] = ('')
    const [usernumber, setUsernumber] = ('')
    const [useremail, setUseremail] = ('')
    const [carcompany, setCarcompany] = ('')
    const [model, setModel] = ('')
    const [modelyear, setModelyear] = ('')
    const [mechanicname, setMechanicname] = ('')
    const [mechanicnumber, setMechanicnumber] = ('')
    const [mechanicaddress, setMechanicaddress] = ('')
    const [mechanicspeciality, setMechanicspeciality] = ('')
    const [bookingdate, setBookingdate] = ('')
    const [requesteddate, setRequesteddate] = ('')
    const [type, setType] = ('')
    const [status, setStatus] = ('')


    console.log(id)

    useEffect(() => {
        let url = `${API}booking/mechanicPendingBooking/`
        // console.log(url)
        fetch(url + id)
            .then(resp => resp.json())
            .then(resp => setBookings(resp))
            .catch((error) => console.error(error))

    }, [id])

    const HoursIncrement = () => {
        if (selectedHour === 12) {
            setSelectedHour(1)
        } else {
            setSelectedHour(selectedHour + 1)
        }
    }
    const HoursDecrement = () => {
        if (selectedHour === 1) {
            setSelectedHour(12)
        } else {
            setSelectedHour(selectedHour - 1)
        }
    }

    const MinutesIncrement = () => {
        if (selectedMinutes === 59) {
            setSelectedMinutes(0)
        } else {
            setSelectedMinutes(selectedMinutes + 1)
        }
    }
    const MinutesDecrement = () => {
        if (selectedMinutes === 0) {
            setSelectedMinutes(59)
        } else {
            setSelectedMinutes(selectedMinutes - 1)
        }
    }

    const changeMeridiem = () => {
        setIsPressed(!isPressed)
        if (isPressed) {
            setMeridiem('a.m')
        } else {
            setMeridiem('p.m')
        }
    }

    const confirm = () => {
        let url = `${API}booking/`
        fetch(url + identifier, {
            method: 'PUT',
            body: JSON.stringify({
                Status: 'Confirmed'
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })

            .then((response) => response.json())
            .then((json) => {
                navigation.navigate('HomeScreen')
                // setError('Name Changed')
                showToastWithGravity()


            })
            .catch(err => {
                console.log({ err });
                reject(err);
            })
    }


    return (

        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.modalHeader}>
                            <View><Text style={styles.modalText}>Select Time</Text></View>
                            <TouchableOpacity
                                onPress={() => setModalVisible(false)}
                                style={{ marginRight: -55, marginTop: -13 }}
                            >
                                <Icon
                                    name="times"
                                    color="red"
                                    size={25}

                                />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.modalTimeContainer}>
                            <View style={styles.HoursView}>

                                <TouchableOpacity onPress={HoursIncrement}>
                                    <Ionicons
                                        name="caret-up-outline"
                                        size={55}
                                        color="#000"
                                    />
                                </TouchableOpacity>

                                <View style={styles.HoursDisplay}>
                                    <Text style={styles.displayText}>{(selectedHour < 10) ? "0" : null}{selectedHour}</Text>
                                </View>

                                <TouchableOpacity onPress={HoursDecrement}>
                                    <Ionicons
                                        name="caret-down-outline"
                                        size={55}
                                        color="#000"
                                    />
                                </TouchableOpacity>

                            </View>
                            <View style={{ justifyContent: 'center', marginLeft: 20 }}>
                                <Text style={{ fontSize: 45, marginTop: -8 }}>:</Text>
                            </View>

                            <View style={styles.MinutesView}>

                                <TouchableOpacity onPress={MinutesIncrement}>
                                    <Ionicons
                                        name="caret-up-outline"
                                        size={55}
                                        color="#000"
                                    />
                                </TouchableOpacity>

                                <View style={styles.HoursDisplay}>
                                    <Text style={styles.displayText}>{(selectedMinutes < 10) ? "0" : null}{selectedMinutes}</Text>
                                </View>

                                <TouchableOpacity onPress={MinutesDecrement}>
                                    <Ionicons
                                        name="caret-down-outline"
                                        size={55}
                                        color="#000"
                                    />
                                </TouchableOpacity>

                            </View>

                            <View style={styles.ampmView}>
                                <TouchableOpacity
                                    activeOpacity={0.3}
                                    style={{ backgroundColor: '#00000040', height: 45, justifyContent: 'center' }}
                                    onPress={changeMeridiem}
                                >
                                    <Text style={styles.meridiemText}>{meridiem}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.buttonView}>
                            <TouchableOpacity style={styles.buttonContainer} onPress={confirm}>
                                <Text style={styles.buttonText}>Confirm</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </Modal >
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
                                        onPress={() => {
                                            setModalVisible(true)
                                            setIdentifier(booking._id)
                                        }}
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
        </View >

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
    },

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#00000060'
    },
    modalView: {
        margin: 20,
        backgroundColor: "#ffffff",
        borderRadius: 20,
        padding: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 10,
        width: WIDTH / 1.2,
        height: HEIGHT / 2
    },

    modalHeader: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: "space-evenly"
    },

    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 30,
        marginLeft: 15
    },

    modalTimeContainer: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        borderRadius: 10
    },

    HoursView: {
        justifyContent: 'center'
    },

    MinutesView: {
        marginLeft: 20,
        justifyContent: 'center'

    },

    ampmView: {
        justifyContent: 'center',
        marginLeft: 20,
        marginRight: -10
    },

    HoursDisplay: {
        alignItems: 'center',
        color: '#000'
    },

    displayText: {
        fontSize: 45,
        color: '#000'
    },

    meridiemText: {
        fontSize: 35,
        marginTop: -8,
        color: '#000'
    },

    buttonView: {
        marginTop: 30
    },

    buttonContainer: {
        backgroundColor: 'dodgerblue',
        height: 40,
        width: 120,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },

    buttonText: {
        color: 'white',
        fontSize: 20
    },

})