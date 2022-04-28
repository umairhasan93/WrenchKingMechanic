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

const TuningCheckbox = () => {

    const showToastWithGravityError = () => {
        ToastAndroid.showWithGravity(
            'None of The Service is Selected',
            ToastAndroid.LONG,
            ToastAndroid.CENTER
        );
    };

    const [isChecked, setIsChecked] = useState(false)

    const [isChecked0, setIsChecked0] = useState(false)
    const [isChecked1, setIsChecked1] = useState(false)
    const [isChecked2, setIsChecked2] = useState(false)
    const [isChecked3, setIsChecked3] = useState(false)
    const [isChecked4, setIsChecked4] = useState(false)
    const [isChecked5, setIsChecked5] = useState(false)
    const [isChecked6, setIsChecked6] = useState(false)
    const [isChecked7, setIsChecked7] = useState(false)
    const [isChecked8, setIsChecked8] = useState(false)


    const [cb0Value, setCB0Value] = useState('')
    const [cb1Value, setCB1Value] = useState('')
    const [cb2Value, setCB2Value] = useState('')
    const [cb3Value, setCB3Value] = useState('')
    const [cb4Value, setCB4Value] = useState('')
    const [cb5Value, setCB5Value] = useState('')
    const [cb6Value, setCB6Value] = useState('')
    const [cb7Value, setCB7Value] = useState('')
    const [cb8Value, setCB8Value] = useState('')


    const [services, setServices] = useState([])
    const [mechanic, setMechanic] = useState([])

    const id = 'Tuning'
    // console.warn(services[6].Charges)

    const [sum, setSum] = useState('')

    const bill = () => {
        if (isChecked0 === true || isChecked1 === true || isChecked2 === true || isChecked3 === true || isChecked4 === true || isChecked5 === true || isChecked6 === true || isChecked7 === true || isChecked8 === true) {
            setSum(cb0Value + cb1Value + cb2Value + cb3Value + cb4Value + cb5Value + cb6Value + cb7Value + cb8Value)

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
        setCB7Value()
        setCB8Value()
        setIsChecked0(false)
        setIsChecked1(false)
        setIsChecked2(false)
        setIsChecked3(false)
        setIsChecked4(false)
        setIsChecked5(false)
        setIsChecked6(false)
        setIsChecked7(false)
        setIsChecked8(false)


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
            {/* <Text>Tuning</Text> */}
            <View>
                <CheckBox
                    style={{ padding: 10 }}
                    rightTextStyle={{ fontSize: 20, color: 'black' }}
                    checkBoxColor={'red'}
                    checkedCheckBoxColor={'#05b545'}
                    onClick={() => {
                        setIsChecked0(!isChecked0)
                        if (isChecked0 === false) {
                            setCB0Value(services[0].Charges)
                            console.warn(cb0Value)
                        } else if (isChecked0 === true) {
                            setCB0Value('')
                            console.warn(cb0Value)

                        }
                    }}
                    isChecked={isChecked0}
                    rightText={'Oil'}
                />

                <CheckBox
                    style={{ padding: 10 }}
                    rightTextStyle={{ fontSize: 20, color: 'black' }}
                    checkBoxColor={'red'}
                    checkedCheckBoxColor={'#05b545'}
                    onClick={() => {
                        setIsChecked1(!isChecked1)
                        if (isChecked1 === false) {
                            setCB1Value(services[1].Charges)
                        } else if (isChecked1 === true) {
                            setCB1Value('')
                        }
                    }}
                    isChecked={isChecked1}
                    rightText={'Oil Filter'}
                />

                <CheckBox
                    style={{ padding: 10 }}
                    rightTextStyle={{ fontSize: 20, color: 'black' }}
                    checkBoxColor={'red'}
                    checkedCheckBoxColor={'#05b545'}
                    onClick={() => {
                        setIsChecked2(!isChecked2)
                        if (isChecked2 === false) {
                            setCB2Value(services[2].Charges)
                        } else if (isChecked2 === true) {
                            setCB2Value('')
                        }
                    }}
                    isChecked={isChecked2}
                    rightText={'Air Filter'}
                />

                <CheckBox
                    style={{ padding: 10 }}
                    rightTextStyle={{ fontSize: 20, color: 'black' }}
                    checkBoxColor={'red'}
                    checkedCheckBoxColor={'#05b545'}
                    onClick={() => {
                        setIsChecked3(!isChecked3)
                        if (isChecked3 === false) {
                            setCB3Value(services[3].Charges)
                        } else if (isChecked3 === true) {
                            setCB3Value('')
                        }
                    }}
                    isChecked={isChecked3}
                    rightText={'Brake Oil'}
                />

                <CheckBox
                    style={{ padding: 10 }}
                    rightTextStyle={{ fontSize: 20, color: 'black' }}
                    checkBoxColor={'red'}
                    checkedCheckBoxColor={'#05b545'}
                    onClick={() => {
                        setIsChecked4(!isChecked4)
                        if (isChecked4 === false) {
                            setCB4Value(services[4].Charges)
                        } else if (isChecked4 === true) {
                            setCB4Value('')
                        }
                    }}
                    isChecked={isChecked4}
                    rightText={'Automatic Gear Oil'}
                />
                <CheckBox
                    style={{ padding: 10 }}
                    rightTextStyle={{ fontSize: 20, color: 'black' }}
                    checkBoxColor={'red'}
                    checkedCheckBoxColor={'#05b545'}
                    onClick={() => {
                        setIsChecked5(!isChecked5)
                        if (isChecked5 === false) {
                            setCB5Value(services[5].Charges)
                        } else if (isChecked5 === true) {
                            setCB5Value('')
                        }
                    }}
                    isChecked={isChecked5}
                    rightText={'Manual Gear Oil'}
                />
                <CheckBox
                    style={{ padding: 10 }}
                    rightTextStyle={{ fontSize: 20, color: 'black' }}
                    checkBoxColor={'red'}
                    checkedCheckBoxColor={'#05b545'}
                    onClick={() => {
                        setIsChecked6(!isChecked6)
                        if (isChecked6 === false) {
                            setCB6Value(services[6].Charges)
                        } else if (isChecked6 === true) {
                            setCB6Value('')
                        }
                    }}
                    isChecked={isChecked6}
                    rightText={'Front Brake Pads'}
                />

                <CheckBox
                    style={{ padding: 10 }}
                    rightTextStyle={{ fontSize: 20, color: 'black' }}
                    checkBoxColor={'red'}
                    checkedCheckBoxColor={'#05b545'}
                    onClick={() => {
                        setIsChecked7(!isChecked7)
                        if (isChecked7 === false) {
                            setCB7Value(services[7].Charges)
                        } else if (isChecked7 === true) {
                            setCB7Value('')
                        }
                    }}
                    isChecked={isChecked7}
                    rightText={'Rear Brake Pads'}
                />

                <CheckBox
                    style={{ padding: 10 }}
                    rightTextStyle={{ fontSize: 20, color: 'black' }}
                    checkBoxColor={'red'}
                    checkedCheckBoxColor={'#05b545'}
                    onClick={() => {
                        setIsChecked8(!isChecked8)
                        if (isChecked8 === false) {
                            setCB8Value(services[8].Charges)
                        } else if (isChecked8 === true) {
                            setCB8Value('')
                        }
                    }}
                    isChecked={isChecked8}
                    rightText={'Brake Disk Polish'}
                />


                {/* {
                    services.map((service, index) => {
                        return (
                            <View key={index}>
                                <CheckBox
                                    rightTextStyle={{ fontSize: 20, color: 'black' }}
                                    checkBoxColor={'red'}
                                    checkedCheckBoxColor={'#05b545'}
                                    onClick={() => {
                                        setIsChecked(
                                            !isChecked
                                        )
                                    }}
                                    isChecked={isChecked}
                                    rightText={service.Service}
                                />
                            </View>
                        )
                    })
                } */}
            </View>
            <View style={{ flexDirection: 'row' }}>
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

        </View>
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
    }

})

export default TuningCheckbox