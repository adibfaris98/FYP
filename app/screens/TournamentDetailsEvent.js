import React, { useRef, useState, useEffect, useContext } from 'react'
import { TextInput, View, Text, StyleSheet, Button, Image, Dimensions, Platform, StatusBar, Alert, TouchableOpacity, TouchableHighlight, Modal } from 'react-native'
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
import { DataTable, Card, Title, Paragraph, Caption } from 'react-native-paper';
import { AuthContext } from '../navigation/AuthProvider'
import auth from '@react-native-firebase/auth'
import axios from 'axios'
import * as Animatable from 'react-native-animatable'
import FixtureCard from '../components/FixtureCard';

const MIN_HEIGHT = Platform.OS == 'ios' ? 90 : 55
const MAX_HEIGHT = 300

export default function TournamentDetailsEvent({ route, navigation }) {
    const { tournament, event } = route.params
    const currentUser = auth().currentUser.uid;
    const { name } = useContext(AuthContext)
    const navTitleView = useRef(null)
    const [modalVisible, setModalVisible] = useState(false)
    const [teamName, setTeamName] = useState(null)
    const [isRegister, setIsRegister] = useState(null)
    const [managerRef, setManagerRef] = useState(tournament.managerRef.some(obj => obj.uid == currentUser))
    const [registerReq, setRegisterReq] = useState()
    const [officialTeam, setOfficialTeam] = useState(null)
    const [submit, setSubmit] = useState(false)

    const [finalStageList_semi, setFinalStageList_semi] = useState(null)
    const [finalStageList_quarter, setFinalStageList_quarter] = useState(null)
    const [finalStageList_round16, setFinalStageList_round16] = useState(null)

    const [fixture_semi, setFixture_semi] = useState()
    const [fixture_3rd, setFixture_3rd] = useState()
    const [fixture_final, setFixture_final] = useState()

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
        // console.log(registerReq)
        getRequestList()
        getTeam()
        getOfficialTeamList()
        getSeeding()
        getFixtureGroup()
        getTable()
        getParticipants()
        getFixtureFinal()
    }, [submit])

    const sendRegisterRequest = () => {
        axios.post(`/${event.eventID}/${tournament.tournamentID}/${tournament.collaborator}/request`, {
            request: {
                eventID: event.eventID,
                managerID: currentUser,
                status: "pending",
                tournamentID: tournament.tournamentID
            },
            requestHost: {
                eventID: event.eventID,
                eventName: event.title,
                managerID: currentUser,
                managerName: name,
                tournamentID: tournament.tournamentID,
                tournamentName: tournament.sportType,
                type: "eventRequest"
            }
        }).then(() => {
            setRegisterReq(true)
            setSubmit(true)
        })
    }

    const getRequestList = async () =>{
        try {
            const res =await axios.get(`/${event.eventID}/${tournament.tournamentID}/tournaments`)
            let data = res.data.requestListMgr
            let isRequest = data.some(obj => obj.managerID == currentUser)
            setRegisterReq(isRequest)
        } catch (error) {
            
        }
    }

    const getTeam = async () => {
        try {
            const res = await axios.get(`/${event.eventID}/${tournament.tournamentID}/${currentUser}/team`)
            if (res.data == false) {
                setIsRegister(false)
            } else {
                setIsRegister(true)
            }
        } catch (error) {

        }
    }

    const submitTeam = async () => {
        try {
            const res = await axios.post(`/${currentUser}/${event.eventID}/${tournament.tournamentID}/registerTeam`,
                {
                    teamName: teamName
                })
        } catch (error) {
            console.log(error)
        }
    }

    const getOfficialTeamList = async () => {
        try {
            const res = await axios.get(`/${event.eventID}/${tournament.tournamentID}/officialTeam`)
            setOfficialTeam(res.data)
            // console.log(res.data.length)
            console.log(res.data)
        } catch (error) {

        }
    }

    const getFixtureGroup = async () => {
        try {
            const response = await axios.get(`/${event.eventID}/${tournament.tournamentID}/grouping/fixtures`)
            const data = response.data
            setFixtureA(data.fixture_A)
            setFixtureB(data.fixture_B)
            setFixtureC(data.fixture_C)
            setFixtureD(data.fixture_D)
            setFixtureE(data.fixture_E)
            setFixtureF(data.fixture_F)
            setFixtureG(data.fixture_G)
            setFixtureH(data.fixture_H)
        } catch (error) {

        }
    }

    const getSeeding = async () => {
        try {
            const response = await axios.get(`/${event.eventID}/${tournament.tournamentID}/seedings`)
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

    const getParticipants = async () => {
        try {
            const res = await axios.get(`/${event.eventID}/${tournament.tournamentID}/final/participant`)
            setFinalStageList_semi(res.data)
        } catch (error) {

        }
    }

    const getFixtureFinal = async () => {
        try {
            const res = await axios.get(`/${event.eventID}/${tournament.tournamentID}/final/fixture`)
            setFixture_semi(res.data.semiFinal)
            setFixture_3rd(res.data.thirdPlace)
            setFixture_final(res.data.final)
        } catch (error) {

        }
    }
    const getTable = async () => {
        try {
            const res = await axios.get(`/${event.eventID}/${tournament.tournamentID}/grouping/tables`)
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
    return (
        <View style={styles.container}>
            <StatusBar barStyle='light-content' />
            {/* Animated Header */}
            <HeaderImageScrollView
                maxHeight={MAX_HEIGHT}
                minHeight={MIN_HEIGHT}
                maxOverlayOpacity={0.6}
                minOverlayOpacity={0.3}
                renderHeader={() => (
                    <Image
                        source={{
                            uri: event.photoURL
                        }}
                        style={styles.image} />
                )}
                renderForeground={() => (
                    <View style={styles.titleContainer}>
                        <Text style={styles.imageTitle}>{event.title}</Text>
                    </View>
                )}
                renderFixedForeground={() => (
                    <Animatable.View style={styles.navTitleView} ref={navTitleView}>
                        <Text style={styles.navTitle}>{event.title}</Text>
                    </Animatable.View>
                )}
            >
                {/* Overview & Description */}
                <TriggeringView
                    style={styles.section}
                    onHide={() => navTitleView.current.fadeInUp(200)}
                    onDisplay={() => navTitleView.current.fadeOut(100)}
                >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.title}>Overview</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                            {/* <FontAwesome name='star' size={16} color='#6B46C1' />
                            <Text style={{ marginHorizontal: 2 }}>{tournament.rating}</Text>
                            <Text>({tournament.reviews})</Text> */}

                            {/* {officialTeam && buttonType()} */}

                            {!registerReq &&
                                <Button
                                    title='Request to register'
                                    color='#6B46C1'
                                    onPress={() => {
                                        // navigation.navigate('TeamRegisterScreen', { itemData: itemData })
                                        sendRegisterRequest()
                                    }}
                                    style={{ marginHorizontal: 2 }}
                                />}

                        </View>
                    </View>
                </TriggeringView>

                <View style={[styles.section, styles.sectionLarge]}>
                    <Caption style={styles.sectionContent}>{event.description}</Caption>

                    <Title>{tournament.sportType}</Title>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ justifyContent: 'space-between', width: '28%', flexDirection: 'column', fontSize: 16 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Caption style={{ fontSize: 16 }}>Venue</Caption>
                                <Caption style={{ fontSize: 16 }}>:</Caption>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Caption style={{ fontSize: 16 }}>No. Of Team</Caption>
                                <Caption style={{ fontSize: 16 }}>:</Caption>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Caption style={{ fontSize: 16 }}>Date</Caption>
                                <Caption style={{ fontSize: 16 }}>:</Caption>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Caption style={{ fontSize: 16 }}>Gender</Caption>
                                <Caption style={{ fontSize: 16 }}>:</Caption>
                            </View>
                        </View>

                        <View style={{ marginLeft: 10, width: '100%' }}>
                            <Caption style={{ fontSize: 16, fontWeight: 'bold' }}>{event.location}</Caption>
                            <Caption style={{ fontSize: 16, fontWeight: 'bold' }}>{tournament.participants}</Caption>
                            <Caption style={{ fontSize: 16, fontWeight: 'bold' }}>{event.startDate} - {event.endDate}</Caption>
                            <Caption style={{ fontSize: 16, fontWeight: 'bold', borderWidth: 1, width: '20%', textAlign: 'center', borderColor: 'green', borderRadius: 5, color: 'green' }}>{tournament.gender}</Caption>
                        </View>
                    </View>
                </View>

                <View style={styles.section}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.title}>Official Team List</Text>
                    </View>
                </View>

                {officialTeam ?
                    (
                        <View>
                            <View style={[styles.section, styles.sectionLarge]}>
                                <DataTable>
                                    <DataTable.Header>
                                        <DataTable.Title style={{ flex: 1 }}>No.</DataTable.Title>
                                        <DataTable.Title style={{ flex: 2 }}>Team Name</DataTable.Title>
                                        <DataTable.Title>Manager Name</DataTable.Title>
                                    </DataTable.Header>
                                    {officialTeam.map((value, i) => {
                                        return (
                                            <DataTable.Row key={i}>
                                                <DataTable.Cell style={{ flex: 1 }}>{i + 1}</DataTable.Cell>
                                                <DataTable.Cell style={{ flex: 2 }}>{value.teamName}</DataTable.Cell>
                                                <DataTable.Cell>{value.managerName}</DataTable.Cell>
                                            </DataTable.Row>
                                        )
                                    })}
                                </DataTable>
                            </View>
                        </View>
                    ) :
                    <View style={[styles.section, styles.sectionLarge, { justifyContent: 'center' }]}>
                        <Caption style={{ textAlign: 'center', fontSize: 18 }}>Currently not Available</Caption>
                    </View>
                }

                <View style={styles.section}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.title}>Group Stage</Text>
                    </View>
                </View>
                {/* Group A */}
                {/* Seedings A */}
                {seedingA && seedingA != null ?
                    <View style={[styles.section]}>
                        <Text style={{
                            // alignSelf: 'center',
                            fontSize: 18,
                            fontWeight: 'bold',
                            color: '#333'
                        }}>Group A</Text>

                        <Text style={{
                            // alignSelf: 'center',
                            fontSize: 16,
                            fontWeight: 'normal',
                            color: '#333'
                        }}>Group Seedings</Text>
                        < DataTable style={{ backgroundColor: "white", borderWidth: 1, borderColor: "grey", borderRadius: 5, width: "95%", margin: 10 }} >
                            <DataTable.Header>
                                <DataTable.Title style={{ alignSelf: 'center' }}>Group A</DataTable.Title>
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
                        {/* Fixture A */}
                        {fixtureA != null ?
                            <View >
                                <Text style={{
                                    // alignSelf: 'center',
                                    fontSize: 16,
                                    fontWeight: 'normal',
                                    color: '#333'
                                }}>Group Fixtures</Text>
                                {fixtureA.map((value, i) => {
                                    return (
                                        <FixtureCard key={i} fixture={value} tournamentID={tournament.tournamentID} />
                                    )
                                })}
                            </View>
                            : null
                        }
                    </View>
                    :
                    <View style={[styles.section, styles.sectionLarge, { justifyContent: 'center' }]}>
                        <Caption style={{ textAlign: 'center', fontSize: 16 }}>For grouping, the game will follow {tournament.gStage} format.</Caption>
                    </View>
                }

                {/* Group B */}
                {/* Seedings B */}
                {seedingB && seedingB != null ?
                    <View style={[styles.section]}>
                        <Text style={{
                            // alignSelf: 'center',
                            fontSize: 18,
                            fontWeight: 'bold',
                            color: '#333'
                        }}>Group B</Text>

                        <Text style={{
                            // alignSelf: 'center',
                            fontSize: 16,
                            fontWeight: 'normal',
                            color: '#333'
                        }}>Group Seedings</Text>
                        < DataTable style={{ backgroundColor: "white", borderWidth: 1, borderColor: "grey", borderRadius: 5, width: "95%", margin: 10 }} >
                            <DataTable.Header>
                                <DataTable.Title style={{ alignSelf: 'center' }}>Group B</DataTable.Title>
                            </DataTable.Header>
                            {seedingB.map((value, i) => {
                                return (
                                    <DataTable.Row key={i}>
                                        <DataTable.Cell style={{ flex: 3 }}>
                                            {value.teamName}
                                        </DataTable.Cell>
                                    </DataTable.Row>
                                )
                            })}
                        </DataTable>
                        {/* Fixture B */}
                        {fixtureB != null ?
                            <View >
                                <Text style={{
                                    // alignSelf: 'center',
                                    fontSize: 16,
                                    fontWeight: 'normal',
                                    color: '#333'
                                }}>Group Fixtures</Text>
                                {fixtureB.map((value, i) => {
                                    return (
                                        <FixtureCard key={i} fixture={value} tournamentID={tournament.tournamentID} />
                                    )
                                })}
                            </View>
                            : null
                        }
                    </View>
                    : null
                }

                {/* Group C */}
                {/* Seedings C */}
                {seedingC && seedingC != null ?
                    <View style={[styles.section]}>
                        <Text style={{
                            // alignSelf: 'center',
                            fontSize: 18,
                            fontWeight: 'bold',
                            color: '#333'
                        }}>Group C</Text>

                        <Text style={{
                            // alignSelf: 'center',
                            fontSize: 16,
                            fontWeight: 'normal',
                            color: '#333'
                        }}>Group Seedings</Text>
                        < DataTable style={{ backgroundColor: "white", borderWidth: 1, borderColor: "grey", borderRadius: 5, width: "95%", margin: 10 }} >
                            <DataTable.Header>
                                <DataTable.Title style={{ alignSelf: 'center' }}>Group C</DataTable.Title>
                            </DataTable.Header>
                            {seedingC.map((value, i) => {
                                return (
                                    <DataTable.Row key={i}>
                                        <DataTable.Cell style={{ flex: 3 }}>
                                            {value.teamName}
                                        </DataTable.Cell>
                                    </DataTable.Row>
                                )
                            })}
                        </DataTable>
                        {/* Fixture C */}
                        {fixtureC != null ?
                            <View >
                                <Text style={{
                                    // alignSelf: 'center',
                                    fontSize: 16,
                                    fontWeight: 'normal',
                                    color: '#333'
                                }}>Group Fixtures</Text>
                                {fixtureC.map((value, i) => {
                                    return (
                                        <FixtureCard key={i} fixture={value} tournamentID={tournament.tournamentID} />
                                    )
                                })}
                            </View>
                            : null
                        }
                    </View>
                    : null
                }

                {tableA ?
                    <View style={[styles.section]}>
                        {/* Table A */}
                        {tableA != null ?
                            <View>
                                <Text style={{
                                    // alignSelf: 'center',
                                    fontSize: 18,
                                    fontWeight: 'bold',
                                    color: '#333'
                                }}>Standings</Text>
                                <View style={[styles.section], { margin: 0, padding: 0 }}>
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
                            </View>
                            : null
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
                    </View>
                    : null}

                <View style={styles.section}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.title}>Final Stage</Text>
                    </View>
                </View>

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
                        :
                        <View style={[styles.section, styles.sectionLarge, { justifyContent: 'center' }]}>
                            <Caption style={{ textAlign: 'center', fontSize: 16 }}>Currently final-stage participants list is empty.
                            Kindly go to the to finalize qualified
                            team in standings. Make sure all the results in the
                group-stage is updated.</Caption>
                        </View>

                    }

                    {fixture_semi && fixture_semi != null ?
                        <View>
                            <Text style={{
                                // alignSelf: 'center',
                                fontSize: 18,
                                fontWeight: 'bold',
                                color: '#333'
                            }}>Tournament Fixtures</Text>
                            <View style={[styles.section]}>
                                <Text style={{
                                    // alignSelf: 'center',
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                    color: '#333'
                                }}>Semi Final</Text>

                                {fixture_semi.map((value, i) => {
                                    return (
                                        <FixtureCard key={i} fixture={value} tournamentID={tournament.tournamentID} />
                                    )
                                })}
                            </View>
                        </View>
                        : null
                    }

                    {fixture_3rd && fixture_3rd != null ?
                        <View style={[styles.section]}>
                            <Text style={{
                                // alignSelf: 'center',
                                fontSize: 16,
                                fontWeight: 'bold',
                                color: '#333'
                            }}>3rd Place</Text>

                            {fixture_3rd.map((value, i) => {
                                return (
                                    <FixtureCard key={i} fixture={value} tournamentID={tournament.tournamentID} />
                                )
                            })}
                        </View>
                        : null
                    }

                    {fixture_final && fixture_final != null ?
                        <View style={[styles.section]}>
                            <Text style={{
                                // alignSelf: 'center',
                                fontSize: 16,
                                fontWeight: 'bold',
                                color: '#333'
                            }}>Final</Text>

                            {fixture_final.map((value, i) => {
                                return (
                                    <FixtureCard key={i} fixture={value} tournamentID={tournament.tournamentID} />
                                )
                            })}
                        </View>
                        : null
                    }
                </View>


                {/* categories  */}
                {/* <View style={styles.section}>
                    <View style={styles.categories}>
                        {tournament.categories.map((category, index) => (
                            <View style={styles.categoryContainer} key={index}>
                                <FontAwesome name='tag' size={16} color='#fff' />
                                <Text style={styles.category}>{category}</Text>
                            </View>
                        ))}
                    </View>
                    
                </View> */}
            </HeaderImageScrollView>

            <View>
                <Modal
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                    }}
                >
                    <View style={styles.view}>
                        <View style={styles.modalView}>
                            <Text style={styles.title}>Team Information</Text>
                            <TextInput
                                value={teamName}
                                onChangeText={(teamName) => setTeamName(teamName)}
                                placeholder="Team Name"
                                placeholderTextColor="#666666"
                                autoCorrect={false}
                            />
                            <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                                <TouchableOpacity
                                    style={{ ...styles.openButton, backgroundColor: "green" }}
                                    onPress={() => {
                                        if (teamName == null) {
                                            alert("Team Name is Empty")
                                        } else {
                                            submitTeam()
                                            setModalVisible(!modalVisible);
                                            navigation.navigate('TeamRegisterScreen', { tournament: tournament, teamName: teamName })
                                        }
                                    }}
                                >
                                    <Text style={styles.textStyle}>SAVE</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{ ...styles.openButton, backgroundColor: "red" }}
                                    onPress={() => {
                                        setModalVisible(!modalVisible);
                                        // navigation.navigate('TeamRegisterScreen', { tournament: tournament, teamName: teamName })
                                    }}
                                >
                                    <Text style={styles.textStyle}>CANCEL</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        height: MAX_HEIGHT,
        width: Dimensions.get('window').width,
        alignSelf: 'stretch',
        resizeMode: 'cover',
    },
    title: {
        fontSize: 20,
    },
    name: {
        fontWeight: 'bold',
    },
    section: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
        backgroundColor: 'white',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    sectionContent: {
        fontSize: 16,
        textAlign: 'justify',
    },
    categories: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
    },
    categoryContainer: {
        flexDirection: 'row',
        backgroundColor: '#6B46C1',
        borderRadius: 20,
        margin: 10,
        padding: 10,
        paddingHorizontal: 15,
    },
    category: {
        fontSize: 14,
        color: '#fff',
        marginLeft: 10,
    },
    titleContainer: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageTitle: {
        color: 'white',
        backgroundColor: 'transparent',
        fontSize: 24,
    },
    navTitleView: {
        height: MIN_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: Platform.OS === 'ios' ? 40 : 5,
        opacity: 0,
    },
    navTitle: {
        color: 'white',
        fontSize: 18,
        backgroundColor: 'transparent',
    },
    sectionLarge: {
        minHeight: 200,
    },
    view: {
        backgroundColor: "rgba(0,0,0,0.5)",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {
        backgroundColor: "#115454",
        borderRadius: 5,
        padding: 15,
        elevation: 2
    },
    textStyle: {
        color: "white",
        textAlign: "center",
    },
    modalText: {
        marginBottom: 15,
    }
});