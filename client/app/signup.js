import { Text, View, SafeAreaView, TouchableOpacity, Image, StyleSheet, Linking } from 'react-native';
import React, { useState, useEffect }  from 'react';
import { Stack, useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { images } from '../assets';
import axios from 'axios';
import { query, set } from 'firebase/database';

const Signup = () => {    
    const router = useRouter()
    const [loggedIn, setLoggedIn] = useState(false);

    const handleSpotifySync = async () => {
    try {

         user = "missing";
        //clear session
        /*const response0 = await axios.get('http://your ip:8080/clear', {
            withCredentials: true,});
            console.log('Cleared session', response0.data);*/
      


      //const response = await axios.get('http://127.0.0.1:8080', {
        const response = await axios.get('http://10.0.0.121:8080', {

        withCredentials: true,});
      
      console.log('Got Response:', response.data);

      if (response.data.user_id) {
        setLoggedIn(true);
        user = response.data.user_id;
        console.log('Logged in:', user);
      }else if (response.data.auth_url && !loggedIn) {

        console.log('Opening URL:', response.data.auth_url);
        Linking.openURL(response.data.auth_url)

        await  new Promise(r => setTimeout(r, 10000));
        //giving them time to sign in, need a better way maybe do a while until we receive username
        const response2 = await axios.get('http://10.0.0.121:8080', {
            withCredentials: true,});
            console.log('Got User after 10s:', response2.data);
            user = response2.data.user_id;
      }

      console.log('User  has been updated to:', user);
      /*
      //wait 5 seconds
       await  new Promise(r => setTimeout(r, 10000));
    const response2 = await axios.get( 'http://127.0.0.1:8080/callback' , {withCredentials: true});
    console.log('Got User:', response2.data);
      */
    } catch (error) {
        console.error('Error logging in:', error);
      }
    //send them to singup 1
    router.push({pathname: `/signup1/${user}`, params: { user: user }});




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
