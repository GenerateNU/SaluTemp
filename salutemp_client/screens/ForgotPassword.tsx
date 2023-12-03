import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Image, Dimensions, Text } from 'react-native';
import { FIREBASE_APP, FIREBASE_AUTH } from '../firebaseConfig';
import { signInWithEmailAndPassword, onAuthStateChanged, User, sendPasswordResetEmail } from 'firebase/auth';
import { useNavigation, StackActions } from '@react-navigation/native';
import colors from "../config/colors"

const ForgotPassword = () => {

  const navigation = useNavigation();

  const [email, setEmail] = useState('');

  const handleContinue = () => {
    if (email != "")
    {
        sendPasswordResetEmail(FIREBASE_AUTH, email);
        navigation.navigate("Email");
    }
    else
    {
      Alert.alert("Please Enter Email", "We need your email before continuing")
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.imagecontainer}>
        <Image
          source={require('../assets/salutemplogocolor.png')}
          style={styles.image}/>
      </View>
      <Text style={styles.text}>
        Forgot Password
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}/>
      <View style={styles.button}>
        <Button 
          title="Reset Password" 
          onPress={handleContinue} 
          color='#fff'/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: '#fff',
    },
    imagecontainer: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white',
        width: '30%',
        height: '20%',
        margin: 10,
        marginTop: 20
    },
    input: {
      width: '80%',
      height: 40,
      paddingHorizontal: 10,
      margin: 10,
      borderWidth: 1,
      borderRadius: 10,
      backgroundColor: colors.grey,
      borderColor: colors.grey,
    },
    image: {
        flex: 1,
        width: '100%',
        height: '100%',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    button: {
        backgroundColor:colors.darkNeutral,
        borderRadius: 10,
        width: '80%',
        margin: 10,
    },
    text: {
      fontSize: 20,
      color: colors.darkNeutral,
      fontWeight: "700",
      margin: 10,
      marginBottom: 75
    }
  });

export default ForgotPassword;
