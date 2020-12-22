import React, { useState, useEffect } from 'react'
import { View, Text, Button, StyleSheet, FlatList } from 'react-native'
import { data } from '../../model/data'
import axios from 'axios'

import Card from '../../components/Card'

export default function CardListScreen({ navigation }) {

    const [tournament, setTournament] = useState(null)

    useEffect(() => {
        async function getTournament() {
            try {
                const response = await axios.get('/tournament');
                setTournament(response.data)
            } catch (error) {
                console.error(error);
            }
        }
        getTournament()
    }, [])

    const renderItem = ({ item }) => {
        console.log(item)
        return (
            <Card
                itemData={item}
                onPress={() => navigation.navigate('CardItemDetails', { itemData: item })} />
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
        width: '90%',
        alignSelf: 'center'
    }
})