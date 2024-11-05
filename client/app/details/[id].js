import { Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import React from 'react';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feed from '../../components/feed';
import sample from '../../components/sample';

const Details = () => {    
    const router = useRouter()
    const params = useLocalSearchParams()
    const val = params.val ? JSON.parse(params.val) : {};


    //pull user info here
    // const handleLike=()=> {
    //     //handle like logic
    // }

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
                    headerLeft: () => (
                        <Ionicons name="chevron-back" size={30} color="#ffffff" style={{marginHorizontal: 10}} 
                        onPress={() => router.back()}
                        />
                    ),
                }}
            />
                <View>
                    <Feed 
                    pic1={val.pic1}
                    pic2={val.pic2}
                    pic3={val.pic3}
                    name={val.name}
                    ig={val.ig}
                    prompt1Question={val.prompt1.question}
                    prompt1Thumbnail={val.prompt1.thumbnail}
                    prompt1Title={val.prompt1.title}
                    prompt1Artist={val.prompt1.artist}
                    prompt2Question={val.prompt2.question}
                    prompt2Thumbnail={val.prompt2.thumbnail}
                    prompt2Title={val.prompt2.title}
                    prompt2Artist={val.prompt2.artist}
                    prompt3Question={val.prompt3.question}
                    prompt3Thumbnail={val.prompt3.thumbnail}
                    prompt3Title={val.prompt3.title}
                    prompt3Artist={val.prompt3.artist}
                    song1={val.top_songs.song1}
                    song2={val.top_songs.song2}
                    song3={val.top_songs.song3}
                    song4={val.top_songs.song4}
                    song5={val.top_songs.song5}
                    artist1={val.top_artists.artist1}
                    artist2={val.top_artists.artist2}
                    artist3={val.top_artists.artist3}
                    artist4={val.top_artists.artist4}
                    artist5={val.top_artists.artist5}
                    />
                </View>

                {/* <View style={{flexDirection: 'row', flex: 1, justifyContent: 'space-evenly', width:'100%', position: 'absolute', bottom: 0, alignItems: 'center', backgroundColor: '#111111', height: 100}}>
                    <TouchableOpacity>
                        <Ionicons name="play-skip-back-outline" size={30} color="#ffffff" style={{marginHorizontal: 10}}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleLike}>
                        <Ionicons name="heart-circle-outline" size={40} color="#ffffff" style={{marginHorizontal: 10}}/> 
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name="play-skip-forward-outline" size={30} color="#ffffff" style={{marginHorizontal: 10}}/> 
                    </TouchableOpacity>
                </View> */}
        </SafeAreaView>
    );
};

export default Details;
