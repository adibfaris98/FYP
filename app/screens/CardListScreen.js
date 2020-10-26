import React from 'react'
import { View, Text, Button, StyleSheet, FlatList } from 'react-native'
import Card from '../components/Card'
import { data } from '../model/data'

export default function CardListScreen({ navigation }) {

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
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
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