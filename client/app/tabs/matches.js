import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions, SafeAreaView, Text, ScrollView, Image, ActivityIndicator } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router, Stack } from 'expo-router';
import { getFirestore, doc, getDocs, collection, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'; // For current user
import {storage} from '../../config/firebase'
import { getDownloadURL, ref } from 'firebase/storage';

const { width } = Dimensions.get('window');
const buttonWidth = (width / 2);

const Matches = () => {
  const [activeTab, setActiveTab] = useState('liked me');
  const [likedMe, setLikedMe] = useState([]);  // Holds user UIDs who liked the current user
  const [iLiked, setILiked] = useState([]);    // Holds user UIDs that the current user liked
  const [userProfiles, setUserProfiles] = useState({}); // Holds the user profile data for liked and iLiked
  const [loading, setLoading] = useState(true); // For loading state

  // Initialize Firebase services
  const db = getFirestore();
  const auth = getAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = auth.currentUser;

      if (currentUser) {
        try {
          const userDocRef = doc(db, 'users', currentUser.uid);
          const userDoc = await getDoc(userDocRef);
          
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setLikedMe(userData.likedMe || []); // Assuming likedMe is an array of UIDs in Firestore
            setILiked(userData.iLiked || []);   // Assuming iLiked is an array of UIDs in Firestore
          } else {
            console.log('No such document!');
          }
        } catch (error) {
          console.error('Error getting user data: ', error);
        }
      }
      setLoading(false);
    };

    fetchUserData();
  }, []);

  // Fetch full user profiles based on the UIDs in likedMe and iLiked
  useEffect(() => {
    const fetchProfiles = async () => {
      const profiles = {};
      const allUIDs = [...likedMe, ...iLiked];
    
      try {
        const usersCollection = collection(db, 'users');
        const snapshot = await getDocs(usersCollection);
    
        for (const doc of snapshot.docs) {
          if (allUIDs.includes(doc.id)) {
            const userData = doc.data();
    
            // Fetch profile picture URLs
            try {
              const picRef = ref(storage, `profile_pictures/${doc.id}/1.jpg`);
              const profilePicURL = await getDownloadURL(picRef); // Fetch the URL for the image
              profiles[doc.id] = { ...userData, profilePic: profilePicURL };
            } catch (error) {
              console.error(`Error fetching profile picture for user ${doc.id}:`, error);
              profiles[doc.id] = { ...userData, profilePic: null }; // Handle missing profile pictures
            }
          }
        }
    
        setUserProfiles(profiles);
      } catch (error) {
        console.error('Error fetching user profiles: ', error);
      }
    };
    

    if (likedMe.length > 0 || iLiked.length > 0) {
      fetchProfiles();
    }
  }, [likedMe, iLiked]);

  const handleTabPress = (tab) => {
    setActiveTab(tab);
  };

  if (loading) {
    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#111111' }}>
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
            <ActivityIndicator size="large" color="#FFF" />
        </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', backgroundColor: '#111111' }}>
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
      <View style={styles.switcherContainer}>
        <TouchableOpacity
          style={[styles.switcherButton, activeTab === 'liked me' && styles.activeButton]}
          onPress={() => handleTabPress('liked me')}
        >
          <Text style={{ color: '#fff', fontWeight: activeTab === 'liked me' ? 'bold' : 'normal' }}>Liked me</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.switcherButton, activeTab === 'I liked' && styles.activeButton]}
          onPress={() => handleTabPress('I liked')}
        >
          <Text style={{ color: '#fff', fontWeight: activeTab === 'I liked' ? 'bold' : 'normal' }}>I liked</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={{ flex: 1 }}>
        {activeTab === 'liked me' ? (
          likedMe.map((uid) => {
            const user = userProfiles[uid];
          
            if (user) {
              return (
                <TouchableOpacity
                  key={uid}
                  onPress={() => router.push({ pathname: `/details/${uid}`, params: { userUID: uid } })}
                  style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginVertical: 10, width: 375 }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: '95%',
                      backgroundColor: '#333',
                      borderRadius: 10,
                      padding: 10,
                    }}
                  >
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                      <View style={{ height: 50, width: 50, overflow: 'hidden', borderRadius: 5 }}>
                        <Image
                          source={{ uri: user.profilePic }}
                          style={{ height: '100%', width: '100%' }}
                          resizeMode="cover"
                        />
                      </View>
                      <View style={{ paddingHorizontal: 10, width: width * 0.5 }}>
                        <Text
                          numberOfLines={1}
                          ellipsizeMode="tail"
                          style={{ textAlign: 'left', color: '#FFF', marginTop: 5 }}
                        >
                          {user.name}
                        </Text>
                        <Text
                          numberOfLines={1}
                          ellipsizeMode="tail"
                          style={{ textAlign: 'left', color: '#888', marginTop: 2.5 }}
                        >
                          @{user.insta}
                        </Text>
                      </View>
                    </View>
                    <TouchableOpacity
                      onPress={() => router.push({ pathname: `/details/${uid}`, params: { userUID: uid } })}
                    >
                      <Ionicons name="chevron-forward" size={20} color="#ffffff" style={{ marginHorizontal: 10 }} />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              );
            }
            return null; // Skip if the user data isn't loaded yet
          })          
        ) : (
          iLiked.map((uid) => {
            const user = userProfiles[uid];
          
            if (user) {
              return (
                <TouchableOpacity
                  key={uid}
                  onPress={() => router.push({ pathname: `/details/${uid}`, params: { userUID: uid } })}
                  style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginVertical: 10, width: 375 }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: '95%',
                      backgroundColor: '#333',
                      borderRadius: 10,
                      padding: 10,
                    }}
                  >
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                      <View style={{ height: 50, width: 50, overflow: 'hidden', borderRadius: 5 }}>
                        <Image
                          source={{ uri: user.profilePic }}
                          style={{ height: '100%', width: '100%' }}
                          resizeMode="cover"
                        />
                      </View>
                      <View style={{ paddingHorizontal: 10, width: width * 0.5 }}>
                        <Text
                          numberOfLines={1}
                          ellipsizeMode="tail"
                          style={{ textAlign: 'left', color: '#FFF', marginTop: 5 }}
                        >
                          {user.name}
                        </Text>
                        <Text
                          numberOfLines={1}
                          ellipsizeMode="tail"
                          style={{ textAlign: 'left', color: '#888', marginTop: 2.5 }}
                        >
                          @{user.insta}
                        </Text>
                      </View>
                    </View>
                    <TouchableOpacity
                      onPress={() => router.push({ pathname: `/details/${uid}`, params: { userUID: uid } })}
                    >
                      <Ionicons name="chevron-forward" size={20} color="#ffffff" style={{ marginHorizontal: 10 }} />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              );
            }
            return null; // Skip if the user data isn't loaded yet
          })
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  switcherContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 20,
    //borderBottomWidth: 1,
    //borderColor: '#333',
    width: '100%',
    backgroundColor: '#111111',
  },
  switcherButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: buttonWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeButton: {
    borderBottomWidth: 2,
    borderColor: '#FFF',
  },
});

export default Matches;
