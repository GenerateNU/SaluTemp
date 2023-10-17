import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, TouchableHighlight, TextInput, FlatList } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import colors from '../config/colors';
import { useNavigation } from '@react-navigation/native';


interface NewMedScreenProps {
  // Define any props if necessary
}

const NewMedScreen = () => {

  const navigation = useNavigation();
  // function NewMedScreen(props: NewMedScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      {/* <FlatList
      data={NewMedScreen}> */}
      {/* <MaterialCommunityIcons name="toggle-switch-off-outline" size={60} color={colors.coordinatingColor} /> */}
      <View style={styles.titleAndChildren}>
        <Text style={styles.title}>Medication Info</Text>
        <View style={styles.medInfo}>
          <TouchableHighlight style={styles.addPhoto}>
            <MaterialIcons name="add" size={50} color={colors.darkNeutral} />
          </TouchableHighlight>
          <View style={styles.nestedMedInfo}>
            <Text>Medication Name</Text>
            <TextInput style={styles.textInputThin}></TextInput>
            <Text>Expiration Date</Text>
            <TextInput style={styles.textInputThin}></TextInput>
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
      {/* </FlatList> */}

    </SafeAreaView>
  );
}
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    backgroundColor: colors.background,
    flexDirection: 'column',
  },

  addPhoto: {
    backgroundColor: colors.lightNeutral,
    borderRadius: 8,
    height: 160,
    width: 160,
    alignItems: 'center',
    justifyContent: 'center'
  },

  medInfo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15
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
    backgroundColor: colors.coordinatingColor,
    borderRadius: 50,
    height: 60,
    width: 340,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 10
  }

});

export default NewMedScreen;
