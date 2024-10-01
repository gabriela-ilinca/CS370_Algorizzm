import { Text, View, SafeAreaView } from 'react-native';
import React from 'react';
import { Stack, useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

const Filter = () => {
    const router = useRouter()
    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:'#111111' }}>
            <Stack.Screen
                options={{ 
                    headerShown: true,
                    headerTitle:"Filters",
                    headerTitleStyle:{
                        color: 'white'
                    },
                    headerStyle: {
                        backgroundColor: '#111111',
                    },
                    headerShadowVisible: false,
                    headerLeft: () => (
                        <Ionicons name="chevron-down" size={24} color="white" onPress={() => router.back()}/>
                    ),
                }}
            />
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:'#111111'  }}>
                    <Text style={{color: 'white'}}>Filter Screen</Text>
                </View>
        </SafeAreaView>
    );
};

export default Filter;
