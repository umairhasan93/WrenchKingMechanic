import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    ToastAndroid,
    ScrollView,
    StyleSheet,
    Dimensions,
} from "react-native"
import CheckBox from '@react-native-community/checkbox';
import { REACT_NATIVE_APP_API_KEY } from '@env'
import AsyncStorage from '@react-native-community/async-storage'
import { useNavigation } from '@react-navigation/native';


const API = REACT_NATIVE_APP_API_KEY

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

const TuningCheckbox = (props) => {

    const navigation = useNavigation()

    const id = props.mechanicId
    const username = props.username
    const usernumber = props.usernumber
    const useremail = props.useremail
    const carcompany = props.carcompany
    const model = props.model
    const modelyear = props.modelyear
    const mechanicname = props.mechanicname
    const mechanicnumber = props.mechanicnumber
    const mechanicaddress = props.mechanicaddress
    const mechanicspeciality = props.mechanicspeciality
    const mechanictype = props.mechanictype
    const idd = props.idd

    const showToastWithGravityError = () => {
        ToastAndroid.showWithGravity(
            'None of The Service is Selected',
            ToastAndroid.LONG,
            ToastAndroid.CENTER
        );
    };

    const [modalVisible, setModalVisible] = useState(false);

    const [services, setServices] = useState([])
    const [mechanic, setMechanic] = useState([])

    // const id = 'Tuning'
    // // console.warn(services[8].Charges)

    const initialState = {
        Oil: false,
        OilFilter: false,
        AirFilter: false,
        BrakeOil: false,
        AutomaticGearOil: false,
        ManualGearOil: false,
        FrontBrakePads: false,
        RearBrakePads: false,
        BrakeDiskPolish: false
    };

    const amount = [3000, 1100, 550, 1500, 6000, 3500, 4500, 5500, 2500]

    const total = []

    const [state, setState] = React.useState(initialState);
    const [toggleButton, setToggleButton] = React.useState(false);

    const [sum, setSum] = useState('')

    const bill = () => {
        if (state.Oil === true || state.OilFilter === true || state.AirFilter === true || state.BrakeOil === true || state.AutomaticGearOil === true || state.ManualGearOil === true || state.FrontBrakePads === true || state.RearBrakePads === true || state.BrakeDiskPolish === true) {
            setSum(total.reduce((a, b) => a + b, 0))
            setModalVisible(!modalVisible)
        } else {
            showToastWithGravityError()
        }
    }

    const display = (key) => {
        if (key === 'Oil') {
            total.push(amount[0])
            return (
                <Text style={styles.amountText}>{amount[0]}</Text>
            )
        } else if (key === 'OilFilter') {
            total.push(amount[1])
            return (
                <Text style={styles.amountText}>{amount[1]}</Text>
            )
        } else if (key === 'AirFilter') {
            total.push(amount[2])
            return (
                <Text style={styles.amountText}>{amount[2]}</Text>
            )
        } else if (key === 'BrakeOil') {
            total.push(amount[3])
            return (
                <Text style={styles.amountText}>{amount[3]}</Text>
            )
        } else if (key === 'AutomaticGearOil') {
            total.push(amount[4])
            return (
                <Text style={styles.amountText}>{amount[4]}</Text>
            )
        } else if (key === 'ManualGearOil') {
            total.push(amount[5])
            return (
                <Text style={styles.amountText}>{amount[5]}</Text>
            )
        } else if (key === 'FrontBrakePads') {
            total.push(amount[6])
            return (
                <Text style={styles.amountText}>{amount[6]}</Text>
            )
        } else if (key === 'RearBrakePads') {
            total.push(amount[7])
            return (
                <Text style={styles.amountText}>{amount[7]}</Text>
            )
        } else if (key === 'BrakeDiskPolish') {
            total.push(amount[8])
            return (
                <Text style={styles.amountText}>{amount[8]}</Text>
            )
        }
    }

    const clear = () => {
        setSum()
        total.splice(0, total.length)
        setState(initialState)
    }

    const confirmBill = () => {

        const data = {
            User_Name: username,
            User_Number: usernumber,
            Mechanic_Name: mechanicname,
            Mechanic_Number: mechanicnumber,
            Service: id,
            Total_Amount: sum
        }

        let url = `${API}bill/generateBill`
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                Accept: 'application/json',
                //Header Defination
                'Content-Type':
                    'application/json',
            },
        })

            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson) {
                    showSuccessToastWithGravity()
                    const data1 = {
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
                        Mechanic_Type: mechanictype,
                        Status: 'Completed'
                    }
                    let url1 = `${API}completedbooking/completedbooking `
                    // console.log(url1 + idd)
                    fetch(url1, {
                        method: 'POST',
                        body: JSON.stringify(data1),
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


                    let url2 = `${API}confirmedbooking/`

                    fetch(url2 + idd, {
                        method: 'DELETE',
                    })
                        .then(resp => resp.json())
                        .then(res => {

                        }).catch(err => {
                            console.log({ err });
                            reject(err);
                        })
                    setState(initialState)
                    navigation.navigate('HomeScreen')
                }

            })
            .catch((error) => {
                console.error(error);
            });

        setModalVisible(false)
        navigation.navigate('HomeScreen')
    }

    useEffect(() => {

        // AsyncStorage.getItem('mechanic').then(data => {
        //     setMechanic(JSON.parse(data))
        // })

        let url = `${API}serviceCharges/`
        console.log(url + id)
        fetch(url + id)
            .then(resp => resp.json())
            .then(resp => {
                setServices(resp)
                // console.log(resp.MechanicType)
            })
            .catch((error) => console.error(error))

    }, [])


    return (
        <View style={{ paddingLeft: 8 }}>

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
                            <View><Text style={styles.modalText}>Bill</Text></View>
                            <View style={{ padding: 10, alignItems: 'center' }}>
                                <Text style={{ fontSize: 20 }}>Total Amount</Text>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>Rs {sum}</Text>
                            </View>
                        </View>

                        <ScrollView style={{ flexDirection: 'row' }}>
                            <View style={styles.resultContainer}>
                                {Object.entries(state).map(([key, value]) => {
                                    return (
                                        value && (
                                            <View key={key} style={{ paddingVertical: 10, flexDirection: 'row' }}>
                                                <View style={{ width: WIDTH / 1.7 }}>
                                                    <Text style={{ fontSize: 18, color: 'black' }}>{key}</Text>
                                                </View>
                                                <View style={{ width: WIDTH / 3.8, alignItems: 'center', justifyContent: 'center' }}>
                                                    {
                                                        display(key)
                                                    }
                                                </View>
                                            </View>
                                        )
                                    );
                                })}
                            </View>

                        </ScrollView >

                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity style={styles.Button} onPress={() => confirmBill()}>
                                <Text style={{ fontSize: 20, color: '#fff' }}>OK</Text>
                            </TouchableOpacity>
                        </View>

                    </View >
                </View >
            </Modal >

            <View>
                <View style={{ padding: 8 }}>
                    <View>
                        <View>
                            <View
                                style={styles.checkboxWrapper}
                            >
                                <CheckBox
                                    value={state.Oil}
                                    onValueChange={value =>
                                        setState({
                                            ...state,
                                            Oil: value,
                                        })
                                    }
                                />
                                <Text style={styles.checkboxText}>Oil</Text>
                            </View>

                            <View style={styles.checkboxWrapper}>
                                <CheckBox
                                    value={state.OilFilter}
                                    onValueChange={value =>
                                        setState({
                                            ...state,
                                            OilFilter: value,
                                        })
                                    }
                                />
                                <Text style={styles.checkboxText}>Oil Filter</Text>
                            </View>

                            <View style={styles.checkboxWrapper}>
                                <CheckBox
                                    value={state.AirFilter}
                                    onValueChange={value =>
                                        setState({
                                            ...state,
                                            AirFilter: value,
                                        })
                                    }
                                />
                                <Text style={styles.checkboxText}>Air Filter</Text>
                            </View>

                            <View style={styles.checkboxWrapper}>
                                <CheckBox
                                    value={state.BrakeOil}
                                    onValueChange={value =>
                                        setState({
                                            ...state,
                                            BrakeOil: value,
                                        })
                                    }
                                />
                                <Text style={styles.checkboxText}>Brake Oil</Text>
                            </View>

                            <View style={styles.checkboxWrapper}>
                                <CheckBox
                                    value={state.AutomaticGearOil}
                                    onValueChange={value =>
                                        setState({
                                            ...state,
                                            AutomaticGearOil: value,
                                        })
                                    }
                                />
                                <Text style={styles.checkboxText}>Automatic Gear Oil</Text>
                            </View>

                            <View style={styles.checkboxWrapper}>
                                <CheckBox
                                    value={state.ManualGearOil}
                                    onValueChange={value =>
                                        setState({
                                            ...state,
                                            ManualGearOil: value,
                                        })
                                    }
                                />
                                <Text style={styles.checkboxText}>Manual Gear Oil</Text>
                            </View>

                            <View style={styles.checkboxWrapper}>
                                <CheckBox
                                    value={state.FrontBrakePads}
                                    onValueChange={value =>
                                        setState({
                                            ...state,
                                            FrontBrakePads: value,
                                        })
                                    }
                                />
                                <Text style={styles.checkboxText}>Front Brake Pads</Text>
                            </View>

                            <View style={styles.checkboxWrapper}>
                                <CheckBox
                                    value={state.RearBrakePads}
                                    onValueChange={value =>
                                        setState({
                                            ...state,
                                            RearBrakePads: value,
                                        })
                                    }
                                />
                                <Text style={styles.checkboxText}>Rear Brake Pads</Text>
                            </View>

                            <View style={styles.checkboxWrapper}>
                                <CheckBox
                                    value={state.BrakeDiskPolish}
                                    onValueChange={value =>
                                        setState({
                                            ...state,
                                            BrakeDiskPolish: value,
                                        })
                                    }
                                />
                                <Text style={styles.checkboxText}>Brake Disk Polish</Text>
                            </View>

                        </View>

                    </View>

                </View>


            </View>

            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                    style={styles.generateBill}
                    onPress={() => bill()}
                >
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#fff' }}>Generate Bill</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.clear}
                    onPress={() => clear()}
                >
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#fff' }}>Clear</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({

    generateBill: {
        backgroundColor: 'dodgerblue',
        borderRadius: 10,
        width: WIDTH / 2.5,
        height: WIDTH / 7,
        margin: 10,
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

    clear: {
        backgroundColor: 'red',
        borderRadius: 10,
        width: WIDTH / 2.5,
        height: WIDTH / 7,
        margin: 10,
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

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#00000065'
    },
    modalView: {
        margin: 10,
        backgroundColor: "#ffffff",
        borderRadius: 10,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 10,
        width: WIDTH / 1.1,
        height: '98%',
        paddingBottom: 20
    },

    modalHeader: {
        width: '100%',
        height: HEIGHT / 4.2,
        padding: 10,
        backgroundColor: 'lavender'
    },

    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 30,
        color: 'black'
    },

    amountText: {
        fontSize: 18,
        color: 'green',
        fontWeight: 'bold',
        textDecorationLine: 'underline'
    },

    Button: {
        backgroundColor: 'dodgerblue',
        width: WIDTH / 2,
        height: WIDTH / 8,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },

    resultContainer: {
        padding: 20,
        width: WIDTH
    },

    container: {

        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },

    checkboxWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 7,
    },

    checkboxText: {
        fontSize: 20,
        color: 'black'
    }

})

export default TuningCheckbox