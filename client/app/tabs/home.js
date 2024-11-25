import { Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Stack, useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feed from '../../components/feed';
import sample from '../../components/sample';

const Home = () => {    
    const router = useRouter()
    const [user, setUser] = useState(sample)



    //pull user info here
    const handleLike=()=> {
        //handle like logic
    }

    const handleSkip=()=> {
        //handle skip logic
    }

    const handleBack=()=> {
        //handle rewind logic
    }

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:'#111111' }}>
            <Stack.Screen
                options={{ 
                    headerShown: true,
                    headerTitle:"",
                    headerStyle: {
                        backgroundColor: '#111111',
                    },
                    headerShadowVisible: false,
                }}
            />
                <View>
                    <Feed 
                    pic1={user.pic1}
                    pic2={user.pic2}
                    pic3={user.pic3}
                    name={user.name}
                    ig={user.ig}
                    playing1Thumbnail={user.playing1.thumbnail}
                    playing1Title={user.playing1.title}
                    playing1Artist={user.playing1.artist}
                    playing1Link={user.playing1.link}
                    playing2Thumbnail={user.playing2.thumbnail}
                    playing2Title={user.playing2.title}
                    playing2Artist={user.playing2.artist}
                    playing2Link={user.playing2.link}
                    playing3Thumbnail={user.playing3.thumbnail}
                    playing3Title={user.playing3.title}
                    playing3Artist={user.playing3.artist}
                    playing3Link={user.playing3.link}
                    playing4Thumbnail={user.playing4.thumbnail}
                    playing4Title={user.playing4.title}
                    playing4Artist={user.playing4.artist}
                    playing4Link={user.playing4.link}
                    playing5Thumbnail={user.playing5.thumbnail}
                    playing5Title={user.playing5.title}
                    playing5Artist={user.playing5.artist}
                    playing5Link={user.playing5.link}
                    song1={user.top_songs.song1}
                    song2={user.top_songs.song2}
                    song3={user.top_songs.song3}
                    song4={user.top_songs.song4}
                    song5={user.top_songs.song5}
                    artist1={user.top_artists.artist1}
                    artist2={user.top_artists.artist2}
                    artist3={user.top_artists.artist3}
                    artist4={user.top_artists.artist4}
                    artist5={user.top_artists.artist5}
                    />
                </View>

                <View style={{flexDirection: 'row', flex: 1, justifyContent: 'space-evenly', width:'100%', position: 'absolute', bottom: 0, alignItems: 'center', backgroundColor: '#111111', height: 100}}>
                    <TouchableOpacity onPress={handleBack}>
                        <Ionicons name="play-skip-back-outline" size={30} color="#ffffff" style={{marginHorizontal: 10}}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleLike}>
                        <Ionicons name="heart-circle-outline" size={40} color="#ffffff" style={{marginHorizontal: 10}}/> 
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleSkip}>
                        <Ionicons name="play-skip-forward-outline" size={30} color="#ffffff" style={{marginHorizontal: 10}}/> 
                    </TouchableOpacity>
                </View>
        </SafeAreaView>
    );
};

export default Home;
