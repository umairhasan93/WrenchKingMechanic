import React, { useState, useEffect } from 'react';
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
import { Card } from 'react-native-paper';
import { REACT_NATIVE_APP_API_KEY } from '@env'
import Icon from 'react-native-vector-icons/FontAwesome5'
import MenuButton from '../Components/NavigationDrawerHeader'
import DropDownPicker from "react-native-custom-dropdown";
import Today from '../Components/Today'
import Tomorrow from '../Components/Tomorrow'

const API = REACT_NATIVE_APP_API_KEY

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

const Todos = ({ navigation, route }) => {



    const id = route.params
    const i = id.number

    const d = new Date()
    const dateToday = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear()

    const [value, setValue] = useState('Today');
    const [items, setItems] = useState([
        { label: 'Today', value: 'Today' },
        { label: 'Tomorrow', value: 'Tomorrow' },
    ]);
    let controller;

    const [tomorrow, setTomorrow] = useState([])


    return (

        <View style={styles.page} >
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

            <View style={styles.displayBookings}>
                <ScrollView>
                    {
                        value === 'Today' ? <Today mechanicId={i} /> : (<Tomorrow mechanicId={i} />)
                    }
                </ScrollView>
            </View>

            <View style={styles.searchView}>
                <Text style={styles.searchText}>Show Booking For</Text>

                <DropDownPicker
                    items={items}
                    controller={instance => controller = instance}
                    onChangeList={(items, callback) => {
                        new Promise((resolve, reject) => resolve(setItems(items)))
                            .then(() => callback())
                            .catch(() => { });
                    }}

                    defaultValue={value}
                    onChangeItem={item => setValue(item.value)}
                    dropDownStyle={{ backgroundColor: '#fafafa' }}
                    containerStyle={{ width: WIDTH / 2, height: 50 }}
                    style={styles.dropdownContainer}
                    labelStyle={{
                        fontSize: 15,
                        color: '#000'
                    }}
                    selectedtLabelStyle={{
                        color: '#39739d'
                    }}
                    placeholderStyle={{
                        fontWeight: 'bold',
                        textAlign: 'center'
                    }}
                    activeItemStyle={{ justifyContent: 'center' }}
                    activeLabelStyle={{ color: 'red' }}
                // arrowStyle={{ marginRight: 10 }}
                />
            </View>



        </View>
    )

}

const styles = StyleSheet.create({

    page: {
        flex: 1,
        // alignItems: 'center',
        // padding: 10,
        // backgroundColor: '#fff'
    },

    headerText: {
        fontSize: 24,
        alignItems: "center",
        marginLeft: 60,
        marginTop: 2,
        color: 'white',
        fontWeight: 'bold',
    },

    searchView: {
        flexDirection: 'row',
        marginTop: -640,
        justifyContent: 'center'
    },

    searchText: {
        alignSelf: 'center',
        fontSize: 18,
        marginRight: 15,
        color: '#000',
        textDecorationLine: 'underline',
    },

    dropdownContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 10,
        width: WIDTH / 2,
        height: 45,
        marginTop: 5,
        borderColor: '#e61025'
    },

    displayBookings: {
        backgroundColor: '#fff',
        // flex: 1,
        width: WIDTH,
        height: HEIGHT,
        padding: 10,
        marginTop: 10
    },

})

export default Todos;