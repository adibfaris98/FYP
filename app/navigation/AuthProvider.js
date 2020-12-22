import React, { createContext, useState, useEffect } from 'react'
import { View, Text } from 'react-native'

import auth from '@react-native-firebase/auth'
import storage from '@react-native-firebase/storage';
import axios from 'axios'

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [userDetails, setUserDetails] = useState(null)

    const [photoURL, setPhotoURL] = useState(null)
    const [name, setName] = useState(null)
    const [about, setAbout] = useState(null)
    const [email, setEmail] = useState(null)
    const [country, setCountry] = useState(null)
    const [gender, setGender] = useState(null)
    const [birthday, setBirthday] = useState(null)
    const [phoneNumber, setPhoneNumber] = useState(null)
    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                userDetails,
                setUserDetails,
                photoURL,
                setPhotoURL,
                name,
                setName,
                about,
                setAbout,
                email,
                setEmail,
                country,
                setCountry,
                gender,
                setGender,
                birthday,
                setBirthday,
                phoneNumber,
                setPhoneNumber,
                login: async (email, password) => {
                    try {
                        const cred = await auth().signInWithEmailAndPassword(email, password)

                        const { uid } = cred.user
                        const { data } = await axios.get(`/user/${uid}`)
                        setUserDetails(data)
                        setPhotoURL(data.photoURL)
                        setName(data.name)
                        setAbout(data.about)
                        setEmail(data.email)
                        setCountry(data.country)
                        setGender(data.gender)
                        setBirthday(data.birthday)
                        setPhoneNumber(data.phoneNumber)
                    } catch (e) {
                        alert(e)
                    }
                    // console.log(getPhotoURL())
                },
                register: async (email, password, name) => {
                    try {
                        const cred = await auth().createUserWithEmailAndPassword(email, password)
                        const response = await axios.post(`/user`,
                            {
                                uid: cred.user.uid,
                                name: name,
                                gender: null,
                                about: null,
                                birthday: null,
                                email: cred.user.email,
                                emailVerified: false,
                                phoneNumber: null,
                                country: null,
                                photoURL: 'https://firebasestorage.googleapis.com/v0/b/sports-management-system-v2.appspot.com/o/website%2FLogo.jpg?alt=media&token=921893c3-3134-494b-8f8c-332b10666623',
                                eventMgr: [],
                                eventsRef: [],
                                notificationsMgr: [],
                                notificationsRef: [],
                                tournamentsMgr: [],
                                tournamentsRef: []
                            }
                        )
                        const { uid } = cred.user
                        const { data } = await axios.get(`/user/${uid}`)
                        setUserDetails(data)
                        setPhotoURL(data.photoURL)
                        setName(data.name)
                        setAbout(data.about)
                        setEmail(data.email)
                        setCountry(data.country)
                        setGender(data.gender)
                        setBirthday(data.birthday)
                        setPhoneNumber(data.phoneNumber)
                    } catch (e) {
                        alert(e)
                    }
                },
                logout: async () => {
                    try {
                        await auth().signOut();
                    } catch (e) {
                        console.log(e)
                    }
                },
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
