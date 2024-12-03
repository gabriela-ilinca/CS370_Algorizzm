import { Text, View, SafeAreaView, TouchableOpacity, TextInput, StyleSheet, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React, { useState } from 'react';
import { Stack, useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

// Firebase imports
import { auth } from '../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

// Initialize Firestore
const db = getFirestore();

const Signup = () => {
    const router = useRouter();
    
    // State to handle input values
    const [name, setName] = useState('');
    const [dob, setDob] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [insta, setInsta] = useState('');

    const handleNext = async () => {
        if (password !== confirmPassword) {
            console.error("Passwords do not match");
            return;
        }
        try {
            // Create user with email and password
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // After creating the user, store additional fields in Firestore
            await setDoc(doc(db, 'users', user.uid), {
                name,
                dob,
                email,
                insta,
            });

            console.log("User signed up and additional data saved:", user);
            router.push('/signup1');
        } catch (error) {
            console.error("Error signing up:", error.message);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 30, paddingHorizontal: 30 }}>
                    Let's get you set up
                </Text>
                <ScrollView contentContainerStyle={{ alignItems:'center', marginTop: 10, paddingBottom: 350 }}>
                    {/* Input fields */}
                    <TextInput style={styles.input} placeholder="Name (how you want it to appear on your profile)" placeholderTextColor="#999" value={name} onChangeText={setName} />
                    <TextInput style={styles.input} placeholder="Date of Birth (MM/DD/YYYY)" placeholderTextColor="#999" value={dob} maxLength={8} keyboardType='decimal-pad' onChangeText={setDob} />
                    <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#999" keyboardType="email-address" value={email} onChangeText={setEmail} />
                    <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#999" secureTextEntry value={password} onChangeText={setPassword} />
                    <TextInput style={styles.input} placeholder="Confirm Password" placeholderTextColor="#999" secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} />
                    <TextInput style={styles.input} placeholder="Instagram Username" placeholderTextColor="#999" value={insta} onChangeText={setInsta} />

                    {/* Next button */}
                    <View style={{ flex: 1, width: '100%', alignItems: 'center', marginTop: 30 }}>
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

export default Signup;
