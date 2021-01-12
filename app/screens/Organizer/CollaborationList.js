import React, { useState, useEffect } from 'react'
import { View, Text, Button, StyleSheet, FlatList } from 'react-native'
import { data } from '../../model/data'
import axios from 'axios'
import auth from '@react-native-firebase/auth'
import CollabCard from '../../components/CollabCard'

export default function CollaborationList({ navigation }) {

    const currentUser = auth().currentUser.uid;
    const [tournament, setTournament] = useState(null)
    const [event, setEvent] = useState(null)

    useEffect(() => {
        getTournament()
        getEvent()
    }, [])

    async function getEvent(){
        try {
            const response = await axios.get(`/${currentUser}/events/collab`);
            setEvent(response.data)
        } catch (error) {
            
        }
    }

    async function getTournament() {
        try {
            const response = await axios.get(`/${currentUser}/collab`);
            setTournament(response.data)
        } catch (error) {
            console.error(error);
        }
    }

    const renderItem = ({ item }) => {
        console.log(item)
        return (
            <CollabCard
                itemData={item}
                onPress={() => navigation.navigate('EventDetails', { itemData: item })} />
        )
    }

    return (
        <View styles={styles.container}>
            <FlatList
                data={event}
                renderItem={renderItem}
                keyExtractor={item => item.eventID}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '90%',
        alignSelf: 'center'
    }
})