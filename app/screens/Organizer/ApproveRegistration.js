import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Caption, DataTable } from 'react-native-paper'
import axios from 'axios'

export default function ApproveRegistration({ route, navigation }) {
    const { tournamentID } = route.params.tournament
    const [pendingList, setPendingList] = useState([])
    const [submit, setSubmit] = useState(false)

    useEffect(() => {
        getPendingList()
    }, [submit])

    const getPendingList = async () => {
        try {
            const response = await axios.get(`/${tournamentID}/pendingList`)
            const data = response.data
            setPendingList(data)
            console.log(response.data)
        } catch (error) {

        }
    }

    return (
        <View style={{ flex: 1, padding: 5 }}>
            {pendingList ?
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title>Team Name</DataTable.Title>
                        <DataTable.Title>Manager Name</DataTable.Title>
                        <DataTable.Title>Email</DataTable.Title>
                    </DataTable.Header>

                    {pendingList.map((item, i) => (
                        <TouchableOpacity
                            key={i}
                            onPress={() => {
                                navigation.navigate('PlayerList', { teamID: item.uid, playerList: item.playerList, tournamentID, submit, setSubmit })
                            }}
                        >
                            <DataTable.Row key={i}>
                                <DataTable.Cell>{item.teamName}</DataTable.Cell>
                                <DataTable.Cell>{item.managerName}</DataTable.Cell>
                                <DataTable.Cell>{item.managerEmail}</DataTable.Cell>
                            </DataTable.Row>
                        </TouchableOpacity>
                    ))}</DataTable>
                :
                <View style={{ justifyContent: 'center' }}>
                    <Caption style={{ textAlign: 'center', fontSize: 16 }}>Currently there is no application. Once manager submit registration form, the application will appear here for your approval.</Caption>
                </View>
            }
        </View>
    );
}
