import React from 'react';

// Import Navigators from React Navigation
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Import Screens
import { DrawerContent } from './Components/DrawerContent'
import HomeScreen from './drawerScreens/HomeScreen';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerNavigatorRoutes = () => {
    return (
        <>
            <Drawer.Navigator
                screenOptions={{ headerShown: false }}
                drawerContent={(props) => <DrawerContent {...props} />}
                drawerStyle={{ width: 350 }}
            >
                <Drawer.Screen name="HomeScreen" component={HomeScreen} />

            </Drawer.Navigator>

        </>
    )
}

export default DrawerNavigatorRoutes;