import React, { useState, useEffect }from 'react';
import { View, Button, StyleSheet, Image } from 'react-native';
import { useNavigation, StackActions } from '@react-navigation/native';
import colors from "../config/colors";
import { onAuthStateChanged, User } from 'firebase/auth';
import { FIREBASE_AUTH } from '../firebaseConfig';

const Landing = () => {

  const navigation = useNavigation();

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

  useEffect(() => {
    if (user) {
      navigation.dispatch(StackActions.replace('MedList'));
    }
  }, [navigation, user]);


  const handleContinue = async () => {
    navigation.navigate("Email")
  };

  return (
    <View style={styles.container}>
        <Image style={styles.image}
            source={require('../assets/fulllogo.png')}
            resizeMode="contain"/>
        <View style={styles.curve}>
            <Image
                source={require('../assets/curvy.png')}/>
        </View>
        <View style={styles.button}>
            <Button 
                title="Log In or Sign Up" 
                onPress={handleContinue} 
                color='#fff'/>
        </View>
    </View>
  );

};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: colors.background,
    },
    button: {
        backgroundColor:colors.darkNeutral,
        borderRadius: 10,
        width: '80%',
        margin: 10,
        marginBottom:150
    },
    curve: {
        position:"absolute",
        bottom:0,
    },
    image: {
        height: 200,
        width: 300
    }
  });

export default Landing;
