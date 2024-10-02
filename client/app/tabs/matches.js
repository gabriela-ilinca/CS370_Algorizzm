import { Text, View, Button, SafeAreaView, TouchableOpacity } from 'react-native';
import React from 'react';
import { Stack, useRouter } from 'expo-router';

const Matches = () => {
    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:'#111111' }}>
            <Stack.Screen
                options={{ 
                    headerShown: false,
                    headerTitle:"",
                    headerStyle: {
                        backgroundColor: '#111111',
                    },
                }}
            />
            <View style ={{flex: 1, justifyContent: 'center', alignItems: 'center',}}>
                <View style = {{flexDirection:'row', justifyContent:'space-evenly', position: 'absolute', width:'100%',top:30}}>
                    <TouchableOpacity onPress={() => {}}>
                        <Text style={{color:'#fff', fontSize: 24, fontWeight: 'bold'}}>
                            LIKED
                        </Text>

                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {}}>
                        <Text style={{color:'#fff', fontSize: 24, fontWeight: 'bold'}}>
                            MATCHED
                        </Text>

                    </TouchableOpacity>
                    
                </View> 
        
            </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:'#111111'  }}>
                    <Text style={{color: 'white'}}>Matches Screen</Text>
                </View>
        </SafeAreaView>
    );
};

export default Matches;
