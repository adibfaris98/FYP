import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DataTable } from 'react-native-paper'
import axios from 'axios'

export default function ApproveRegistration({ route, navigation }) {
    // const { tournamentID } = route.params.tournament
    // const [pendingList, setPendingList] = useState([])

    // useEffect(() => {
    // getPendingList()
    // console.log(pendingList)
    // }, [])

    // const getPendingList = async () => {
    //     try {
    //         const response = await axios.get(`/organizer/${tournament.tournamentID}/pendingList`)
    //         const data = response.data
    //         setPendingList(data)

    //         pendingList.forEach(element => {
    //             const userRes = await axios.get(`/user/${element.uid}`)

    //         });
    //         const userRes = await axios.get('user')
    //         // return data
    //     } catch (error) {

    //     }
    // }

    return (
        <View style={{ flex: 1 }}>
            <Text style={{
                // alignSelf: 'center',
                fontSize: 18,
                fontWeight: 'bold',
                color: '#333'
            }}>Registration Approval</Text>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>Team Name</DataTable.Title>
                    <DataTable.Title>Manager Name</DataTable.Title>
                    <DataTable.Title>Email</DataTable.Title>
                    <DataTable.Title>Actions</DataTable.Title>
                </DataTable.Header>
                {/* 
                {pendingList && pendingList.map(item => (
                    <TouchableOpacity
                        key={item.uid}
                        // onPress={() => {
                        //     navigation.navigate('PlayerDetailsScreen', { playerDetails: item, tournamentID, listPlayers, getTeam })
                        // }}
                        >
                        <DataTable.Row>
                            <DataTable.Cell>{item.teamName}</DataTable.Cell>
                            <DataTable.Cell>ali</DataTable.Cell>
                            <DataTable.Cell>ali@gmail.com</DataTable.Cell>
                            <DataTable.Cell>a</DataTable.Cell>
        
                        </DataTable.Row>
                    </TouchableOpacity>
                ))
                } */}

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
