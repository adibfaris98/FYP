import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DataTable, Card, Title, Paragraph, Button, Dialog, Portal } from 'react-native-paper'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios'

import ModalForm from '../../components/ModalForm'
import FixtureCard from '../../components/FixtureCard';

export default function GroupStage({ route, navigation }) {
    const { tournamentID , hostName } = route.params.tournament
    const newFixture = route.params.res
    const [seeding, setSeeding] = useState([])
    const [fixtureGroup, setFixtureGroup] = useState([])
    const [tables, setTables] = useState([])

    const [submit, setSubmit] = useState(false)

    const [fixtureA, setFixtureA] = useState(null)
    const [fixtureB, setFixtureB] = useState(null)
    const [fixtureC, setFixtureC] = useState(null)
    const [fixtureD, setFixtureD] = useState(null)
    const [fixtureE, setFixtureE] = useState(null)
    const [fixtureF, setFixtureF] = useState(null)
    const [fixtureG, setFixtureG] = useState(null)
    const [fixtureH, setFixtureH] = useState(null)

    const [seedingA, setSeedingA] = useState(null)
    const [seedingB, setSeedingB] = useState(null)
    const [seedingC, setSeedingC] = useState(null)
    const [seedingD, setSeedingD] = useState(null)
    const [seedingE, setSeedingE] = useState(null)
    const [seedingF, setSeedingF] = useState(null)
    const [seedingG, setSeedingG] = useState(null)
    const [seedingH, setSeedingH] = useState(null)

    const [tableA, setTableA] = useState(null)
    const [tableB, setTableB] = useState(null)
    const [tableC, setTableC] = useState(null)
    const [tableD, setTableD] = useState(null)
    const [tableE, setTableE] = useState(null)
    const [tableF, setTableF] = useState(null)
    const [tableG, setTableG] = useState(null)
    const [tableH, setTableH] = useState(null)

    useEffect(() => {
        getSeeding()
        getFixtureGroup()
        getTable()
    }, [submit])


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
            console.log(fixtureA)
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
            setSeeding(data)
        } catch (error) {

        }

    }

    return (
        <ScrollView>
            <View style={{ flex: 1 , padding:5}}>
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
                                return <FixtureCard key={i} fixture={value} tournamentID={tournamentID} setSubmit={setSubmit} submit={submit} tournamentHost={hostName} />
                            })}
                        </View>
                        : <Text>Currently there is no Fixture until draw fixture finised.</Text>
                }

                {
                    fixtureB != null ?
                        <View >
                            <Text style={{
                                // alignSelf: 'center',
                                fontSize: 18,
                                fontWeight: 'bold',
                                color: '#333'
                            }}>Group B</Text>

                            {fixtureB.map((value, i) => {
                                return <FixtureCard key={i} fixture={value} tournamentID={tournamentID} setSubmit={setSubmit} submit={submit} tournamentHost={hostName}/>
                            })}
                        </View>
                        : null
                }

                {
                    fixtureC != null ?
                        <View >
                            <Text style={{
                                // alignSelf: 'center',
                                fontSize: 18,
                                fontWeight: 'bold',
                                color: '#333'
                            }}>Group C</Text>

                            {fixtureC.map((value, i) => {
                                return <FixtureCard key={i} fixture={value} tournamentID={tournamentID} setSubmit={setSubmit} submit={submit} tournamentHost={hostName}/>
                            })}
                        </View>
                        : null
                }
                {
                    fixtureD != null ?
                        <View >
                            <Text style={{
                                // alignSelf: 'center',
                                fontSize: 18,
                                fontWeight: 'bold',
                                color: '#333'
                            }}>Group D</Text>

                            {fixtureD.map((value, i) => {
                                return <FixtureCard key={i} fixture={value} tournamentID={tournamentID} setSubmit={setSubmit} submit={submit} tournamentHost={hostName}/>
                            })}
                        </View>
                        : null
                }
                {
                    fixtureE != null ?
                        <View >
                            <Text style={{
                                // alignSelf: 'center',
                                fontSize: 18,
                                fontWeight: 'bold',
                                color: '#333'
                            }}>Group E</Text>

                            {fixtureE.map((value, i) => {
                                return <FixtureCard key={i} fixture={value} tournamentID={tournamentID} setSubmit={setSubmit} submit={submit} tournamentHost={hostName}/>
                            })}
                        </View>
                        : null
                }
                {
                    fixtureF != null ?
                        <View >
                            <Text style={{
                                // alignSelf: 'center',
                                fontSize: 18,
                                fontWeight: 'bold',
                                color: '#333'
                            }}>Group F</Text>

                            {fixtureF.map((value, i) => {
                                return <FixtureCard key={i} fixture={value} tournamentID={tournamentID} setSubmit={setSubmit} submit={submit} tournamentHost={hostName}/>
                            })}
                        </View>
                        : null
                }
                {
                    fixtureG != null ?
                        <View >
                            <Text style={{
                                // alignSelf: 'center',
                                fontSize: 18,
                                fontWeight: 'bold',
                                color: '#333'
                            }}>Group G</Text>

                            {fixtureG.map((value, i) => {
                                return <FixtureCard key={i} fixture={value} tournamentID={tournamentID} setSubmit={setSubmit} submit={submit} tournamentHost={hostName}/>
                            })}
                        </View>
                        : null
                }
                {
                    fixtureH != null ?
                        <View >
                            <Text style={{
                                // alignSelf: 'center',
                                fontSize: 18,
                                fontWeight: 'bold',
                                color: '#333'
                            }}>Group H</Text>

                            {fixtureH.map((value, i) => {
                                return <FixtureCard key={i} fixture={value} tournamentID={tournamentID} setSubmit={setSubmit} submit={submit} tournamentHost={hostName}/>
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
                                <DataTable.Title style={{ flex: 2 }}>Team</DataTable.Title>
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
                                        <DataTable.Cell style={{ flex: 2 }}>{value.teamName}</DataTable.Cell>
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
                                <DataTable.Title style={{ flex: 2 }}>Team</DataTable.Title>
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
                                        <DataTable.Cell style={{ flex: 2 }}>{value.teamName}</DataTable.Cell>
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
        </ScrollView >
    );
}
