import { Text, View, SafeAreaView, TouchableOpacity, TextInput, StyleSheet, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React, { useState } from 'react';
import { Stack, useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

//firebase stuff
import socket from '../config/socket'
import {firebase_auth} from '../config/firebase'
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';


const Signup1 = () => {    
    const router = useRouter();
    

    //firebase stuff
    const auth = firebase_auth;
    const socketClient = socket;
    
    // State to handle input values
    const [name, setName] = useState('');
    const [dob, setDob] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [insta, setInsta] = useState('');

    //edited to handle firebase calls
    const handleNext =  async () => {
        await handleAuth();
        const user = auth.currentUser;
        const uid = user.uid;
        const body = {
            id: uid,
            name: name,
            email: email,
            password: password,
            insta: insta
        }

        try {
            const response = await fetch(`${Constants.expoConfig?.extra?.apiUrl}/api/user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
            })
  
            if (!response.ok) {
            throw new Error('Error: ' + response.status);
            }
            const result = await response.json();
            console.log('Success:', result);
  
  
            if (user) {
              console.log("SUCCESS");
              socketClient.auth = { userID: user.uid };
              socketClient.connect();
              router.push('/signup2')
            }
  
  
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }

        router.push('/signup2')
    }


    const handleAuth = async () => {
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log(response);
        } catch (error) {
            console.log(error)
        }
    }


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
                    maxLength={8}
                    textContentType='birthdate'
                    keyboardType='decimal-pad'
                    onChangeText={setDob}
                />

                {/* Email Input */}
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#999"
                    keyboardType="email-address"
                    textContentType='emailAddress'
                    value={email}
                    onChangeText={setEmail}
                />

                {/* Password Input */}
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#999"
                    secureTextEntry
                    textContentType='password'
                    value={password}
                    onChangeText={setPassword}
                />

                {/* Confirm Password Input */}
                <TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
                    placeholderTextColor="#999"
                    secureTextEntry
                    textContentType='password'
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />

                {/* Address */}
                <TextInput
                    style={styles.input}
                    placeholder="Instagram Username"
                    placeholderTextColor="#999"
                    value={insta}
                    onChangeText={setInsta}
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
