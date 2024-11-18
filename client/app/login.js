import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, SafeAreaView, StyleSheet, TouchableOpacity, Dimensions, Image, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { images } from '../assets';
import { database } from './firebase.js'; // Ensure you have a firebase.js file set up correctly
import { ref, set, onValue } from 'firebase/database';
import axios from 'axios';





const { width } = Dimensions.get('window');
const margin = 20;
const length = width - margin * 2;

const Login = () => {

  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);


  const handleLogin = async () => {
    //ready to send username and password state vars to firebase for auth
    // Write to Firebase
      if (username.trim() === '' || password.trim() === '') {
        alert('Please enter a value for both fields!');
        return;
      }
      console.log("name: ", username);
      set(ref(database, `${username}`), { value: username })
      set(ref(database, `${username}/password/`), { value: password })
      .then(() => alert('Data written successfully!'))
        .catch((error) => alert('Error writing data: ' + error.message));
  
        ssetUername(''); // Clear input after write
        setPassword(''); // Clear input after write
        router.push('/tabs')
  }

  const handleSpotifyLogin = async () => {
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
 router.push('/tabs')
}        /*
       
      } catch (error) {
          console.error('Error logging in:', error);
        }
      //send them to singup 1
      router.push('/tabs')
  
      };
    

/*
  const [inputValue, setInputValue] = useState('');
  const [data, setData] = useState('No data yet');

  //Write to Firebase
  const writeToDatabase = () => {
    if (inputValue.trim() === '') {
      alert('Please enter a value!');
      return;
    }

    set(ref(database, 'example/'), { value: inputValue })
      .then(() => alert('Data written successfully!'))
      .catch((error) => alert('Error writing data: ' + error.message));

    setInputValue(''); // Clear input after write
  };

  // Read from Firebase
  useEffect(() => {
    const dataRef = ref(database, 'example/');
    const unsubscribe = onValue(dataRef, (snapshot) => {
      const value = snapshot.val();
      setData(value ? value.value : 'No data found');
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);
  */




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
            placeholder="Email"
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
            <TouchableOpacity onPress={handleLogin} style={styles.login}>
              <Text style={{ textAlign: "left", color: "#FFF" }}>Log in</Text>
            </TouchableOpacity>

            <View style={{flexDirection: 'row', justifyContent: 'space-evenly', width: '100%', marginVertical: 20, alignItems: 'center'}}>
              {/* <View style={{height: 1, width: 100, backgroundColor: 'white'}}/> */}
              <Text style={{color:'white'}}>Or</Text>
              {/* <View style={{height: 1, width: 100, backgroundColor: 'white'}}/> */}
            </View>
           
            <TouchableOpacity onPress={handleSpotifyLogin} style={styles.spotify}>
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
  fail: {
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
    borderWidth: 1,
    borderColor: 'red'
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
