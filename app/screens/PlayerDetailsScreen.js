import React, { useContext, useEffect, useState } from 'react'
import { View, Text, SafeAreaView, StyleSheet, Alert, Button } from 'react-native'
import { Avatar, Caption, Title, TouchableRipple } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Octicons from 'react-native-vector-icons/Octicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import auth from '@react-native-firebase/auth'
import axios from 'axios'
import { AuthContext } from '../navigation/AuthProvider'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { PlayerContext } from './TeamRegisterScreen'

export default function PlayerDetailsScreen({ route, navigation }) {
    const currentUser = auth().currentUser.uid;
    const player = route.params.playerDetails
    const tournamentID = route.params.tournamentID
    const getTeam = route.params.getTeam
    // const listPlayers = route.params.listPlayers

    // const { listPlayers } = useContext(PlayerContext)

    const deletePlayer = async () => {
        try {
            const response = await axios.delete(`/${tournamentID}/${currentUser}/player/${player.identificationID}`);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.userPhotoSection}>
                <View style={{ flexDirection: 'row', marginTop: 15 }}>
                    <Avatar.Image
                        source={{
                            uri: player.passportPhoto
                        }}
                        size={80}
                    />
                    <View>
                        <Title style={[styles.title, {
                            marginTop: 15,
                            marginBottom: 5
                        }]}>{player.name}</Title>
                    </View>
                </View>
            </View>

            <View style={styles.userInfoSection}>
                <View style={styles.row}>
                    <Icon name="map-marker-radius" color="#777777" size={20} />
                    <Text style={{ color: "#777777", marginLeft: 20 }}>Address: {player.address}</Text>
                </View>
                <View style={styles.row}>
                    <Icon name="card-account-details-outline" color="#777777" size={20} />
                    <Text style={{ color: "#777777", marginLeft: 20 }}>IC Number: {player.identificationID}</Text>
                </View>
                <View style={styles.row}>
                    <Icon name="card-account-details-outline" color="#777777" size={20} />
                    <Text style={{ color: "#777777", marginLeft: 20 }}>Matric Number: {player.numMatric}</Text>
                </View>
                <View style={styles.row}>
                    <Octicons name="jersey" color="#777777" size={20} />
                    <Text style={{ color: "#777777", marginLeft: 20 }}>Athlete Number: {player.numAthelete}</Text>
                </View>
                <View style={styles.row}>
                    <Icon name="phone" color="#777777" size={20} />
                    <Text style={{ color: "#777777", marginLeft: 20 }}>Phone Number: {player.phoneNumber}</Text>
                </View>
                <View style={styles.row}>
                    <Icon name="email" color="#777777" size={20} />
                    <Text style={{ color: "#777777", marginLeft: 20 }}>Gender: {player.gender}</Text>
                </View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent:'space-evenly' }}>
                <Button
                    color="red"
                    title="Delete Player"
                    onPress={() => {
                        Alert.alert(
                            "Delete player",
                            "Are you sure want to delete this player ?",
                            [
                                {
                                    text: "Cancel",
                                    onPress: () => console.log('cancel'),
                                    style: "cancel"
                                },
                                {
                                    text: "OK",
                                    onPress: () => {
                                        deletePlayer()
                                        navigation.navigate('CardItemDetails')
                                        // getTeam()
                                    }
                                }
                            ],
                            { cancelable: false }
                        );
                    }}
                />

                <Button
                    title="Edit Details"
                    onPress={() => {

                    }}
                />
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