import React from 'react';

// Import Navigators from React Navigation
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Import Screens
import { DrawerContent } from './Components/DrawerContent'
import HomeScreen from './drawerScreens/HomeScreen';
import TodosScreen from './TODOS'
import ServicesScreen from './ServicesScreen'


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
                <Drawer.Screen name="TodosScreen" component={TodosScreen} />
                <Drawer.Screen name="ServicesScreen" component={ServicesScreen} />


            </Drawer.Navigator>

        </>
    )
}

export default DrawerNavigatorRoutes;