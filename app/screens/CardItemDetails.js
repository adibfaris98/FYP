import React, { useRef } from 'react'
import { View, Text, StyleSheet, Button, Image, Dimensions, Platform, StatusBar, Alert } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import * as Animatable from 'react-native-animatable'
const MIN_HEIGHT = Platform.OS == 'ios' ? 90 : 55
const MAX_HEIGHT = 300

export default function CardItemDetails({ route }) {
    const itemData = route.params.itemData
    const navTitleView = useRef(null)

    return (
        <View style={styles.container}>
            <StatusBar barStyle='light-content' />
            {/* Animated Header */}
            <HeaderImageScrollView
                maxHeight={MAX_HEIGHT}
                minHeight={MIN_HEIGHT}
                maxOverlayOpacity={0.6}
                minOverlayOpacity={0.3}
                renderHeader={() => (
                    <Image source={itemData.image} style={styles.image} />
                )}
                renderForeground={() => (
                    <View style={styles.titleContainer}>
                        <Text style={styles.imageTitle}>{itemData.title}</Text>
                    </View>
                )}
                renderFixedForeground={() => (
                    <Animatable.View style={styles.navTitleView} ref={navTitleView}>
                        <Text style={styles.navTitle}>{itemData.title}</Text>
                    </Animatable.View>
                )}
            >
                {/* Overview & Description */}
                <TriggeringView style={styles.section}
                    onHide={()=> navTitleView.current.fadeInUp(200)}
                    onDisplay={()=> navTitleView.current.fadeOut(100)}
                >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.title}>Overview</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                            <FontAwesome name='star' size={16} color='#6B46C1' />
                            <Text style={{ marginHorizontal: 2 }}>{itemData.rating}</Text>
                            <Text>({itemData.reviews})</Text>
                        </View>
                    </View>
                </TriggeringView>
                <View style={[styles.section, styles.sectionLarge]}>
                    <Text style={styles.sectionContent}>{itemData.description}</Text>
                </View>

                <View style={styles.section}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.title}>Rules & Regulation</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                            <Button
                                title='Register here'
                                color='#6B46C1'
                                onPress={() => Alert.alert('Button clicked')}
                                style={{ marginHorizontal: 2 }} />
                        </View>
                    </View>
                </View>

                {/* categories  */}
                {/* <View style={styles.section}>
                    <View style={styles.categories}>
                        {itemData.categories.map((category, index) => (
                            <View style={styles.categoryContainer} key={index}>
                                <FontAwesome name='tag' size={16} color='#fff' />
                                <Text style={styles.category}>{category}</Text>
                            </View>
                        ))}
                    </View>
                    
                </View> */}

                <View style={[styles.section, { height: 250 }]}>

                </View>
                {/* <View style={[styles.section, { height: 250 }]}>

                </View> */}
            </HeaderImageScrollView>

        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        height: MAX_HEIGHT,
        width: Dimensions.get('window').width,
        alignSelf: 'stretch',
        resizeMode: 'cover',
    },
    title: {
        fontSize: 20,
    },
    name: {
        fontWeight: 'bold',
    },
    section: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
        backgroundColor: 'white',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    sectionContent: {
        fontSize: 16,
        textAlign: 'justify',
    },
    categories: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
    },
    categoryContainer: {
        flexDirection: 'row',
        backgroundColor: '#6B46C1',
        borderRadius: 20,
        margin: 10,
        padding: 10,
        paddingHorizontal: 15,
    },
    category: {
        fontSize: 14,
        color: '#fff',
        marginLeft: 10,
    },
    titleContainer: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageTitle: {
        color: 'white',
        backgroundColor: 'transparent',
        fontSize: 24,
    },
    navTitleView: {
        height: MIN_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: Platform.OS === 'ios' ? 40 : 5,
        opacity: 0,
    },
    navTitle: {
        color: 'white',
        fontSize: 18,
        backgroundColor: 'transparent',
    },
    sectionLarge: {
        minHeight: 300,
    },
});