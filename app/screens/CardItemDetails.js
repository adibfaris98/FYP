import React, { useRef, useState } from 'react'
import { TextInput, View, Text, StyleSheet, Button, Image, Dimensions, Platform, StatusBar, Alert, TouchableOpacity, TouchableHighlight, Modal } from 'react-native'
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
import { useForm, Controller } from "react-hook-form";
import auth from '@react-native-firebase/auth'
import axios from 'axios'
import * as Animatable from 'react-native-animatable'

const MIN_HEIGHT = Platform.OS == 'ios' ? 90 : 55
const MAX_HEIGHT = 300

export default function CardItemDetails({ route, navigation }) {
    const itemData = route.params.itemData
    const currentUser = auth().currentUser.uid;
    const navTitleView = useRef(null)
    const [modalVisible, setModalVisible] = useState(false)
    const [teamName, setTeamName] = useState(null)

    const submitTeam = async () => {
        try {
            const res = await axios.post('/team',
                {
                    tournamentID: itemData.tournamentID,
                    teamName: teamName,
                    uid: currentUser
                })
            console.log(res + "submit team")
        } catch (error) {
            console.log(error)
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
                                title='Register here'
                                color='#6B46C1'
                                onPress={() => {
                                    // navigation.navigate('TeamRegisterScreen', { itemData: itemData })
                                    setModalVisible(true)
                                    console.log(itemData)
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

                <View style={styles.section}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.title}>Participants</Text>
                    </View>
                </View>
                <View style={[styles.section, styles.sectionLarge]}>

                </View>

                <View style={styles.section}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.title}>Final Stage</Text>
                    </View>
                </View>
                <View style={[styles.section, { height: 250 }]}>

                </View>

                <View style={styles.section}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.title}>Group Stage</Text>
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
                                        submitTeam()
                                        setModalVisible(!modalVisible);
                                        navigation.navigate('TeamRegisterScreen', { itemData: itemData, teamName: teamName })
                                    }}
                                >
                                    <Text style={styles.textStyle}>SAVE</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{ ...styles.openButton, backgroundColor: "red" }}
                                    onPress={() => {
                                        setModalVisible(!modalVisible);
                                        // navigation.navigate('TeamRegisterScreen', { itemData: itemData, teamName: teamName })
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