import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { DataTable, Card, Title, Paragraph, Button, Dialog, Portal } from 'react-native-paper'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ModalForm from './ModalForm';

export default function FixtureCard({ fixture, i, tournamentID, setSubmit, submit }) {
    return (
        <Card key={i} style={{ borderWidth: 1, borderColor: "grey", borderRadius: 5, width: "95%", margin: 10 }}>
            <ModalForm fixture={fixture} tournamentID={tournamentID} setSubmit={setSubmit} submit={submit} />
            {fixture.isMatchStart == true && fixture.isFulltime == false ?
                <Paragraph>Live</Paragraph> : null
            }
            <Card.Content style={{ alignItems: 'center' }}>
                <Paragraph>
                    {fixture.homeTeam} vs {fixture.awayTeam}
                </Paragraph>
                <Paragraph>
                    {fixture.homeScore} {fixture.awayScore}
                </Paragraph>
                {fixture.isMatchStart == true && fixture.isFulltime == true ?
                    <Paragraph>Full Time</Paragraph> : null
                }
            </Card.Content>
        </Card>
    )
}
