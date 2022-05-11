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
    Button,
} from "react-native"
// import CheckBox from 'react-native-check-box'
import { REACT_NATIVE_APP_API_KEY } from '@env'
import AsyncStorage from '@react-native-community/async-storage'
import CheckBox from '@react-native-community/checkbox';
import { useNavigation } from '@react-navigation/native';
import Home from '../drawerScreens/HomeScreen'


const API = REACT_NATIVE_APP_API_KEY

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

const AxleCheckbox = (props) => {

    const navigation = useNavigation()

    const id = props.mechanicId


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

    // console.warn(services[6].Charges)

    const initialState = {
        RackEnd: false,
        TieRod: false,
        ControllingArmBushes: false,
        ControllingArmBallJoint: false,
        SteeringRodChange: false,
        RearJumps: false,
        FrontJumps: false
    };

    const amount = [3500, 4700, 2500, 2400, 13000, 16000, 14000]

    const total = []

    const [state, setState] = React.useState(initialState);
    const [toggleButton, setToggleButton] = React.useState(false);

    const [sum, setSum] = useState('')

    const bill = () => {
        if (state.RackEnd === true || state.TieRod === true || state.ControllingArmBushes === true || state.ControllingArmBallJoint === true || state.SteeringRodChange === true || state.RearJumps === true || state.FrontJumps === true) {
            // console.warn(total)
            setSum(total.reduce((a, b) => a + b, 0))
            setModalVisible(!modalVisible)

        } else {
            showToastWithGravityError()
        }
    }

    const display = (key) => {
        if (key === 'RackEnd') {
            total.push(amount[0])
            return (
                <Text style={styles.amountText}>{amount[0]}</Text>
            )
        } else if (key === 'TieRod') {
            total.push(amount[1])
            return (
                <Text style={styles.amountText}>{amount[1]}</Text>
            )
        } else if (key === 'ControllingArmBushes') {
            total.push(amount[2])
            return (
                <Text style={styles.amountText}>{amount[2]}</Text>
            )
        } else if (key === 'ControllingArmBallJoint') {
            total.push(amount[3])
            return (
                <Text style={styles.amountText}>{amount[3]}</Text>
            )
        } else if (key === 'SteeringRodChange') {
            total.push(amount[4])
            return (
                <Text style={styles.amountText}>{amount[4]}</Text>
            )
        } else if (key === 'RearJumps') {
            total.push(amount[5])
            return (
                <Text style={styles.amountText}>{amount[5]}</Text>
            )
        } else if (key === 'FrontJumps') {
            total.push(amount[6])
            return (
                <Text style={styles.amountText}>{amount[6]}</Text>

            )
        }
    }

    const clear = () => {
        setSum()
        total.splice(0, total.length)
        setState(initialState)
    }

    useEffect(() => {

        // AsyncStorage.getItem('mechanic').then(data => {
        //     setMechanic(JSON.parse(data))
        // })

        let url = `${API}serviceCharges/`
        // console.log(url)
        fetch(url + id)
            .then(resp => resp.json())
            .then(resp => {
                setServices(resp)
                // console.log(resp.MechanicType)
            })
            .catch((error) => console.error(error))

    }, [])

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
                            <TouchableOpacity style={styles.Button} onPress={() => {
                                setModalVisible(false)
                                navigation.navigate('HomeScreen')
                            }}>
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
                                    value={state.RackEnd}
                                    onValueChange={value =>
                                        setState({
                                            ...state,
                                            RackEnd: value,
                                        })
                                    }
                                />
                                <Text style={styles.checkboxText}>RackEnd</Text>
                            </View>

                            <View style={styles.checkboxWrapper}>
                                <CheckBox
                                    value={state.TieRod}
                                    onValueChange={value =>
                                        setState({
                                            ...state,
                                            TieRod: value,
                                        })
                                    }
                                />
                                <Text style={styles.checkboxText}>Tie Rod</Text>
                            </View>

                            <View style={styles.checkboxWrapper}>
                                <CheckBox
                                    value={state.ControllingArmBushes}
                                    onValueChange={value =>
                                        setState({
                                            ...state,
                                            ControllingArmBushes: value,
                                        })
                                    }
                                />
                                <Text style={styles.checkboxText}>Controlling Arm Bushes</Text>
                            </View>

                            <View style={styles.checkboxWrapper}>
                                <CheckBox
                                    value={state.ControllingArmBallJoint}
                                    onValueChange={value =>
                                        setState({
                                            ...state,
                                            ControllingArmBallJoint: value,
                                        })
                                    }
                                />
                                <Text style={styles.checkboxText}>Controlling Arm Ball Joint</Text>
                            </View>

                            <View style={styles.checkboxWrapper}>
                                <CheckBox
                                    value={state.SteeringRodChange}
                                    onValueChange={value =>
                                        setState({
                                            ...state,
                                            SteeringRodChange: value,
                                        })
                                    }
                                />
                                <Text style={styles.checkboxText}>Steering Rod Change</Text>
                            </View>

                            <View style={styles.checkboxWrapper}>
                                <CheckBox
                                    value={state.RearJumps}
                                    onValueChange={value =>
                                        setState({
                                            ...state,
                                            RearJumps: value,
                                        })
                                    }
                                />
                                <Text style={styles.checkboxText}>Rear Jumps</Text>
                            </View>

                            <View style={styles.checkboxWrapper}>
                                <CheckBox
                                    value={state.FrontJumps}
                                    onValueChange={value =>
                                        setState({
                                            ...state,
                                            FrontJumps: value,
                                        })
                                    }
                                />
                                <Text style={styles.checkboxText}>Front Jumps</Text>
                            </View>

                        </View>

                    </View>

                </View>


            </View>
            <View style={{ flexDirection: 'row', marginTop: 94 }}>
                <TouchableOpacity
                    style={styles.generateBill}
                    onPress={() => bill()}
                >
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black' }}>Generate Bill</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.clear}
                    onPress={() => clear()}
                >
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black' }}>Clear</Text>
                </TouchableOpacity>
            </View>

        </View >
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
        paddingVertical: 6,
    },

    checkboxText: {
        fontSize: 20,
        color: 'black'
    }

})

export default AxleCheckbox