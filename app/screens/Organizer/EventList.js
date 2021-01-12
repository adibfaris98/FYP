import Axios from 'axios'
import React, { useState, useEffect } from 'react'
import { View, Text, Button, StyleSheet, FlatList } from 'react-native'
import { data } from '../../model/data'
import axios from 'axios'
import auth from '@react-native-firebase/auth'

import Card from '../../components/Card'

export default function EventList({ navigation }) {
    const currentUser = auth().currentUser.uid
    const [events, setEvents] = useState(null)

    useEffect(() => {
        getHostedEvents()
        console.log(currentUser)
    }, [])

    async function getHostedEvents() {
        try {
            const response = await axios.get(`/${currentUser}/events`);
            setEvents(response.data)
        } catch (error) {
            console.error(error);
        }
    }

    const renderItem = ({ item }) => {
        // console.log(item)
        return (
            <Card
                itemData={item}
                onPress={() => navigation.navigate('EventDetails', { itemData: item })}
            />
        )
    }

    return (
        <View styles={styles.container}>
            <FlatList
                data={events}
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