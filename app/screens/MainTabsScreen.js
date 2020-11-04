import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Avatar } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons'

import Home from './Home'
import Notification from './NotificationScreen'
import Profile from './Profile'
import Tournament from './Tournament'
import CardListScreen from './CardListScreen';
import CardItemDetails from './CardItemDetails';
import EditProfileScreen from './EditProfileScreen';

const HomeStack = createStackNavigator();
const TournamentStack = createStackNavigator();
const NotificationStack = createStackNavigator();
const ProfileStack = createStackNavigator();

const Tab = createBottomTabNavigator();

export default function MainTabsScreen() {
    return (
        <Tab.Navigator
            tabBarOptions={{
                activeTintColor: 'white',
                style: {
                    backgroundColor: '#6B46C1',
                }
            }}>
            <Tab.Screen
                name="Home"
                component={HomeStackScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Tournament"
                component={TournamentStackScreen}
                options={{
                    tabBarLabel: 'Tournament',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="trophy" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Notification"
                component={NotificationStackScreen}
                options={{
                    tabBarLabel: 'Notification',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="bell" color={color} size={size} />
                    ),
                }} />
            <Tab.Screen
                name="Profile"
                component={ProfileStackScreen}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account" color={color} size={size} />
                    ),
                }} />
        </Tab.Navigator>
    )
}

const HomeStackScreen = ({ navigation }) => {
    return (
        <HomeStack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#fff'
                },
                headerTintColor: '#333',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                headerTitleAlign: 'center'
            }}
        >
            <HomeStack.Screen
                name="Home"
                component={Home}
                options={{
                    headerLeft: () => (
                        <View style={{ marginLeft: 10 }}>
                            <MaterialCommunityIcons.Button
                                color='#333'
                                name='menu'
                                size={25}
                                backgroundColor="#fff"
                                onPress={() => { navigation.openDrawer() }}>
                            </MaterialCommunityIcons.Button>
                        </View>
                    ),
                    headerRight: () => (
                        <View style={{ flexDirection: 'row' }}>
                            <Icon.Button
                                color='#333'
                                name='ios-search'
                                size={25}
                                backgroundColor="#fff"
                                onPress={() => { }}>
                            </Icon.Button>
                            <TouchableOpacity
                                style={{ paddingHorizontal: 10, marginTop: 5 }}
                                onPress={() => navigation.navigate('Profile')}>
                                <Avatar.Image
                                    source={{
                                        uri: 'https://api.adorable.io/avatars/50/abott@adorable.png'
                                    }}
                                    size={30}
                                />
                            </TouchableOpacity>
                        </View>
                    )
                }}
            />
            <HomeStack.Screen
                name="CardListScreen"
                component={CardListScreen}
                options={({ route }) => ({
                    title: route.params.title
                })}
            />
            <HomeStack.Screen
                name="CardItemDetails"
                component={CardItemDetails}
                options={({ route }) => ({
                    // title: route.params.title
                    headerBackTitleVisible: false,
                    headerTitle: false,
                    headerTransparent: true,
                    headerTintColor: '#fff'
                })}
            />

        </HomeStack.Navigator>
    )
}

const TournamentStackScreen = ({ navigation }) => {
    return (
        <TournamentStack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#fff'
                },
                headerTintColor: '#333',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                headerTitleAlign: 'center'
            }}>
            <TournamentStack.Screen
                name="Tournament"
                component={Tournament}
                options={{
                    headerLeft: () => (
                        <MaterialCommunityIcons.Button
                            color='#333'
                            name='menu'
                            size={25}
                            backgroundColor="#fff"
                            onPress={() => { navigation.openDrawer() }}></MaterialCommunityIcons.Button>
                    )
                }}
            />
        </TournamentStack.Navigator>
    )
}

const NotificationStackScreen = ({ navigation }) => {
    return (
        <NotificationStack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#fff',
                    shadowColor: '#fff'
                },
                headerTintColor: '#333',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                headerTitleAlign: 'center'
            }}>
            <NotificationStack.Screen
                name="Notification"
                component={Notification}
                options={{
                    headerLeft: () => (
                        <MaterialCommunityIcons.Button
                            color='#333'
                            name='menu'
                            size={25}
                            backgroundColor="#fff"
                            onPress={() => { navigation.openDrawer() }}></MaterialCommunityIcons.Button>
                    )
                }} />
        </NotificationStack.Navigator>
    )
}

const ProfileStackScreen = ({ navigation }) => {
    return (
        <ProfileStack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#fff',
                    elevation: 0,
                },
                headerTintColor: '#333',
            }}>
            <ProfileStack.Screen
                name="Profile"
                component={Profile}
                options={{
                    title: '',
                    headerLeft: () => (
                        <MaterialCommunityIcons.Button
                            color='#333'
                            name='menu'
                            size={25}
                            backgroundColor="#fff"
                            onPress={() => { navigation.openDrawer() }}
                        />
                    ),
                    headerRight: () => (
                        <MaterialCommunityIcons.Button
                            color='#333'
                            name='account-edit'
                            size={25}
                            backgroundColor="#fff"
                            onPress={() => { navigation.navigate('EditProfileScreen') }}
                        />
                    )
                }} />
            <ProfileStack.Screen
                name="EditProfileScreen"
                component={EditProfileScreen}
                options={{
                    title: 'Edit Profile'
                }}
            />
        </ProfileStack.Navigator>
    )
}