import { Text, View, SafeAreaView, TouchableOpacity, TextInput, StyleSheet, ScrollView, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { database } from '../firebase.js'; // Ensure you have a firebase.js file set up correctly
import { ref, set, onValue } from 'firebase/database';


const Signup1 = () => {    
    const router = useRouter();
    const { query } = useLocalSearchParams();  // Retrieve dynamic user parameter from URL

    
    // State to handle input values
    const [name, setName] = useState('');
    const [dob, setDob] = useState('');
    const [insta, setInsta] = useState('');
    const [location, setLocation] = useState('');
    const [bio, setBio] = useState('');
    //boolean var, receivedForm, to check if form has been received
    const [receivedForm, setReceivedForm] = useState(false);
    const [userData, setUserData] = useState(user || 'missing');

    
   

    const handleNext = async () => {
        const data = {
            name: name,
            dob: dob,
            insta: insta,
            location: location,
            bio: bio
          };
          //get user data from router
          console.log("handleNext")
          try {
            
            if (!query) {
                console.log('No user data found');
            } else {
                setUserData(query);  // Set the user data once it's available
            }
            console.log("user: ", userData); // log username



            // Write to Firebase
            if (name.trim() === '' || dob.trim() === '' || insta.trim() === '' || location.trim() === '' || bio.trim() === '') {
                alert('Please enter a value for all fields!');
                return;
              }
            if ( receivedForm === true){
                alert('Form has already been submitted');
                return;
                }
              console.log("form: ", data);
              set(ref(database,`${userData}/form`), { data })
              .then(() => alert('Data written successfully!'))
                .catch((error) => alert('Error writing data: ' + error.message));
          
                setName(''); // Clear input after write
                setDob(''); // Clear input after write
                setInsta(''); // Clear input after write
                setLocation(''); // Clear input after write
                setBio(''); // Clear input after write
                setReceivedForm(true);
            router.push('/tabs')

          } catch (error) {
            Alert.alert('Error', error.message);
          }
  


    };



    



    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 30, paddingHorizontal:30}}>
                Just a bit more information...
            </Text>
            <ScrollView contentContainerStyle={{ alignItems:'center', marginTop: 10, paddingBottom:350}}>
                
                {/* Name Input */}
                <TextInput
                    style={styles.input}
                    placeholder="Name (how you want it to appear on your profile)"
                    placeholderTextColor="#999"
                    value={name}
                    onChangeText={setName}
                />

                {/* Date of Birth Input */}
                <TextInput
                    style={styles.input}
                    placeholder="Date of Birth (MM/DD/YYYY)"
                    placeholderTextColor="#999"
                    value={dob}
                    maxLength={10}
                    textContentType='birthdate'
                    keyboardType='decimal-pad'
                    onChangeText={setDob}
                />

                
                {/* IG */}
                <TextInput
                    style={styles.input}
                    placeholder="Instagram Username"
                    placeholderTextColor="#999"
                    value={insta}
                    onChangeText={setInsta}
                />

                {/*Location */}
                 <TextInput
                    style={styles.input}
                    placeholder="City, State"
                    placeholderTextColor="#999"
                    value={location}
                    maxLength={30}
                    textContentType='location'
                    onChangeText={setLocation}
                />

                {/*Bio*/}
                <TextInput
                    style={styles.input}
                    placeholder="Introduce yourself! (600 characters max)"
                    placeholderTextColor="#999"
                    value={bio}
                    maxLength={600}
                    textContentType='none'
                    onChangeText={setBio}
                />

                {/* Next Button */}
                <View style={{ flex:1, width:'100%', alignItems: 'center', marginTop: 30 }}>
                    <TouchableOpacity onPress={handleNext} style={styles.next}>
                        <Text style={{ textAlign: "center", color: "#FFF" }}>Next</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    input: {
        width: 350,
        height: 50,
        backgroundColor: '#222',
        borderRadius: 10,
        paddingHorizontal: 15,
        color: '#FFF',
        marginTop: 20,
    },
    next: {
        width: 350,
        height: 40,
        backgroundColor: '#fcb1d6',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Signup1;
