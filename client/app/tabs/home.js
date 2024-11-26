import { Text, View, SafeAreaView, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Stack } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feed from '../../components/feed';
import { db, storage, auth } from '../../config/firebase';
import { collection, getDocs, doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';

const Home = () => {    
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [liked, setLiked] = useState(null)



    const handleSkip=()=> {
        fetchRandomUser();
    }

    const handleLike = async () => {
        if (!user) return; // Safeguard if no user is fetched

        try {
            const currentUserId = auth.currentUser.uid; // Get current user's UID
            const likedUserId = user.id; // Get the UID of the liked user

            if (liked) {
                // Unlike logic: Remove UIDs from both users' fields
                const currentUserRef = doc(db, "users", currentUserId);
                const likedUserRef = doc(db, "users", likedUserId);

                await updateDoc(currentUserRef, {
                    iLiked: arrayRemove(likedUserId), // Remove liked user's UID from "iLiked"
                });

                await updateDoc(likedUserRef, {
                    likedMe: arrayRemove(currentUserId), // Remove current user's UID from "likedMe"
                });

                console.log(`Unliked user: ${likedUserId}`);
            } else {
                // Like logic: Add UIDs to both users' fields
                const currentUserRef = doc(db, "users", currentUserId);
                const likedUserRef = doc(db, "users", likedUserId);

                await updateDoc(currentUserRef, {
                    iLiked: arrayUnion(likedUserId), // Add liked user's UID to "iLiked"
                });

                await updateDoc(likedUserRef, {
                    likedMe: arrayUnion(currentUserId), // Add current user's UID to "likedMe"
                });

                console.log(`Liked user: ${likedUserId}`);
            }

            // Toggle the local liked state
            setLiked(!liked);
        } catch (error) {
            console.error("Error toggling like status:", error);
        }
    };

    const fetchRandomUser = async () => {
        try {
            // Fetch all user profiles
            setLoading(true);
            const usersCollection = collection(db, "users");
            const snapshot = await getDocs(usersCollection);
            const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
            console.log("Users fetched: ", users);  // Check the fetched data
    
            if (users.length === 0) {
                console.error("No users found in Firestore.");
                return;
            }
    
            // Get the current user's ID (replace this with your actual method of getting the current user's ID)
            const currentUserId = auth.currentUser.uid;
    
            // Select a random user, ensuring it's not the current user
            let randomUser;
            do {
                randomUser = users[Math.floor(Math.random() * users.length)];
            } while (randomUser.id === currentUserId);  // Ensure it's not the current user
    
            console.log("Random user: ", randomUser);  // Check the random user data
    
            // Safeguard access to Firestore data (in case fields are missing)
            const userData = {
                ...randomUser,
                pic1: null,  // Default profile pictures to null (you'll need to handle actual profile pictures later)
                pic2: null,
                pic3: null,
                likedMe: randomUser.likedMe || [],  // Default to empty array if missing
                recently_played: randomUser.spotifyData.recently_played || [],  // Default to empty array if missing
                top_songs: randomUser.spotifyData.top_tracks || [],  // Default to empty array if missing
                top_artists: randomUser.spotifyData.top_artists || [],  // Default to empty array if missing
                name: randomUser.name || 'Anonymous',  // Default to 'Anonymous' if name is missing
                ig: randomUser.insta || 'No Instagram',  // Default to 'No Instagram' if insta is missing
            };
    
            // Fetch profile pictures from Firebase Storage (if they exist)
            const profilePicsPromises = [1, 2, 3].map(async (index) => {
                try {
                    const picRef = ref(storage, `profile_pictures/${randomUser.id}/${index}.jpg`);
                    return await getDownloadURL(picRef);  // Fetch the URL for the image
                } catch (error) {
                    console.error(`Error fetching profile picture ${index}:`, error);
                    return null;  // Return null if there's an error
                }
            });
    
            const profilePics = await Promise.all(profilePicsPromises);
    
            // Combine all data into the user object
            const userWithPics = {
                ...userData,
                pic1: profilePics[0] || null,
                pic2: profilePics[1] || null,
                pic3: profilePics[2] || null,
            };
    
            // Set the user with all their data
            setUser(userWithPics);
    
            console.log('user data: ', userWithPics);
    
            // After setting user, check if they liked you (update liked state)
            if (userWithPics.likedMe && userWithPics.likedMe.includes(currentUserId)) {
                setLiked(true);
            } else {
                setLiked(false);
            }
    
        } catch (error) {
            console.error("Error fetching user data:", error);
        } finally {
            setLoading(false);
        }
    };
    
    // Effect to fetch random user when the component mounts
    useEffect(() => {
        fetchRandomUser();
    }, []);
    
    // This effect runs whenever the `user` state changes
    useEffect(() => {
        if (user) {
            const currentUserId = auth.currentUser.uid;
            // Check if the user likes you or not (based on likedMe)
            if (user.likedMe && user.likedMe.includes(currentUserId)) {
                setLiked(true);
            } else {
                setLiked(false);
            }
        }
    }, [user]);  // Runs when `user` state changes

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
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:'#111111' }}>
            <Stack.Screen
                options={{ 
                    headerShown: true,
                    headerTitle: "",
                    headerStyle: {
                        backgroundColor: '#111111',
                    },
                    headerShadowVisible: false,
                }}
            />
            <View>
                <Feed 
                    pic1={user.pic1 ? { uri: user.pic1 } : null}  // Ensure Image receives a valid URL
                    pic2={user.pic2 ? { uri: user.pic2 } : null}
                    pic3={user.pic3 ? { uri: user.pic3 } : null}
                    name={user.name}
                    ig={user.ig}
                    playing1Thumbnail={user.recently_played[0]?.thumbnail ? { uri: user.recently_played[0]?.thumbnail } : null}
                    playing1Title={user.recently_played[0]?.title}
                    playing1Artist={user.recently_played[0]?.artist}
                    playing1Link={user.recently_played[0]?.link}
                    playing2Thumbnail={user.recently_played[1]?.thumbnail ? { uri: user.recently_played[1]?.thumbnail } : null}
                    playing2Title={user.recently_played[1]?.title}
                    playing2Artist={user.recently_played[1]?.artist}
                    playing2Link={user.recently_played[1]?.link}
                    playing3Thumbnail={user.recently_played[2]?.thumbnail ? { uri: user.recently_played[2]?.thumbnail } : null}
                    playing3Title={user.recently_played[2]?.title}
                    playing3Artist={user.recently_played[2]?.artist}
                    playing3Link={user.recently_played[2]?.link}
                    playing4Thumbnail={user.recently_played[3]?.thumbnail ? { uri: user.recently_played[3]?.thumbnail } : null}
                    playing4Title={user.recently_played[3]?.title}
                    playing4Artist={user.recently_played[3]?.artist}
                    playing4Link={user.recently_played[3]?.link}
                    playing5Thumbnail={user.recently_played[4]?.thumbnail ? { uri: user.recently_played[4]?.thumbnail } : null}
                    playing5Title={user.recently_played[4]?.title}
                    playing5Artist={user.recently_played[4]?.artist}
                    playing5Link={user.recently_played[4]?.link}
                    song1={user.top_songs[0]}
                    song2={user.top_songs[1]}
                    song3={user.top_songs[2]}
                    song4={user.top_songs[3]}
                    song5={user.top_songs[4]}
                    artist1={user.top_artists[0]}
                    artist2={user.top_artists[1]}
                    artist3={user.top_artists[2]}
                    artist4={user.top_artists[3]}
                    artist5={user.top_artists[4]}
                />
            </View>
            <View style={{flexDirection: 'row', flex: 1, justifyContent: 'space-evenly', width: '100%', position: 'absolute', bottom: 0, alignItems: 'center', backgroundColor: '#111111', height: 100}}>
                {/* <TouchableOpacity>
                    <Ionicons name="play-skip-back-outline" size={30} color="#ffffff" style={{marginHorizontal: 10}}/>
                </TouchableOpacity> */}
                <TouchableOpacity onPress={handleLike}>
                    <Ionicons name={ liked ? "heart-circle" : "heart-circle-outline"} size={40} color="#ffffff" style={{marginHorizontal: 10}}/> 
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSkip}>
                    <Ionicons name="play-skip-forward-outline" size={30} color="#ffffff" style={{marginHorizontal: 10}}/> 
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default Home;
