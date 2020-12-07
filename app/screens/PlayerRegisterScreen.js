import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Button, TouchableOpacity, ImageBackground, TextInput, Picker, ScrollView } from 'react-native'
import { Avatar } from 'react-native-paper'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import Foundation from 'react-native-vector-icons/Foundation'
import AntDesign from 'react-native-vector-icons/AntDesign'
import BottomSheet from 'reanimated-bottom-sheet'
import Animated from 'react-native-reanimated'
import ImagePicker from 'react-native-image-crop-picker';
import RNPickerSelect from 'react-native-picker-select';
import TeamForm from './TeamRegisterScreen';
import PlayerForm from '../components/PlayerForm';
import axios from 'axios'
import auth from '@react-native-firebase/auth'

export default function PlayerRegisterScreen({ route, navigation }) {
    const currentUser =auth().currentUser.uid
    const {tournamentID} = route.params
    const [image, setImage] = useState('https://api.adorable.io/avatars/50/abott@adorable.png')
    const [numPlayers, setNumPlayers] = useState(null)

    const [name, setName] = useState(null)
    const [icNo, setIcNo] = useState(null)
    const [athleteNo, setAthleteNo] = useState(null)
    const [matricNo, setMatricNo] = useState(null)
    const [gender, setGender] = useState(null)
    const [phoneNo, setPhoneNo] = useState(null)
    const [address, setAddress] = useState(null)

    useEffect(() => {
        getFormat()
    }, [])

    async function getFormat() {
        try {
            const response = await axios.get(`/tournament/format/${tournamentID}`);
            const { numPlayers } = response.data
            setNumPlayers(numPlayers)
            console.log(numPlayers);
        } catch (error) {
            console.error(error);
        }
    }

    const submitPlayer = async () => {
        try {
            const res = await axios.post('/player',
                {
                    tournamentID: tournamentID,
                    teamID: currentUser,
                    playerDetails: {
                        address : address,
                        gender : gender,
                        identificationID : icNo,
                        name: name,
                        numAthelete: athleteNo,
                        numMatric: matricNo,
                        passportPhoto: image,
                        phoneNumber: phoneNo
                    }
                })
            console.log(res + "submit team")
        } catch (error) {
            console.log(error)
        }
    }

    const takePhotoFromCamera = () => {
        ImagePicker.openCamera({
            compressImageMaxWidth: 300,
            compressImageMaxHeight: 300,
            cropping: true,
            compressImageQuality: 0.7
        }).then(image => {
            console.log(image);
            setImage(image.path)
            bs.current.snapTo(1)
        });
    }

    const choosePhotoFromLibrary = () => {
        ImagePicker.openPicker({
            compressImageMaxWidth: 300,
            compressImageMaxHeight: 300,
            cropping: true,
            compressImageQuality: 0.7
        }).then(image => {
            console.log(image);
            setImage(image.path)
            bs.current.snapTo(1)
        });
    }

    const renderInner = () => (
        <View style={styles.panel}>
            <View style={{ alignItems: 'center' }}>
                <Text style={styles.panelTitle}>Upload Photo</Text>
                <Text style={styles.panelSubtitle}>Choose your profile picture</Text>
            </View>
            <TouchableOpacity style={styles.panelButton} onPress={takePhotoFromCamera}>
                <Text style={styles.panelButtonTitle}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.panelButton} onPress={choosePhotoFromLibrary}>
                <Text style={styles.panelButtonTitle}>Choose From Library</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.panelButton} onPress={() => bs.current.snapTo(1)}>
                <Text style={styles.panelButtonTitle}>Cancel</Text>
            </TouchableOpacity>
        </View>
    );

    const renderHeader = () => (
        <View style={styles.header}>
            <View style={styles.panelHeader}>
                <View style={styles.panelHandle}></View>
            </View>
        </View>
    );

    bs = React.createRef()
    fall = new Animated.Value(1)

    return (
        <View style={styles.container}>
            <BottomSheet
                ref={bs}
                snapPoints={[330, 0]}
                renderContent={renderInner}
                renderHeader={renderHeader}
                initialSnap={1}
                callbackNode={fall}
                enabledGestureInteraction={true}
            />

            <ScrollView>
            <Animated.View style={{ margin: 20, opacity: Animated.add(0.3, Animated.multiply(fall, 1.0)) }}>
                <View style={{ alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#cccccc', }}>
                    <TouchableOpacity onPress={() => bs.current.snapTo(0)}>
                        <View style={{
                            height: 100,
                            width: 100,
                            borderRadius: 15,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <ImageBackground
                                source={{
                                    uri: image,
                                }}
                                style={{ height: 100, width: 100 }}
                                imageStyle={{ borderRadius: 15 }}
                            >
                                <View style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <Icon
                                        name="camera"
                                        size={35}
                                        color="#fff"
                                        style={{
                                            opacity: 0.7,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderWidth: 1,
                                            borderColor: '#fff',
                                            borderRadius: 10
                                        }}
                                    />

                                </View>

                            </ImageBackground>

                        </View>
                    </TouchableOpacity>
                    <Text style={{ marginTop: 10, fontSize: 18, fontWeight: 'bold' }}>Player Details</Text>

                    <View style={styles.action}>
                        <FontAwesome name="user-o" size={20} />
                        <TextInput
                            value={name}
                            onChangeText={(name) => setName(name)}
                            placeholder="Player Name"
                            placeholderTextColor="#666666"
                            autoCorrect={false}
                            style={styles.textInput}
                        />
                    </View>

                    <View style={styles.action}>
                        <AntDesign name="idcard" size={20} />
                        <TextInput
                            value={icNo}
                            onChangeText={(name) => setIcNo(name)}
                            placeholder="Identification ID"
                            placeholderTextColor="#666666"
                            autoCorrect={false}
                            style={styles.textInput}
                        />
                    </View>

                    <View style={styles.action}>
                        <FontAwesome name="user-o" size={20} />
                        <TextInput
                            value={athleteNo}
                            onChangeText={(athleteNo) => setAthleteNo(athleteNo)}
                            placeholder="Athlete Number"
                            placeholderTextColor="#666666"
                            autoCorrect={false}
                            style={styles.textInput}
                        />
                    </View>

                    <View style={styles.action}>
                        <FontAwesome name="user-o" size={20} />
                        <TextInput
                            value={matricNo}
                            onChangeText={(matricNo) => setMatricNo(matricNo)}
                            placeholder="Matric Number"
                            placeholderTextColor="#666666"
                            autoCorrect={false}
                            style={styles.textInput}
                        />
                    </View>

                    <View style={styles.action}>
                        <Feather name="phone" size={20} />
                        <TextInput
                            value={phoneNo}
                            onChangeText={(phoneNo) => setPhoneNo(phoneNo)}
                            placeholder="Phone Number"
                            placeholderTextColor="#666666"
                            autoCorrect={false}
                            style={styles.textInput}
                        />
                    </View>

                    <View style={styles.action}>
                        <FontAwesome name="globe" size={20} />
                        <TextInput
                            value={address}
                            placeholder="Address"
                            onChangeText={(address) => setAddress(address)}
                            placeholderTextColor="#666666"
                            autoCorrect={false}
                            style={styles.textInput}
                        />
                    </View>

                    <RNPickerSelect
                        value={gender}
                        onValueChange={(gender) => setGender(gender)}
                        items={[
                            { label: 'Male', value: 'male' },
                            { label: 'Female', value: 'female' }
                        ]}
                        placeholder={{ label: "Select your gender ...", value: "null" }}
                    />
                </View>
            </Animated.View>
                <TouchableOpacity style={styles.commandButton} onPress={() => { 
                    submitPlayer()
                    navigation.navigate('CardItemDetails') 
                    }}>
                    <Text style={styles.panelButtonTitle}>Next</Text>
                </TouchableOpacity>
            </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    commandButton: {
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#9F7AEA',
        alignItems: 'center',
        marginTop: 10,
        borderColor: '#1A202C',
        borderWidth: 1
    },
    panel: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        paddingTop: 20,
        // borderTopLeftRadius: 20,
        // borderTopRightRadius: 20,
        // shadowColor: '#000000',
        // shadowOffset: {width: 0, height: 0},
        // shadowRadius: 5,
        // shadowOpacity: 0.4,
    },
    header: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#333333',
        shadowOffset: { width: -1, height: -3 },
        shadowRadius: 2,
        shadowOpacity: 0.4,
        // elevation: 5,
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    panelHeader: {
        alignItems: 'center',
    },
    panelHandle: {
        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#00000040',
        marginBottom: 10,
    },
    panelTitle: {
        fontSize: 27,
        height: 35,
    },
    panelSubtitle: {
        fontSize: 14,
        color: 'gray',
        height: 30,
        marginBottom: 10,
    },
    panelButton: {
        padding: 13,
        borderRadius: 10,
        backgroundColor: '#fff',
        alignItems: 'center',
        marginVertical: 7,
        borderWidth: 1,
        borderColor: '#1A202C'

    },
    panelButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#1A202C',
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5,
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5,
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    section: {
        // padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
        backgroundColor: 'white',
    },
    title: {
        fontSize: 20,
    },
    section: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
        backgroundColor: 'white',
    },
});