import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, Image } from 'react-native';
import { FIREBASE_AUTH } from '../firebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, User } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

const LoginRegister = () => {

  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        setUser(user);
        console.log('signed in');
      } else {
        setUser(null);
        console.log('signed out');
      }
    });

    return unsubscribe;
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
    } catch (error : any) {
    //   if (error.message === 'The password is invalid or the user does not have a password.') {
    //     Alert.alert('Incorrect password', 'Please try again.');
    //   } else if (error.message === 'There is no user record corresponding to this identifier. The user may have been deleted.') {
    //     Alert.alert('User not found', 'Please register.');
    //   } else {
    //     Alert.alert(error.message);
    //   }
        Alert.alert(error.message);
    }
  };

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
    } catch (error) {
      Alert.alert('Error', 'An error occurred. Please try again.');
    }
  };

  if (user) {
    // User is logged in
    navigation.navigate("Home");
  } else {
    // User is not logged in
    return (
      <View style={styles.container}>
        <Image
            source={require('../assets/icon.png')}
            style={styles.image}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text.toLowerCase)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
        <Button title="Login" onPress={handleLogin} />
        <Button title="New to SaluTemp? Register here!" onPress={handleRegister} />
      </View>
    );
  }
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: 'darkgreen',
    },
    input: {
      width: '80%',
      height: 40,
      paddingHorizontal: 10,
      margin: 10,
      borderWidth: 1,
      borderRadius: 10,
      backgroundColor: 'lightgreen',
    },
    image: {
        margin: 10,
        width: 250,
        height: 250,
    },
  });

export default LoginRegister;
