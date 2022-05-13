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
import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-community/async-storage'
import { REACT_NATIVE_APP_API_KEY } from '@env'
import MenuButton from '../Components/NavigationDrawerHeader'

const API = REACT_NATIVE_APP_API_KEY

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

export default Pending = ({ navigation, route }) => {



    const id = route.params
    const i = id.number
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

    const initialState = {
        Das: false,
        Bara: false,
        Do: false,
        Char: false,
        Che: false,

    };

    const [state, setState] = useState(initialState)


    // const [isPressed, setIsPressed] = useState(false)
    const [bookings, setBookings] = useState([])
    const [confirmedBooking, setConfirmedBooking] = useState([])
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
    const [time, setTime] = useState()
    const [chkDate, setChkDate] = useState('')



    // console.log(i)

    useEffect(() => {
        let url = `${API}booking/mechanicPendingBooking/`
        console.log(i.id)
        fetch(url + i.id)
            .then(resp => resp.json())
            .then(resp => setBookings(resp))
            .catch((error) => console.error(error))

        let url1 = `${API}confirmedbooking`
        fetch(url1)
            .then(resp => resp.json())
            .then(resp => setConfirmedBooking(resp))
            .catch((error) => console.error(error))

    }, [])

    const TimeSelection = () => {
        setTime()
        if (state.Das === true) {
            setTime('10:00')
            console.warn(time)
        } if (state.Bara === true) {
            setTime('12:00')
            console.warn(time)

        } if (state.Do === true) {
            setTime("02:00")
            console.warn(time)

        } if (state.Char === true) {
            setTime("04:00")
            console.warn(time)

        } if (state.Che === true) {
            setTime("06:00")
            console.warn(time)

        }

    }

    const confirm = () => {
        if (state.Das === true || state.Bara === true || state.Do === true || state.Char === true || state.Che === true) {
            TimeSelection()
            console.warn(time)
            setModalVisible(!modalVisible)
        } else {
            showToastWithGravityError()
        }
    }

    const Accept = () => {

        if (state.Das === true || state.Bara === true || state.Do === true || state.Char === true || state.Che === true) {
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
        } else {
            showToastWithGravityError()
            setModalVisible(true)
        }
    }

    const timeDisplay = () => {
        for (var i = 0; i < confirmedBooking.length; i++) {
            return (
                <View>
                    {/* <Text>{chkDate}</Text> */}
                    {/* <Text>{confirmedBooking[i].Requested_Date}</Text> */}
                    {/* <Text>{confirmedBooking[j].Time_Of_Service}</Text> */}

                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.checkboxWrapper}>
                            <CheckBox
                                disabled={(confirmedBooking[i].Requested_Date === chkDate && confirmedBooking[i].Time_Of_Service === "10:00") ? true : false}
                                value={state.Das}
                                onValueChange={value =>
                                    setState({

                                        Das: value,
                                    })
                                }
                            />
                            <Text style={(confirmedBooking[i].Requested_Date === chkDate && confirmedBooking[i].Time_Of_Service === "10:00") ? styles.disabledcheckboxText : styles.checkboxText}>10:00</Text>
                        </View>

                        <View style={styles.checkboxWrapper}>
                            <CheckBox
                                disabled={(confirmedBooking[i].Requested_Date === chkDate && confirmedBooking[i].Time_Of_Service === "12:00") ? true : false}
                                value={state.Bara}
                                onValueChange={value =>
                                    setState({

                                        Bara: value,
                                    })
                                }
                            />
                            <Text style={(confirmedBooking[i].Requested_Date === chkDate && confirmedBooking[i].Time_Of_Service === "12:00") ? styles.disabledcheckboxText : styles.checkboxText}>12:00</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.checkboxWrapper}>
                            <CheckBox
                                disabled={(confirmedBooking[i].Requested_Date === chkDate && confirmedBooking[i].Time_Of_Service === "02:00") ? true : false}
                                value={state.Do}
                                onValueChange={value =>
                                    setState({

                                        Do: value,
                                    })
                                }
                            />
                            <Text style={(confirmedBooking[i].Requested_Date === chkDate && confirmedBooking[i].Time_Of_Service === "02:00") ? styles.disabledcheckboxText : styles.checkboxText}>02:00</Text>
                        </View>

                        <View style={styles.checkboxWrapper}>
                            <CheckBox
                                disabled={(confirmedBooking[i].Requested_Date === chkDate && confirmedBooking[i].Time_Of_Service === "04:00") ? true : false}
                                value={state.Char}
                                onValueChange={value =>
                                    setState({

                                        Char: value,
                                    })
                                }
                            />
                            <Text style={(confirmedBooking[i].Requested_Date === chkDate && confirmedBooking[i].Time_Of_Service === "04:00") ? styles.disabledcheckboxText : styles.checkboxText}>04:00</Text>
                        </View>
                    </View>
                    <View style={styles.checkboxWrapper}>
                        <CheckBox
                            disabled={(confirmedBooking[i].Requested_Date === chkDate && confirmedBooking[i].Time_Of_Service === "06:00") ? true : false}
                            value={state.Che}
                            onValueChange={value =>
                                setState({

                                    Che: value,
                                })
                            }
                        />
                        <Text style={(confirmedBooking[i].Requested_Date === chkDate && confirmedBooking[i].Time_Of_Service === "06:00") ? styles.disabledcheckboxText : styles.checkboxText}>06:00</Text>
                    </View>
                </View>
            )

        }


    }


    return (

        <View style={styles.page}>
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
                <TouchableOpacity
                    style={{ marginLeft: 80, justifyContent: "center" }}
                    onPress={() => navigation.navigate('HomeScreen')}
                >
                    <Icon
                        name="chevron-left"
                        size={25}
                        color="#fff"
                    />
                </TouchableOpacity>
            </View>

            <View style={{ padding: 10, alignItems: 'center' }}>
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

                                {
                                    timeDisplay()
                                }



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
                                        <View style={{ flexDirection: 'row', width: WIDTH }}>
                                            <TouchableOpacity
                                                style={styles.timeIcon}
                                                onPress={() => {
                                                    setModalVisible(true)
                                                    setIdentifier(booking._id)
                                                    setChkDate(booking.Requested_Date)
                                                }}
                                                activeOpacity={0.6}
                                            >
                                                <Ionicons
                                                    name="time-outline"
                                                    size={30}
                                                    color='#fff'
                                                />
                                            </TouchableOpacity>
                                            <View style={{ width: 163, alignItems: 'center', marginLeft: 35, marginRight: 30 }}>
                                                <Text style={styles.nameText}>{booking.User_Name}</Text>
                                            </View>

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
                                                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Date of Appointment</Text>
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
            </View>
        </View >

    )
}

const styles = StyleSheet.create({

    page: {
        flex: 1,
        // alignItems: 'center',
        // padding: 10,
        // backgroundColor: ''
    },

    headerText: {
        fontSize: 24,
        alignItems: "center",
        marginLeft: 60,
        marginTop: 2,
        color: 'white',
        fontWeight: 'bold',
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
        marginLeft: 45
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
        height: HEIGHT / 2.1
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

    checkboxWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 6,
        marginRight: 20,
        marginLeft: 10
    },

    checkboxText: {
        fontSize: 20,
        color: 'black'
    },

    disabledcheckboxText: {
        fontSize: 20,
        color: '#C2C1C1'
    }

})