import React, { useState, useEffect, useRef } from 'react';
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
import CheckBox from 'react-native-check-box'
import { Card } from 'react-native-paper';
import { REACT_NATIVE_APP_API_KEY } from '@env'

const API = REACT_NATIVE_APP_API_KEY

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

const Services = () => {

    const [services, setServices] = useState([])

    const [isChecked, setIsChecked] = useState(false)

    useEffect(() => {
        let url = `${API}serviceCharges`
        // console.log(url)
        fetch(url)
            .then(resp => resp.json())
            .then(resp => {
                setServices(resp)
                // console.log(todays)
            })
            .catch((error) => console.error(error))

    }, [])



    return (
        <View style={styles.page}>
            <View style={styles.heading}>
                <Text style={{
                    fontSize: 24,
                    color: 'black',
                    textDecorationLine: 'underline',
                    fontWeight: 'bold'
                }}>
                    Service Started
                </Text>
            </View>
            <View style={styles.detailsContainer}>
                {
                    services.map((service, index) => {
                        return (
                            <View style={styles.row} key={index}>
                                <View style={{
                                    marginBottom: 10,
                                    // backgroundColor: 'yellow',
                                    width: WIDTH / 2.31
                                }}>

                                    {
                                        (index % 2 === 0) ? (
                                            // <Text style={styles.text}>{service.Service}</Text>
                                            <CheckBox
                                                style={{}}
                                                rightTextStyle={{ fontSize: 18, color: 'black' }}
                                                checkBoxColor={'red'}
                                                checkedCheckBoxColor={'#05b545'}
                                                onClick={() => {
                                                    setIsChecked(!isChecked)

                                                }}
                                                isChecked={isChecked}
                                                rightText={service.Service}
                                            />
                                        ) : null
                                    }
                                </View>
                                <View style={{
                                    margin: 10,
                                    // backgroundColor: 'blue',
                                    width: WIDTH / 2.31
                                }}>
                                    {
                                        (index % 2 === 1) ? (
                                            // <Text style={styles.text}>{service.Service}</Text>
                                            <CheckBox
                                                style={{}}
                                                rightTextStyle={{ fontSize: 18, color: 'black' }}
                                                checkBoxColor={'red'}
                                                checkedCheckBoxColor={'#05b545'}
                                                onClick={() => {
                                                    setIsChecked(!isChecked)

                                                }}
                                                isChecked={isChecked}
                                                rightText={service.Service}
                                            />
                                        ) : null
                                    }
                                </View>
                            </View>
                        )
                    })
                }
            </View>

            <View>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    page: {
        flex: 1,
        padding: 10
    },

    heading: {
        alignItems: 'center',
        padding: 10,
    },

    detailsContainer: {
        // alignItems: 'center',
        // backgroundColor: 'yellow',
        padding: 10,
    },

    row: {
        flexDirection: 'row',
        // backgroundColor: 'green'
    },

    text: {
        fontSize: 16,
        color: '#000',

    },

})

export default Services