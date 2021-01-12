import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Avatar, Caption, Drawer, Paragraph, Title } from 'react-native-paper'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Entypo from 'react-native-vector-icons/Entypo'
import { AuthContext } from '../navigation/AuthProvider'

import auth from '@react-native-firebase/auth'
import axios from 'axios'
import HomeOrganizer from './Organizer/HomeOrganizer'

export default function DrawerContent({props,navigation}) {
   
    const { user, logout, name, email, photoURL} = useContext(AuthContext)

    const userAuth = auth().currentUser;

    return (
        
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    {/* Avatar & Details */}
                    <View style={styles.userInfoSection}>
                        <View>
                            <Avatar.Image
                                source={{
                                    uri: photoURL
                                }}
                                size={45}
                            />
                            <View>
                                <Title style={styles.title}>
                                    {name}
                                </Title>
                                <Caption>
                                    {email}
                                </Caption>
                            </View>
                        </View>

                        {/* <View style={styles.row}>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>80</Paragraph>
                                <Caption style={styles.caption}>Following</Caption>
                            </View>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>100</Paragraph>
                                <Caption style={styles.caption}>Follower</Caption>
                            </View>
                        </View> */}
                    </View>
                    {/* Drawer Content */}
                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            icon={({ color, size }) => (
                                <MaterialCommunityIcons
                                    name="home-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Home"
                            onPress={() => {
                                navigation.navigate("HomeDrawer")
                            }}
                        />

                        <DrawerItem
                            icon={({ color, size }) => (
                                <MaterialCommunityIcons
                                    name="account-settings-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Settings"
                            onPress={() => {
                                navigation.navigate("Profile")
                            }}
                        />
                    </Drawer.Section>

                    <Drawer.Section title="Create Tournament/Event ?">
                        {/* <DrawerItem
                            icon={({ color, size }) => (
                                <Entypo
                                    name="sports-club"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Create an Event"
                            onPress={() => {
                            }}
                        /> */}
                        <DrawerItem
                            icon={({ color, size }) => (
                                <FontAwesome5
                                    name="users"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Organizer Dashboard"
                            onPress={() => {
                                navigation.navigate('HomeOrganizer')
                            }}
                        />

                    </Drawer.Section>

                </View>
            </DrawerContentScrollView>

            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                    icon={({ color, size }) => (
                        <MaterialCommunityIcons
                            name="exit-to-app"
                            color={color}
                            size={size}
                        />
                    )}
                    label="Sign Out"
                    onPress={() => {
                        logout()
                    }}
                />
            </Drawer.Section>
        </View>
    )
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    // preference: {
    //     // flexDirection: 'row',
    //     // justifyContent: 'space-between',
    //     // paddingVertical: 12,
    //     // paddingHorizontal: 16,
    // },
});