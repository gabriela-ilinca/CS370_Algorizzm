import { Text, View, SafeAreaView } from 'react-native';
import React from 'react';
import { Stack, useRouter } from 'expo-router';

const Home = () => {
    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:'#111111' }}>
        <Stack.Screen
                options={{ 
                    headerShown: false,
                    headerTitle:"",
                }}
            />
        <View>
            <Text style={{color: 'white'}}>Home Screen</Text>
        </View>
        </SafeAreaView>
    );
};

export default Home;
