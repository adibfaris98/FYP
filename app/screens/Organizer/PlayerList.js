import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import { DataTable, Card, Title, Paragraph } from 'react-native-paper'
import axios from 'axios'

export default function PlayerList({ route, navigation }) {
    const { teamID, playerList, tournamentID } = route.params
    useEffect(() => {
        return () => {

        }
    }, [])
    return (
        <View style={{ flex: 1 }}>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>Name</DataTable.Title>
                    <DataTable.Title>IC no.</DataTable.Title>
                </DataTable.Header>

                {playerList && playerList.map((item, i) => {
                    return (
                        <TouchableOpacity
                            key={i}
                            onPress={() => {
                                navigation.navigate('PlayerDetailsApproval', { playerData: item })
                            }}>
                            <DataTable.Row key={i}>
                                <DataTable.Cell>{item.name}</DataTable.Cell>
                                <DataTable.Cell>{item.identificationID}</DataTable.Cell>
                            </DataTable.Row>
                        </TouchableOpacity>
                    )
                })}
            </DataTable>
            <View style={styles.card}>
                <View style={styles.cardImgWrapper}>
                </View>
                <View style={styles.cardInfo}>
                    <Text style={styles.cardTitle}>Sukan Mahasiswa Universiti Malaya (SUKMUM)</Text>
                    {/* <StarRating ratings={4} reviews={99} /> */}
                    <Text style={styles.cardDetails}>Sukan for UM students</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cardsWrapper: {
        marginTop: 10,
        width: '90%',
        alignSelf: 'center',
    },
    card: {
        height: 100,
        marginVertical: 10,
        flexDirection: 'row',
        shadowColor: '#999',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    cardImgWrapper: {
        flex: 1,
    },
    cardImg: {
        height: '100%',
        width: '100%',
        alignSelf: 'center',
        borderRadius: 8,
        borderBottomRightRadius: 0,
        borderTopRightRadius: 0,
    },
    cardInfo: {
        flex: 2,
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderBottomRightRadius: 8,
        borderTopRightRadius: 8,
        backgroundColor: '#fff',
    },
    cardTitle: {
        fontWeight: 'bold',
    },
    cardDetails: {
        fontSize: 12,
        color: '#444',
    },
})