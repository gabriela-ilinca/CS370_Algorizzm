import { Text, View, SafeAreaView, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feed from '../../components/feed';
import { db, storage, auth } from '../../config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';

const Details = () => {
    const router = useRouter();
    const params = useLocalSearchParams();
    const userUID = params.userUID; // Extract the uid from route params
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            if (!userUID) return;

            try {
                // Fetch user data from Firestore
                const userDocRef = doc(db, 'users', userUID);
                const userDoc = await getDoc(userDocRef);

                if (!userDoc.exists()) {
                    console.error('No user data found!');
                    setUser(null);
                    return;
                }

                const userData = userDoc.data();

                // Fetch profile pictures from Firebase Storage
                const profilePicsPromises = [1, 2, 3].map(async (index) => {
                    try {
                        const picRef = ref(storage, `profile_pictures/${userUID}/${index}.jpg`);
                        return await getDownloadURL(picRef); // Fetch the URL for the image
                    } catch (error) {
                        console.error(`Error fetching profile picture ${index}:`, error);
                        return null; // Return null if there's an error
                    }
                });

                const profilePics = await Promise.all(profilePicsPromises);

                // Combine all data into a single user object
                const userWithPics = {
                    ...userData,
                    pic1: profilePics[0] || null,
                    pic2: profilePics[1] || null,
                    pic3: profilePics[2] || null,
                };

                setUser(userWithPics);
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [userUID]);

    if (loading || !user) {
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

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#111111' }}>
            <Stack.Screen
                options={{
                    headerShown: true,
                    headerTitle: '',
                    headerStyle: {
                        backgroundColor: '#111111',
                    },
                    headerShadowVisible: false,
                    headerLeft: () => (
                        <Ionicons
                            name="chevron-back"
                            size={30}
                            color="#ffffff"
                            style={{ marginHorizontal: 10 }}
                            onPress={() => router.back()}
                        />
                    ),
                }}
            />
            <View>
                <Feed
                    pic1={user.pic1 ? { uri: user.pic1 } : null}
                    pic2={user.pic2 ? { uri: user.pic2 } : null}
                    pic3={user.pic3 ? { uri: user.pic3 } : null}
                    name={user.name}
                    ig={user.insta}
                    playing1Thumbnail={user.spotifyData.recently_played?.[0]?.thumbnail ? { uri: user.spotifyData.recently_played[0]?.thumbnail } : null}
                    playing1Title={user.spotifyData.recently_played?.[0]?.title}
                    playing1Artist={user.spotifyData.recently_played?.[0]?.artist}
                    playing1Link={user.spotifyData.recently_played?.[0]?.link}
                    playing2Thumbnail={user.spotifyData.recently_played?.[1]?.thumbnail ? { uri: user.spotifyData.recently_played[1]?.thumbnail } : null}
                    playing2Title={user.spotifyData.recently_played?.[1]?.title}
                    playing2Artist={user.spotifyData.recently_played?.[1]?.artist}
                    playing2Link={user.spotifyData.recently_played?.[1]?.link}
                    playing3Thumbnail={user.spotifyData.recently_played?.[2]?.thumbnail ? { uri: user.spotifyData.recently_played[2]?.thumbnail } : null}
                    playing3Title={user.spotifyData.recently_played?.[2]?.title}
                    playing3Artist={user.spotifyData.recently_played?.[2]?.artist}
                    playing3Link={user.spotifyData.recently_played?.[2]?.link}
                    playing4Thumbnail={user.spotifyData.recently_played?.[3]?.thumbnail ? { uri: user.spotifyData.recently_played[3]?.thumbnail } : null}
                    playing4Title={user.spotifyData.recently_played?.[3]?.title}
                    playing4Artist={user.spotifyData.recently_played?.[3]?.artist}
                    playing4Link={user.spotifyData.recently_played?.[3]?.link}
                    playing5Thumbnail={user.spotifyData.recently_played?.[4]?.thumbnail ? { uri: user.spotifyData.recently_played[4]?.thumbnail } : null}
                    playing5Title={user.spotifyData.recently_played?.[4]?.title}
                    playing5Artist={user.spotifyData.recently_played?.[4]?.artist}
                    playing5Link={user.spotifyData.recently_played?.[4]?.link}
                    song1={user.spotifyData.top_tracks?.[0]}
                    song2={user.spotifyData.top_tracks?.[1]}
                    song3={user.spotifyData.top_tracks?.[2]}
                    song4={user.spotifyData.top_tracks?.[3]}
                    song5={user.spotifyData.top_tracks?.[4]}
                    artist1={user.spotifyData.top_artists?.[0]}
                    artist2={user.spotifyData.top_artists?.[1]}
                    artist3={user.spotifyData.top_artists?.[2]}
                    artist4={user.spotifyData.top_artists?.[3]}
                    artist5={user.spotifyData.top_artists?.[4]}
                />
            </View>
        </SafeAreaView>
    );
};

export default Details;
