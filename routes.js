import React, { useEffect } from 'react'
import LandingScreen from './screens/LandingScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from './screens/SigninScreen';
const Stack = createNativeStackNavigator();

const Routes = () => {

    const screens = [
        {
            name: 'LandingScreen',
            component: LandingScreen
        },
        {
            name: 'SignInScreen',
            component: SignInScreen
        }
        // ,
        // {
        //     name: 'ManagementProfileScreen',
        //     component: ManagementProfileScreen
        // },
        // {
        //     name: 'HomeScreen',
        //     component: HomeScreen
        // },
        // {
        //     name: 'MovieScreen',
        //     component: MovieScreen
        // }
    ]

    return (
        <Stack.Navigator initialRouteName="LandingScreen">
            {screens.map((screen, index) => (
                <Stack.Screen key={index} name={screen.name} component={screen.component} options={{ headerShown: false }} />
            ))}
        </Stack.Navigator>
    )
}

export default Routes