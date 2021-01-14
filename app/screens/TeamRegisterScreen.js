import React, { useState, useEffect, createContext } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Picker, ScrollView, Modal, SafeAreaView } from 'react-native'
import { Button, Paragraph, Dialog, TextInput, Portal, DataTable } from 'react-native-paper'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import Foundation from 'react-native-vector-icons/Foundation'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import BottomSheet from 'reanimated-bottom-sheet'
import Animated from 'react-native-reanimated'
import ImagePicker from 'react-native-image-crop-picker';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios'
import auth from '@react-native-firebase/auth'
import PlayerList from './Organizer/PlayerList';

export default function TeamRegisterScreen({ route, navigation }) {
    const currentUser = auth().currentUser.uid;
    const { tournamentID, participants } = route.params.itemData
    let i = 1;


    const [listPlayers, setListPlayers] = useState([])
    const [teamName, setTeamName] = useState(null)

    const [passportPhoto, setPassportPhoto] = useState(null)
    const [name, setName] = useState(null)
    const [numMatric, setNumMatric] = useState(null)
    const [identificationID, setIdentificationID] = useState(null)
    const [address, setAddress] = useState(null)
    const [numAthelete, setNumAthelete] = useState(null)
    const [phoneNumber, setPhoneNum] = useState(null)
    const [gender, setGender] = useState(null)
    const [format, setFormat] = useState(null)
    const [submit, setSubmit] = useState(false)
    const [remove, setRemove] = useState(false)

    const [visible, setVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false)

    const showDialog = () => setVisible(true);

    const hideDialog = () => setVisible(false);

    const showDialog2 = () => setModalVisible(true);

    const hideDialog2 = () => setModalVisible(false);

    const submitPlayer = () => {
        setSubmit(submit => !submit)
    }

    useEffect(() => {
        getTeam()
        getFormat()
    }, [submit, remove])

    const getTeam = async () => {
        try {
            const response = await axios.get(`/${tournamentID}/${currentUser}/team`)
            setTeamName(response.data.teamName)
            setListPlayers(response.data.listPlayers)
        } catch (error) {
            console.error(error)
        }
    }

    const addPlayer = async () => {
        try {
            const response = await axios.post(`/${tournamentID}/${currentUser}/player`,
                {
                    playerDetails: {
                        address,
                        gender,
                        identificationID,
                        name,
                        numAthelete,
                        numMatric,
                        passportPhoto,
                        phoneNumber
                    }
                })
            submitPlayer()
        } catch (error) {

        }
    }

    const getFormat = async () => {
        try {
            const response = await axios.get(`/${tournamentID}/format`)
            // const { teamName, listPlayers } = response.data
            setFormat(response.data)
            console.log(response.data)
        } catch (error) {
            console.error(error)
        }
    }

    const editTeam = async () => {
        try {
            const res = await axios.put(`/team/${tournamentID}/${currentUser}`, { teamName: teamName })
        } catch (error) {
            alert(error)
        }
    }

    const takePhotoFromCamera = () => {
        ImagePicker.openCamera({
            compressImageMaxWidth: 300,
            compressImageMaxHeight: 300,
            cropping: true,
            compressImageQuality: 0.7
        }).then(image => {
            // console.log(image);
            setPassportPhoto(image.path)
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
            // console.log(image);
            setPassportPhoto(image.path)
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

    const bs = React.createRef()
    const fall = new Animated.Value(1)
    return (

        <View style={styles.container}>

            <Text style={styles.title}>Team Information</Text>

            <View style={styles.action}>
                <Text > Team Name : {teamName}</Text>
                <TouchableOpacity onPress={() => {
                    showDialog()
                }}>
                    <Icon name="square-edit-outline" size={30} color="#333" />
                </TouchableOpacity>
            </View>


            <Portal>
                <BottomSheet
                    ref={bs}
                    snapPoints={[330, 0]}
                    renderContent={renderInner}
                    renderHeader={renderHeader}
                    initialSnap={1}
                    callbackNode={fall}
                    enabledGestureInteraction={true}
                />
                {/* Team Dialog */}
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Title>Edit Team</Dialog.Title>
                    <Dialog.Content>
                        <TextInput
                            mode='outlined'
                            label="Team Name"
                            value={teamName}
                            onChangeText={text => setTeamName(text)}
                        />
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => {
                            if (teamName == "") {
                                alert('Field cannot be empty')
                            } else {
                                editTeam()
                                hideDialog()
                            }
                        }}>Done</Button>
                        <Button onPress={hideDialog}>Cancel</Button>
                    </Dialog.Actions>
                </Dialog>

                {/* Player Dialog */}
                <Dialog visible={modalVisible} onDismiss={hideDialog2}>
                    <Dialog.Title>Player Information</Dialog.Title>
                    <Dialog.Content>
                        {format && format.passportPhoto == true ?
                            <View>
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
                                                uri: passportPhoto,
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
                                                    color="#666666"
                                                    style={{
                                                        opacity: 0.7,
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        borderWidth: 1,
                                                        borderColor: '#666666',
                                                        borderRadius: 10
                                                    }}
                                                />
                                            </View>
                                        </ImageBackground>
                                    </View>
                                </TouchableOpacity>
                            </View> : null
                        }

                        {format && format.name == true ?
                            <TextInput
                                mode='outlined'
                                label="Name"
                                value={name}
                                onChangeText={(name) => setName(name)}
                                autoCorrect={false}
                            /> : null
                        }

                        {format && format.identificationID == true ?
                            <TextInput
                                value={identificationID}
                                onChangeText={(identificationID) => setIdentificationID(identificationID)}
                                label="IC No."
                                mode='outlined'
                                autoCorrect={false}
                            /> : null
                        }

                        {format && format.address == true ?
                            <TextInput
                                value={address}
                                onChangeText={(address) => setAddress(address)}
                                label="Address"
                                mode='outlined'
                                autoCorrect={false}
                            /> : null
                        }

                        {format && format.numMatric == true ?
                            <TextInput
                                value={numMatric}
                                onChangeText={(numMatric) => setNumMatric(numMatric)}
                                label="Matric No."
                                mode='outlined'
                                autoCorrect={false}
                            /> : null
                        }

                        {format && format.numAthelete == true ?
                            <TextInput
                                value={numAthelete}
                                onChangeText={(numAthelete) => setNumAthelete(numAthelete)}
                                label="Athlete No."
                                mode='outlined'
                                autoCorrect={false}
                            /> : null
                        }

                        {format && format.phoneNumber == true ?
                            <TextInput
                                value={phoneNumber}
                                onChangeText={(phoneNumber) => setPhoneNum(phoneNumber)}
                                label="Phone No."
                                mode='outlined'
                                autoCorrect={false}
                            /> : null
                        }

                        {format && format.gender == true ?
                            <RNPickerSelect
                                value={gender}
                                onValueChange={(gender) => setGender(gender)}
                                items={[
                                    { label: 'Male', value: 'male' },
                                    { label: 'Female', value: 'female' }
                                ]}
                                placeholder={{ label: "Select your gender ...", value: "null" }}
                            /> : null
                        }

                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => {
                            if (name == "" || address == "" || identificationID == "" || gender == "") {
                                alert('Field cannot be empty')
                            } else {
                                hideDialog2()
                                addPlayer()
                                submitPlayer()
                                console.log(submit)
                            }

                        }}>Add</Button>
                        <Button onPress={hideDialog2}>Cancel</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>


            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>No.</DataTable.Title>
                    <DataTable.Title>Player Name</DataTable.Title>
                    <DataTable.Title>IC No.</DataTable.Title>
                </DataTable.Header>

                {listPlayers && listPlayers.map((item, i) => (
                    <TouchableOpacity
                        key={i}
                        onPress={() => {
                            navigation.navigate('PlayerDetailsScreen', { playerDetails: item, tournamentID, listPlayers, format, submit, setSubmit, remove, setRemove })
                        }}>
                        <DataTable.Row>
                            <DataTable.Cell>{i + 1}</DataTable.Cell>
                            <DataTable.Cell>{item.name}</DataTable.Cell>
                            <DataTable.Cell>{item.identificationID}</DataTable.Cell>
                        </DataTable.Row>
                    </TouchableOpacity>
                ))
                }

                {listPlayers, format && Number(listPlayers.length) < Number(format.numPlayers) ?
                    <TouchableOpacity
                        style={{ alignItems: "center" }}
                        onPress={() => {
                            showDialog2()
                        }}>
                        <MaterialIcons name="add-circle-outline" size={25} />
                    </TouchableOpacity>
                    : null}



                <DataTable.Pagination
                    page={1}
                    numberOfPages={3}
                    onPageChange={page => {
                        console.log(page);
                    }}
                    label="1-2 of 6" />
            </DataTable>

            {/* Register Player Modal  */}
            {/* 
            <Modal
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                }}
            >
                <BottomSheet
                    ref={bs}
                    snapPoints={[330, 0]}
                    renderContent={renderInner}
                    renderHeader={renderHeader}
                    initialSnap={1}
                    callbackNode={fall}
                    enabledGestureInteraction={true}
                />
                <View style={styles.view}>
                    <View style={styles.modalView}>

                        <Text style={styles.title}>Player Information</Text>

                        {format && format.passportPhoto == true ?
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
                                            uri: passportPhoto,
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
                                                color="#666666"
                                                style={{
                                                    opacity: 0.7,
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    borderWidth: 1,
                                                    borderColor: '#666666',
                                                    borderRadius: 10
                                                }}
                                            />
                                        </View>
                                    </ImageBackground>

                                </View>
                            </TouchableOpacity> : null
                        }

                        {format && format.name == true ?
                            <TextInput
                                value={name}
                                onChangeText={(name) => setName(name)}
                                placeholder="Name"
                                placeholderTextColor="#666666"
                                autoCorrect={false}
                            /> : null
                        }

                        {format && format.identificationID == true ?
                            <TextInput
                                value={identificationID}
                                onChangeText={(identificationID) => setIdentificationID(identificationID)}
                                placeholder="IC No."
                                placeholderTextColor="#666666"
                                autoCorrect={false}
                            /> : null
                        }

                        {format && format.address == true ?
                            <TextInput
                                value={address}
                                onChangeText={(address) => setAddress(address)}
                                placeholder="Address"
                                placeholderTextColor="#666666"
                                autoCorrect={false}
                            /> : null
                        }

                        {format && format.numMatric == true ?
                            <TextInput
                                value={numMatric}
                                onChangeText={(numMatric) => setNumMatric(numMatric)}
                                placeholder="Matric No."
                                placeholderTextColor="#666666"
                                autoCorrect={false}
                            /> : null
                        }

                        {format && format.numAthelete == true ?
                            <TextInput
                                value={numAthelete}
                                onChangeText={(numAthelete) => setNumAthelete(numAthelete)}
                                placeholder="Athlete No."
                                placeholderTextColor="#666666"
                                autoCorrect={false}
                            /> : null
                        }

                        {format && format.phoneNumber == true ?
                            <TextInput
                                value={phoneNumber}
                                onChangeText={(phoneNumber) => setPhoneNum(phoneNumber)}
                                placeholder="Phone No."
                                placeholderTextColor="#666666"
                                autoCorrect={false}
                            /> : null
                        }

                        {format && format.gender == true ?
                            <RNPickerSelect
                                value={gender}
                                onValueChange={(gender) => setGender(gender)}
                                items={[
                                    { label: 'Male', value: 'male' },
                                    { label: 'Female', value: 'female' }
                                ]}
                                placeholder={{ label: "Select your gender ...", value: "null" }}
                            /> : null
                        }

                        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                            <TouchableOpacity
                                style={{ ...styles.openButton, backgroundColor: "green" }}
                                onPress={() => {
                                    setSubmit(!submit)
                                    addPlayer()
                                    // getTeam()
                                    setModalVisible(!modalVisible);
                                    navigation.navigate('TeamRegisterScreen')
                                }}>
                                <Text style={styles.textStyle}>ADD</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ ...styles.openButton, backgroundColor: "red" }}
                                onPress={() => {
                                    setModalVisible(!modalVisible);
                                    navigation.navigate('TeamRegisterScreen')
                                }}>
                                <Text style={styles.textStyle}>CANCEL</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal> */}
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