import { Tabs, useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';

const Layout = () => {
   //const [activeTab, setActiveTab] = useState('home')
    // const router = useRouter();
    // const { currentPage } = useSelector((state) => state.page);
    // const dispatch = useDispatch()

    // const handleHome= () => {
    //     router.push('/tabs/home')
    //     //setActiveTab('home')
    //     dispatch(setPage('home'))
    // }
    // const handleChat= () => {
    //     router.push(auth.currentUser === null ? '/signup' : '/tabs/chat')
    //     //setActiveTab('chat')
    //     dispatch(setPage('chat'))
    // }
    // const handleList= () => {
    //     router.push(auth.currentUser === null ? '/signup' : '/tabs/listWrapper')
    //     //setActiveTab('list')
    //     dispatch(setPage('list'))
    // }
    // const handleCart= () => {
    //     router.push(auth.currentUser === null ? '/signup' : '/tabs/cart')
    //     //setActiveTab('cart')
    //     dispatch(setPage('cart'))
    // }
    // const handleUser= () => {
    //     router.push(auth.currentUser === null ? '/signup' : '/tabs/user')
    //     //setActiveTab('user')
    //     dispatch(setPage('user'))
    // }
    

    return <Tabs screenOptions={{ tabBarShowLabel: false }} >
     <Tabs.Screen name='home' options={{ tabBarIcon: () => (
        <TouchableOpacity style={{flex: 1, width: '100%', alignItems:"center"}} onPress={handleHome}>
            <Ionicons name={currentPage === 'home' ? 'home' : 'home-outline'} size={24} color="black" style={{flex: 1, paddingVertical: 10}}/>
        </TouchableOpacity>
     )}} />
     <Tabs.Screen name='chat' options={{ tabBarIcon: () => (
        <TouchableOpacity style={{flex: 1, width: '100%', alignItems:"center"}} onPress={handleChat}>
            <Ionicons name={currentPage === 'chat' ? 'chatbox' : 'chatbox-outline'} size={24} color="black" style={{flex: 1, paddingVertical: 10}}/>
        </TouchableOpacity>
     )}} />
     <Tabs.Screen name='listWrapper' options={{ tabBarIcon: () => (
        <TouchableOpacity style={{flex: 1, width: '100%', alignItems:"center"}} onPress={handleList}>
            <Ionicons name='add' size={24} color="black"  style={{flex: 1, paddingVertical: 10}}/>
        </TouchableOpacity>
     )}} />
     <Tabs.Screen name='cart' options={{ tabBarIcon: () => (
        <TouchableOpacity style={{flex: 1, width: '100%', alignItems:"center"}} onPress={handleCart}>
            <Ionicons name={currentPage === 'cart' ? 'cart' : 'cart-outline'} size={24} color="black" style={{flex: 1, paddingVertical: 10}}/>
        </TouchableOpacity>
     )}} />
     <Tabs.Screen name='user' options={{ tabBarIcon: () => (
        <TouchableOpacity style={{flex: 1, width: '100%', alignItems:"center"}} onPress={handleUser}>
            <Ionicons name={currentPage === 'user' ? 'person' : 'person-outline'} size={24} color="black" style={{flex: 1, paddingVertical: 10}}/>
        </TouchableOpacity>
     )}} />
    </Tabs>
}

export default Layout