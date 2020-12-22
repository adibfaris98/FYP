import React from 'react'
import { View, Text } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

export default function TournamentTab() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Group" component={GroupSeedings} />
            <Tab.Screen name="Standings" component={Standings} />
            <Tab.Screen name="Group Stage" component={GroupStage} />
            <Tab.Screen name="Final Stage" component={FinalStage} />
        </Tab.Navigator>
    )
}

function GroupSeedings() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>GroupSeedings!</Text>
        </View>
    );
}

function Standings() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>HStandingsome!</Text>
        </View>
    );
}

function GroupStage() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>GroupStage!</Text>
        </View>
    );
}

function FinalStage() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>FinalStage!</Text>
        </View>
    );
}

function SettingsScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Settings!</Text>
        </View>
    );
}