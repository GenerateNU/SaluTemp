import React from 'react';
import { StyleSheet, SafeAreaView, Text, TouchableHighlight, View } from "react-native";

import colors from '../config/colors';

function MedOverviewScreen() {
    return (
        <SafeAreaView style={styles.container}>
        <Text style={styles.title}>My Medicine</Text>
          <View style={styles.boxOverview}>
              <Text style={styles.temp}>60°</Text>
          </View>
        
        <TouchableHighlight
        activeOpacity={0.6}
        underlayColor="#DDDDDD"
        >
          <View style={styles.card}>
          <Text style={styles.medName}>Insulin</Text>
          <Text style={styles.medDescrip}>GOOD</Text>
          </View>
        </TouchableHighlight>
  
        <TouchableHighlight>
          <View style={styles.card}>
          <Text style={styles.medName}>Novolog</Text>
          <Text style={styles.medDescrip}>GOOD</Text>
          </View>
        </TouchableHighlight>
      
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex : 1,
      gap : 20,
      backgroundColor : colors.background,
      flexDirection : "column",
      alignItems : 'center',
      alignContent : 'center',
      marginTop : 60
    },
  
    boxOverview: {
      padding : 20,
      marginLeft : 20,
      alignSelf : 'baseline',
      alignItems : 'center',
      justifyContent : 'center',
      backgroundColor : colors.primary,
      borderRadius : 20,
      width : 350,
      height : 125,
    },
  
    temp: {
      fontSize : 40,
      color : colors.bodyText
    },
  
    title: {
      backgroundColor : colors.background,
      fontSize : 20,
      fontWeight : "500",
      color : colors.primary
    },
  
    card: {
      padding : 20,
      backgroundColor : colors.primary,
      borderRadius : 20,
      height : 200,
      width : 350,    
      
    },
  
    medName: {
      fontSize : 20,
      color : colors.bodyText,
      marginBottom: 10
    },
  
    medDescrip: {
      fontSize : 14,
      color : colors.bodyText
    }
  });

export default MedOverviewScreen;