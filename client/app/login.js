import React, { useState } from 'react';
import { View, Text, TextInput, SafeAreaView, StyleSheet, TouchableOpacity, Dimensions, Image, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { images } from '../assets';

const { width } = Dimensions.get('window');
const margin = 20;
const length = width - margin * 2;

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleGoBack = async () => {}

  const handleLogin = async () => {}

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container} backgroundColor="#111111">
        <Stack.Screen
          options={{ 
            headerStyle: { backgroundColor: "#111111" },
            headerShadowVisible: false, 
            headerTitle: "",
          }}
        />
        
        {/* Separate view for logo and welcome text */}
        <View style={styles.headerContainer}>
          <Image 
            source={images.logo} 
            style={styles.logo} 
            resizeMode='contain' 
          />
          <Text style={styles.welcomeText}>Jump back in!</Text>
        </View>

        <View style={styles.container2}>
          <TextInput
            style={styles.input}
            placeholder="Username or email"
            placeholderTextColor="#83829A"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#83829A"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <View style={{marginTop:20}}>
            <TouchableOpacity onPress={() => router.push('/tabs')} style={styles.login}>
              <Text style={{ textAlign: "left", color: "#FFF" }}>Log in</Text>
            </TouchableOpacity>

            <View style={{flexDirection: 'row', justifyContent: 'space-evenly', width: '100%', marginVertical: 20, alignItems: 'center'}}>
              {/* <View style={{height: 1, width: 100, backgroundColor: 'white'}}/> */}
              <Text style={{color:'white'}}>Or</Text>
              {/* <View style={{height: 1, width: 100, backgroundColor: 'white'}}/> */}
            </View>
           
            <TouchableOpacity onPress={() => router.push('/tabs')} style={styles.spotify}>
              <Text style={{ textAlign: "left", color: "#FFF" }}>Sign in with Spotify</Text>
            </TouchableOpacity>
          </View>
          
        </View>

        <View style={{ flexDirection: "row", backgroundColor: '#111111' }}>
          <Text style={{ color: 'white' }}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/signup')}>
            <Text style={{ fontWeight: "bold", color: '#fcb1d6' }}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#111111'
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 20, // Adjust this value for overall spacing above the logo
  },
  logo: {
    width: 200,
    height: 200, // Maintain aspect ratio
    marginBottom: -20, // Decrease the space between logo and text
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 0, // Reduce this value to decrease space between logo and text
    marginBottom: 5, // Adjust if needed
    color: 'white'
  },
  container2: {
    flex: 1,
    paddingTop: 30
  },
  input: {
    // width: 350,
    // height: 40,
    // borderRadius: 15,
    // marginBottom: 10,
    // paddingHorizontal: 10,
    // backgroundColor: "#ccc",
    width: 350,
    height: 50,
    backgroundColor: '#222',
    borderRadius: 10,
    paddingHorizontal: 15,
    color: '#FFF',
    marginTop: 20,
  },
  login: {
    width: 350,
    flexDirection: "row",
    height: 40,
    backgroundColor: '#fcb1d6',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
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

export default Login;
