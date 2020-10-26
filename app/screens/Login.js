import React, {useState} from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'

export default function Login({navigation}) {

const [email, setEmail] = useState("")
const [password, setPassword] = useState("")

login = () => {
  navigation.navigate('Home')
}

    return (
        <View style={styles.container}>
                <View >
                    <TextInput
                        placeholder="Email"
                        placeholderTextColor='#FFFFFF'
                        style={styles.input}
                        value={email}
                        onChangeText={email => setEmail({ email })}
                        keyboardType={"email-address"}
                    />
                    <TextInput
                        placeholder="Password"
                        placeholderTextColor='#FFFFFF'
                        style={styles.input}
                        value={password}
                        onChangeText={password => setPassword({ password })}
                        secureTextEntry
                    />
                    <TouchableOpacity style={styles.button} onPress={login}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1C1E1F',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        borderWidth: 1,
        backgroundColor: '#B7B7B7',
        padding: 16,
        margin: 10,
        width: 300,
        borderRadius: 10,
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontWeight: '500',
    },
    button: {
        backgroundColor: 'purple',
        borderRadius: 10,
        margin: 10,
        padding: 16,
        width: 300,
    },
    errorText: {
        fontSize: 16,
        color: 'red',
        alignSelf: 'center',
        marginTop: 10
    }

});