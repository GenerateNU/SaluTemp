import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Image, Dimensions, Text, TouchableOpacity } from 'react-native';
import { FIREBASE_AUTH } from '../firebaseConfig';
import { signInWithEmailAndPassword, onAuthStateChanged, User, } from 'firebase/auth';
import { useNavigation, StackActions, useRoute } from '@react-navigation/native';
import colors from "../config/colors"

const EmailAndPassword = () => {

  const navigation = useNavigation();

  const route = useRoute();

  const [email, setEmail] = useState(route.params?.email);
  const [password, setPassword] = useState("");
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
    if (email == "" || password == "")
    {
      Alert.alert("Empty Fields", "Make sure all fields are filled");
    }
    else
    {
      try 
      {
        await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
      } 
      catch (error : any) 
      {
          Alert.alert(error.message);
      }
    }
  };

    const forgotPassword = () => {
      navigation.navigate("ForgotPassword", {email: email});
    };

  if (user)
  {
    navigation.dispatch(StackActions.replace('MedList'));
  }
  else
  {
    return (
      <View style={styles.container}>
        <View style={styles.imagecontainer}>
          <Image
            source={require('../assets/salutemplogocolor.png')}
            style={styles.image}/>
        </View>
        <Text style={styles.text}>
          Log In
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}/>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}/>
        <View style={styles.button2}>
          <TouchableOpacity onPress={forgotPassword} style={styles.button2}>
            <Text style={styles.fp}>Forgot your password?</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.button}>
          <Button 
            title="Login" 
            onPress={handleLogin} 
            color='#fff'/>
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
    button2: {
        backgroundColor:'#fff',
        borderRadius: 10,
        width: '80%',
        marginBottom: 5,
        alignItems:'flex-start'
    },
    text: {
      fontSize: 20,
      color: colors.darkNeutral,
      fontWeight: "700",
      margin: 10,
      marginBottom: 75
    },
    fp: {
      fontSize:12,
      color: colors.darkNeutral,
    }
  });

export default EmailAndPassword;
