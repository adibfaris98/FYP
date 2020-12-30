import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DataTable } from 'react-native-paper'
import axios from 'axios'

export default function ApproveRegistration({ route, navigation }) {
    const { tournamentID } = route.params.tournament
    const [pendingList, setPendingList] = useState([])

    useEffect(() => {
        getPendingList()
        console.log(pendingList)
    }, [])

    const getPendingList = async () => {
        try {
            const response = await axios.get(`/organizer/${tournamentID}/pendingList`)
            const data = response.data
            setPendingList(data)
        } catch (error) {

        }
    }

    return (
        <View style={{ flex: 1 }}>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>Team Name</DataTable.Title>
                    <DataTable.Title>Manager Name</DataTable.Title>
                    <DataTable.Title>Email</DataTable.Title>
                </DataTable.Header>

                {pendingList && pendingList.map((item, i) => (
                    <TouchableOpacity
                        key={i}
                        onPress={() => {
                            navigation.navigate('PlayerList', { teamID: item.uid, playerList: item.playerList, tournamentID })
                        }}
                    >
                        <DataTable.Row key={i}>
                            <DataTable.Cell>{item.teamName}</DataTable.Cell>
                            <DataTable.Cell>{item.managerName}</DataTable.Cell>
                            <DataTable.Cell>{item.managerEmail}</DataTable.Cell>
                        </DataTable.Row>
                    </TouchableOpacity>
                ))
                }

                <DataTable.Pagination
                    page={1}
                    numberOfPages={3}
                    onPageChange={page => {
                        console.log(page);
                    }}
                    label="1-2 of 6"
                />
            </DataTable>
        </View>
    );
}
