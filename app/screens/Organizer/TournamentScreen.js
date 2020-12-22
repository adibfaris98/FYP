import React, { useState, useEffect } from 'react'
import { View, Text, Button, StyleSheet, FlatList } from 'react-native'
import auth from '@react-native-firebase/auth'
import Card from '../../components/Card'
import { data } from '../../model/data'
import axios from 'axios'

export default function TournamentScreen({ navigation }) {

    const currentUser = auth().currentUser.uid;
    const [tournament, setTournament] = useState(null)

    useEffect(() => {
        getTournament()
    }, [])

    async function getTournament() {
        try {
            const response = await axios.get(`/organizer/${currentUser}/tournament`);
            setTournament(response.data)
        } catch (error) {
            console.error(error);
        }
    }

    const renderItem = ({ item }) => {
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
