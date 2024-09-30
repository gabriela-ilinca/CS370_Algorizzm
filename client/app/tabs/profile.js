import { Text, View, SafeAreaView } from 'react-native';
import React from 'react';
import { Stack, useRouter } from 'expo-router';

const Profile = () => {
    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:'#111111' }}>
            <Stack.Screen
                options={{ 
                    headerShown: false,
                    headerTitle:"",
                }}
            />
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:'#111111'  }}>
                    <Text style={{color: 'white'}}>Profile Screen</Text>
                </View>
        </SafeAreaView>
    );
};

export default Profile;
