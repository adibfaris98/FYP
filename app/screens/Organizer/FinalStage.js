import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DataTable, Card, Title, Paragraph, Caption } from 'react-native-paper'
import axios from 'axios'
import FixtureCard from '../../components/FixtureCard';

export default function FinalStage({ route, navigation }) {
    const { tournamentID, gGroupNumber, hostName } = route.params.tournament
    const [participants, setParticipant] = useState(null)
    const [finalStageList_semi, setFinalStageList_semi] = useState(null)
    const [finalStageList_quarter, setFinalStageList_quarter] = useState(null)
    const [finalStageList_round16, setFinalStageList_round16] = useState(null)
    const [fixture_semi, setFixture_semi] = useState(null)
    const [fixture_3rd, setFixture_3rd] = useState(null)
    const [fixture_final, setFixture_final] = useState(null)

    const [submit, setSubmit] = useState(false)

    useEffect(() => {
        getParticipants()
        getFixture()
    }, [submit])

    const getParticipants = async () => {
        try {
            const res = await axios.get(`/${tournamentID}/final/participant`)
            setParticipant(res.data)

            if (gGroupNumber == 2) {
                setFinalStageList_semi(res.data)
            } else if (gGroupNumber == 4) {
                setFinalStageList_quarter(res.data)
            } else if (gGroupNumber == 8) {
                setFinalStageList_round16(res.data)
            }
            console.log(res.data)
        } catch (error) {

        }
    }

    const getFixture = async () => {
        try {
            const res = await axios.get(`/${tournamentID}/final/fixture`)
            setFixture_semi(res.data.semiFinal)
            setFixture_3rd(res.data.thirdPlace)
            setFixture_final(res.data.final)
        } catch (error) {

        }
    }
    return (
        <ScrollView>
            <View style={{ padding: 5, flex: 1 }}>
                <Text style={{
                    // alignSelf: 'center',
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: '#333'
                }}>Qualified Team</Text>
                {finalStageList_semi && finalStageList_semi != null ?
                    <DataTable>
                        <DataTable.Header>
                            <DataTable.Title>Group</DataTable.Title>
                            <DataTable.Title>Qualified Team</DataTable.Title>
                        </DataTable.Header>
                        <DataTable.Row >
                            <DataTable.Cell>{finalStageList_semi.group_A1.groupName}</DataTable.Cell>
                            <DataTable.Cell>{finalStageList_semi.group_A1.teamName}</DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row >
                            <DataTable.Cell>{finalStageList_semi.group_B2.groupName}</DataTable.Cell>
                            <DataTable.Cell>{finalStageList_semi.group_B2.teamName}</DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row >
                            <DataTable.Cell>{finalStageList_semi.group_B1.groupName}</DataTable.Cell>
                            <DataTable.Cell>{finalStageList_semi.group_B1.teamName}</DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row >
                            <DataTable.Cell>{finalStageList_semi.group_A2.groupName}</DataTable.Cell>
                            <DataTable.Cell>{finalStageList_semi.group_A2.teamName}</DataTable.Cell>
                        </DataTable.Row>
                    </DataTable>
                    :
                    <View style={{ justifyContent: 'center' }}>
                        <Caption style={{ textAlign: 'center', fontSize: 18 }}>Currently final-stage participants list is empty. Kindly go to the to finalize qualified team in standings. Make sure all the results in the group-stage is updated.</Caption>
                    </View>
                }

                <Text style={{
                    // alignSelf: 'center',
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: '#333'
                }}>Fixtures</Text>

                {fixture_semi && fixture_semi != null ?
                    <View>

                        <Text style={{
                            // alignSelf: 'center',
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: '#333'
                        }}>Semi Final</Text>

                        {fixture_semi.map((value, i) => {
                            return <FixtureCard key={i} fixture={value} tournamentID={tournamentID} setSubmit={setSubmit} submit={submit} tournamentHost={hostName} />
                        })}
                    </View>
                    : <Text>Currently not available.</Text>
                }

                {fixture_3rd && fixture_3rd != null ?
                    <View>
                        <Text style={{
                            // alignSelf: 'center',
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: '#333'
                        }}>3rd Place</Text>

                        {fixture_3rd.map((value, i) => {
                            return <FixtureCard key={i} fixture={value} tournamentID={tournamentID} setSubmit={setSubmit} submit={submit} tournamentHost={hostName}/>
                        })}
                    </View>

                    : null
                }

                {fixture_final && fixture_final != null ?
                    <View>
                        <Text style={{
                            // alignSelf: 'center',
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: '#333'
                        }}>Final</Text>

                        {fixture_final.map((value, i) => {
                            return <FixtureCard key={i} fixture={value} tournamentID={tournamentID} setSubmit={setSubmit} submit={submit} tournamentHost={hostName}/>
                        })}
                    </View>
                    : null
                }
            </View>
        </ScrollView>
    )
}
