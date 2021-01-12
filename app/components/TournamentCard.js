import React, { useRef, useState, useEffect } from 'react'
import { TextInput, View, TouchableOpacity } from 'react-native'
import { Avatar, Button, Card, Title, Paragraph, Caption } from 'react-native-paper';

export default function TournamentCard({ value, onPress }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <Card style={{ borderWidth: 0.4, width: 170, margin: 5 }}>
                <Card.Content style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ paddingRight: 25 }}>
                        <Title>{value.sportType}</Title>
                        <Caption>{value.tournamentID}</Caption>
                    </View>
                    <View>
                        <Paragraph style={{ borderColor: 'green', borderWidth: 1, borderRadius: 5, padding: 3, alignItems: 'flex-end', textAlign: 'center', color: 'green' }}>{value.gender}</Paragraph>
                    </View>
                </Card.Content>
            </Card>
        </TouchableOpacity>
    )
}
