import { Text, View, SafeAreaView, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import React, { useState } from 'react';
import { Stack, useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import * as ImagePicker from 'expo-image-picker';

const Signup2 = () => {    
    const router = useRouter();
    
    // State to store selected images
    const [images, setImages] = useState([]);

    const pickImages = async () => {
        if (images.length >= 3) return; // Allow only 3 images
        
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
            selectionLimit: 3 - images.length, // Limit to 3 images
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImages([...images, ...result.assets.map(asset => asset.uri)]); // Add selected images
        }
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
                
                {/* Display uploaded images or upload button */}
                {images.length < 3 && (
                    <TouchableOpacity style={styles.upload} onPress={pickImages}>
                        <Feather name="upload" size={100} color="#999" />
                        <Text style={{fontWeight: "500", color:"#999", fontSize: 24, marginTop: 10}}>
                            Upload {3 - images.length} pictures
                        </Text>
                    </TouchableOpacity>
                )}

                {/* Horizontal scroll view for images */}
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

                {/* Next Button */}
                <View style={{ flex:1, width:'100%', alignItems: 'center', marginTop: 30 }}>
                    <TouchableOpacity onPress={() => router.push('/tabs')} style={styles.next}>
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
