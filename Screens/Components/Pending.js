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
import Icon from 'react-native-vector-icons/FontAwesome5'
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

    const showToastWithGravityError = () => {
        ToastAndroid.showWithGravity(
            'Time Not Selected',
            ToastAndroid.LONG,
            ToastAndroid.CENTER
        );
    };

    const [hours, setHours] = useState('')
    const [minutes, setMinutes] = useState('')
    const [selectedHour, setSelectedHour] = useState(8)
    const [selectedMinutes, setSelectedMinutes] = useState(0)
    const [meridiem, setMeridiem] = useState('a.m')
    const [isPressed, setIsPressed] = useState(false)
    const [bookings, setBookings] = useState([])
    const [modalVisible, setModalVisible] = useState(false);
    const [identifier, setIdentifier] = useState('')
    const [username, setUsername] = useState('')
    const [usernumber, setUsernumber] = useState('')
    const [useremail, setUseremail] = useState('')
    const [carcompany, setCarcompany] = useState('')
    const [model, setModel] = useState('')
    const [modelyear, setModelyear] = useState('')
    const [mechanicname, setMechanicname] = useState('')
    const [mechanicnumber, setMechanicnumber] = useState('')
    const [mechanicaddress, setMechanicaddress] = useState('')
    const [mechanicspeciality, setMechanicspeciality] = useState('')
    const [bookingdate, setBookingdate] = useState('')
    const [requesteddate, setRequesteddate] = useState('')
    const [type, setType] = useState('')
    const [time, setTime] = useState('')


    console.log(id)

    useEffect(() => {
        let url = `${API}booking/mechanicPendingBooking/`
        // console.log(url)
        fetch(url + id)
            .then(resp => resp.json())
            .then(resp => setBookings(resp))
            .catch((error) => console.error(error))

    }, [])

    const SetTime = () => {
        if (selectedHour <= 9 && selectedMinutes <= 9) {
            setHours(selectedHour)
            setMinutes('0' + selectedMinutes)
            setTime(hours + ' : ' + minutes + ' ' + meridiem)

        } else {
            setHours(selectedHour)
            setMinutes(selectedMinutes)
            setTime(hours + ' : ' + minutes + ' ' + meridiem)
        }
        console.log(time)
    }

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
        SetTime()
        setModalVisible(!modalVisible)
    }

    const Accept = () => {

        if (time === '') {
            showToastWithGravityError()
        } else {
            let url = `${API}booking/`
            console.log(url + identifier)
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
                    // console.log(json)
                })
                .catch(err => {
                    console.log({ err });
                })


            let url1 = `${API}confirmedbooking/confirmedbooking`
            fetch(url1, {
                method: 'POST',
                body: JSON.stringify({
                    User_Name: username,
                    User_Number: usernumber,
                    User_Email: useremail,
                    Car_Company: carcompany,
                    Model: model,
                    Model_Year: modelyear,
                    Mechanic_Name: mechanicname,
                    Mechanic_Number: mechanicnumber,
                    Mechanic_Address: mechanicaddress,
                    Mechanic_Speciality: mechanicspeciality,
                    Booking_Date: bookingdate,
                    Requested_Date: requesteddate,
                    Type: type,
                    Status: 'Confirmed',
                    Time_Of_Service: time
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })

                .then((response) => response.json())
                .then((json) => {
                    console.log(json)
                    showToastWithGravity()
                })
                .catch(err => {
                    console.log({ err });
                })
        }
    }


    return (

        <View style={styles.page}>
            <ScrollView>
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
                                    onPress={() => {
                                        setModalVisible(false)
                                        setSelectedHour(8)
                                        setSelectedMinutes(0)
                                    }}
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
                                <TouchableOpacity
                                    style={styles.buttonContainer}
                                    onPress={confirm}
                                >
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
                                        <TouchableOpacity
                                            style={styles.timeIcon}
                                            onPress={() => {
                                                setModalVisible(true)
                                                setIdentifier(booking._id)
                                            }}
                                            activeOpacity={0.6}
                                        >
                                            <Ionicons
                                                name="time-outline"
                                                size={30}
                                                color='#fff'
                                            />
                                        </TouchableOpacity>
                                        <View style={{ width: 163, alignItems: 'center', marginLeft: 30, marginRight: 30 }}>
                                            <Text style={styles.nameText}>{booking.User_Name}</Text>
                                        </View>

                                        <TouchableOpacity style={styles.listIcon}>
                                            <Icon
                                                name="tasks"
                                                size={24}
                                                color='#fff'
                                            />
                                        </TouchableOpacity>

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
                                            <Text style={{ fontSize: 15, color: 'black', fontWeight: 'bold' }}>{booking.Requested_Date}</Text>
                                        </View>
                                        <View style={{ marginTop: 2 }}>
                                            <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Requested Date</Text>
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
                                                setIdentifier(booking._id)
                                                setUsername(booking.User_Name)
                                                setUsernumber(booking.User_Number)
                                                setUseremail(booking.User_Email)
                                                setCarcompany(booking.Car_Company)
                                                setModel(booking.Model)
                                                setModelyear(booking.Model_Year)
                                                setMechanicname(booking.Mechanic_Name)
                                                setMechanicnumber(booking.Mechanic_Number)
                                                setMechanicaddress(booking.Mechanic_Address)
                                                setMechanicspeciality(booking.Mechanic_Speciality)
                                                setBookingdate(booking.Booking_Date)
                                                setRequesteddate(booking.Requested_Date)
                                                setType(booking.Type)
                                                Accept()
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
            </ScrollView>
        </View >

    )
}

const styles = StyleSheet.create({

    page: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
        // backgroundColor: ''
    },

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

    timeIcon: {
        backgroundColor: '#1E90FF',
        alignItems: 'center',
        paddingLeft: 2,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.9,
        shadowRadius: 5,
        elevation: 2,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
    },

    listIcon: {
        backgroundColor: '#f70a0a90',
        width: 37,
        height: 35,
        alignItems: 'center',
        borderRadius: 10,
        justifyContent: 'center',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.9,
        shadowRadius: 5,
        elevation: 2,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
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