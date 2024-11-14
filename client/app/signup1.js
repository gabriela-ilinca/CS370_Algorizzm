import { Text, View, SafeAreaView, TouchableOpacity, TextInput, StyleSheet, ScrollView, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Stack, useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';


const Signup1 = () => {    
    const router = useRouter();
    
    // State to handle input values
    const [name, setName] = useState('');
    const [dob, setDob] = useState('');
    const [insta, setInsta] = useState('');
    const [location, setLocation] = useState('');
    const [bio, setBio] = useState('');


    const handleNext = async () => {
        const data = {
            name: name,
            dob: dob,
            insta: insta,
            location: location,
            bio: bio
          };
          try {
            // Make a POST request to your Flask backend
            const response = await fetch('http://127.0.0.1:8080/receive_form', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
            });
      
            if (response.ok) {
              const jsonResponse = await response.json();
              Alert.alert('Success', jsonResponse.message);
            } else {
              Alert.alert('Error', 'Something went wrong. Please try again.');
            }
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
