import { images } from '../../assets';
import { Text, View, ScrollView, TouchableOpacity, StyleSheet, Image, Dimensions, SafeAreaView, ActivityIndicator, Linking } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useRouter, Stack } from 'expo-router';
import Carousel from 'react-native-reanimated-carousel';
import { db, storage, auth } from '../../config/firebase';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
import Ionicons from '@expo/vector-icons/Ionicons';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const { width } = Dimensions.get('window');

const Profile = () => {    
    const router = useRouter();
    const [user, setUser] = useState(null); 
    const [loading, setLoading] = useState(true);
    const [pics, setPics] = useState([]);

    
    
    const fetchUser = async () => {
        try {
            setLoading(true);
            const currentUserId = auth.currentUser?.uid;

            const fetchFirestoreData = async () => {
                const userDocRef = doc(db, 'users', currentUserId);
                const userDocSnap = await getDoc(userDocRef);
            
                if (userDocSnap.exists()) {
                    const userData = userDocSnap.data();
                    return userData;
                } else {
                    console.warn("No user document found!");
                    return {};
                }
            };
    
            if (!currentUserId) {
                throw new Error("User not logged in.");
            }
    
            // Fetch user data from Firestore
            const userData = await fetchFirestoreData();
    
            // Fetch profile pictures
            const profilePicsPromises = [1, 2, 3].map(async (index) => {
                try {
                    const picRef = ref(storage, `profile_pictures/${currentUserId}/${index}.jpg`);
                    return await getDownloadURL(picRef);
                } catch (error) {
                    console.error(`Error fetching profile picture ${index}:`, error);
                    return null;
                }
            });
    
            const profilePics = await Promise.all(profilePicsPromises);
    
            setUser({
                name: userData.name || 'Anonymous',
                ig: userData.insta || 'No Instagram',
                recently_played: userData.spotifyData?.recently_played || [],
                top_songs: userData.spotifyData?.top_tracks || [],
                top_artists: userData.spotifyData?.top_artists || [],
                pic1: profilePics[0] || null,
                pic2: profilePics[1] || null,
                pic3: profilePics[2] || null,
            });
    
            setPics(profilePics.map((pic) => ({ uri: pic })));
        } catch (error) {
            console.error("Error fetching user data:", error);
        } finally {
            setLoading(false);
        }
    };
    
    
    useEffect(() => {
        fetchUser();
    }, []);

    const handlePlay1 = () => {
        Linking.openURL(user.recently_played[0]?.link);
    }
    const handlePlay2 = () => {
        Linking.openURL(user.recently_played[1]?.link);
    }
    const handlePlay3 = () => {
        Linking.openURL(user.recently_played[2]?.link);
    }
    const handlePlay4 = () => {
        Linking.openURL(user.recently_played[3]?.link);
    }
    const handlePlay5 = () => {
        Linking.openURL(user.recently_played[4]?.link);
    }

    const pickImages = async (index) => {
        console.log("Starting image selection process...");
    
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: false,
            quality: 1,
        });
    
        console.log("Result from ImagePicker:", result);
    
        if (!result.canceled) {
            try {
                const imageUri = result.assets[0].uri;
                console.log("Selected image URI:", imageUri);
    
                const newPics = [...pics];
                newPics[index] = { uri: imageUri };
                setPics(newPics);
    
                // Prepare image for upload
                const imageName = `profile_pictures/${auth.currentUser.uid}/${index + 1}.jpg`; // Use index+1 to differentiate images
                const imageRef = ref(storage, imageName);
    
                const response = await fetch(imageUri);
                const blob = await response.blob();
                console.log("Blob created successfully:", blob);
    
                // Upload the image
                await uploadBytes(imageRef, blob);
                console.log(`Image uploaded successfully to Firebase Storage as ${imageName}`);
    
                // Get the download URL
                const downloadUrl = await getDownloadURL(imageRef);
                console.log("Download URL:", downloadUrl);
    
                // Update Firestore with the new image URL
                const userRef = doc(db, 'users', auth.currentUser.uid);
                const fieldName = `pic${index + 1}`; // Map to pic1, pic2, pic3
                await updateDoc(userRef, { [fieldName]: downloadUrl });
    
                console.log(`Firestore updated successfully for ${fieldName}`);
            } catch (error) {
                console.error("Error during image upload or Firestore update:", error);
            }
        }
    };
    

    if (loading) {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#111111' }}>
                <Stack.Screen
                options={{ 
                    headerShown: false,
                    headerTitle: "",
                    headerStyle: {
                        backgroundColor: '#111111',
                    },
                    headerShadowVisible: false,
                }}
                />
                <ActivityIndicator size="large" color="#FFF" />
            </SafeAreaView>
        );
    }

    if (!user) {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#111111' }}>
                <Text style={{ color: 'white' }}>No user data available.</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={{ backgroundColor: '#111111' }}>
            <Stack.Screen
                options={{
                    headerShown: true,
                    headerTitle: "My Profile",
                    headerTitleStyle: { color: '#FFF' },
                    headerStyle: { backgroundColor: '#111111' },
                    headerShadowVisible: false,
                    headerRight: () => (
                        <Ionicons 
                            name="settings-outline" size={25} 
                            color="#FFF" 
                            style={{ marginHorizontal: 20 }} 
                            onPress={() => router.push('../settings')} 
                        />
                    ),
                }}
            />
            <ScrollView contentContainerStyle={{ alignItems: 'center', marginTop: 10, paddingBottom: 140 }} showsVerticalScrollIndicator={false}>
                {/* Centered View for Carousel */}
                <View style={{ width: width, alignItems: 'center', marginTop: 20 }}>
                    <Carousel
                        loop={false}
                        width={width}
                        height={400}
                        itemWidth={width * 0.9}
                        data={pics}
                        scrollAnimationDuration={500}
                        renderItem={({ item, index }) => (
                            <View style={styles.imageContainer}>
                                <Image 
                                    source={{ uri: item.uri || item }} 
                                    style={styles.uploadedImage} 
                                    resizeMode='cover'
                                />
                                <TouchableOpacity style={styles.editButton} onPress={() => pickImages(index)}>
                                    <Ionicons name="create-outline" size={30} color="#FFF" />
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                </View>

                {/* Name */}
            <View style={{ flex: 1, width: width * 0.9, alignItems: 'flex-start', marginTop: -20 }}>
                <Text style={{ textAlign: "center", color: "#FFF", fontWeight: 'bold', fontSize: 25}}>{user.name}</Text>
                <Text style={{ textAlign: "center", color: "#FFF", marginTop: 5 }}>@{user.ig}</Text>
            </View>

            {/* Prompt */}
            <View style={styles.promptContainer}>
                <Text style={{ textAlign: 'left', color: "#FFF", fontWeight: 'bold', fontSize: 20}}>Currently stuck in my head...</Text>
                <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                    {/* 1 */}
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '95%', backgroundColor: 
                        '#333', borderRadius:10, padding: 10, marginBottom: 10, marginTop: 10}}>
                        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                            <View style={{height: 40, width: 40, overflow: 'hidden', borderRadius: 5}}>
                                
                                <Image 
                                    source={user.recently_played[0]?.thumbnail ? { uri: user.recently_played[0]?.thumbnail } : null}
                                    style={{ height: '100%', width: '100%' }}
                                    resizeMode="cover"
                                />
                            </View>
                            <View style={{paddingHorizontal: 10, width: width * 0.5}}>
                                <Text 
                                numberOfLines={1} 
                                ellipsizeMode="tail"
                                style={{ textAlign: 'left', color: "#FFF", marginTop: 5 }}>{user.recently_played[0]?.title}</Text>
                                <Text 
                                numberOfLines={1} 
                                ellipsizeMode="tail"
                                style={{ textAlign: 'left', color: "#888", marginTop: 5, }}>{user.recently_played[0]?.artist}</Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress={handlePlay1}>
                            <Ionicons name="play-circle-outline" size={40} color="#ffffff" style={{marginHorizontal: 10}}/> 
                        </TouchableOpacity>
                    </View>
                    {/* 2 */}
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '95%', backgroundColor:
                        '#333', borderRadius:10, padding: 10, marginBottom: 10}}>
                        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                            <View style={{height: 40, width: 40, overflow: 'hidden', borderRadius: 5}}>
                               
                                <Image
                                    source={user.recently_played[1]?.thumbnail ? { uri: user.recently_played[1]?.thumbnail } : null}
                                    style={{ height: '100%', width: '100%' }}
                                    resizeMode="cover"
                                />
                            </View>
                            <View style={{paddingHorizontal: 10, width: width * 0.5}}>
                                <Text
                                numberOfLines={1}
                                ellipsizeMode="tail"
                                style={{ textAlign: 'left', color: "#FFF", marginTop: 5 }}>{user.recently_played[1]?.title}</Text>
                                <Text
                                numberOfLines={1}
                                ellipsizeMode="tail"
                                style={{ textAlign: 'left', color: "#888", marginTop: 5, }}>{user.recently_played[1]?.artist}</Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress={handlePlay2}>
                            <Ionicons name="play-circle-outline" size={40} color="#ffffff" style={{marginHorizontal: 10}}/>
                        </TouchableOpacity>
                    </View>
                    {/* 3 */}
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '95%', backgroundColor:
                        '#333', borderRadius:10, padding: 10, marginBottom: 10}}>
                        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                            <View style={{height: 40, width: 40, overflow: 'hidden', borderRadius: 5}}>
                               
                                <Image
                                    source={user.recently_played[2]?.thumbnail ? { uri: user.recently_played[2]?.thumbnail } : null}
                                    style={{ height: '100%', width: '100%' }}
                                    resizeMode="cover"
                                />
                            </View>
                            <View style={{paddingHorizontal: 10, width: width * 0.5}}>
                                <Text
                                numberOfLines={1}
                                ellipsizeMode="tail"
                                style={{ textAlign: 'left', color: "#FFF", marginTop: 5 }}>{user.recently_played[2]?.title}</Text>
                                <Text
                                numberOfLines={1}
                                ellipsizeMode="tail"
                                style={{ textAlign: 'left', color: "#888", marginTop: 5, }}>{user.recently_played[2]?.artist}</Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress={handlePlay3}>
                            <Ionicons name="play-circle-outline" size={40} color="#ffffff" style={{marginHorizontal: 10}}/>
                        </TouchableOpacity>
                    </View>
                    {/* 4 */}
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '95%', backgroundColor:
                        '#333', borderRadius:10, padding: 10, marginBottom: 10}}>
                        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                            <View style={{height: 40, width: 40, overflow: 'hidden', borderRadius: 5}}>
                               
                                <Image
                                    source={user.recently_played[3]?.thumbnail ? { uri: user.recently_played[3]?.thumbnail } : null}
                                    style={{ height: '100%', width: '100%' }}
                                    resizeMode="cover"
                                />
                            </View>
                            <View style={{paddingHorizontal: 10, width: width * 0.5}}>
                                <Text
                                numberOfLines={1}
                                ellipsizeMode="tail"
                                style={{ textAlign: 'left', color: "#FFF", marginTop: 5 }}>{user.recently_played[3]?.title}</Text>
                                <Text
                                numberOfLines={1}
                                ellipsizeMode="tail"
                                style={{ textAlign: 'left', color: "#888", marginTop: 5, }}>{user.recently_played[3]?.artist}</Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress={handlePlay4}>
                            <Ionicons name="play-circle-outline" size={40} color="#ffffff" style={{marginHorizontal: 10}}/>
                        </TouchableOpacity>
                    </View>
                   {/* 5 */}
                   <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '95%', backgroundColor:
                        '#333', borderRadius:10, padding: 10, marginBottom: 10}}>
                        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                            <View style={{height: 40, width: 40, overflow: 'hidden', borderRadius: 5}}>
                               
                                <Image
                                    source={user.recently_played[4]?.thumbnail ? { uri: user.recently_played[4]?.thumbnail } : null}
                                    style={{ height: '100%', width: '100%' }}
                                    resizeMode="cover"
                                />
                            </View>
                            <View style={{paddingHorizontal: 10, width: width * 0.5}}>
                                <Text
                                numberOfLines={1}
                                ellipsizeMode="tail"
                                style={{ textAlign: 'left', color: "#FFF", marginTop: 5 }}>{user.recently_played[4]?.title}</Text>
                                <Text
                                numberOfLines={1}
                                ellipsizeMode="tail"
                                style={{ textAlign: 'left', color: "#888", marginTop: 5, }}>{user.recently_played[4]?.artist}</Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress={handlePlay5}>
                            <Ionicons name="play-circle-outline" size={40} color="#ffffff" style={{marginHorizontal: 10}}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>


           
            {/* Top 5 Songs */}
            <View style={styles.top5Container}>
                <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
                    <Text style={{ textAlign: 'left', color: "#FFF", fontWeight: 'bold', fontSize: 20}}>My top 5 songs...</Text>
                    <View style={{height:30, width:30, overflow: 'hidden', marginHorizontal: 10}}>
                        {/* Spotify logo */}
                        <Image source={images.spotify} style={{width:'100%', height:'100%'}} resizeMode='cover' />
                    </View>
                </View>
                <View style={{padding: 15, 
                    justifyContent: 'space-around', 
                    flexDirection: 'column', 
                    flex: 1}}>
                    <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{ textAlign: 'left', color: "#FFF", fontWeight: 'bold', fontSize: 20, marginBottom: 10}}>1. {user.top_songs[0]}
                    </Text>
                    <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{ textAlign: 'left', color: "#FFF", fontWeight: 'bold', fontSize: 20, marginBottom: 10}}>2. {user.top_songs[1]}
                    </Text>
                    <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{ textAlign: 'left', color: "#FFF", fontWeight: 'bold', fontSize: 20, marginBottom: 10}}>3. {user.top_songs[2]}
                    </Text>
                    <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{ textAlign: 'left', color: "#FFF", fontWeight: 'bold', fontSize: 20, marginBottom: 10}}>4. {user.top_songs[3]}
                    </Text>
                    <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{ textAlign: 'left', color: "#FFF", fontWeight: 'bold', fontSize: 20, marginBottom: 10}}>5. {user.top_songs[4]}
                    </Text>
                </View>
            </View>


            {/* Top 5 Artists */}
            <View style={styles.top5Container}>
                <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
                    <Text style={{ textAlign: 'left', color: "#FFF", fontWeight: 'bold', fontSize: 20}}>My top 5 artists...</Text>
                    <View style={{height:30, width:30, overflow: 'hidden', marginHorizontal: 10}}>
                        <Image source={images.spotify} style={{width:'100%', height:'100%'}} resizeMode='cover' />
                    </View>
                </View>
                <View style={{padding: 15, 
                    justifyContent: 'space-around', 
                    flexDirection: 'column', 
                    flex: 1}}>
                    <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{ textAlign: 'left', color: "#FFF", fontWeight: 'bold', fontSize: 20, marginBottom: 10}}>1. {user.top_artists[0]}
                    </Text>
                    <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{ textAlign: 'left', color: "#FFF", fontWeight: 'bold', fontSize: 20, marginBottom: 10}}>2. {user.top_artists[1]}
                    </Text>
                    <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{ textAlign: 'left', color: "#FFF", fontWeight: 'bold', fontSize: 20, marginBottom: 10}}>3. {user.top_artists[2]}
                    </Text>
                    <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{ textAlign: 'left', color: "#FFF", fontWeight: 'bold', fontSize: 20, marginBottom: 10}}>4. {user.top_artists[3]}
                    </Text>
                    <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{ textAlign: 'left', color: "#FFF", fontWeight: 'bold', fontSize: 20, marginBottom: 10}}>5. {user.top_artists[4]}
                    </Text>
                </View>
            </View>

            
            

            
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    imageContainer: {
        width: width * 0.9, // Match this to itemWidth in Carousel
        height: width * 0.9,
        backgroundColor: '#222',
        borderRadius: 10,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    uploadedImage: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    editButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        //backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 20,
        //padding: 10,
    },
    top5Container: {
        width: width * 0.9, // Match this to itemWidth in Carousel
        height: width * 0.9,
        backgroundColor: '#222',
        borderRadius: 10,
        marginTop: 35,
        padding: 10,
    },
    promptContainer: {
        width: width * 0.9, // Match this to itemWidth in Carousel
        //height: width * 1.2,
        backgroundColor: '#222',
        borderRadius: 10,
        marginTop: 35,
        padding: 10,
    },
});

export default Profile;
