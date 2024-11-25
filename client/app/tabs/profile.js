import { images } from '../../assets';
import { Text, View, ScrollView, TouchableOpacity, StyleSheet, Image, Dimensions, SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import { useRouter, Stack } from 'expo-router';
import Carousel from 'react-native-reanimated-carousel';
import sample from '../../components/sample';
import { useFonts, Montserrat_400Regular } from '@expo-google-fonts/montserrat';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';

//console.log(images.spotify)
const { width } = Dimensions.get('window');

const Profile = () => {    
    const router = useRouter();
    const user = sample

    
    const [pics, setPics] = useState([user.pic1, user.pic2, user.pic3]);

    const pickImages = async (index) => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: false,
            quality: 1,
        });

        if (!result.canceled) {
            const newPics = [...pics];
            newPics[index] = { uri: result.assets[0].uri }; // Update the specific image
            setPics(newPics);
        }
    };

    return (
        <SafeAreaView style={{backgroundColor: '#111111'}}>
            <Stack.Screen
                options={{ 
                    headerShown: true,
                    headerTitle:"My Profile",
                    headerTitleStyle: {
                        color: '#FFF'
                    },
                    headerStyle: {
                        backgroundColor: '#111111',
                    },
                    headerShadowVisible: false,
                    headerRight: () => (
                        <Ionicons 
                        name="settings-outline" size={25} 
                        color="#FFF" 
                        style={{marginHorizontal: 20}} 
                        onPress={() => router.push('../settings')}
                        />
                    ),
                }}
            />
            <ScrollView contentContainerStyle={{ alignItems:'center', marginTop: 10, paddingBottom: 140 }} showsVerticalScrollIndicator={false}>
                {/* Centered View for Carousel */}
                <View style={{ width: width, alignItems: 'center', marginTop: 20 }}>
                    <Carousel
                        loop={false}
                        width={width}
                        height={400}
                        itemWidth={width * 0.9} // Match this to imageContainer width
                        data={pics}
                        scrollAnimationDuration={500}
                        renderItem={({ item, index }) => (
                            <View style={styles.imageContainer}>
                                <Image 
                                    source={item} 
                                    style={styles.uploadedImage} 
                                    resizeMode='cover'
                                />
                                <TouchableOpacity style={styles.editButton} onPress={() => pickImages(index)}>
                                    <Ionicons name="create-outline" size={30} color="#FFF" />
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                </View>
                
                {/* Name */}
                <View style={{ flex: 1, width: width * 0.9, alignItems: 'flex-start', marginTop: -20 }}>
                    <Text style={{ textAlign: "center", color: "#FFF", fontWeight: 'bold', fontSize: 25}}>{user.name}</Text>
                    <Text style={{ textAlign: "center", color: "#FFF", marginTop: 5 }}>{user.ig}</Text>
                </View>

                {/* Prompt */}
            <View style={styles.promptContainer}>
                <Text style={{ textAlign: 'left', color: "#FFF", fontWeight: 'bold', fontSize: 20}}>Currently stuck in my head...</Text>
                <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                    {/* 1 */}
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '95%', backgroundColor: 
                        '#333', borderRadius:10, padding: 10, marginBottom: 10, marginTop: 10}}>
                        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                            <View style={{height: 40, width: 40, overflow: 'hidden', borderRadius: 5}}>
                                
                                <Image 
                                    source={props.playing1Thumbnail}
                                    style={{ height: '100%', width: '100%' }}
                                    resizeMode="cover"
                                />
                            </View>
                            <View style={{paddingHorizontal: 10, width: width * 0.5}}>
                                <Text 
                                numberOfLines={1} 
                                ellipsizeMode="tail"
                                style={{ textAlign: 'left', color: "#FFF", marginTop: 5 }}>{props.playing1Title}</Text>
                                <Text 
                                numberOfLines={1} 
                                ellipsizeMode="tail"
                                style={{ textAlign: 'left', color: "#888", marginTop: 5, }}>{props.playing1Artist}</Text>
                            </View>
                        </View>
                        <TouchableOpacity>
                            <Ionicons name="play-circle-outline" size={40} color="#ffffff" style={{marginHorizontal: 10}}/> 
                        </TouchableOpacity>
                    </View>
                    {/* 2 */}
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '95%', backgroundColor: 
                        '#333', borderRadius:10, padding: 10, marginBottom: 10}}>
                        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                            <View style={{height: 40, width: 40, overflow: 'hidden', borderRadius: 5}}>
                                
                                <Image 
                                    source={props.playing2Thumbnail}
                                    style={{ height: '100%', width: '100%' }}
                                    resizeMode="cover"
                                />
                            </View>
                            <View style={{paddingHorizontal: 10, width: width * 0.5}}>
                                <Text 
                                numberOfLines={1} 
                                ellipsizeMode="tail"
                                style={{ textAlign: 'left', color: "#FFF", marginTop: 5 }}>{props.playing2Title}</Text>
                                <Text 
                                numberOfLines={1} 
                                ellipsizeMode="tail"
                                style={{ textAlign: 'left', color: "#888", marginTop: 5, }}>{props.playing2Artist}</Text>
                            </View>
                        </View>
                        <TouchableOpacity>
                            <Ionicons name="play-circle-outline" size={40} color="#ffffff" style={{marginHorizontal: 10}}/> 
                        </TouchableOpacity>
                    </View>
                    {/* 3 */}
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '95%', backgroundColor: 
                        '#333', borderRadius:10, padding: 10, marginBottom: 10}}>
                        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                            <View style={{height: 40, width: 40, overflow: 'hidden', borderRadius: 5}}>
                                
                                <Image 
                                    source={props.playing3Thumbnail}
                                    style={{ height: '100%', width: '100%' }}
                                    resizeMode="cover"
                                />
                            </View>
                            <View style={{paddingHorizontal: 10, width: width * 0.5}}>
                                <Text 
                                numberOfLines={1} 
                                ellipsizeMode="tail"
                                style={{ textAlign: 'left', color: "#FFF", marginTop: 5 }}>{props.playing3Title}</Text>
                                <Text 
                                numberOfLines={1} 
                                ellipsizeMode="tail"
                                style={{ textAlign: 'left', color: "#888", marginTop: 5, }}>{props.playing3Artist}</Text>
                            </View>
                        </View>
                        <TouchableOpacity>
                            <Ionicons name="play-circle-outline" size={40} color="#ffffff" style={{marginHorizontal: 10}}/> 
                        </TouchableOpacity>
                    </View>
                    {/* 4 */}
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '95%', backgroundColor: 
                        '#333', borderRadius:10, padding: 10, marginBottom: 10}}>
                        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                            <View style={{height: 40, width: 40, overflow: 'hidden', borderRadius: 5}}>
                                
                                <Image 
                                    source={props.playing4Thumbnail}
                                    style={{ height: '100%', width: '100%' }}
                                    resizeMode="cover"
                                />
                            </View>
                            <View style={{paddingHorizontal: 10, width: width * 0.5}}>
                                <Text 
                                numberOfLines={1} 
                                ellipsizeMode="tail"
                                style={{ textAlign: 'left', color: "#FFF", marginTop: 5 }}>{props.playing4Title}</Text>
                                <Text 
                                numberOfLines={1} 
                                ellipsizeMode="tail"
                                style={{ textAlign: 'left', color: "#888", marginTop: 5, }}>{props.playing4Artist}</Text>
                            </View>
                        </View>
                        <TouchableOpacity>
                            <Ionicons name="play-circle-outline" size={40} color="#ffffff" style={{marginHorizontal: 10}}/> 
                        </TouchableOpacity>
                    </View>
                   {/* 5 */}
                   <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '95%', backgroundColor: 
                        '#333', borderRadius:10, padding: 10, marginBottom: 10}}>
                        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                            <View style={{height: 40, width: 40, overflow: 'hidden', borderRadius: 5}}>
                                
                                <Image 
                                    source={props.playing5Thumbnail}
                                    style={{ height: '100%', width: '100%' }}
                                    resizeMode="cover"
                                />
                            </View>
                            <View style={{paddingHorizontal: 10, width: width * 0.5}}>
                                <Text 
                                numberOfLines={1} 
                                ellipsizeMode="tail"
                                style={{ textAlign: 'left', color: "#FFF", marginTop: 5 }}>{props.playing5Title}</Text>
                                <Text 
                                numberOfLines={1} 
                                ellipsizeMode="tail"
                                style={{ textAlign: 'left', color: "#888", marginTop: 5, }}>{props.playing5Artist}</Text>
                            </View>
                        </View>
                        <TouchableOpacity>
                            <Ionicons name="play-circle-outline" size={40} color="#ffffff" style={{marginHorizontal: 10}}/> 
                        </TouchableOpacity>
                    </View> 
                </View>
            </View>

                {/* Top 5 Songs */}
                <View style={styles.top5Container}>
                    <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
                        <Text style={{ textAlign: 'left', color: "#FFF", fontWeight: 'bold', fontSize: 20}}>My top 5 songs...</Text>
                        <View style={{height:30, width:30, overflow: 'hidden', marginHorizontal: 10}}>
                            {/* Spotify logo */}
                            <Image source={images.spotify} style={{width:'100%', height:'100%'}} resizeMode='cover' />
                        </View>
                    </View>
                    <View style={{padding: 15, justifyContent: 'space-around', flexDirection: 'column', flex: 1}}>
                        <Text 
                        numberOfLines={1} 
                        ellipsizeMode="tail"
                        style={{ textAlign: 'left', color: "#FFF", fontWeight: 'bold', fontSize: 20, marginBottom: 10}}>1. {user.top_songs.song1}
                        </Text>

                        <Text 
                        numberOfLines={1} 
                        ellipsizeMode="tail"
                        style={{ textAlign: 'left', color: "#FFF", fontWeight: 'bold', fontSize: 20, marginBottom: 10}}>2. {user.top_songs.song2}
                        </Text>

                        <Text 
                        numberOfLines={1} 
                        ellipsizeMode="tail"
                        style={{ textAlign: 'left', color: "#FFF", fontWeight: 'bold', fontSize: 20, marginBottom: 10}}>3. {user.top_songs.song3}
                        </Text>

                        <Text 
                        numberOfLines={1} 
                        ellipsizeMode="tail"
                        style={{ textAlign: 'left', color: "#FFF", fontWeight: 'bold', fontSize: 20, marginBottom: 10}}>4. {user.top_songs.song4}
                        </Text>

                        <Text 
                        numberOfLines={1} 
                        ellipsizeMode="tail"
                        style={{ textAlign: 'left', color: "#FFF", fontWeight: 'bold', fontSize: 20, marginBottom: 10}}>5. {user.top_songs.song5}
                        </Text>
                    </View>
                </View>

                {/* Top 5 Artists */}
                <View style={styles.top5Container}>
                    <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
                        <Text style={{ textAlign: 'left', color: "#FFF", fontWeight: 'bold', fontSize: 20}}>My top 5 artists...</Text>
                        <View style={{height:30, width:30, overflow: 'hidden', marginHorizontal: 10}}>
                            {/* Spotify logo */}
                            <Image source={images.spotify} style={{width:'100%', height:'100%'}} resizeMode='cover' />
                        </View>
                    </View>
                    <View style={{padding: 15, justifyContent: 'space-around', flexDirection: 'column', flex: 1}}>
                        <Text 
                        numberOfLines={1} 
                        ellipsizeMode="tail"
                        style={{ textAlign: 'left', color: "#FFF", fontWeight: 'bold', fontSize: 20, marginBottom: 10}}>1. {user.top_artists.artist1}
                        </Text>

                        <Text 
                        numberOfLines={1} 
                        ellipsizeMode="tail"
                        style={{ textAlign: 'left', color: "#FFF", fontWeight: 'bold', fontSize: 20, marginBottom: 10}}>2. {user.top_artists.artist2}
                        </Text>

                        <Text 
                        numberOfLines={1} 
                        ellipsizeMode="tail"
                        style={{ textAlign: 'left', color: "#FFF", fontWeight: 'bold', fontSize: 20, marginBottom: 10}}>3. {user.top_artists.artist3}
                        </Text>

                        <Text 
                        numberOfLines={1} 
                        ellipsizeMode="tail"
                        style={{ textAlign: 'left', color: "#FFF", fontWeight: 'bold', fontSize: 20, marginBottom: 10}}>4. {user.top_artists.artist4}
                        </Text>

                        <Text 
                        numberOfLines={1} 
                        ellipsizeMode="tail"
                        style={{ textAlign: 'left', color: "#FFF", fontWeight: 'bold', fontSize: 20, marginBottom: 10}}>5. {user.top_artists.artist5}
                        </Text>
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    imageContainer: {
        width: width * 0.9, // Match this to itemWidth in Carousel
        height: width * 0.9,
        backgroundColor: '#222',
        borderRadius: 10,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    promptContainer: {
        width: width * 0.9, // Match this to itemWidth in Carousel
        height: 150,
        backgroundColor: '#222',
        borderRadius: 10,
        marginTop: 35,
        padding: 10,
    },
    top5Container: {
        width: width * 0.9, // Match this to itemWidth in Carousel
        height: width * 0.9,
        backgroundColor: '#222',
        borderRadius: 10,
        marginTop: 35,
        padding: 10,
    },
    uploadedImage: {
        width: '100%',
        height: '100%',
    },
    next: {
        width: 350,
        height: 40,
        backgroundColor: '#92d4fa',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    editButton: {
        position: 'absolute',
        top: 0,
        right: 0,
        margin: 10,
        borderRadius: 10,
        padding: 5,
      },
});

export default Profile;
