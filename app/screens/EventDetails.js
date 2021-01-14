import React, { useRef, useState, useEffect } from 'react'
import { TextInput, View, Text, StyleSheet, Image, Dimensions, Platform, StatusBar, Alert, TouchableOpacity, TouchableHighlight, Modal } from 'react-native'
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
import { Avatar, Button, Card, Title, Paragraph, Caption } from 'react-native-paper';
import auth from '@react-native-firebase/auth'
import axios from 'axios'
import * as Animatable from 'react-native-animatable'
import TournamentCard from '../components/TournamentCard';

const MIN_HEIGHT = Platform.OS == 'ios' ? 90 : 55
const MAX_HEIGHT = 300

export default function EventDetails({ route, navigation }) {
    const itemData = route.params.itemData
    const currentUser = auth().currentUser.uid;
    const navTitleView = useRef(null)
    const [modalVisible, setModalVisible] = useState(false)
    const [tournaments, setTournaments] = useState(null)
    const [isRegister, setIsRegister] = useState(null)

    useEffect(() => {
        getTournaments()
    }, [])

    const getTournaments = async () => {
        try {
            const res = await axios.get(`/${itemData.eventID}/tournaments`)
            setTournaments(res.data)
            console.log(res.data)
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
                <TriggeringView
                    style={styles.section}
                    onHide={() => navTitleView.current.fadeInUp(200)}
                    onDisplay={() => navTitleView.current.fadeOut(100)}
                >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.title}>Overview</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                            {/* <FontAwesome name='star' size={16} color='#6B46C1' />
                            <Text style={{ marginHorizontal: 2 }}>{itemData.rating}</Text>
                            <Text>({itemData.reviews})</Text> */}
                        </View>
                    </View>
                </TriggeringView>

                <View style={[styles.section, styles.sectionLarge, { justifyContent: 'center' }]}>
                    <Caption style={styles.sectionContent}>{itemData.description}</Caption>
                    <View style={{ flexDirection: 'row' , marginTop:20}}>
                        <View style={{ justifyContent: 'space-between', width: '28%', flexDirection: 'column', fontSize: 16 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Caption style={{ fontSize: 16 }}>Venue</Caption>
                                <Caption style={{ fontSize: 16 }}>:</Caption>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Caption style={{ fontSize: 16 }}>Date</Caption>
                                <Caption style={{ fontSize: 16 }}>:</Caption>
                            </View>
                        </View>

                        <View style={{ marginLeft: 10, width: '100%' }}>
                            <Caption style={{ fontSize: 16, fontWeight: 'bold' }}>{itemData.location}</Caption>
                            <Caption style={{ fontSize: 16, fontWeight: 'bold' }}>{itemData.startDate} - {itemData.endDate}</Caption>
                        </View>
                    </View>
                </View>

                <View style={styles.section}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.title}>Tournaments</Text>
                    </View>
                </View>

                {tournaments ?
                    <View style={[styles.section, styles.sectionLarge, { justifyContent: 'center' }]}>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                            {tournaments && tournaments.map((value, i) => {
                                return (
                                    <TournamentCard
                                        value={value}
                                        key={i}
                                        onPress={() => {
                                            navigation.navigate('TournamentDetailsEvent', { tournament: value, event: itemData })
                                        }} />
                                )
                            })}
                        </View>
                    </View> :
                    <View style={[styles.section, styles.sectionLarge, { justifyContent: 'center' }]}>
                        <Caption style={{ textAlign: 'center', fontSize: 18 }}>Currently not Available</Caption>
                    </View>
                }

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
        minHeight: 150,
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