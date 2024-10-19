import { Text, View, ScrollView, Image, Button, SafeAreaView, TouchableOpacity , StyleSheet } from 'react-native';
import React ,{ useState, useEffect } from 'react';
import { Tabs,  useRouter } from 'expo-router';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import * as ImagePicker from 'expo-image-picker';
import sample from '../../components/sample';
import Ionicons from '@expo/vector-icons/Ionicons';


const Tab = createMaterialTopTabNavigator();

const handleAccept = (id) => {

};

const handleDecline = (id) => {

};

const LikedRequest = ({ user, onAccept, onDecline }) => {
  return (
    <View style={styles.likedRequestBox}>
      <Image source={ sample.pic1 } style={styles.profileImg} />
      
      <Text style={{color: '#ffffff', fontWeight: 'bold', fontSize: 17, textAlign: 'left', marginHorizontal: 5}}>{user.name}</Text>
     
      <TouchableOpacity style={{position: 'absolute', right: 65}} onPress={() => onDecline(user.id)} >
        <Ionicons name="close" size={30} color="#ffffff" style={{marginHorizontal: 10}}/>
      </TouchableOpacity>
      <TouchableOpacity  style = {{position: 'absolute', right: 10,}} onPress={() => onAccept(user.id)} >
        <Ionicons name="heart" size={30} color="#fcb1d6" style={{marginHorizontal: 10}}/>
      </TouchableOpacity>
      
      
    </View>
  );
};

const LikedYouScreen = () => (
  <View style={{flex: 1, backgroundColor: '#111111'}}>
    <ScrollView contentContainerStyle={{ backgroundColor: '#111111', alignItems:'center', marginTop: 0, paddingBottom:0 }} showsVerticalScrollIndicator={false}>
      <LikedRequest user={sample} onAccept={handleAccept} onDecline={handleDecline} />    
    </ScrollView>
  </View>
  );

const YouLikedScreen = () => (
    <View style={styles.screenContainer}>
      <Text style={styles.screenText}>You Liked Screen</Text>
    </View>
  );

const matchesscreen = () => (
  <Tab.Navigator
  screenOptions={{
    headerShown: false,  
    tabBarStyle: { backgroundColor: '#111111' }, 
    tabBarLabelStyle: { fontSize: 20, fontWeight: 'bold' , textTransform: 'none',}, 
    tabBarActiveTintColor: '#fcb1d6',
    tabBarInactiveTintColor: '#ffffff',
    tabBarIndicatorStyle: { backgroundColor: '#fcb1d6' }, 
  }}
  >
    <Tab.Screen name="Liked You" component={LikedYouScreen} />
    <Tab.Screen name="You Liked" component={YouLikedScreen} />
  </Tab.Navigator>
);


const Matches = () => {
    

    return  (
   
      
      
        <Tab.Navigator
            screenOptions={{
              headerShown: false,  
              tabBarStyle: { backgroundColor: '#111111' }, 
              tabBarLabelStyle: { fontSize: 20, fontWeight: 'bold' , textTransform: 'none',}, 
              tabBarActiveTintColor: '#fcb1d6',
              tabBarInactiveTintColor: '#ffffff',
              tabBarIndicatorStyle: { backgroundColor: '#fcb1d6' }, 
            }}
            >
            <Tab.Screen name="Liked You" component={LikedYouScreen} options = {{headerShown: false}}/>
            <Tab.Screen name="You Liked" component={YouLikedScreen} options = {{headerShown: false}} />
        </Tab.Navigator>
      
    )
    
        
    
}

export default Matches

const styles = StyleSheet.create({

    screenContainer: {
        
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#222222',
      },
    screenText: {
        color: '#ffffff',
        fontSize: 20,
      },
    likedRequestBox: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#111111',
        borderRadius: 8,
        padding: 15,
        marginVertical: 10,
        backgroundColor: '#111111',
        width: '100%',
      },
    profileImg: {
        width: 60,
        height: 60,
        borderRadius: 30, // Circular image
        marginRight: 15,
      },

    

    })
