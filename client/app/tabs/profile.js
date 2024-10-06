import { Text, View, SafeAreaView, Image, TextInput, styles, TouchableOpacity} from 'react-native';
import React from 'react';
import { Stack, useRouter } from 'expo-router';
import { images } from '../../assets';

// const styles = StyleSheet.create({
//     profile: {
//         width: 66,
//         height: 58,
//     }
// });
const Profile = () => {
    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'left', backgroundColor:'#111111' }}>
            <Stack.Screen
                options={{ 
                    headerShown: false,
                    headerTitle:"",
                }}
            />
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'left', backgroundColor:'#111111'  }}>
                    <Text style={{color: 'white'}}>Name </Text>

                    <TouchableOpacity onPress={() => print('Choose profile')} style={{width: 200, height: 200}}>
                        <Image source={images.logo} style={{ aspectRatio: 1, flex: 1}} resizeMode='contain'/>
                    </TouchableOpacity>
                    
                    <Text style={{color: 'white'}}>Age</Text>
                    <Text style={{color: 'white'}}>Sexuality</Text>
                    <Text style={{color: 'white'}}>Location</Text>
                    <Text style={{color: 'white'}}>Bio</Text>
                    <Text style={{color: 'white'}}>Interests</Text>
                    <Text style={{color: 'white'}}>Hobbies</Text>
                    <Text style={{color: 'white'}}>Favorite Songs</Text>
                    <Text style={{color: 'white'}}>Favorite Artists</Text>

                </View>
        </SafeAreaView>
    );
};

export default Profile;
