import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Button } from 'react-native'
import { DataTable, Card, Title, Paragraph } from 'react-native-paper'
import axios from 'axios'

export default function PlayerList({ route, navigation }) {
    const { teamID, playerList, tournamentID , submit, setSubmit } = route.params

    useEffect(() => {
        return () => {

        }
    }, [])

    const approveRegistration =async () =>{
        try {
            const res = await axios.post(`/${tournamentID}/${teamID}/approveTeamRegistration`)
            console.log(res.data)
        } catch (error) {
            
        }
    } 

    const rejectRegistration =async () =>{
        try {
            const res = await axios.post(`/${tournamentID}/${teamID}/rejectTeamRegistration`)
            console.log(res.data)
        } catch (error) {
            
        }
    } 
    return (
        <View style={{ flex: 1 }}>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>Name</DataTable.Title>
                    <DataTable.Title>IC no.</DataTable.Title>
                </DataTable.Header>

                {playerList && playerList.map((item, i) => {
                    return (
                        <TouchableOpacity
                            key={i}
                            onPress={() => {
                                navigation.navigate('PlayerDetailsApproval', { playerData: item, tournamentID })
                            }}>
                            <DataTable.Row key={i}>
                                <DataTable.Cell>{item.name}</DataTable.Cell>
                                <DataTable.Cell>{item.identificationID}</DataTable.Cell>
                            </DataTable.Row>
                        </TouchableOpacity>
                    )
                })}
            </DataTable>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', margin: 10 }}>
                <Button
                    onPress={() => { 
                        setSubmit(!submit)
                        approveRegistration()
                        navigation.navigate('ApproveRegistration')
                    }}
                    title="Approved"
                    color="green"
                    accessibilityLabel="Learn more about this purple button"
                />
                <Button
                    onPress={() => {
                        setSubmit(!submit)
                        rejectRegistration()
                        navigation.navigate('ApproveRegistration')
                    }}
                    title="Reject"
                    color="red"
                    accessibilityLabel="Learn more about this purple button"
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cardsWrapper: {
        marginTop: 10,
        width: '90%',
        alignSelf: 'center',
    },
    card: {
        height: 100,
        marginVertical: 10,
        flexDirection: 'row',
        shadowColor: '#999',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    cardImgWrapper: {
        flex: 1,
    },
    cardImg: {
        height: '100%',
        width: '100%',
        alignSelf: 'center',
        borderRadius: 8,
        borderBottomRightRadius: 0,
        borderTopRightRadius: 0,
    },
    cardInfo: {
        flex: 2,
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderBottomRightRadius: 8,
        borderTopRightRadius: 8,
        backgroundColor: '#fff',
    },
    cardTitle: {
        fontWeight: 'bold',
    },
    cardDetails: {
        fontSize: 12,
        color: '#444',
    },
})