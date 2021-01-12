import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Alert, Modal, StyleSheet, Text, TouchableHighlight, View, TouchableOpacity } from 'react-native'
import { Button, Paragraph, Dialog, Portal, TextInput } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ModalFormEditFixture({ fixture, navigation, tournamentID, setSubmit, submit, isMatchStart, setIsFullTime , eventID}) {
    const [visible, setVisible] = useState(false);
    const [awayScore, setAwayScore] = useState(fixture.awayScore);
    const [homeScore, setHomeScore] = useState(fixture.homeScore);

    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);

    useEffect(()=>{
        console.log("edit fixture" , eventID)
    })

    const submitUpdate = async () => {
        try {
            const newFixture = { ...fixture, awayScore, homeScore, isFulltime: false, isMatchStart }
            switch (fixture.fixtureID) {
                case 'fixture_A':
                    await axios.put(`/${eventID}/${tournamentID}/updateMatchScoreA`, newFixture)
                    setSubmit(!submit)
                    break
                case 'fixture_B':
                    await axios.put(`/${eventID}/${tournamentID}/updateMatchScoreB`, newFixture)
                    setSubmit(!submit)
                    break
                case 'fixture_C':
                    await axios.put(`/${eventID}/${tournamentID}/updateMatchScoreC`, newFixture)
                    setSubmit(!submit)
                    break
                case 'fixture_D':
                    await axios.put(`/${eventID}/${tournamentID}/updateMatchScoreD`, newFixture)
                    setSubmit(!submit)
                    break
                case 'final':
                    await axios.put(`/${eventID}/${tournamentID}/updateMatchScoreFinal`, newFixture)
                    setSubmit(!submit)
                    break
                case '3rdPlace':
                    await axios.put(`/${eventID}/${tournamentID}/updateMatchScoreThird`, newFixture)
                    setSubmit(!submit)
                    break
                case 'semiFinal1':
                case 'semiFinal2':
                    await axios.put(`/${eventID}/${tournamentID}/updateMatchScoreSemiFinal`, newFixture)
                    setSubmit(!submit)
                    break
            }

        } catch (error) {

        }
    }

    const finisedMatch = async () => {
        try {
            const newFixture = { ...fixture, awayScore, homeScore, isFulltime: true, isMatchStart}
            switch (fixture.fixtureID) {
                case 'fixture_A':
                    await axios.put(`/${eventID}/${tournamentID}/finishedMatchA`, newFixture)
                    setSubmit(!submit)
                    break
                case 'fixture_B':
                    await axios.put(`/${eventID}/${tournamentID}/finishedMatchB`, newFixture)
                    setSubmit(!submit)
                    break
                case 'fixture_C':
                    await axios.put(`/${eventID}/${tournamentID}/finishedMatchC`, newFixture)
                    setSubmit(!submit)
                    break
                case 'fixture_D':
                    await axios.put(`/${eventID}/${tournamentID}/finishedMatchD`, newFixture)
                    setSubmit(!submit)
                    break
                case 'final':
                    await axios.put(`/${eventID}/${tournamentID}/updateMatchScoreFinal`, newFixture)
                    setSubmit(!submit)
                    break
                case '3rdPlace':
                    await axios.put(`/${eventID}/${tournamentID}/updateMatchScoreThird`, newFixture)
                    setSubmit(!submit)
                    break
                case 'semiFinal1':
                case 'semiFinal2':
                    await axios.put(`/${eventID}/${tournamentID}/updateMatchScoreSemiFinal`, newFixture)
                    setSubmit(!submit)
                    break
            }

        } catch (error) {

        }
    }

    const handleScoreChange = (text, type) => {
        if (type == "away") {
            setAwayScore(text)
        }
        if (type == "home") {
            setHomeScore(text)
        }
    }

    return (
        <View>
            <TouchableOpacity onPress={showDialog}>
                <View style={{ alignItems: 'flex-end' }}>
                    <MaterialCommunityIcons
                        name="square-edit-outline"
                        size={35}
                        color="#6B46C1" />
                </View>
            </TouchableOpacity>
            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog} style={{ padding: 10 }}>
                    <Dialog.Title style={{ alignSelf: 'center' }}>Update Result</Dialog.Title>
                    <Dialog.Content style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                        <View style={{ alignSelf: 'center' }}>
                            <Paragraph style={{ fontSize: 16, fontWeight: 'bold' }}>{fixture.homeTeam}</Paragraph>
                            <TextInput
                                value={String(homeScore)}
                                onChangeText={(text) => handleScoreChange(text, "home")}
                                style={{
                                    alignSelf: 'center',
                                    fontSize: 35,
                                    marginTop: 5,
                                    fontWeight: 'bold',
                                    width: 50
                                }}
                            />
                        </View>

                        <View style={{ alignSelf: 'center' }}>
                            <Paragraph style={{
                                alignSelf: 'center',
                                fontSize: 18,
                                fontWeight: 'bold',
                                color: '#333'
                            }}>vs</Paragraph>
                        </View>

                        <View style={{ alignSelf: 'center' }}>
                            <Paragraph style={{ fontSize: 16, fontWeight: 'bold' }}>{fixture.awayTeam}</Paragraph>
                            <TextInput
                                value={String(awayScore)}
                                onChangeText={(text) => handleScoreChange(text, "away")}
                                style={{
                                    alignSelf: 'center',
                                    fontSize: 35,
                                    marginTop: 5,
                                    fontWeight: 'bold',
                                    width: 50
                                }}
                            />
                        </View>

                    </Dialog.Content>

                    <Button mode="contained" onPress={() => {
                        hideDialog()
                        setIsFullTime(true)
                        finisedMatch()
                    }}>Match Finished</Button>
                    <Dialog.Actions>
                        <Button onPress={() => {
                            hideDialog()
                            submitUpdate()
                        }}>Update</Button>
                        <Button onPress={hideDialog}>Cancel</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    )
}
