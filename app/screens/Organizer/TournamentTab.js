import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';

//Main Tab Screen
import ApproveRegistration from './ApproveRegistration'
import GroupStage from './GroupStage'
import FinalStage from './FinalStage'

//Registration Stack Screen
import PlayerList from './PlayerList'
import PlayerDetailsApproval from './PlayerDetailsApproval'

// Group Stage Screen
import EditFixture from './EditFixture'

const Tab = createMaterialTopTabNavigator();
const ApproveRegistrationStack = createStackNavigator();
const GroupStageStack = createStackNavigator();
const FinalStageStack = createStackNavigator();

export default function TournamentTab({ route, navigation }) {
    const tournament = route.params.tournament
    return (
        <Tab.Navigator>
            <Tab.Screen name="Registration" component={ApproveRegistrationStackScreen} initialParams={{ tournament: tournament }} />
            <Tab.Screen name="Group Stage" component={GroupStageStackScreen} initialParams={{ tournament: tournament }} />
            <Tab.Screen name="Final Stage" component={FinalStageStackScreen} initialParams={{ tournament: tournament }} />
        </Tab.Navigator>
    )
}

function ApproveRegistrationStackScreen({ route, navigation }) {
    const tournament = route.params.tournament
    return (
        <ApproveRegistrationStack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#fff',
                    shadowColor: '#fff'
                },
                headerTintColor: '#333',
                headerTitleStyle: {
                    // fontWeight: 'bold',
                },
                headerTitleAlign: 'center',
            }}>
            <ApproveRegistrationStack.Screen
                name="ApproveRegistration"
                component={ApproveRegistration}
                initialParams={{ tournament: tournament }}
                options={{
                    
                }} />
            <ApproveRegistrationStack.Screen
                name="PlayerList"
                component={PlayerList}
                initialParams={{ tournament: tournament }}
                options={{

                }} />
            <ApproveRegistrationStack.Screen
                name="PlayerDetailsApproval"
                component={PlayerDetailsApproval}
                initialParams={{ tournament: tournament }}
                options={{

                }} />
        </ApproveRegistrationStack.Navigator>
    )
}

function GroupStageStackScreen({ route }) {
    const tournament = route.params.tournament
    return (
        <GroupStageStack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#fff',
                    shadowColor: '#fff'
                },
                headerTintColor: '#333',
                headerTitleStyle: {
                    // fontWeight: 'bold',
                },
                headerTitleAlign: 'center'
            }}>
            <GroupStageStack.Screen
                name="GroupStage"
                component={GroupStage}
                initialParams={{ tournament: tournament }}
                options={{

                }} />
            <GroupStageStack.Screen
                name="EditFixture"
                component={EditFixture}
                initialParams={{ tournament: tournament }}
                options={{

                }} />
        </GroupStageStack.Navigator>
    )
}

function FinalStageStackScreen({ route }) {
    const tournament = route.params.tournament
    return (
        <FinalStageStack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#fff',
                    shadowColor: '#fff'
                },
                headerTintColor: '#333',
                headerTitleStyle: {
                    // fontWeight: 'bold',
                },
                headerTitleAlign: 'center'
            }}>
            <FinalStageStack.Screen
                name="FinalStage"
                component={FinalStage}
                initialParams={{ tournament: tournament }}
                options={{

                }} />
        </FinalStageStack.Navigator>
    );
}

function SettingsScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Settings!</Text>
        </View>
    );
}