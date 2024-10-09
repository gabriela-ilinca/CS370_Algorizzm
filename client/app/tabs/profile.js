import { Text, View, SafeAreaView, Image, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import { Stack, useRouter } from 'expo-router';
import { images } from '../../assets';


const Profile = () => {

    const [name, setName] = useState(''); // To store the name
    const [isEditing, setIsEditing] = useState(false); // To track if the user is editing the name
    const handleNameSubmit = () => {
        setIsEditing(false); // Hide text input after submit
    };
    const router = useRouter(); // Use the router for navigation

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen
                options={{ 
                    headerShown: false,
                    headerTitle:"",
                }}
            />
            
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'left', backgroundColor:'#111111'  }}>
                    <TouchableOpacity onPress={() => setIsEditing(!isEditing)} style={{ width: 200, height: 50 }}>
                    <Text style={{ color: 'white', fontSize: 18 }}>{name || 'Tap to enter name'}</Text>
                   {/* I tried a fancier name input*/}
                </TouchableOpacity>

                    {isEditing && (
                    <View style={{ marginTop: 10 }}>
                        <TextInput
                            placeholder="Enter name"
                            placeholderTextColor="#999"
                            value={name}
                            onChangeText={setName}
                            style={{
                                borderColor: '#fff',
                                borderWidth: 1,
                                color: '#fff',
                                paddingHorizontal: 10,
                                height: 40,
                                width: 200,
                                marginBottom: 10,
                            }}
                        />
                        <TouchableOpacity onPress={handleNameSubmit} style={{ backgroundColor: '#444', padding: 10, borderRadius: 5 }}>
                            <Text style={{ color: 'white' }}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                )}
                    {/* Button to navigate to Profile2 */}
                <TouchableOpacity onPress={() => router.push('/profile2')} style={{ width: 200, height: 200 }}>
                    <Image source={images.logo} style={{ aspectRatio: 1, flex: 1}} resizeMode='contain' />
                </TouchableOpacity>
                    
                
                 {/* Name Input */}
                 <TextInput
                    placeholder="Name"
                    placeholderTextColor="#999"
                    value={name}
                    onChangeText={setName}
                    style={styles.textInput}
                />
                    <TouchableOpacity onPress={() => print('Change song stuck in heard')} style={styles.buttonText}>
                        <Text style={styles.buttonText} >Currently stuck in my head...</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity onPress={() => print('Change location')} style={styles.buttonText}>
                    <Text style={styles.buttonText} >Location</Text>
                    </TouchableOpacity>
                   
                    
                    <TouchableOpacity onPress={() => print('Change song on repeat')}style={styles.buttonText}>
                    <Text style={styles.buttonText} >Song on repeat...</Text>
                    </TouchableOpacity>


                    <TouchableOpacity onPress={() => print('Change profile')} style={styles.buttonText}>
                        <Text style={styles.buttonText} >My top 5 songs...</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => print('Change top artists')} style={styles.buttonText}>
                    <Text style={styles.buttonText} >My top 5 artists...</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => print('Change password')} style={styles.passwordButton}>
                        <Text style={styles.passwordText}>Change Password</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => print('Change email')} style={styles.passwordButton}>
                        <Text style={styles.passwordText}>Change Email</Text>
                    </TouchableOpacity>
                </View>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#111111',
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    nameButton: {
        width: 200,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    nameText: {
        color: 'white',
        fontSize: 18,
    },
    inputContainer: {
        marginTop: 10,
        alignItems: 'center',
    },
    textInput: {
        borderColor: '#fff',
        borderWidth: 1,
        color: '#fff',
        paddingHorizontal: 10,
        height: 40,
        width: 200,
        marginBottom: 10,
        cornerRadius: 5,
    },
    submitButton: {
        backgroundColor: '#444',
        padding: 10,
        borderRadius: 5,
    },
    submitText: {
        color: 'white',
    },
    imageButton: {
        width: 200,
        height: 200,
    },
    profileImage: {
        flex: 1,
        aspectRatio: 1,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        height: 50,
    },
    passwordButton: {
        width: 200,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    passwordText: {
        color: 'red',
    },
});


export default Profile;
