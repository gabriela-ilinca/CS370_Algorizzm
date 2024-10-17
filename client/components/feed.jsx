import { Text, View, ScrollView, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import Carousel from 'react-native-reanimated-carousel';
import sample from './sample';
import { useFonts, Montserrat_400Regular } from '@expo-google-fonts/montserrat';
import Ionicons from '@expo/vector-icons/Ionicons';
import { images } from '../assets';

//console.log(images.spotify)
const { width } = Dimensions.get('window');

const Feed = () => {    
    const router = useRouter();
    const pics = [sample.pic1, sample.pic2, sample.pic3];

    return (
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
                    renderItem={({ item }) => (
                        <View style={styles.imageContainer}>
                            <Image 
                                source={item} 
                                style={styles.uploadedImage} 
                                resizeMode='cover'
                            />
                        </View>
                    )}
                />
            </View>
            
            {/* Name */}
            <View style={{ flex: 1, width: width * 0.9, alignItems: 'flex-start', marginTop: -20 }}>
                <Text style={{ textAlign: "center", color: "#FFF", fontWeight: 'bold', fontSize: 25}}>{sample.name}</Text>
                <Text style={{ textAlign: "center", color: "#FFF", marginTop: 5 }}>Greenville, SC</Text>
            </View>

            {/* Prompt */}
            <View style={styles.promptContainer}>
                <Text style={{ textAlign: 'left', color: "#FFF", fontWeight: 'bold', fontSize: 20}}>{sample.prompt1.question}</Text>
                <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '95%', backgroundColor: 
                        '#333', borderRadius:10, padding: 10}}>
                        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                            <View style={{height: 40, width: 40, overflow: 'hidden', borderRadius: 5}}>
                                {/* Album Cover */}
                                <Image 
                                    source={sample.prompt1.thumbnail}
                                    style={{ height: '100%', width: '100%' }}
                                    resizeMode="cover"
                                />
                            </View>
                            <View style={{paddingHorizontal: 10, width: width * 0.5}}>
                                <Text 
                                numberOfLines={1} 
                                ellipsizeMode="tail"
                                style={{ textAlign: 'left', color: "#FFF", marginTop: 5 }}>{sample.prompt1.title}</Text>
                                <Text 
                                numberOfLines={1} 
                                ellipsizeMode="tail"
                                style={{ textAlign: 'left', color: "#888", marginTop: 5, }}>{sample.prompt1.artist}</Text>
                            </View>
                        </View>
                        <TouchableOpacity>
                            <Ionicons name="play-circle-outline" size={40} color="#ffffff" style={{marginHorizontal: 10}}/> 
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* Prompt */}
            <View style={styles.promptContainer}>
                <Text style={{ textAlign: 'left', color: "#FFF", fontWeight: 'bold', fontSize: 20}}>{sample.prompt2.question}</Text>
                <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '95%', backgroundColor: 
                        '#333', borderRadius:10, padding: 10}}>
                        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                            <View style={{height: 40, width: 40, overflow: 'hidden', borderRadius: 5}}>
                                {/* Album Cover */}
                                <Image 
                                    source={sample.prompt2.thumbnail}
                                    style={{ height: '100%', width: '100%' }}
                                    resizeMode="cover"
                                />
                            </View>
                            <View style={{paddingHorizontal: 10, width: width * 0.5}}>
                                <Text 
                                numberOfLines={1} 
                                ellipsizeMode="tail"
                                style={{ textAlign: 'left', color: "#FFF", marginTop: 5 }}>{sample.prompt2.title}</Text>
                                <Text 
                                numberOfLines={1} 
                                ellipsizeMode="tail"
                                style={{ textAlign: 'left', color: "#888", marginTop: 5, }}>{sample.prompt2.artist}</Text>
                            </View>
                        </View>
                        <TouchableOpacity>
                            <Ionicons name="play-circle-outline" size={40} color="#ffffff" style={{marginHorizontal: 10}}/> 
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* Prompt */}
            <View style={styles.promptContainer}>
                <Text style={{ textAlign: 'left', color: "#FFF", fontWeight: 'bold', fontSize: 20}}>{sample.prompt3.question}</Text>
                <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '95%', backgroundColor: 
                        '#333', borderRadius:10, padding: 10}}>
                        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                            <View style={{height: 40, width: 40, overflow: 'hidden', borderRadius: 5}}>
                                {/* Album Cover */}
                                <Image 
                                    source={sample.prompt3.thumbnail}
                                    style={{ height: '100%', width: '100%' }}
                                    resizeMode="cover"
                                />
                            </View>
                            <View style={{paddingHorizontal: 10, width: width * 0.5}}>
                                <Text 
                                numberOfLines={1} 
                                ellipsizeMode="tail"
                                style={{ textAlign: 'left', color: "#FFF", marginTop: 5 }}>{sample.prompt3.title}</Text>
                                <Text 
                                numberOfLines={1} 
                                ellipsizeMode="tail"
                                style={{ textAlign: 'left', color: "#888", marginTop: 5, }}>{sample.prompt3.artist}</Text>
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
                    style={{ textAlign: 'left', color: "#FFF", fontWeight: 'bold', fontSize: 20, marginBottom: 10}}>1. {sample.top_songs.song1}
                    </Text>

                    <Text 
                    numberOfLines={1} 
                    ellipsizeMode="tail"
                    style={{ textAlign: 'left', color: "#FFF", fontWeight: 'bold', fontSize: 20, marginBottom: 10}}>2. {sample.top_songs.song2}
                    </Text>

                    <Text 
                    numberOfLines={1} 
                    ellipsizeMode="tail"
                    style={{ textAlign: 'left', color: "#FFF", fontWeight: 'bold', fontSize: 20, marginBottom: 10}}>3. {sample.top_songs.song3}
                    </Text>

                    <Text 
                    numberOfLines={1} 
                    ellipsizeMode="tail"
                    style={{ textAlign: 'left', color: "#FFF", fontWeight: 'bold', fontSize: 20, marginBottom: 10}}>4. {sample.top_songs.song4}
                    </Text>

                    <Text 
                    numberOfLines={1} 
                    ellipsizeMode="tail"
                    style={{ textAlign: 'left', color: "#FFF", fontWeight: 'bold', fontSize: 20, marginBottom: 10}}>5. {sample.top_songs.song5}
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
                    style={{ textAlign: 'left', color: "#FFF", fontWeight: 'bold', fontSize: 20, marginBottom: 10}}>1. {sample.top_artists.artist1}
                    </Text>

                    <Text 
                    numberOfLines={1} 
                    ellipsizeMode="tail"
                    style={{ textAlign: 'left', color: "#FFF", fontWeight: 'bold', fontSize: 20, marginBottom: 10}}>2. {sample.top_artists.artist2}
                    </Text>

                    <Text 
                    numberOfLines={1} 
                    ellipsizeMode="tail"
                    style={{ textAlign: 'left', color: "#FFF", fontWeight: 'bold', fontSize: 20, marginBottom: 10}}>3. {sample.top_artists.artist3}
                    </Text>

                    <Text 
                    numberOfLines={1} 
                    ellipsizeMode="tail"
                    style={{ textAlign: 'left', color: "#FFF", fontWeight: 'bold', fontSize: 20, marginBottom: 10}}>4. {sample.top_artists.artist4}
                    </Text>

                    <Text 
                    numberOfLines={1} 
                    ellipsizeMode="tail"
                    style={{ textAlign: 'left', color: "#FFF", fontWeight: 'bold', fontSize: 20, marginBottom: 10}}>5. {sample.top_artists.artist5}
                    </Text>
                </View>
            </View>

        </ScrollView>
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
});

export default Feed;
