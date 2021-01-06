import React, { useContext } from 'react'
import { View, Text, Alert, Image } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Avatar } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Ionicons'
import { AuthContext } from '../../navigation/AuthProvider';

//main
import Home from './HomeOrganizer'
import Notification from './NotificationsScreen'
import Profile from './ProfileScreen'
import Tournament from './TournamentScreen'
import LoginScreen from '../LoginScreen'

//home stack screen

//tournament
import TeamRegisterScreen from './TeamRegisterScreen'
import EditPlayerScreen from './EditPlayerScreen';
import PlayerDetailsScreen from './PlayerDetailsScreen';
import PlayerRegisterScreen from './PlayerRegisterScreen'
import TournamentTab from './TournamentTab'

//profile stack screen
import EditProfileScreen from './EditProfileScreen';
import TournamentList from './TournamentList';
import TournamentDetails from './TournamentDetails';
import EventList from './EventList';
import EventDetails from './EventDetails';

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const TournamentStack = createStackNavigator();
const NotificationStack = createStackNavigator();
const ProfileStack = createStackNavigator();

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
                    tabBarLabel: 'My Tournament',
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
    const { photoURL } = useContext(AuthContext)
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
                            {/* <Icon.Button
                                color='#333'
                                name='ios-search'
                                size={25}
                                backgroundColor="#fff"
                                onPress={() => { }}>
                            </Icon.Button> */}
                            <Image
                                style={{
                                    // backgroundColor:'red',
                                    borderColor: 'red',
                                    borderWidth: 1,
                                    width: 100,
                                    height: 50,
                                }}
                                
                                source={{
                                    uri: 'https://firebasestorage.googleapis.com/v0/b/sports-management-system-v2.appspot.com/o/website%2Flogo-organizer.svg?alt=media&token=ae413f4a-bde9-4bda-b857-4b61747fb80d',
                                }}
                            />
                            <TouchableOpacity
                                style={{ paddingHorizontal: 10, marginTop: 5 }}
                                onPress={() => navigation.navigate('Profile')}>
                                <Avatar.Image
                                    source={{
                                        uri: photoURL
                                    }}
                                    size={30}
                                />
                            </TouchableOpacity>
                        </View>
                    )
                }}
            />
            <HomeStack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={({ route }) => ({
                    title: route.params.title
                })}
            />
            <HomeStack.Screen
                name="TournamentList"
                component={TournamentList}
                options={({ route }) => ({
                    title: route.params.title
                })}
            />
            <HomeStack.Screen
                name="TournamentDetails"
                component={TournamentDetails}
                options={({ route }) => ({
                    // title: route.params.title
                    headerBackTitleVisible: false,
                    headerTitle: false,
                    headerTransparent: true,
                    headerTintColor: '#fff'
                })}
            />
            <HomeStack.Screen
                name="EventList"
                component={EventList}
                options={({ route }) => ({
                    title: route.params.title
                })}
            />
            <HomeStack.Screen
                name="EventDetails"
                component={EventDetails}
                options={({ route }) => ({
                    // title: route.params.title
                    headerBackTitleVisible: false,
                    headerTitle: false,
                    headerTransparent: true,
                    headerTintColor: '#fff'
                })}
            />
            <HomeStack.Screen
                name="TeamRegisterScreen"
                component={TeamRegisterScreen}
                options={({ route }) => ({
                    title: 'Team Registration'
                })}
            />
            <HomeStack.Screen
                name="PlayerRegisterScreen"
                component={PlayerRegisterScreen}
                options={({ route }) => ({
                    title: 'Player Registration'
                })}
            />
            <HomeStack.Screen
                name="PlayerDetailsScreen"
                component={PlayerDetailsScreen}
                options={({ route }) => ({
                    title: 'Player Details'
                })}
            />
            <HomeStack.Screen
                name="EditPlayerScreen"
                component={EditPlayerScreen}
                options={({ route }) => ({
                    title: 'Edit Player'
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
                    title: "My Tournament",
                    headerLeft: () => (
                        <MaterialCommunityIcons.Button
                            color='#333'
                            name='menu'
                            size={25}
                            backgroundColor="#fff"
                            onPress={() => { navigation.openDrawer() }}>
                        </MaterialCommunityIcons.Button>
                    )
                }}
            />
            <TournamentStack.Screen
                name="TournamentDetails"
                component={TournamentDetails}
                options={({ route }) => ({
                    // title: route.params.title
                    headerBackTitleVisible: false,
                    headerTitle: false,
                    headerTransparent: true,
                    headerTintColor: '#fff'
                })}
            />
            <TournamentStack.Screen
                name="TeamRegisterScreen"
                component={TeamRegisterScreen}
                options={({ route }) => ({
                    title: 'Team Registration'
                })}
            />
            <TournamentStack.Screen
                name="PlayerRegisterScreen"
                component={PlayerRegisterScreen}
                options={({ route }) => ({
                    title: 'Player Registration'
                })}
            />
            <TournamentStack.Screen
                name="PlayerDetailsScreen"
                component={PlayerDetailsScreen}
                options={({ route }) => ({
                    title: 'Player Details'
                })}
            />
            <TournamentStack.Screen
                name="EditPlayerScreen"
                component={EditPlayerScreen}
                options={({ route }) => ({
                    title: 'Edit Player'
                })}
            />
            <TournamentStack.Screen
                name="TournamentTab"
                component={TournamentTab}
                options={({ route }) => ({
                    // title: 'Organize',
                    // headerRight: () => (
                    //     <AntDesign.Button
                    //         color='#333'
                    //         name='setting'
                    //         size={25}
                    //         backgroundColor="#fff"
                    //         onPress={() => {  }}>
                    //     </AntDesign.Button>
                    // )
                    headerShown: false
                })}
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
                        // onPress={() => { navigation.navigate('EditProfileScreen') }}
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
