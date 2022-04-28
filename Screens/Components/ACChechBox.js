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

const ACCheckbox = () => {

    const showToastWithGravityError = () => {
        ToastAndroid.showWithGravity(
            'None of The Service is Selected',
            ToastAndroid.LONG,
            ToastAndroid.CENTER
        );
    };

    const [isChecked0, setIsChecked0] = useState(false)
    const [isChecked1, setIsChecked1] = useState(false)
    const [isChecked2, setIsChecked2] = useState(false)

    const [cb0Value, setCB0Value] = useState('')
    const [cb1Value, setCB1Value] = useState('')
    const [cb2Value, setCB2Value] = useState('')

    const [services, setServices] = useState([])
    const [mechanic, setMechanic] = useState([])

    const id = 'AC'
    // console.warn(services[6].Charges)

    const [sum, setSum] = useState('')

    const bill = () => {
        if (isChecked0 === true || isChecked1 === true || isChecked2 === true) {
            setSum(cb0Value + cb1Value + cb2Value)

        } else {
            showToastWithGravityError()
        }
    }

    const clear = () => {
        setSum()
        setCB0Value()
        setCB1Value()
        setCB2Value()
        setIsChecked0(false)
        setIsChecked1(false)
        setIsChecked2(false)



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
            {/* <Text>AC</Text> */}
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
                    rightText={'AC Gas'}
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
                    rightText={'AC Change'}
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
                    rightText={'AC Service'}
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
            <View style={{ flexDirection: 'row', marginTop: 280 }}>
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

export default ACCheckbox