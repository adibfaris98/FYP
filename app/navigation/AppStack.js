import { createDrawerNavigator } from '@react-navigation/drawer';

import React from 'react';

import MainTabScreen from '../screens/MainTabsScreen'
import MainTabOrganizer from '../screens/Organizer/MainTabsScreen'
import DrawerContent from '../screens/DrawerContent'
import HomeOrganizer from '../screens/Organizer/HomeOrganizer';
import TournamentScreen from '../screens/Organizer/TournamentScreen'
import NotificationsScreen from '../screens/Organizer/NotificationsScreen'
import ProfileScreen from '../screens/Organizer/ProfileScreen'

import { StyleSheet } from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';

const Drawer = createDrawerNavigator();

function AppStack() {
  return (
    <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
      <Drawer.Screen name="HomeOrganizer" component={MainTabOrganizer}/>
    </Drawer.Navigator>
  )
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default AppStack;
