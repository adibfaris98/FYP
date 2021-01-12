import React, { useContext, useEffect, useState } from 'react'
import { View, Text, SafeAreaView, StyleSheet, Alert, Button } from 'react-native'
import { Avatar, Caption, Title, TouchableRipple } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Octicons from 'react-native-vector-icons/Octicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import auth from '@react-native-firebase/auth'
import axios from 'axios'

export default function PlayerDetailsApproval({ route, navigation }) {
    const { playerData, tournamentID, eventID } = route.params
    const [format, setFormat] = useState()

    useEffect(() => {
        getFormat()
        console.log(eventID)
        console.log(tournamentID)
    }, [])

    const getFormat = async () => {
        try {
            const res = await axios.get(`/${eventID}/${tournamentID}/format`)
            setFormat(res.data)
        } catch (error) {

        }
    }

    return (
        <SafeAreaView style={styles.container}>
            {format && format.passportPhoto == true ?
                <View style={styles.userPhotoSection}>
                    <View style={{ flexDirection: 'row', marginTop: 15 }}>
                        <Avatar.Image
                            source={{
                                uri: playerData.passportPhoto
                            }}
                            size={80}
                        />

                    </View>
                </View> : null}
            {format && format.name == true ?
                <View>
                    <Title style={[styles.title, {
                        marginTop: 15,
                        marginBottom: 5,
                        textAlign: 'center'
                    }]}>{playerData.name}</Title>
                </View> : null
            }

            <View style={styles.userInfoSection}>
                {format && format.address == true ?
                    <View style={styles.row}>
                        <Icon name="map-marker-radius" color="#777777" size={20} />
                        <Text style={{ color: "#777777", marginLeft: 20 }}>Address: {playerData.address}</Text>
                    </View> : null
                }
                {format && format.identificationID == true ?
                    <View style={styles.row}>
                        <Icon name="card-account-details-outline" color="#777777" size={20} />
                        <Text style={{ color: "#777777", marginLeft: 20 }}>IC Number: {playerData.identificationID}</Text>
                    </View> : null
                }
                {format && format.numMatric == true ?
                    <View style={styles.row}>
                        <Icon name="card-account-details-outline" color="#777777" size={20} />
                        <Text style={{ color: "#777777", marginLeft: 20 }}>Matric Number: {playerData.numMatric}</Text>
                    </View> : null
                }
                {format && format.numAthelete == true ?
                    <View style={styles.row}>
                        <Octicons name="jersey" color="#777777" size={20} />
                        <Text style={{ color: "#777777", marginLeft: 20 }}>Athlete Number: {playerData.numAthelete}</Text>
                    </View> : null
                }
                {format && format.phoneNumber == true ?
                    <View style={styles.row}>
                        <Icon name="phone" color="#777777" size={20} />
                        <Text style={{ color: "#777777", marginLeft: 20 }}>Phone Number: {playerData.phoneNumber}</Text>
                    </View> : null
                }
                {format && format.gender == true ?
                    <View style={styles.row}>
                        <Icon name="email" color="#777777" size={20} />
                        <Text style={{ color: "#777777", marginLeft: 20 }}>Gender: {playerData.gender}</Text>
                    </View> : null
                }

            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                {/* <AntDesign
                color='#333'
                name='deleteuser'
                size={25}
                backgroundColor="#fff"
                
            /> */}
  

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
    userPhotoSection: {
        paddingHorizontal: 30,
        marginBottom: 25,
        alignItems: "center"
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