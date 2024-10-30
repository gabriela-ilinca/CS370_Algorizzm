import { Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import React from 'react';
import { Stack, useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feed from '../../components/feed';
import sample from '../../components/sample';

const Home = () => {    
    const router = useRouter()

    //pull user info here
    const handleLike= ()=> {
        //handle like logic
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
                    // headerLeft: () => (
                    //     <Ionicons 
                    //     name="options-outline" size={30} 
                    //     color="#fcb1d6" 
                    //     style={{marginHorizontal: 10}} 
                    //     onPress={() => router.push('../filter')}
                    //     />
                    // ),
                }}
            />
                <View>
                    <Feed 
                    pic1={sample.pic1}
                    pic2={sample.pic2}
                    pic3={sample.pic3}
                    name={sample.name}
                    location={sample.location}
                    prompt1Question={sample.prompt1.question}
                    prompt1Thumbnail={sample.prompt1.thumbnail}
                    prompt1Title={sample.prompt1.title}
                    prompt1Artist={sample.prompt1.artist}
                    prompt2Question={sample.prompt2.question}
                    prompt2Thumbnail={sample.prompt2.thumbnail}
                    prompt2Title={sample.prompt2.title}
                    prompt2Artist={sample.prompt2.artist}
                    prompt3Question={sample.prompt3.question}
                    prompt3Thumbnail={sample.prompt3.thumbnail}
                    prompt3Title={sample.prompt3.title}
                    prompt3Artist={sample.prompt3.artist}
                    song1={sample.top_songs.song1}
                    song2={sample.top_songs.song2}
                    song3={sample.top_songs.song3}
                    song4={sample.top_songs.song4}
                    song5={sample.top_songs.song5}
                    artist1={sample.top_artists.artist1}
                    artist2={sample.top_artists.artist2}
                    artist3={sample.top_artists.artist3}
                    artist4={sample.top_artists.artist4}
                    artist5={sample.top_artists.artist5}
                    />
                </View>

                <View style={{flexDirection: 'row', flex: 1, justifyContent: 'space-evenly', width:'100%', position: 'absolute', bottom: 0, alignItems: 'center', backgroundColor: '#111111', height: 100}}>
                    <TouchableOpacity>
                        <Ionicons name="play-skip-back-outline" size={30} color="#ffffff" style={{marginHorizontal: 10}}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleLike}>
                        <Ionicons name="heart-circle-outline" size={40} color="#ffffff" style={{marginHorizontal: 10}}/> 
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name="play-skip-forward-outline" size={30} color="#ffffff" style={{marginHorizontal: 10}}/> 
                    </TouchableOpacity>
                </View>
        </SafeAreaView>
    );
};

export default Home;
