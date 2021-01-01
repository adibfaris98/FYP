import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DataTable, Card, Title, Paragraph } from 'react-native-paper'
import axios from 'axios'

export default function FinalStage({ route, navigation }) {
    const { tournamentID, gGroupNumber } = route.params.tournament
    const [participants, setParticipant] = useState(null)
    const [finalStageList_semi, setFinalStageList_semi] = useState()
    const [finalStageList_quarter, setFinalStageList_quarter] = useState()
    const [finalStageList_round16, setFinalStageList_round16] = useState()
    const [fixture_semi, setFixture_semi] = useState()
    const [fixture_3rd, setFixture_3rd] = useState()
    const [fixture_final, setFixture_final] = useState()

    useEffect(() => {
        getParticipants()
        getFixture()
        return () => {

        }
    }, [])

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
            <View>
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
                    : <Text>  Currently final-stage participants list is empty.
                    Kindly go to the to finalize qualified
                    team in standings. Make sure all the results in the
                group-stage is updated.</Text>
                }

                <Text style={{
                    // alignSelf: 'center',
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: '#333'
                }}>Tournament Fixtures</Text>

                {fixture_semi && fixture_semi != null ?
                    <View>
                        <Text style={{
                            // alignSelf: 'center',
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: '#333'
                        }}>Semi Final</Text>

                        {fixture_semi.map((value, i) => {
                            return (
                                <Card key={i} style={{ alignItems: 'center', borderWidth: 1, borderColor: "grey", borderRadius: 5, width: "95%", margin: 10 }}>
                                    <Card.Content>
                                        <Paragraph style={{ textAlign: "center" }} >
                                            {value.homeTeam} vs {value.awayTeam}
                                        </Paragraph>
                                        <Paragraph style={{ textAlign: "center" }}>
                                            {value.homeScore} {value.awayScore}
                                        </Paragraph>
                                    </Card.Content>
                                </Card>
                            )
                        })}
                    </View>

                    : null
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
                            return (
                                <Card key={i} style={{ alignItems: 'center', borderWidth: 1, borderColor: "grey", borderRadius: 5, width: "95%", margin: 10 }}>
                                    <Card.Content>
                                        <Paragraph style={{ textAlign: "center" }} >
                                            {value.homeTeam} vs {value.awayTeam}
                                        </Paragraph>
                                        <Paragraph style={{ textAlign: "center" }}>
                                            {value.homeScore} {value.awayScore}
                                        </Paragraph>
                                    </Card.Content>
                                </Card>
                            )
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
                            return (
                                <Card key={i} style={{ alignItems: 'center', borderWidth: 1, borderColor: "grey", borderRadius: 5, width: "95%", margin: 10 }}>
                                    <Card.Content>
                                        <Paragraph style={{ textAlign: "center" }} >
                                            {value.homeTeam} vs {value.awayTeam}
                                        </Paragraph>
                                        <Paragraph style={{ textAlign: "center" }}>
                                            {value.homeScore} {value.awayScore}
                                        </Paragraph>
                                    </Card.Content>
                                </Card>
                            )
                        })}
                    </View>
                    : null
                }
            </View>
        </ScrollView>
    )
}
