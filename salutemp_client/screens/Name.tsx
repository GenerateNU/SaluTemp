import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Image, Dimensions, Text } from 'react-native';
import { FIREBASE_AUTH } from '../firebaseConfig';
import { signInWithEmailAndPassword, onAuthStateChanged, User } from 'firebase/auth';
import { useNavigation, StackActions, useRoute } from '@react-navigation/native';
import colors from "../config/colors"

const Name = () => {

  const navigation = useNavigation();

  const route = useRoute();

  const [name, setName] = useState('');
  // const [user, setUser] = useState<User | null>(null);

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
  //     if (user) {
  //       setUser(user);
  //       console.log('signed in');
  //     } else {
  //       setUser(null);
  //       console.log('signed out');
  //     }
  //   });

  //   return unsubscribe;
  // }, []);

  // const handleLogin = async () => {
  //   try {
  //     await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
  //   } catch (error : any) {
  //       Alert.alert(error.message);
  //   }
  // };

  const handleContinue = async () => {
    if (name != "")
    {
      navigation.navigate("Password", {email: route.params?.email, name: name});
    }
    else
    {
      Alert.alert("Please Enter Name", "We need your name before continuing")
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
        What is your name?
      </Text>
      <Text style={styles.text2}>
        This is what you'll see in your profile
      </Text>
      <TextInput
        style={styles.input}
        placeholder="First and Last"
        value={name}
        onChangeText={(text) => setName(text)}/>
      <View style={styles.button}>
        <Button 
          title="Continue" 
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
      backgroundColor: colors.background,
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
    },
    text2: {
        fontSize: 15,
        color: colors.darkNeutral,
        fontWeight: "400",
        margin: 10,
        marginBottom: 75
    }
  });

export default Name;
