import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, ScrollView, StyleSheet, Image } from 'react-native';
import { Stack, Redirect } from 'expo-router';
import { images } from '../assets';

const Home = () => {
  console.log("index.js loaded")
    const [loaded, setLoaded] = useState(true);
      setTimeout(() => {
          setLoaded(false);
      }, 2000);
    
    if (loaded) {
      return (
        <SafeAreaView style={{flex: 1, justifyContent: "center", alignItems:"center"}} backgroundColor="#111111">
          <Stack.Screen
                options={{ 
                    headerShown: false
                }}
            />
            <View style={{width: 200, height: 200}}>
              <Image source={images.logo} style={{ aspectRatio: 1, flex: 1}} resizeMode='contain'/>
            </View>
        </SafeAreaView>
      )
    } else {
      return (
        <Redirect href={'/login'}/>
      )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    view: {
        height: 10,
    },
    content: {
      alignContent: "center",
      marginTop: 10, 
      marginBottom: 30
    },
  });

export default Home;