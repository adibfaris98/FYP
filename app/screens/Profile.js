import React, { useContext, useEffect, useState } from 'react'
import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import { Avatar, Caption, Title, TouchableRipple } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import auth from '@react-native-firebase/auth'
import axios from 'axios'
import { AuthContext } from '../navigation/AuthProvider'

export default function Profile() {
    const userAuth = auth().currentUser;

    const {name,email,about,country,phoneNumber,photoURL} = useContext(AuthContext)
    // ,setName,setEmail,setAbout,setCountry,setPhoneNumber,userDetails
    // const [name, setName] = useState()
    // const [email, setEmail] = useState()
    // const [about, setAbout] = useState()
    // const [country, setCountry] = useState()
    // const [phoneNumber, setPhoneNumber] = useState()

    // useEffect(() => {
    //     async function main() {
    //         try {
    //             const { data } = await axios.get(`/user/read/${userAuth.uid}`)
    //             setAbout(data.about)
    //             setName(data.name)
    //             setCountry(data.country)
    //             setPhoneNumber(data.phoneNumber)
    //             setEmail(data.email)
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     }
    //     main()
    // }, [name])

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.userInfoSection}>
                <View style={{ flexDirection: 'row', marginTop: 15 }}>
                    <Avatar.Image
                        source={{
                            uri: photoURL
                        }}
                        size={80}
                    />
                    <View>
                        <Title style={[styles.title, {
                            marginTop: 15,
                            marginBottom: 5
                        }]}>{name}</Title>
                        <Caption style={styles.caption}>{about}</Caption>
                    </View>
                </View>
            </View>

            <View style={styles.userInfoSection}>
                <View style={styles.row}>
                    <Icon name="map-marker-radius" color="#777777" size={20} />
                    <Text style={{ color: "#777777", marginLeft: 20 }}>{country}</Text>
                </View>
                <View style={styles.row}>
                    <Icon name="phone" color="#777777" size={20} />
                    <Text style={{ color: "#777777", marginLeft: 20 }}>{phoneNumber}</Text>
                </View>
                <View style={styles.row}>
                    <Icon name="email" color="#777777" size={20} />
                    <Text style={{ color: "#777777", marginLeft: 20 }}>{email}</Text>
                </View>
            </View>

            <View style={styles.infoBoxWrapper}>
                <View style={[styles.infoBox, {
                    borderRightColor: '#dddddd',
                    borderRightWidth: 1
                }]}>
                    <Title>4</Title>
                    <Caption>Tournament created</Caption>
                </View>
                <View style={styles.infoBox}>
                    <Title>8</Title>
                    <Caption>Tournament joined</Caption>
                </View>
            </View>

            <View style={styles.menuWrapper}>
                <TouchableRipple onPress={() => { }}>
                    <View style={styles.menuItem}>
                        <AntDesign name="setting" color='#6B46C1' size={25} />
                        <Text style={styles.menuItemText}>Settings</Text>
                    </View>
                </TouchableRipple>
            </View>

        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    userInfoSection: {
        paddingHorizontal: 30,
        marginBottom: 25,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        fontWeight: '500',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    infoBoxWrapper: {
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1,
        borderTopColor: '#dddddd',
        borderTopWidth: 1,
        flexDirection: 'row',
        height: 100,
    },
    infoBox: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuWrapper: {
        marginTop: 10,
    },
    menuItem: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 30,
    },
    menuItemText: {
        color: '#777777',
        marginLeft: 20,
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 26,
    },
});