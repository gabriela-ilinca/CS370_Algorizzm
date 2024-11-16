import { Text, View, SafeAreaView, TouchableOpacity, Image, StyleSheet, Linking } from 'react-native';
import React, { useState, useEffect }  from 'react';
import { Stack, useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { images } from '../assets';
import axios from 'axios';

const Signup = () => {    
    const router = useRouter()
    const [loggedIn, setLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);
    //const [username, setUsername] = useState(null);

    const handleSpotifySync = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8080', {
        headers: {
            'Cache-Control': 'no-cache',                
        }}); // Update URL if needed
      setUserData(response.data);
      console.log('Got Response:', response.data);
      Linking.openURL(response.data)
   

    } catch (error) {
        console.error('Error logging in:', error);
      }
    //send them to singup 1
    router.push('/signup1')

    };

    


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor:'#111111' }}>
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
                <View style={{paddingHorizontal:30, marginTop: 10}}>
                    <Text style={{color: 'white', fontWeight: 'bold', fontSize: 30}}>Let's get you set up</Text>
                    <Text style={{color: 'white', fontWeight: 'normal', fontSize: 15, marginTop: 10}}>Our platform uses your Spotify data to give you a fine-tuned dating experience. Sync your spotify account to get started, and don't worry, we'll never sell your data.</Text>
                </View>
                <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', marginVertical: 50}}>
                    <Ionicons name="phone-portrait-outline" size={30} color="#ffffff" style={{marginHorizontal: 10}} />
                    <Ionicons name="ellipsis-horizontal-outline" size={30} color="#ffffff" style={{marginHorizontal: 10}} />
                    <View style={{height:30, width:30}}>
                        <Image source={images.spotify} style={{width:30, height:30}} resizeMode='contain' />
                    </View>
                </View>
                <View style={{flex:1, width:'100%', alignItems: 'center', marginTop: 30 
                    //position: 'absolute', bottom: 100
                    }}>
                <TouchableOpacity onPress={handleSpotifySync} style={styles.spotify}>
                    <Text style={{ textAlign: "left", color: "#FFF" }}>Sync Spotify account</Text>
                </TouchableOpacity>
                </View>


        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    spotify: {
      width: 350,
      flexDirection: "row",
      height: 40,
      backgroundColor: '#1ED760',
      borderRadius: 15,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default Signup;
