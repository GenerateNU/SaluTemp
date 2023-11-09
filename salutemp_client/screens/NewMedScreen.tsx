import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableHighlight, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { GetEntryInfo } from '../api/MedicationInfoApi';
import colors from '../config/colors';
import { EntryInfo } from '../types';

interface NewMedScreenProps {
  // Define any props if necessary
}

const NewMedScreen = () => {

  const navigation = useNavigation();  
  
  return (
    <SafeAreaView style={styles.container}>
      <TouchableHighlight>
        <View style={styles.toggleButton}>
          <View style={styles.pill}>
            <Text>Manual</Text>
          </View>
        </View>
      </TouchableHighlight>
      <TouchableHighlight style={styles.addPhoto}>
        <MaterialIcons name="add" size={40} color={colors.darkNeutral} />
      </TouchableHighlight>
      <View style={styles.titleAndChildren}>
        <Text style={styles.title}>Medication Info</Text>
        <View style={styles.columnStyle}>
          <Text>Medication Name</Text>
          <TextInput style={styles.textInputThinLong}></TextInput>
        </View>
        <View style={styles.columns}>
          <View style={styles.columnStyle}>
            <Text>Nickname (Optional)</Text>
            <TextInput style={styles.textInputThin}></TextInput>
          </View>
          <View style={styles.columnStyle}>
            <Text>Expiration Date</Text>
            <TextInput style={styles.textInputThin}
              placeholder="mm / dd / yy"></TextInput>
          </View>
        </View>
      </View>

      <View style={styles.titleAndChildren}>
        <Text>Notes</Text>
        <TextInput style={styles.textInputWide}></TextInput>
      </View>

      <View style={styles.titleAndChildren}>
        <Text style={styles.title}>Storage Conditions</Text>
        <View style={styles.columns}>
          <View style={styles.columnStyle}>
            <Text>Max Temp</Text>
            <TextInput style={styles.textInputThin}></TextInput>
            <Text>Max Humidity</Text>
            <TextInput style={styles.textInputThin}></TextInput>
            <Text>Max Light</Text>
            <TextInput style={styles.textInputThin}></TextInput>
          </View>

          <View style={styles.columnStyle}>
            <Text>Min Temp</Text>
            <TextInput style={styles.textInputThin}></TextInput>
            <Text>Min Humidity</Text>
            <TextInput style={styles.textInputThin}></TextInput>
            <Text>Min Light</Text>
            <TextInput style={styles.textInputThin}></TextInput>
          </View>
        </View>
      </View>

      <TouchableHighlight>
        <View style={styles.confirmButton}>
          <Text style={styles.titleLight}>Confirm</Text>
        </View>
      </TouchableHighlight>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    backgroundColor: colors.background,
    flexDirection: 'column',
    alignItems: 'center'
  },

  addPhoto: {
    backgroundColor: colors.grey,
    borderRadius: 8,
    height: 140,
    width: 140,
    alignItems: 'center',
    justifyContent: 'center'
  },

  nestedMedInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: 14
  },

  title: {
    backgroundColor: colors.background,
    fontSize: 20,
    fontWeight: '500',
    color: colors.darkNeutral,
  },

  titleLight: {
    fontSize: 20,
    fontWeight: '400',
    color: colors.white,
  },

  medName: {
    fontSize: 20,
    color: colors.bodyText,
    marginBottom: 10,
  },

  textInputThin: {
    padding: 8,
    borderRadius: 8,
    width: 160,
    fontSize: 14,
    backgroundColor: colors.grey,
    color: colors.darkNeutral,
  },

  textInputThinLong: {
    padding: 8,
    borderRadius: 8,
    width: 330,
    fontSize: 14,
    backgroundColor: colors.grey,
    color: colors.darkNeutral,
  },

  textInputWide: {
    padding: 8,
    borderRadius: 8,
    width: 330,
    height: 80,
    fontSize: 14,
    backgroundColor: colors.grey,
    color: colors.darkNeutral,
  },

  titleAndChildren: {
    alignSelf: 'center',
    gap: 14
  },

  columns: {
    flexDirection: 'row',
    gap: 14
  },

  columnStyle: {
    gap: 15
  },

  confirmButton: {
    backgroundColor: colors.darkNeutral,
    borderRadius: 50,
    height: 60,
    width: 340,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 10
  },
  
  toggleButton: {
    backgroundColor: colors.lightNeutral,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    height: 40,
    width: 280
  },

  pill: {
    backgroundColor: colors.white,
    borderRadius: 30,
    height: 30,
    width: 140,
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center'
  }

});

export default NewMedScreen;
