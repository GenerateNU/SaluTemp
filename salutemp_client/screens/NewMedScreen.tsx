import React from "react";
import { SafeAreaView, StyleSheet, Text, View, TouchableHighlight, TextInput } from "react-native";
import colors from "../config/colors";

function NewMedScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>
                Add Mew Medication
            </Text>

        <TouchableHighlight
        activeOpacity={0.6}
        underlayColor="#DDDDDD"
        >
          <View style={styles.card}>
          <TextInput style={styles.textInput}>
            Name...
          </TextInput>
          </View>
        </TouchableHighlight>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex : 1,
      gap : 20,
      backgroundColor : colors.backgroundColor,
      flexDirection : "column",
      alignItems : 'center',
      alignContent : 'center',
      marginTop : 60
    },

    title: {
        backgroundColor : colors.backgroundColor,
        fontSize : 20,
        fontWeight : "500",
        color : colors.secondary 
    },

    medName: {
        fontSize : 20,
        color : colors.bodyText,
        marginBottom: 10
    },

    card: {
        padding : 20,
        backgroundColor : colors.secondary,
        borderRadius : 20,
        height : 600,
        width : 350,    
        
    },

    textInput: {
        padding : 8,
        borderRadius : 4,
        fontSize : 20,
        color : colors.bodyText
    }

})

export default NewMedScreen;
