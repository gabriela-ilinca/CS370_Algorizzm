import { Tabs, useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Image, View } from 'react-native';
import Constants from 'expo-constants';
import { images } from '../../assets';

const Layout = () => {
    const [activeTab, setActiveTab] = useState('home')
    const router = useRouter();
    // const { currentPage } = useSelector((state) => state.page);
    // const dispatch = useDispatch()

    const handleHome= () => {
        router.push('/tabs/home')
        setActiveTab('home')
    }
    const handleMatches= () => {
        router.push('/tabs/matches')
        setActiveTab('matches')
    }
    // const handleChat= () => {
    //     router.push('/tabs/chat')
    //     setActiveTab('chat')
    // }
    const handleProfile= () => {
        router.push('/tabs/profile')
        setActiveTab('profile')
    }

    

    return <Tabs screenOptions={{ 
        tabBarShowLabel: false, 
        tabBarStyle:{backgroundColor: '#111111', borderTopWidth: 0} 
    }}>
     <Tabs.Screen name='home' options={{ tabBarIcon: () => (
        <TouchableOpacity style={{flex: 1, width: '100%', alignItems:"center", justifyContent: 'center'}} onPress={handleHome}>
            <View style={{height: 30, width: 30, justifyContent: 'center', alignItems: 'center', marginBottom: 6}}>
            <Image source={activeTab == 'home' ? images.logo_blue : images.logo_pink} style={{ aspectRatio: 1, flex: 1}} resizeMode='contain'/>
            {/* <Ionicons name='home' size={24} color={ activeTab == 'home' ? '#92d4fa' : "#fcb1d6"} style={{flex: 1, paddingVertical: 10}}/> */}
            </View>
        </TouchableOpacity>
     )}} />
     <Tabs.Screen name='matches' options={{ tabBarIcon: () => (
        <TouchableOpacity style={{flex: 1, width: '100%', alignItems:"center"}} onPress={handleMatches}>
            <Ionicons name='heart' size={24} color= { activeTab == 'matches' ? '#92d4fa' : "#fcb1d6"} style={{flex: 1, paddingVertical: 10}}/>
        </TouchableOpacity>
     )}} />
     {/* <Tabs.Screen name='chat' options={{ tabBarIcon: () => (
        <TouchableOpacity style={{flex: 1, width: '100%', alignItems:"center"}} onPress={handleChat}>
            <Ionicons name='chatbox' size={24} color="#fcb1d6" style={{flex: 1, paddingVertical: 10}}/>
        </TouchableOpacity>
     )}} /> */}
     <Tabs.Screen name='profile' options={{ tabBarIcon: () => (
        <TouchableOpacity style={{flex: 1, width: '100%', alignItems:"center"}} onPress={handleProfile}>
            <Ionicons name='person' size={24} color={ activeTab == 'profile' ? '#92d4fa' : "#fcb1d6"} style={{flex: 1, paddingVertical: 10}}/>
        </TouchableOpacity>
     )}} />
    </Tabs>
}

export default Layout