import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import { useNavigation } from '@react-navigation/native'
const NavigationDrawerHeader = (props) => {
    const navigation = useNavigation();
    // const toggleDrawer = () => {
    //     props.navigationProps.toggleDrawer();
    // };

    return (
        <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <Icon
                    style={{ marginRight: 20, marginLeft: 20, marginTop: 7 }}
                    name="align-center"
                    size={25}
                    color="white"
                />
            </TouchableOpacity>
        </View>
    );
};
export default NavigationDrawerHeader;