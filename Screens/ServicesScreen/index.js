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
import AsyncStorage from '@react-native-community/async-storage'
import CheckBox from 'react-native-check-box'
import { Card } from 'react-native-paper';
import { REACT_NATIVE_APP_API_KEY } from '@env'
import MenuButton from '../Components/NavigationDrawerHeader'

import AxleCheckbox from '../Components/AxleCheckbox'
import TuningCheckbox from '../Components/TuningCheckBox'
import ACCheckbox from '../Components/ACChechBox'

const API = REACT_NATIVE_APP_API_KEY

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

const Services = ({ navigation, route }) => {

    const {
        username,
        usernumber,
        useremail,
        carcompany,
        model,
        modelyear,
        mechanicname,
        mechanicnumber,
        mechanicaddress,
        mechanicspeciality,
        mechanictype,
        idd
    } = route.params
    const [isChecked, setIsChecked] = useState(false)

    const [services, setServices] = useState([])
    const [mechanic, setMechanic] = useState([])


    const [charges, setCharges] = useState([])

    const id = mechanic.speciality
    // console.log(idd)
    // console.log(services)

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

    const display = () => {

        // console.warn(id)
        if (id === 'Axle') {
            return (
                <AxleCheckbox
                    mechanicId={id}
                    username={username}
                    usernumber={usernumber}
                    useremail={useremail}
                    carcompant={carcompany}
                    model={model}
                    modelyear={modelyear}
                    mechanicname={mechanicname}
                    mechanicnumber={mechanicnumber}
                    mechanicaddress={mechanicaddress}
                    mechanicspeciality={mechanicspeciality}
                    mechanictype={mechanictype}
                    idd={idd}
                />
            )
        } else if (id === 'Tuning') {
            return (
                <TuningCheckbox
                    mechanicId={id}
                    username={username}
                    usernumber={usernumber}
                    useremail={useremail}
                    carcompant={carcompany}
                    model={model}
                    modelyear={modelyear}
                    mechanicname={mechanicname}
                    mechanicnumber={mechanicnumber}
                    mechanicaddress={mechanicaddress}
                    mechanicspeciality={mechanicspeciality}
                    mechanictype={mechanictype}
                    idd={idd}
                />
            )
        } else if (id === 'AC') {
            return (
                <ACCheckbox
                    mechanicId={id}
                    username={username}
                    usernumber={usernumber}
                    useremail={useremail}
                    carcompant={carcompany}
                    model={model}
                    modelyear={modelyear}
                    mechanicname={mechanicname}
                    mechanicnumber={mechanicnumber}
                    mechanicaddress={mechanicaddress}
                    mechanicspeciality={mechanicspeciality}
                    mechanictype={mechanictype}
                    idd={idd}
                />
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
            </View>
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
                {display()}

            </View>


        </View>
    )
}

const styles = StyleSheet.create({

    page: {
        flex: 1,
        // padding: 10
    },

    headerText: {
        fontSize: 24,
        alignItems: "center",
        marginLeft: 60,
        marginTop: 2,
        color: 'white',
        fontWeight: 'bold',
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