import { Text, View, SafeAreaView, TouchableOpacity, TextInput, StyleSheet, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { Stack, useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

const Settings = () => {    
    const router = useRouter();
    
    // State to handle input values
    const [name, setName] = useState('');
    const [dob, setDob] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [insta, setInsta] = useState('');

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
            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 30, paddingHorizontal:30}}>
                Change settings...
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
                    onChangeText={setDob}
                />

                {/* Email Input */}
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#999"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                />

                {/* Password Input */}
                <TextInput
                    style={styles.input}
                    placeholder="New Password"
                    placeholderTextColor="#999"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />

                {/* Confirm Password Input */}
                <TextInput
                    style={styles.input}
                    placeholder="Confirm New Password"
                    placeholderTextColor="#999"
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />

                {/* Instagram Handle Input */}
                <TextInput
                    style={styles.input}
                    placeholder="Instagram Username"
                    placeholderTextColor="#999"
                    value={insta}
                    onChangeText={setInsta}
                />

                {/* Next Button */}
                <View style={{ flex:1, width:'100%', alignItems: 'center', marginTop: 30 }}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.next}>
                        <Text style={{ textAlign: "center", color: "#FFF" }}>Save</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
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

export default Settings;
