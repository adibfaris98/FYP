import React, { useContext, useState } from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FormButton from '../components/FormButton'
import FormInput from '../components/FormInput'
import { AuthContext } from '../navigation/AuthProvider'

export default function SignupScreen({ navigation }) {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()

    const { register } = useContext(AuthContext)

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Create an account</Text>
            <FormInput
                labelValue={name}
                onChangeText={(name) => {
                    setName(name)
                }}
                placeholderText="Name"
                iconType="user"
                keyboardType="default"
                autoCorrect={false}
            />
            <FormInput
                labelValue={email}
                onChangeText={(userEmail) => setEmail(userEmail)}
                placeholderText="Email"
                iconType="mail"
                keyboardType="email-address"
                autoCorrect={false}
            />
            <FormInput
                labelValue={password}
                onChangeText={(userPassword) => setPassword(userPassword)}
                placeholderText="Password"
                iconType="lock"
                secureTextEntry={true}
            />
            <FormInput
                labelValue={confirmPassword}
                onChangeText={(userPassword) => setConfirmPassword(userPassword)}
                placeholderText="Confirm Password"
                iconType="lock"
                secureTextEntry={true}
            />
            <FormButton
                buttonTitle="Sign Up"
                onPress={() => {
                    if (name == null || password == null || email == null || confirmPassword == null) {
                        alert("Please fill in all fields")
                    }
                    else if (password !== confirmPassword) {
                        alert("Your password do not match")
                    } else {
                        register(email, password, name)
                    }
                }
                }
            />

            <View style={styles.textPrivate}>
                <Text style={styles.color_textPrivate}>By registering, you confirm that you accept our </Text>
                <TouchableOpacity onPress={() => alert('clicked')}>
                    <Text style={[styles.color_textPrivate, { color: '#e88832' }]}>
                        Term of service
                    </Text>
                </TouchableOpacity >
                <Text style={styles.color_textPrivate}> and </Text>
                <TouchableOpacity onPress={() => alert('clicked')}>
                    <Text style={[styles.color_textPrivate, { color: '#e88832' }]} onPress={() => alert('clicked')}>Privacy Policy</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.forgotButton} onPress={() => { navigation.navigate('Login') }}>
                <Text style={styles.navButtonText}>Have an account? Sign In</Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f9fafd',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    text: {
        fontFamily: 'Kufam-SemiBoldItalic',
        fontSize: 28,
        marginBottom: 10,
        color: '#051d5f',
    },
    navButton: {
        marginTop: 15,
    },
    navButtonText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#2e64e5',
        fontFamily: 'Lato-Regular',
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: 35,
        justifyContent: 'center',
    },
    color_textPrivate: {
        fontSize: 13,
        fontWeight: '400',
        fontFamily: 'Lato-Regular',
        color: 'grey',
    },
});