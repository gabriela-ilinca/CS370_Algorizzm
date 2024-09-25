import { Tabs, useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';

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
    const handleChat= () => {
        router.push('/tabs/chat')
        setActiveTab('chat')
    }
    const handleProfile= () => {
        router.push('/tabs/profile')
        setActiveTab('profile')
    }

    

    return <Tabs screenOptions={{ tabBarShowLabel: true }} >
     <Tabs.Screen name='home' options={{ tabBarIcon: () => (
        <TouchableOpacity style={{flex: 1, width: '100%', alignItems:"center"}} onPress={handleHome}>
            <Ionicons name='home' size={24} color="black" style={{flex: 1, paddingVertical: 10}}/>
        </TouchableOpacity>
     )}} />
     <Tabs.Screen name='matches' options={{ tabBarIcon: () => (
        <TouchableOpacity style={{flex: 1, width: '100%', alignItems:"center"}} onPress={handleMatches}>
            <Ionicons name='heart' size={24} color="black" style={{flex: 1, paddingVertical: 10}}/>
        </TouchableOpacity>
     )}} />
     <Tabs.Screen name='chat' options={{ tabBarIcon: () => (
        <TouchableOpacity style={{flex: 1, width: '100%', alignItems:"center"}} onPress={handleChat}>
            <Ionicons name='chatbox' size={24} color="black" style={{flex: 1, paddingVertical: 10}}/>
        </TouchableOpacity>
     )}} />
     <Tabs.Screen name='profile' options={{ tabBarIcon: () => (
        <TouchableOpacity style={{flex: 1, width: '100%', alignItems:"center"}} onPress={handleProfile}>
            <Ionicons name='person' size={24} color="black" style={{flex: 1, paddingVertical: 10}}/>
        </TouchableOpacity>
     )}} />
    </Tabs>
}

export default Layout