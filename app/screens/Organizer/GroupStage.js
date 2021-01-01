import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DataTable, Card, Title, Paragraph } from 'react-native-paper'
import axios from 'axios'

export default function GroupStage({ route, navigation }) {
    const { tournamentID } = route.params.tournament
    const [seeding, setSeeding] = useState([])
    const [fixtureGroup, setFixtureGroup] = useState([])
    const [tables, setTables] = useState([])

    const [fixtureA, setFixtureA] = useState()
    const [fixtureB, setFixtureB] = useState()
    const [fixtureC, setFixtureC] = useState()
    const [fixtureD, setFixtureD] = useState()
    const [fixtureE, setFixtureE] = useState()
    const [fixtureF, setFixtureF] = useState()
    const [fixtureG, setFixtureG] = useState()
    const [fixtureH, setFixtureH] = useState()

    const [seedingA, setSeedingA] = useState()
    const [seedingB, setSeedingB] = useState()
    const [seedingC, setSeedingC] = useState()
    const [seedingD, setSeedingD] = useState()
    const [seedingE, setSeedingE] = useState()
    const [seedingF, setSeedingF] = useState()
    const [seedingG, setSeedingG] = useState()
    const [seedingH, setSeedingH] = useState()

    const [tableA, setTableA] = useState(null)
    const [tableB, setTableB] = useState()
    const [tableC, setTableC] = useState()
    const [tableD, setTableD] = useState()
    const [tableE, setTableE] = useState()
    const [tableF, setTableF] = useState()
    const [tableG, setTableG] = useState()
    const [tableH, setTableH] = useState()

    useEffect(() => {
        getSeeding()
        getFixtureGroup()
        getTable()
    }, [])

    const getTable = async () => {
        try {
            const res = await axios.get(`/${tournamentID}/grouping/tables`)
            const data = res.data
            setTableA(data.table_A)
            setTableB(data.table_B)
            setTableC(data.table_C)
            setTableD(data.table_D)
            setTableE(data.table_E)
            setTableF(data.table_F)
            setTableG(data.table_G)
            setTableH(data.table_H)
        } catch (error) {

        }
    }

    const getFixtureGroup = async () => {
        try {
            const response = await axios.get(`/${tournamentID}/grouping/fixture`)
            const data = response.data
            setFixtureA(data.fixture_A)
            setFixtureB(data.fixture_B)
            setFixtureC(data.fixture_C)
            setFixtureD(data.fixture_D)
            setFixtureE(data.fixture_E)
            setFixtureF(data.fixture_F)
            setFixtureG(data.fixture_G)
            setFixtureH(data.fixture_H)
            console.log(data.fixture_A)
        } catch (error) {

        }
    }

    const getSeeding = async () => {
        try {
            const response = await axios.get(`/${tournamentID}/seedings`)
            const data = response.data
            setSeedingA(data.group_A)
            setSeedingB(data.group_B)
            setSeedingC(data.group_C)
            setSeedingD(data.group_D)
            setSeedingE(data.group_E)
            setSeedingF(data.group_F)
            setSeedingG(data.group_G)
            setSeedingH(data.group_H)
            console.log(data.group_A)
            setSeeding(data)
        } catch (error) {

        }

    }

    return (
        <ScrollView>
            <View style={{ flex: 1 }}>
                <Text style={{
                    // alignSelf: 'center',
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: '#333'
                }}>Grouping</Text>

                {
                    seedingA != null ?
                        < DataTable style={{ backgroundColor: "white", borderWidth: 1, borderColor: "grey", borderRadius: 5, width: "95%", margin: 10 }} >
                            <DataTable.Header>
                                <DataTable.Title style={{
                                    alignSelf: 'center',
                                    fontWeight: 'bold',
                                }}>
                                    Group A
                            </DataTable.Title>
                            </DataTable.Header>

                            {seedingA.map((value, i) => {
                                return (
                                    <DataTable.Row key={i}>
                                        <DataTable.Cell style={{ flex: 3 }}>
                                            {value.teamName}
                                        </DataTable.Cell>
                                    </DataTable.Row>
                                )
                            })}
                        </DataTable>
                        : null
                }
                {
                    seedingB != null ?
                        < DataTable style={{ backgroundColor: "white", borderWidth: 1, borderColor: "grey", borderRadius: 5, width: "95%", margin: 10 }}>
                            <DataTable.Header>
                                <DataTable.Title>
                                    Group B
                            </DataTable.Title>
                            </DataTable.Header>

                            {seedingB.map((value, i) => {
                                return (
                                    <DataTable.Row key={i}>
                                        <DataTable.Cell>
                                            {value.teamName}
                                        </DataTable.Cell>
                                    </DataTable.Row>
                                )
                            })}
                        </DataTable>
                        : null
                }
                {
                    seedingC != null ?
                        < DataTable >
                            <DataTable.Header>
                                <DataTable.Title>
                                    Group C
                            </DataTable.Title>
                            </DataTable.Header>

                            {seedingC.map((value, i) => {
                                return (
                                    <DataTable.Row key={i}>
                                        <DataTable.Cell>
                                            {value.teamName}
                                        </DataTable.Cell>
                                    </DataTable.Row>
                                )
                            })}
                        </DataTable>
                        : null
                }
                {
                    seedingD != null ?
                        < DataTable >
                            <DataTable.Header>
                                <DataTable.Title>
                                    Group D
                            </DataTable.Title>
                            </DataTable.Header>

                            {seedingD.map((value, i) => {
                                return (
                                    <DataTable.Row key={i}>
                                        <DataTable.Cell>
                                            {value.teamName}
                                        </DataTable.Cell>
                                    </DataTable.Row>
                                )
                            })}
                        </DataTable>
                        : null
                }
                {
                    seedingE != null ?
                        < DataTable >
                            <DataTable.Header>
                                <DataTable.Title>
                                    Group E
                            </DataTable.Title>
                            </DataTable.Header>

                            {seedingE.map((value, i) => {
                                return (
                                    <DataTable.Row key={i}>
                                        <DataTable.Cell>
                                            {value.teamName}
                                        </DataTable.Cell>
                                    </DataTable.Row>
                                )
                            })}
                        </DataTable>
                        : null
                }
                {
                    seedingF != null ?
                        < DataTable >
                            <DataTable.Header>
                                <DataTable.Title>
                                    Group F
                            </DataTable.Title>
                            </DataTable.Header>

                            {seedingF.map((value, i) => {
                                return (
                                    <DataTable.Row key={i}>
                                        <DataTable.Cell>
                                            {value.teamName}
                                        </DataTable.Cell>
                                    </DataTable.Row>
                                )
                            })}
                        </DataTable>
                        : null
                }
                {
                    seedingG != null ?
                        < DataTable >
                            <DataTable.Header>
                                <DataTable.Title>
                                    Group G
                            </DataTable.Title>
                            </DataTable.Header>

                            {seedingG.map((value, i) => {
                                return (
                                    <DataTable.Row key={i}>
                                        <DataTable.Cell>
                                            {value.teamName}
                                        </DataTable.Cell>
                                    </DataTable.Row>
                                )
                            })}
                        </DataTable>
                        : null
                }
                {
                    seedingH != null ?
                        < DataTable >
                            <DataTable.Header>
                                <DataTable.Title>
                                    Group H
                            </DataTable.Title>
                            </DataTable.Header>

                            {seedingH.map((value, i) => {
                                return (
                                    <DataTable.Row key={i}>
                                        <DataTable.Cell>
                                            {value.teamName}
                                        </DataTable.Cell>
                                    </DataTable.Row>
                                )
                            })}
                        </DataTable>
                        : null
                }

                <Text style={{
                    // alignSelf: 'center',
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: '#333'
                }}>Fixtures</Text>

                {
                    fixtureA != null ?
                        <View >
                            <Text style={{
                                // alignSelf: 'center',
                                fontSize: 18,
                                fontWeight: 'bold',
                                color: '#333'
                            }}>Group A</Text>

                            {fixtureA.map((value, i) => {
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

                {
                    fixtureB != null ?
                        <View>
                            <Text style={{
                                // alignSelf: 'center',
                                fontSize: 18,
                                fontWeight: 'bold',
                                color: '#333'
                            }}>Group B</Text>

                            {fixtureB.map((value, i) => {
                                return (
                                    <Card key={i} style={{ alignItems: 'center', borderWidth: 1, borderColor: "grey", borderRadius: 5, width: "95%", margin: 10 }}>
                                        <Card.Content>
                                            <Paragraph >
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

                {
                    fixtureC != null ?
                        <View>
                            <Text style={{
                                // alignSelf: 'center',
                                fontSize: 18,
                                fontWeight: 'bold',
                                color: '#333'
                            }}>Group C</Text>

                            {fixtureC.map((value, i) => {
                                return (
                                    <Card key={i} style={{ alignItems: 'center' }}>
                                        <Card.Content>
                                            <Paragraph>
                                                {value.homeTeam} vs {value.awayTeam}
                                            </Paragraph>
                                        </Card.Content>
                                    </Card>
                                )
                            })}
                        </View>
                        : null
                }
                {
                    fixtureD != null ?
                        <View>
                            <Text style={{
                                // alignSelf: 'center',
                                fontSize: 18,
                                fontWeight: 'bold',
                                color: '#333'
                            }}>Group D</Text>

                            {fixtureD.map((value, i) => {
                                return (
                                    <Card key={i} style={{ alignItems: 'center' }}>
                                        <Card.Content>
                                            <Paragraph >
                                                {value.homeTeam} vs {value.awayTeam}
                                            </Paragraph>
                                        </Card.Content>
                                    </Card>
                                )
                            })}
                        </View>
                        : null
                }
                {
                    fixtureE != null ?
                        <View>
                            <Text style={{
                                // alignSelf: 'center',
                                fontSize: 18,
                                fontWeight: 'bold',
                                color: '#333'
                            }}>Group E</Text>

                            {fixtureE.map((value, i) => {
                                return (
                                    <Card key={i} style={{ alignItems: 'center' }}>
                                        <Card.Content>
                                            <Paragraph >
                                                {value.homeTeam} vs {value.awayTeam}
                                            </Paragraph>
                                        </Card.Content>
                                    </Card>
                                )
                            })}
                        </View>
                        : null
                }
                {
                    fixtureF != null ?
                        <View>
                            <Text style={{
                                // alignSelf: 'center',
                                fontSize: 18,
                                fontWeight: 'bold',
                                color: '#333'
                            }}>Group F</Text>

                            {fixtureF.map((value, i) => {
                                return (
                                    <Card key={i} style={{ alignItems: 'center' }}>
                                        <Card.Content>
                                            <Paragraph >
                                                {value.homeTeam} vs {value.awayTeam}
                                            </Paragraph>
                                        </Card.Content>
                                    </Card>
                                )
                            })}
                        </View>
                        : null
                }
                {
                    fixtureG != null ?
                        <View>
                            <Text style={{
                                // alignSelf: 'center',
                                fontSize: 18,
                                fontWeight: 'bold',
                                color: '#333'
                            }}>Group G</Text>

                            {fixtureG.map((value, i) => {
                                return (
                                    <Card key={i} style={{ alignItems: 'center' }}>
                                        <Card.Content>
                                            <Paragraph>
                                                {value.homeTeam} vs {value.awayTeam}
                                            </Paragraph>
                                        </Card.Content>
                                    </Card>
                                )
                            })}
                        </View>
                        : null
                }
                {
                    fixtureH != null ?
                        <View>
                            <Text style={{
                                // alignSelf: 'center',
                                fontSize: 18,
                                fontWeight: 'bold',
                                color: '#333'
                            }}>Group H</Text>

                            {fixtureH.map((value, i) => {
                                return (
                                    <Card key={i} style={{ alignItems: 'center' }}>
                                        <Card.Content>
                                            <Paragraph>
                                                {value.homeTeam} vs {value.awayTeam}
                                            </Paragraph>
                                        </Card.Content>
                                    </Card>
                                )
                            })}
                        </View>
                        : null
                }

                <Text style={{
                    // alignSelf: 'center',
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: '#333'
                }}>Standings</Text>

                {/* Table A */}
                {tableA != null ?
                    <View style={{ marginBottom: 10 }}>
                        <Text style={{
                            // alignSelf: 'center',
                            fontSize: 18,
                            fontWeight: 'bold',
                            color: '#333'
                        }}>Group A</Text>
                        <DataTable>
                            <DataTable.Header>
                                <DataTable.Title>No.</DataTable.Title>
                                <DataTable.Title style={{flex: 2}}>Team</DataTable.Title>
                                <DataTable.Title numeric>MP</DataTable.Title>
                                <DataTable.Title numeric>W</DataTable.Title>
                                <DataTable.Title numeric>D</DataTable.Title>
                                <DataTable.Title numeric>L</DataTable.Title>
                                <DataTable.Title numeric>Pts</DataTable.Title>
                            </DataTable.Header>

                            {tableA.map((value, i) => {
                                return (
                                    <DataTable.Row key={i}>
                                        <DataTable.Cell>{i + 1}</DataTable.Cell>
                                        <DataTable.Cell style={{flex: 2}}>{value.teamName}</DataTable.Cell>
                                        <DataTable.Cell numeric>{value.matches}</DataTable.Cell>
                                        <DataTable.Cell numeric>{value.win}</DataTable.Cell>
                                        <DataTable.Cell numeric>{value.draw}</DataTable.Cell>
                                        <DataTable.Cell numeric>{value.lost}</DataTable.Cell>
                                        <DataTable.Cell numeric>{value.points}</DataTable.Cell>
                                    </DataTable.Row>
                                )
                            })}
                        </DataTable>
                    </View>
                    : <Text>Currently there is no Standings until all games finised.</Text>
                }

                {/* Table B */}
                {tableB != null ?
                    <View style={{ marginBottom: 10 }}>
                        <Text style={{
                            // alignSelf: 'center',
                            fontSize: 18,
                            fontWeight: 'bold',
                            color: '#333'
                        }}>Group B</Text>
                        <DataTable>
                            <DataTable.Header>
                                <DataTable.Title>No.</DataTable.Title>
                                <DataTable.Title style={{flex: 2}}>Team</DataTable.Title>
                                <DataTable.Title numeric>MP</DataTable.Title>
                                <DataTable.Title numeric>W</DataTable.Title>
                                <DataTable.Title numeric>D</DataTable.Title>
                                <DataTable.Title numeric>L</DataTable.Title>
                                <DataTable.Title numeric>Pts</DataTable.Title>
                            </DataTable.Header>

                            {tableB.map((value, i) => {
                                return (
                                    <DataTable.Row key={i}>
                                        <DataTable.Cell>{i + 1}</DataTable.Cell>
                                        <DataTable.Cell style={{flex: 2}}>{value.teamName}</DataTable.Cell>
                                        <DataTable.Cell numeric>{value.matches}</DataTable.Cell>
                                        <DataTable.Cell numeric>{value.win}</DataTable.Cell>
                                        <DataTable.Cell numeric>{value.draw}</DataTable.Cell>
                                        <DataTable.Cell numeric>{value.lost}</DataTable.Cell>
                                        <DataTable.Cell numeric>{value.points}</DataTable.Cell>
                                    </DataTable.Row>
                                )
                            })}
                        </DataTable>
                    </View>
                    : null
                }

                {/* Table C */}
                {tableC != null ?
                    <View style={{ marginBottom: 10 }}>
                        <Text style={{
                            // alignSelf: 'center',
                            fontSize: 18,
                            fontWeight: 'bold',
                            color: '#333'
                        }}>Group C</Text>
                        <DataTable>
                            <DataTable.Header>
                                <DataTable.Title>No.</DataTable.Title>
                                <DataTable.Title>Team</DataTable.Title>
                                <DataTable.Title numeric>MP</DataTable.Title>
                                <DataTable.Title numeric>W</DataTable.Title>
                                <DataTable.Title numeric>D</DataTable.Title>
                                <DataTable.Title numeric>L</DataTable.Title>
                                <DataTable.Title numeric>Pts</DataTable.Title>
                            </DataTable.Header>

                            {tableC.map((value, i) => {
                                return (
                                    <DataTable.Row key={i}>
                                        <DataTable.Cell>{i + 1}</DataTable.Cell>
                                        <DataTable.Cell>{value.teamName}</DataTable.Cell>
                                        <DataTable.Cell numeric>{value.matches}</DataTable.Cell>
                                        <DataTable.Cell numeric>{value.win}</DataTable.Cell>
                                        <DataTable.Cell numeric>{value.draw}</DataTable.Cell>
                                        <DataTable.Cell numeric>{value.lost}</DataTable.Cell>
                                        <DataTable.Cell numeric>{value.points}</DataTable.Cell>
                                    </DataTable.Row>
                                )
                            })}
                        </DataTable>
                    </View>
                    : null
                }

            </View >
        </ScrollView>
    );
}
