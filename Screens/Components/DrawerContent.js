import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Linking,
    Dimensions
} from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome'
import { DrawerActions, useNavigation } from '@react-navigation/native';
import Footer from "./DrawerFooter"
// import { DrawerContentScrollView, DrawerItems, DrawerItemList } from '@react-navigation/drawer';
import Loader from "../Components/loader"
import AsyncStorage from '@react-native-community/async-storage'
import DrawerFooter from './DrawerFooter';

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

export function DrawerContent(props) {
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const [localUser, setLocalUser] = useState([])
    useEffect(() => {
        AsyncStorage.getItem('mechanic').then(data => {
            setLocalUser(JSON.parse(data))
        })
    }, [])


    return (
        <View>

            <View style={styles.userDetails}>

                <Text style={styles.name}>{localUser.name}</Text>

            </View>
            <View
                style={{
                    borderBottomColor: '#00000040',
                    borderBottomWidth: 1,
                    width: 250,
                    alignSelf: 'center'
                }}
            />
            <ScrollView style={{ height: HEIGHT - 300 }}>


                <Loader loading={loading} />
                <View style={{ height: 458, marginTop: HEIGHT / 15 }}>
                    <TouchableOpacity
                        activeOpacity={0.6}
                        style={styles.drawerItemContainer}
                        onPress={() => navigation.navigate("HomeScreen")}
                    >
                        <View style={{ marginLeft: -(WIDTH / 200) }}>
                            <Icon
                                name='home'
                                size={17}
                                style={styles.icon}
                            />
                        </View>
                        <View style={{ marginLeft: WIDTH / 32, }}>
                            <Text style={styles.text}>Home</Text>
                        </View>
                    </TouchableOpacity>


                    <TouchableOpacity
                        activeOpacity={0.6}
                        style={styles.drawerItemContainer}
                        onPress={() => navigation.navigate("TodosScreen",
                            { id: localUser.contactNo }
                        )}
                    >
                        <View>
                            <Icon
                                name='calendar'
                                size={15}
                                style={styles.icon}
                            />
                        </View>

                        <View style={{ marginLeft: WIDTH / 31 }}>
                            <Text style={styles.text}>Todos</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={0.6}
                        style={styles.drawerItemContainer}
                        onPress={() => navigation.navigate('ComplainScreen',
                            { username: name, useremail: email }
                        )}
                    >
                        <View>
                            <Icon
                                name='at'
                                size={18}
                                style={styles.icon}
                            />
                        </View>
                        <View style={{ marginLeft: WIDTH / 31 }}>
                            <Text style={styles.text}>Contact Us</Text>
                        </View>
                    </TouchableOpacity>
                </View>




            </ScrollView>
            <DrawerFooter />
            {/* <View style={{ alignItems: 'center', marginTop: 115 }}>
                <TouchableOpacity onPress={() => handleSubmit()} activeOpacity={0.3}>
                    <View style={styles.logoutContainer}>
                        <Icon style={styles.Logouticons} name="sign-out-alt" size={19} />
                        <Text style={styles.logoutText}> Logout </Text>
                    </View>
                </TouchableOpacity>

                <Text style={styles.FooterText}>Wrench King</Text>

            </View> */}
        </View>
    );
}

const styles = StyleSheet.create({

    userDetails: {
        alignItems: 'center',
        margin: 15,
    },

    name: {
        marginTop: 20,
        fontSize: 16,
        fontWeight: 'bold',
    },

    drawerItemContainer: {
        flexDirection: 'row',
        height: HEIGHT / 15,
        alignItems: "center",
        marginTop: 10,
        paddingLeft: WIDTH / 18,
    },

    icon: {
        marginTop: 2,
        color: '#ff000095',
    },

    text: {
        fontSize: 14,
        color: '#00000090',

        // fontWeight: 'bold'
    },
});

// export default DrawerContent
