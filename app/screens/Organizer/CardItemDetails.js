import React, { useEffect, useRef, useState } from 'react'
import { TextInput, View, Text, StyleSheet, Button, Image, Dimensions, Platform, StatusBar, Alert, TouchableOpacity, TouchableHighlight, Modal } from 'react-native'
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
import auth from '@react-native-firebase/auth'
import axios from 'axios'
import * as Animatable from 'react-native-animatable'
import { DataTable, Card, Title, Paragraph } from 'react-native-paper';

const MIN_HEIGHT = Platform.OS == 'ios' ? 90 : 55
const MAX_HEIGHT = 300

export default function CardItemDetails({ route, navigation }) {
    const itemData = route.params.itemData
    const currentUser = auth().currentUser.uid;
    const navTitleView = useRef(null)
    const [officialTeam, setOfficialTeam] = useState(null)

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

    useEffect(() => {
        getOfficialTeamList()
        getSeeding()
        getFixtureGroup()
    }, [])

    const getOfficialTeamList = async () => {
        try {
            const res = await axios.get(`/organizer/${itemData.tournamentID}/officialTeam`)
            setOfficialTeam(res.data)
        } catch (error) {

        }
    }

    const getFixtureGroup = async () => {
        try {
            const response = await axios.get(`/${itemData.tournamentID}/grouping/fixture`)
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
            const response = await axios.get(`/${itemData.tournamentID}/seedings`)
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
                            uri: itemData.photoURL
                        }}
                        style={styles.image} />
                )}
                renderForeground={() => (
                    <View style={styles.titleContainer}>
                        <Text style={styles.imageTitle}>{itemData.title}</Text>
                    </View>
                )}
                renderFixedForeground={() => (
                    <Animatable.View style={styles.navTitleView} ref={navTitleView}>
                        <Text style={styles.navTitle}>{itemData.title}</Text>
                    </Animatable.View>
                )}
            >
                {/* Overview & Description */}
                <TriggeringView style={styles.section}
                    onHide={() => navTitleView.current.fadeInUp(200)}
                    onDisplay={() => navTitleView.current.fadeOut(100)}
                >

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.title}>Overview</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                            {/* <FontAwesome name='star' size={16} color='#6B46C1' />
                            <Text style={{ marginHorizontal: 2 }}>{itemData.rating}</Text>
                            <Text>({itemData.reviews})</Text> */}
                            <Button
                                title='Manage Tournament'
                                color='#6B46C1'
                                onPress={() => {
                                    navigation.navigate('TournamentTab', { tournament: itemData })
                                    // setModalVisible(true)
                                    // console.log(itemData)
                                }}
                                style={{ marginHorizontal: 2 }} />
                        </View>
                    </View>
                </TriggeringView>
                <View style={[styles.section, styles.sectionLarge]}>
                    <Text style={styles.sectionContent}>{itemData.description}</Text>
                    <Text style={styles.sectionContent}>Sport Type : {itemData.sportType}</Text>
                    <Text style={styles.sectionContent}>Venue : {itemData.location}</Text>
                    <Text style={styles.sectionContent}>Number Of Team : {itemData.participants}</Text>
                    <Text style={styles.sectionContent}>Date : {itemData.startDate} to {itemData.endDate}</Text>
                    <Text style={styles.sectionContent}>Gender : {itemData.gender}</Text>
                </View>

                {officialTeam && officialTeam != null ?
                    (
                        <View>
                            <View style={styles.section}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={styles.title}>Official Team List</Text>
                                </View>
                            </View>

                            <View style={[styles.section]}>
                                <DataTable>
                                    <DataTable.Header>
                                        <DataTable.Title>No.</DataTable.Title>
                                        <DataTable.Title>Team Name</DataTable.Title>
                                        <DataTable.Title>Manager Name</DataTable.Title>
                                    </DataTable.Header>
                                    {officialTeam.map((value, i) => {
                                        return (
                                            <DataTable.Row key={i}>
                                                <DataTable.Cell>{i + 1}</DataTable.Cell>
                                                <DataTable.Cell>{value.teamName}</DataTable.Cell>
                                                <DataTable.Cell>{value.managerName}</DataTable.Cell>
                                            </DataTable.Row>
                                        )
                                    })}
                                </DataTable>
                            </View>
                        </View>
                    ) : null
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
                                        <Card style={{ alignItems: 'center', borderWidth: 1, borderColor: "grey", borderRadius: 5, width: "95%", margin: 10 }}>
                                            <Card.Content key={i}>
                                                <Paragraph style={{ textAlign: "center" }}>
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
                    : <Text style={styles.sectionContent}>For grouping, the game will follow {itemData.gStage} format with.</Text>
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
                                        <Card style={{ alignItems: 'center', borderWidth: 1, borderColor: "grey", borderRadius: 5, width: "95%", margin: 10 }}>
                                            <Card.Content key={i}>
                                                <Paragraph style={{ textAlign: "center" }}>
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
                                        <Card style={{ alignItems: 'center', borderWidth: 1, borderColor: "grey", borderRadius: 5, width: "95%", margin: 10 }}>
                                            <Card.Content key={i}>
                                                <Paragraph style={{ textAlign: "center" }}>
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
                    : null
                }
        
                <View style={styles.section}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.title}>Final Stage</Text>
                    </View>
                </View>
                <View style={[styles.section, { height: 250 }]}>

                </View>

                {/* categories  */}
                {/* <View style={styles.section}>
                    <View style={styles.categories}>
                        {itemData.categories.map((category, index) => (
                            <View style={styles.categoryContainer} key={index}>
                                <FontAwesome name='tag' size={16} color='#fff' />
                                <Text style={styles.category}>{category}</Text>
                            </View>
                        ))}
                    </View>
                    
                </View> */}
            </HeaderImageScrollView>
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