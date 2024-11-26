import { Text, View, SafeAreaView, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feed from '../../components/feed';
import { db } from '../../config/firebase';
import { doc, getDoc } from 'firebase/firestore';

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
                const userDocRef = doc(db, 'users', userUID); // Adjust the collection name if needed
                const userDoc = await getDoc(userDocRef);

                if (userDoc.exists()) {
                    setUser(userDoc.data());
                    console.log(user)
                } else {
                    console.error('No user data found!');
                }
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
                <ActivityIndicator size="large" color="#ffffff" />
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
                    playing1Thumbnail={user.recently_played?.[0]?.thumbnail ? { uri: user.recently_played[0]?.thumbnail } : null}
                    playing1Title={user.recently_played?.[0]?.title}
                    playing1Artist={user.recently_played?.[0]?.artist}
                    playing1Link={user.recently_played?.[0]?.link}
                    // Repeat for other recently played tracks
                    song1={user.top_songs?.[0]}
                    song2={user.top_songs?.[1]}
                    song3={user.top_songs?.[2]}
                    song4={user.top_songs?.[3]}
                    song5={user.top_songs?.[4]}
                    artist1={user.top_artists?.[0]}
                    artist2={user.top_artists?.[1]}
                    artist3={user.top_artists?.[2]}
                    artist4={user.top_artists?.[3]}
                    artist5={user.top_artists?.[4]}
                />
            </View>
        </SafeAreaView>
    );
};

export default Details;
