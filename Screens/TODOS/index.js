import React from 'react';
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

const API = REACT_NATIVE_APP_API_KEY

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

const Todos = () => {

    return (
        <View>
            <Text>Todos</Text>
        </View>
    )

}

export default Todos;