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
import CheckBox from 'react-native-check-box'
import { REACT_NATIVE_APP_API_KEY } from '@env'
import AsyncStorage from '@react-native-community/async-storage'


const API = REACT_NATIVE_APP_API_KEY

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

const AxleCheckbox = () => {

    const showToastWithGravityError = () => {
        ToastAndroid.showWithGravity(
            'None of The Service is Selected',
            ToastAndroid.LONG,
            ToastAndroid.CENTER
        );
    };

    const [modalVisible, setModalVisible] = useState(false);


    const [isChecked0, setIsChecked0] = useState(false)
    const [isChecked1, setIsChecked1] = useState(false)
    const [isChecked2, setIsChecked2] = useState(false)
    const [isChecked3, setIsChecked3] = useState(false)
    const [isChecked4, setIsChecked4] = useState(false)
    const [isChecked5, setIsChecked5] = useState(false)
    const [isChecked6, setIsChecked6] = useState(false)

    const [cb0Value, setCB0Value] = useState('')
    const [cb1Value, setCB1Value] = useState('')
    const [cb2Value, setCB2Value] = useState('')
    const [cb3Value, setCB3Value] = useState('')
    const [cb4Value, setCB4Value] = useState('')
    const [cb5Value, setCB5Value] = useState('')
    const [cb6Value, setCB6Value] = useState('')

    const [cb0Name, setCB0Name] = useState('')
    const [cb1Name, setCB1Name] = useState('')
    const [cb2Name, setCB2Name] = useState('')
    const [cb3Name, setCB3Name] = useState('')
    const [cb4Name, setCB4Name] = useState('')
    const [cb5Name, setCB5Name] = useState('')
    const [cb6Name, setCB6Name] = useState('')

    const [services, setServices] = useState([])
    const [mechanic, setMechanic] = useState([])

    const id = mechanic.speciality
    // console.warn(services[6].Charges)

    const [sum, setSum] = useState('')

    const NamesArray = []
    const PricesArray = []


    const compute = () => {
        if (cb0Value.length > 0 && cb0Name.length > 0) {
            PricesArray.push(cb0Value)
            NamesArray.push(cb0Name)
        }

        if (cb1Value.length > 0 && cb1Name.length > 0) {
            PricesArray.push(cb1Value)
            NamesArray.push(cb1Name)
        }

        console.warn(PricesArray)
        console.warn(NamesArray)
    }

    const bill = () => {
        if (isChecked0 === true || isChecked1 === true || isChecked2 === true || isChecked3 === true || isChecked4 === true || isChecked5 === true || isChecked6 === true) {
            setSum(cb0Value + cb1Value + cb2Value + cb3Value + cb4Value + cb5Value + cb6Value)
            setModalVisible(!modalVisible)

        } else {
            showToastWithGravityError()
        }
    }

    const clear = () => {
        setSum()
        setCB0Value()
        setCB1Value()
        setCB2Value()
        setCB3Value()
        setCB4Value()
        setCB5Value()
        setCB6Value()
        setIsChecked0(false)
        setIsChecked1(false)
        setIsChecked2(false)
        setIsChecked3(false)
        setIsChecked4(false)
        setIsChecked5(false)
        setIsChecked6(false)

    }

    useEffect(() => {

        AsyncStorage.getItem('mechanic').then(data => {
            setMechanic(JSON.parse(data))
        })

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
                                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>Rs 5000.00</Text>
                            </View>
                        </View>

                        <ScrollView>
                            <View style={{ flexDirection: 'row', width: WIDTH, padding: 10 }}>
                                <View style={styles.itemNumber}><Text style={{ fontSize: 16 }} > 1. </Text></View>

                                <View style={styles.ItemName}><Text style={{ fontSize: 16 }} > Item 1</Text></View>

                                <View style={styles.ItemPrice}><Text style={{ fontSize: 16 }} > Price</Text></View>
                            </View>
                            <View style={{ flexDirection: 'row', width: WIDTH, padding: 10 }}>
                                <View style={styles.itemNumber}><Text style={{ fontSize: 16 }} > 1. </Text></View>

                                <View style={styles.ItemName}><Text style={{ fontSize: 16 }} > Item 1</Text></View>

                                <View style={styles.ItemPrice}><Text style={{ fontSize: 16 }} > Price</Text></View>
                            </View>
                            <View style={{ flexDirection: 'row', width: WIDTH, padding: 10 }}>
                                <View style={styles.itemNumber}><Text style={{ fontSize: 16 }} > 1. </Text></View>

                                <View style={styles.ItemName}><Text style={{ fontSize: 16 }} > Item 1</Text></View>

                                <View style={styles.ItemPrice}><Text style={{ fontSize: 16 }} > Price</Text></View>
                            </View>
                            <View style={{ flexDirection: 'row', width: WIDTH, padding: 10 }}>
                                <View style={styles.itemNumber}><Text style={{ fontSize: 16 }} > 1. </Text></View>

                                <View style={styles.ItemName}><Text style={{ fontSize: 16 }} > Item 1</Text></View>

                                <View style={styles.ItemPrice}><Text style={{ fontSize: 16 }} > Price</Text></View>
                            </View>
                        </ScrollView >

                        <Text onPress={() => setModalVisible(false)}>Cancel</Text>

                    </View >
                </View >
            </Modal >
            <View>
                <CheckBox
                    style={{ padding: 10 }}
                    rightTextStyle={{ fontSize: 20, color: 'black' }}
                    checkBoxColor={'red'}
                    checkedCheckBoxColor={'#05b545'}
                    onClick={() => {
                        setIsChecked0(!isChecked0)
                        if (isChecked0 === true) {
                            setCB0Value(services[0].Charges)
                            setCB0Name(services[0].Service)
                            console.log(cb0Value)
                            // console.log(cb0Name)
                        } else if (isChecked0 === false) {
                            setCB0Value('')
                            setCB0Name('')
                        }
                    }}
                    isChecked={isChecked0}
                    rightText={'RackEnd'}
                />

                <CheckBox
                    style={{ padding: 10 }}
                    rightTextStyle={{ fontSize: 20, color: 'black' }}
                    checkBoxColor={'red'}
                    checkedCheckBoxColor={'#05b545'}
                    onClick={() => {
                        setIsChecked1(!isChecked1)
                        if (isChecked1 === true) {
                            setCB1Value(services[1].Charges)
                            setCB1Name(services[1].Service)

                        } else if (isChecked1 === false) {
                            setCB1Value('')
                            setCB1Name('')
                        }
                    }}
                    isChecked={isChecked1}
                    rightText={'Tie Rod'}
                />

                <CheckBox
                    style={{ padding: 10 }}
                    rightTextStyle={{ fontSize: 20, color: 'black' }}
                    checkBoxColor={'red'}
                    checkedCheckBoxColor={'#05b545'}
                    onClick={() => {
                        setIsChecked2(!isChecked2)
                        if (isChecked2 === true) {
                            setCB2Value(services[2].Charges)
                            setCB2Name(services[2].Service)

                        } else if (isChecked2 === false) {
                            setCB2Value('')
                            setCB2Name('')
                        }
                    }}
                    isChecked={isChecked2}
                    rightText={'Controlling Arm Bushes'}
                />

                <CheckBox
                    style={{ padding: 10 }}
                    rightTextStyle={{ fontSize: 20, color: 'black' }}
                    checkBoxColor={'red'}
                    checkedCheckBoxColor={'#05b545'}
                    onClick={() => {
                        setIsChecked3(!isChecked3)
                        if (isChecked3 === true) {
                            setCB3Value(services[3].Charges)
                            setCB3Name(services[3].Service)

                        } else if (isChecked3 === false) {
                            setCB3Value('')
                            setCB3Name('')
                        }
                    }}
                    isChecked={isChecked3}
                    rightText={'Controlling Arm Ball Joint'}
                />

                <CheckBox
                    style={{ padding: 10 }}
                    rightTextStyle={{ fontSize: 20, color: 'black' }}
                    checkBoxColor={'red'}
                    checkedCheckBoxColor={'#05b545'}
                    onClick={() => {
                        setIsChecked4(!isChecked4)
                        if (isChecked4 === true) {
                            setCB4Value(services[4].Charges)
                            setCB4Name(services[4].Service)

                        } else if (isChecked4 === false) {
                            setCB4Value('')
                            setCB4Name('')
                        }
                    }}
                    isChecked={isChecked4}
                    rightText={'Steering Rod Change'}
                />
                <CheckBox
                    style={{ padding: 10 }}
                    rightTextStyle={{ fontSize: 20, color: 'black' }}
                    checkBoxColor={'red'}
                    checkedCheckBoxColor={'#05b545'}
                    onClick={() => {
                        setIsChecked5(!isChecked5)
                        if (isChecked5 === true) {
                            setCB5Value(services[5].Charges)
                            setCB5Name(services[5].Service)

                        } else if (isChecked5 === false) {
                            setCB5Value('')
                            setCB5Name('')
                        }
                    }}
                    isChecked={isChecked5}
                    rightText={'Rare Jumps'}
                />
                <CheckBox
                    style={{ padding: 10 }}
                    rightTextStyle={{ fontSize: 20, color: 'black' }}
                    checkBoxColor={'red'}
                    checkedCheckBoxColor={'#05b545'}
                    onClick={() => {
                        setIsChecked6(!isChecked6)
                        if (isChecked6 === true) {
                            setCB6Value(services[6].Charges)
                            setCB6Name(services[6].Service)

                        } else if (isChecked6 === false) {
                            setCB6Value('')
                            setCB6Name('')
                        }
                    }}
                    isChecked={isChecked6}
                    rightText={'Front Jumps'}
                />


            </View>
            <View style={{ flexDirection: 'row', marginTop: 94 }}>
                <TouchableOpacity
                    style={styles.generateBill}
                    onPress={() => compute()}
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
        width: WIDTH / 2,
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
        width: WIDTH / 3.5,
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
        height: '100%'
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

    itemNumber: {
        width: WIDTH / 18,
        height: WIDTH / 14,
        justifyContent: 'center'
    },

    ItemName: {
        width: WIDTH / 1.73,
        height: WIDTH / 14,
        justifyContent: 'center'
    },

    ItemPrice: {
        width: WIDTH / 4,
        height: WIDTH / 14,
        justifyContent: 'center',
        alignItems: 'center'
    },

})

export default AxleCheckbox