import { Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import React from 'react';
import { Stack, useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feed from '../../components/feed';

const Home = () => {    
    const router = useRouter()

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
                    <Feed />
                </View>

                <View style={{flexDirection: 'row', flex: 1, justifyContent: 'space-evenly', width:'100%', position: 'absolute', bottom: 0, alignItems: 'center', backgroundColor: '#111111', height: 100}}>
                    <TouchableOpacity>
                        <Ionicons name="play-skip-back-outline" size={30} color="#ffffff" style={{marginHorizontal: 10}}/>
                    </TouchableOpacity>
                    <TouchableOpacity>
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
