import React from 'react'
import { View, Text, StyleSheet, FlatList, StatusBar, Image, TouchableOpacity, ScrollView } from 'react-native'
import Swiper from 'react-native-swiper'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import StarRating from '../components/StarRating';

export default function Home({ navigation }) {

    return (
        <ScrollView>
            <View style={styles.container}>
                <StatusBar />
                {/* Image Slider */}
                <View style={styles.sliderContainer}>
                    <Swiper autoplay horizontal={false} height={200} activeDotColor="#6B46C1">
                        <View style={styles.slide}>
                            <Image
                                source={require('../assets/pexels-alexander-nadrilyanski-3684122.jpg')}
                                resizeMode="cover"
                                style={styles.sliderImage}
                            />
                        </View>
                        <View>
                            <Image
                                source={require('../assets/pexels-football-wife-1618200.jpg')}
                                resizeMode="cover"
                                style={styles.sliderImage}
                            />
                        </View>
                        <View>
                            <Image
                                source={require('../assets/pexels-pixabay-262524.jpg')}
                                resizeMode="cover"
                                style={styles.sliderImage}
                            />
                        </View>
                        <View>
                            <Image
                                source={require('../assets/pexels-snapwire-618612.jpg')}
                                resizeMode="cover"
                                style={styles.sliderImage}
                            />
                        </View>
                        <View>
                            <Image
                                source={require('../assets/pexels-jim-de-ramos-1263426.jpg')}
                                resizeMode="cover"
                                style={styles.sliderImage}
                            />
                        </View>

                    </Swiper>
                </View>
                {/* Filter Button */}
                <View style={[styles.categoryContainer, { marginTop: 10 }]}>
                    <TouchableOpacity
                        style={styles.categoryBtn}
                        onPress={() =>
                            navigation.navigate('TournamentList', { title: 'Tournament' })
                        }>
                        <View style={styles.categoryIcon}>
                            <MaterialCommunityIcons
                                name="tournament"
                                size={35}
                                color="#6B46C1" />

                        </View>
                        <Text style={styles.categoryBtnTxt}>Tournament</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.categoryBtn}
                        onPress={() =>
                            navigation.navigate('EventList', { title: 'Event' })
                        }>
                        <View style={styles.categoryIcon}>
                            <Entypo
                                name="sports-club"
                                size={32}
                                color="#6B46C1" />
                        </View>
                        <Text style={styles.categoryBtnTxt}>Event</Text>
                    </TouchableOpacity>

                    {/* <TouchableOpacity
                        style={styles.categoryBtn}
                        onPress={() =>
                            navigation.navigate('CardListScreen', { title: 'Location' })
                        }>
                        <View style={styles.categoryIcon}>
                            <Ionicons
                                name="location-sharp"
                                size={35}
                                color="#6B46C1" />
                        </View>
                        <Text style={styles.categoryBtnTxt}>Location</Text>
                    </TouchableOpacity> */}
                </View>
                {/* Tournament Card*/}
                <View style={styles.cardsWrapper}>
                    <Text style={{
                        alignSelf: 'center',
                        fontSize: 18,
                        fontWeight: 'bold',
                        color: '#333'
                    }}>Tournament</Text>
                    {/* Tournament Details */}
                    <View style={styles.card}>
                        <View style={styles.cardImgWrapper}>
                            <Image
                                source={require('../assets/pexels-alexander-nadrilyanski-3684122.jpg')}
                                resizeMode="cover"
                                style={styles.cardImg}
                            />
                        </View>
                        <View style={styles.cardInfo}>
                            <Text style={styles.cardTitle}>Sukan Mahasiswa Universiti Malaya (SUKMUM)</Text>
                            <StarRating ratings={4} reviews={99} />
                            <Text style={styles.cardDetails}>Sukan for UM students</Text>
                        </View>
                    </View>
                    {/* Tournament Details */}
                    <View style={styles.card}>
                        <View style={styles.cardImgWrapper}>
                            <Image
                                source={require('../assets/pexels-alexander-nadrilyanski-3684122.jpg')}
                                resizeMode="cover"
                                style={styles.cardImg}
                            />
                        </View>
                        <View style={styles.cardInfo}>
                            <Text style={styles.cardTitle}>Sukan Mahasiswa Universiti Malaya (SUKMUM)</Text>
                            <StarRating ratings={4} reviews={99} />
                            <Text style={styles.cardDetails}>Sukan for UM students</Text>
                        </View>
                    </View>
                    {/* Tournament Details */}
                    <View style={styles.card}>
                        <View style={styles.cardImgWrapper}>
                            <Image
                                source={require('../assets/pexels-alexander-nadrilyanski-3684122.jpg')}
                                resizeMode="cover"
                                style={styles.cardImg}
                            />
                        </View>
                        <View style={styles.cardInfo}>
                            <Text style={styles.cardTitle}>Sukan Mahasiswa Universiti Malaya (SUKMUM)</Text>
                            <StarRating ratings={4} reviews={99} />
                            <Text style={styles.cardDetails}>Sukan for UM students</Text>
                        </View>
                    </View>
                </View>



            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    sliderContainer: {
        height: 200,
        width: '90%',
        marginTop: 10,
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 8,
    },

    wrapper: {},

    slide: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent',
        borderRadius: 8,
    },
    sliderImage: {
        height: '100%',
        width: '100%',
        alignSelf: 'center',
        borderRadius: 8,
    },
    categoryContainer: {
        flexDirection: 'row',
        width: '90%',
        alignSelf: 'center',
        marginTop: 25,
        marginBottom: 10,
    },
    categoryBtn: {
        flex: 1,
        width: '30%',
        marginHorizontal: 0,
        alignSelf: 'center',
    },
    categoryIcon: {
        borderWidth: 0,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: 70,
        height: 70,
        backgroundColor: '#E6E6FA' /* '#FF6347' */,
        borderRadius: 50,
    },
    categoryBtnTxt: {
        alignSelf: 'center',
        marginTop: 5,
        color: '#6B46C1',
    },
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
});