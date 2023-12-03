import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Image } from 'react-native';
import { FIREBASE_AUTH } from '../firebaseConfig';
import { createUserWithEmailAndPassword, onAuthStateChanged, User } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { StackNavigation } from '../App';

const Register = () => {
  const { navigate } = useNavigation<StackNavigation>();

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

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
    } catch (error: any) {
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

  if (user) {
    // User is logged in
    navigate('Home');
    console.log('home');
  } else {
    // User is not logged in
    return (
      <View style={styles.container}>
        <View style={styles.imagecontainer}>
          <Image source={require('../assets/logo.png')} style={styles.image} />
        </View>

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
        <View style={styles.button}>
          <Button title="Register for SaluTemp" onPress={handleRegister} color="#fff" />
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  imagecontainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '100%',
    height: '50%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowOpacity: 10,
    shadowRadius: 20
  },
  input: {
    width: '80%',
    height: 40,
    paddingHorizontal: 10,
    margin: 10,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'white',
    borderColor: 'green'
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },
  button: {
    backgroundColor: 'green',
    borderRadius: 10
  }
});

export default Register;
