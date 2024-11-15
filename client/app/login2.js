import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { database } from './firebase'; // Ensure you have a firebase.js file set up correctly
import { ref, set, onValue } from 'firebase/database';

export default function login() {
  const [inputValue, setInputValue] = useState('');
  const [data, setData] = useState('No data yet');

  // Write to Firebase
  const writeToDatabase = () => {
    if (inputValue.trim() === '') {
      alert('Please enter a value!');
      return;
    }

    set(ref(database, 'example/'), { value: inputValue })
      .then(() => alert('Data written successfully!'))
      .catch((error) => alert('Error writing data: ' + error.message));

    setInputValue(''); // Clear input after write
  };

  // Read from Firebase
  useEffect(() => {
    const dataRef = ref(database, 'example/');
    const unsubscribe = onValue(dataRef, (snapshot) => {
      const value = snapshot.val();
      setData(value ? value.value : 'No data found');
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Firebase Test App</Text>

      {/* Input Field */}
      <TextInput
        style={styles.input}
        placeholder="Enter value to write"
        value={inputValue}
        onChangeText={setInputValue}
      />

      {/* Write Button */}
      <Button title="Write to Firebase" onPress={writeToDatabase} />

      {/* Display Data */}
      <Text style={styles.subheading}>Data from Firebase:</Text>
      <Text style={styles.data}>{data}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    width: '80%',
    marginBottom: 10,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
  },
  subheading: {
    fontSize: 18,
    marginTop: 20,
  },
  data: {
    fontSize: 16,
    color: 'blue',
    marginTop: 10,
  },
});