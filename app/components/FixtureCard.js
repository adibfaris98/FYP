import auth from '@react-native-firebase/auth'
import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { DataTable, Card, Title, Paragraph, Button, Dialog, Portal } from 'react-native-paper'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ModalForm from './ModalForm';
import ModalFormEditFixture from './ModalFormEditFixture';

export default function FixtureCard({ fixture, i, tournamentID, setSubmit, submit, eventID, tournamentHost }) {
    const currentUser = auth().currentUser.uid
    const [isMatchStart, setIsMatchStart] = useState(fixture.isMatchStart)
    const [isFulltime, setIsFullTime] = useState(fixture.isFulltime)
    return (
        <Card key={i} style={{ borderWidth: 1, borderColor: "grey", borderRadius: 5, width: "95%", margin: 10, paddingTop: 15 }}>

            {currentUser == tournamentHost ?
                !isMatchStart ?
                    <Button
                        style={{ flexDirection: "row", alignSelf: 'center' }}
                        onPress={() => { setIsMatchStart(true) }}>
                        Start Match
                </Button>
                    : fixture.isFulltime == false ?
                        !eventID ? <ModalForm fixture={fixture} tournamentID={tournamentID} setSubmit={setSubmit} submit={submit} isMatchStart={isMatchStart} isFulltime={isFulltime} setIsFullTime={setIsFullTime} />
                            : <ModalFormEditFixture fixture={fixture} tournamentID={tournamentID} setSubmit={setSubmit} submit={submit} isMatchStart={isMatchStart} isFulltime={isFulltime} setIsFullTime={setIsFullTime} eventID={eventID} />
                        : null
                : null

            }

            <Card.Content style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <View style={{
                    alignItems: 'center'
                }}>
                    <Text style={{
                        textAlign: 'center',
                        fontSize: 16,
                        fontWeight: 'bold',
                        padding: 5
                    }}>{fixture.homeTeam}</Text>
                    <Text
                        style={{
                            textAlign: 'center',
                            alignSelf: 'center',
                            fontSize: 30,
                            fontWeight: 'bold',
                            padding: 5,
                        }}
                    >{fixture.homeScore} </Text>
                </View>

                <View style={{ alignSelf: 'center' }}>
                    <Paragraph style={{
                        alignSelf: 'center',
                        fontSize: 18,
                        fontWeight: 'bold',
                        color: '#333'
                    }}>vs</Paragraph>
                    {fixture.isMatchStart == true && fixture.isFulltime == true ?
                        <Paragraph style={{
                            alignSelf: 'center',
                            color: 'green'
                        }}>Full Time</Paragraph> : null
                    }
                    {fixture.isMatchStart == true && fixture.isFulltime == false ?
                        <Paragraph style={{
                            alignSelf: 'center',
                            color: 'green'
                        }}>Live</Paragraph> : null
                    }

                    {fixture.isMatchStart == false && fixture.isFulltime == false ?
                        <Paragraph style={{
                            alignSelf: 'center',
                            color: 'orange'
                        }}>Not Started</Paragraph> : null
                    }
                </View>

                <View style={{
                    alignItems: 'center',
                }}>
                    <Text style={{
                        textAlign: 'center',
                        fontSize: 16,
                        fontWeight: 'bold',
                        padding: 5
                    }}>{fixture.awayTeam}</Text>
                    <Text
                        style={{
                            textAlign: 'center',
                            alignSelf: 'center',
                            fontSize: 30,
                            fontWeight: 'bold',
                            padding: 5
                        }}
                    >{fixture.awayScore} </Text>
                </View>
            </Card.Content>
        </Card>
    )
}
