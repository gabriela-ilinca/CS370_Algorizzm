import { Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Stack, useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feed from '../../components/feed';
import sample from '../../components/sample';
import { set } from 'firebase/database';


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
                    prompt1Question={user.prompt1.question}
                    prompt1Thumbnail={user.prompt1.thumbnail}
                    prompt1Title={user.prompt1.title}
                    prompt1Artist={user.prompt1.artist}
                    prompt2Question={user.prompt2.question}
                    prompt2Thumbnail={user.prompt2.thumbnail}
                    prompt2Title={user.prompt2.title}
                    prompt2Artist={user.prompt2.artist}
                    prompt3Question={user.prompt3.question}
                    prompt3Thumbnail={user.prompt3.thumbnail}
                    prompt3Title={user.prompt3.title}
                    prompt3Artist={user.prompt3.artist}
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
