import React, { useState } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, StyleSheet, ScrollView, Image, ActivityIndicator } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore"; // Firestore imports
import { auth, storage, db } from '../config/firebase';

const Signup2 = () => {    
    const router = useRouter();
    
    const [images, setImages] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadedUrls, setUploadedUrls] = useState([]);

    // const auth = getAuth();
    // const storage = getStorage();
    // const db = getFirestore(); // Initialize Firestore

    const pickImages = async () => {
        if (images.length >= 3) return;

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
            selectionLimit: 3 - images.length,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImages([...images, ...result.assets.map(asset => asset.uri)]);
        }
    };

    const uploadImage = async (uri, index) => {
        try {
            setIsUploading(true);

            const response = await fetch(uri);
            const blob = await response.blob();

            const userId = auth.currentUser?.uid || "anonymous";
            const storageRef = ref(storage, `profile_pictures/${userId}/${index + 1}.jpg`);

            await uploadBytes(storageRef, blob);
            const url = await getDownloadURL(storageRef);

            setUploadedUrls(prev => [...prev, url]);
            console.log(`Image ${index + 1} uploaded: ${url}`);
        } catch (error) {
            console.error("Error uploading image:", error);
        } finally {
            setIsUploading(false);
        }
    };

    const saveImageUrlsToFirestore = async () => {
        const userId = auth.currentUser?.uid;

        if (!userId) {
            console.error("No user ID found. Make sure the user is authenticated.");
            return;
        }

        try {
            // Save image URLs to Firestore under the user's document
            const userDocRef = doc(db, "users", userId);
            await setDoc(userDocRef, { profilePictures: uploadedUrls }, { merge: true });
            console.log("Image URLs saved to Firestore successfully!");
        } catch (error) {
            console.error("Error saving image URLs to Firestore:", error);
        }
    };

    const handleUploadAll = async () => {
        for (let i = 0; i < images.length; i++) {
            await uploadImage(images[i], i);
        }

        // Save URLs to Firestore once all uploads are complete
        await saveImageUrlsToFirestore();
        router.push('/tabs'); // Navigate to the next screen
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
            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 30, paddingHorizontal:30}}>
                ... and what's a dating app without pictures?
            </Text>
            <ScrollView contentContainerStyle={{ alignItems:'center', marginTop: 10, paddingBottom:350}}>
                
                {images.length < 3 && (
                    <TouchableOpacity style={styles.upload} onPress={pickImages}>
                        <Feather name="upload" size={100} color="#999" />
                        <Text style={{fontWeight: "500", color:"#999", fontSize: 24, marginTop: 10}}>
                            Upload {3 - images.length} pictures
                        </Text>
                    </TouchableOpacity>
                )}

                {images.length > 0 && (
                    <ScrollView 
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ alignItems: 'center', marginVertical: 20 }}
                    >
                        {images.map((uri, index) => (
                            <Image 
                                key={index}
                                source={{ uri }} 
                                style={styles.uploadedImage} 
                            />
                        ))}
                    </ScrollView>
                )}

                {isUploading && <ActivityIndicator size="large" color="#FFF" style={{ marginVertical: 20 }} />}

                <View style={{ flex:1, width:'100%', alignItems: 'center', marginTop: 30 }}>
                    <TouchableOpacity 
                        onPress={handleUploadAll} 
                        style={[styles.next, isUploading && { backgroundColor: '#444' }]}
                        disabled={isUploading || images.length === 0}
                    >
                        <Text style={{ textAlign: "center", color: "#FFF" }}>Let's jam!</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    upload: {
        width: 350,
        height: 400,
        backgroundColor: '#222',
        borderRadius: 15,
        paddingHorizontal: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
    },
    uploadedImage: {
        width: 350,
        height: 400,
        borderRadius: 15,
        marginHorizontal: 5,
    },
    next: {
        width: 350,
        height: 40,
        backgroundColor: '#92d4fa',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Signup2;
