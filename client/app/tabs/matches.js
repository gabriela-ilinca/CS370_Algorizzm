import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions, SafeAreaView, Text, ScrollView, Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons'
import { router, Stack, useRouter } from 'expo-router';
import sample from '../../components/sample';


const { width } = Dimensions.get('window');
const buttonWidth = (width/2);

const Matches = () => { 
  
  const [activeTab, setActiveTab] = useState('liked me')
  const likedMe = [sample]
  const iLiked = [sample]

  const handleTabPress = (tab) => {
    setActiveTab(tab);
  };  
    return (
      <SafeAreaView style={{ flex: 1, alignItems: 'center', backgroundColor:'#111111' }}>
        <Stack.Screen
                options={{ 
                    headerShown: false,
                    headerTitle:"",
                    headerStyle: {
                        backgroundColor: '#111111',
                    },
                    headerShadowVisible: false,
                }}
          />
        <View style={styles.switcherContainer}>
            <TouchableOpacity style={[styles.switcherButton, activeTab === 'liked me' && styles.activeButton]} onPress={() => handleTabPress('liked me')}>
              <Text style={{color: '#fff', fontWeight: activeTab === 'liked me' ? 'bold': 'normal'}}>Liked me</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.switcherButton, activeTab === 'I liked' && styles.activeButton]} onPress={() => handleTabPress('I liked')}>
              <Text style={{color: '#fff', fontWeight: activeTab === 'I liked' ? 'bold': 'normal'}}>I liked</Text>
            </TouchableOpacity>
        </View>
        <ScrollView style={{flex: 1}}>
        {activeTab === 'liked me' ? (
          likedMe.map((val, index) => (
            <TouchableOpacity 
              key={index} 
              onPress={() => router.push({ pathname: `/details/${index}`, params: { val: JSON.stringify(val) } })}
              style={{flex:1, justifyContent: 'center', alignItems: 'center', marginVertical: 15, width: 375}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '95%', backgroundColor: 
                        '#333', borderRadius:10, padding: 10}}>
                        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                            <View style={{height: 50, width: 50, overflow: 'hidden', borderRadius: 5}}>
                                <Image 
                                    source={val.pic1}
                                    style={{ height: '100%', width: '100%' }}
                                    resizeMode="cover"
                                />
                            </View>
                            <View style={{paddingHorizontal: 10, width: width * 0.5}}>
                                <Text 
                                numberOfLines={1} 
                                ellipsizeMode="tail"
                                style={{ textAlign: 'left', color: "#FFF", marginTop: 5 }}>{val.name}</Text>
                                <Text 
                                numberOfLines={1} 
                                ellipsizeMode="tail"
                                style={{ textAlign: 'left', color: "#888", marginTop: 2.5, }}>{val.ig}</Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => router.push({ pathname: `/details/${index}`, params: { val: JSON.stringify(val) } })}>
                            <Ionicons name="chevron-forward" size={20} color="#ffffff" style={{marginHorizontal: 10}}/> 
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
          ))
        ) : (
          iLiked.map((val, index) => (
            <TouchableOpacity 
              key={index} 
              onPress={() => router.push({ pathname: `/details/${index}`, params: { val: JSON.stringify(val) } })}
              style={{flex:1, justifyContent: 'center', alignItems: 'center', marginVertical: 15, width: 375}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '95%', backgroundColor: 
                        '#333', borderRadius:10, padding: 10}}>
                        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                            <View style={{height: 50, width: 50, overflow: 'hidden', borderRadius: 5}}>
                                <Image 
                                    source={val.pic1}
                                    style={{ height: '100%', width: '100%' }}
                                    resizeMode="cover"
                                />
                            </View>
                            <View style={{paddingHorizontal: 10, width: width * 0.5}}>
                                <Text 
                                numberOfLines={1} 
                                ellipsizeMode="tail"
                                style={{ textAlign: 'left', color: "#FFF", marginTop: 5 }}>{val.name}</Text>
                                <Text 
                                numberOfLines={1} 
                                ellipsizeMode="tail"
                                style={{ textAlign: 'left', color: "#888", marginTop: 2.5, }}>{val.ig}</Text>
                            </View>
                        </View> 
                        <TouchableOpacity onPress={() => router.push({ pathname: `/details/${index}`, params: { val: JSON.stringify(val) } })}>
                            <Ionicons name="chevron-forward" size={20} color="#ffffff" style={{marginHorizontal: 10}}/> 
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
          ))
        )}
        </ScrollView>

      </SafeAreaView>
    );
  };
  
  const styles = StyleSheet.create({
    switcherContainer: {
      flexDirection: 'row',
      justifyContent: "space-evenly",
      height: 50,
      marginTop: 10
    },
    switcherButton: {
      paddingHorizontal: 16,
      alignItems: "center",
      justifyContent: "center",
      width: buttonWidth
    },
    activeButton: {
      borderBottomWidth: 2,
      borderBottomColor: '#fff',
    },
  });
  
export default Matches