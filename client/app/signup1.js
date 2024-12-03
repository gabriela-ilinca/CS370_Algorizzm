import { Text, View, SafeAreaView, TouchableOpacity, Image, StyleSheet, redirect, Linking } from 'react-native';
import React from 'react';
import { Stack, useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { images } from '../assets';
import { auth, db } from '../config/firebase'; // Firebase imports
import { doc, setDoc } from 'firebase/firestore'; // Firebase Firestore functions
import axios from 'axios'; // Axios for API requests

const Signup1 = () => {    
    const router = useRouter();

    const handleSpotifySync = async () => {
        try {
            // Redirect to Flask backend for Spotify login
            // Linking.openURL('http://10.44.207.46:8080/login');
            // const response = await axios.get('http://10.44.207.46:8080/fetch_data');
            // testing:
            Linking.openURL('http://10.0.0.47:8080/login'); //change 10.0.0.47 to your own IP add; keep the :8080/login and the http format
            const response = await axios.get('http://10.0.0.47:8080/fetch_data'); //change 10.0.0.47 to your own IP add; keep the :8080/login and the http format
            const { data } = response;
    
            // Once data is returned from the backend
            const spotifyData = data; // Recently played, top tracks, and top artists
            console.log(spotifyData)
    
            // Push Spotify data to Firebase
            const userId = auth.currentUser.uid; // Ensure the user is logged in
            const userRef = doc(db, 'users', userId);
    
            await setDoc(userRef, { spotifyData }, { merge: true });
    
            // Navigate to the next screen
            router.push('/signup2');
        } catch (error) {
            console.error('Error syncing Spotify:', error);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor:'#111111' }}>
            <Stack.Screen
                options={{ 
                    headerShown: true,
                    headerTitle: "",
                    headerStyle: { backgroundColor: '#111111' },
                    headerShadowVisible: false,
                    headerLeft: () => (
                        <Ionicons name="chevron-back" size={30} color="#ffffff" style={{ marginHorizontal: 10 }} 
                        onPress={() => router.back()}
                        />
                    ),
                }}
            />
            <View style={{paddingHorizontal:30, marginTop: 10}}>
                <Text style={{color: 'white', fontWeight: 'bold', fontSize: 30}}>Sync Spotify</Text>
                <Text style={{color: 'white', fontWeight: 'normal', fontSize: 15, marginTop: 10}}>Our platform uses your Spotify data to give you a fine-tuned dating experience. Sync your spotify account to get started, and don't worry, we'll never sell your data.</Text>
            </View>
            <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', marginVertical: 50}}>
                <Ionicons name="phone-portrait-outline" size={30} color="#ffffff" style={{marginHorizontal: 10}} />
                <Ionicons name="ellipsis-horizontal-outline" size={30} color="#ffffff" style={{marginHorizontal: 10}} />
                <View style={{height:30, width:30}}>
                    <Image source={images.spotify} style={{width:30, height:30}} resizeMode='contain' />
                </View>
            </View>
            <View style={{flex:1, width:'100%', alignItems: 'center', marginTop: 30}}>
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
        height: 40,
        backgroundColor: '#1ED760',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Signup1;
