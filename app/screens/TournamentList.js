import Axios from 'axios'
import React, { useState, useEffect } from 'react'
import { View, Text, Button, StyleSheet, FlatList } from 'react-native'
import { data } from '../model/data'
import axios from 'axios'

import Card from '../components/Card'

export default function TournamentList({ navigation }) {

    const [tournament, setTournament] = useState(null)
    // const [render, setRender] = useState(false)

    useEffect(() => {
        getTournament()
    }, [])

    async function getTournament() {
        try {
            const response = await axios.get('/tournament');
            setTournament(response.data)
            console.log(response.data)
        } catch (error) {
            console.error(error);
        }
    }

    const renderItem = ({ item }) => {
        // console.log(item)
        return (
            <Card
                itemData={item}
                onPress={() => navigation.navigate('TournamentDetails', { itemData: item})}
            />
        )
    }

    return (
        <View styles={styles.container}>
            <FlatList
                data={tournament}
                renderItem={renderItem}
                keyExtractor={item => item.tournamentID}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '80%',
        alignSelf: 'center'
    }
})