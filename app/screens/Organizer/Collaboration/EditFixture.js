import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { DataTable, Card, Title, Paragraph } from 'react-native-paper'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios'

export default function EditFixture({ route }) {
    const fixture = route.params.fixture
    return (
        <View>
            <Card style={{ borderWidth: 1, borderColor: "grey", borderRadius: 5, width: "95%", margin: 10 }}>
                <TouchableOpacity onPress={() => { }}>
                    <View style={{ alignItems: 'flex-end' }}>
                        <MaterialCommunityIcons
                            name="square-edit-outline"
                            size={30}
                            color="#6B46C1" />
                    </View>
                </TouchableOpacity>
                <Card.Content style={{ alignItems: 'center' }}>
                    <Paragraph>
                        {fixture.homeTeam} vs {fixture.awayTeam}
                    </Paragraph>
                    <Paragraph>
                        {fixture.homeScore} {fixture.awayScore}
                    </Paragraph>
                </Card.Content>
            </Card>
        </View>
    )
}
