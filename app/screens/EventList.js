import Axios from 'axios'
import React, { useState, useEffect } from 'react'
import { View, Text, Button, StyleSheet, FlatList } from 'react-native'
import { data } from '../model/data'
import axios from 'axios'

import Card from '../components/Card'

export default function EventList({ navigation }) {

    const [events, setEvents] = useState(null)

    useEffect(() => {
        getEvents()
    }, [])

    async function getEvents() {
        try {
            const response = await axios.get('/events');
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