import { NavigationContainer } from '@react-navigation/native'
import React, { useContext, useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import auth from '@react-native-firebase/auth';

import { AuthContext } from './AuthProvider'
import AuthStack from './AuthStack'
import AppStack from './AppStack'


export default function Routes() {
    // Set an initializing state whilst Firebase connects
    const { user, setUser } = useContext(AuthContext)
    const [initializing, setInitializing] = useState(true)

    // Handle user state changes
    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    if (initializing) return null;

    return (
        <NavigationContainer>
            {user ? <AppStack/> : <AuthStack/>}
        </NavigationContainer>
    )
}
