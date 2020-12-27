import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DataTable } from 'react-native-paper'
import axios from 'axios'

export default function FinalStage({ route, navigation }) {
    return (
        <View>
            <Text>FinalStage</Text>
        </View>
    )
}
