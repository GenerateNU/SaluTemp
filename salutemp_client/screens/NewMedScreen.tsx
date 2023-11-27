import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import colors from '../config/colors';
import Header from '../components/Header';
import { useNavigation } from '@react-navigation/native';
import LeftArrow from '../assets/header-icons/left-arrow.svg';
import { StackNavigation } from '../App';

const NewMedScreen = () => {
  const { goBack } = useNavigation<StackNavigation>();
  return (
    <View style={styles.container}>
      <Header
        title="Add New Medication"
        leftIcon={<LeftArrow height={24} />}
        leftAction={() => goBack()}
      />
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    flexDirection: 'column',
    width: '100%',
    height: '100%'
  },

  add: {
    textAlign: 'left'
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
    color: colors.darkNeutral
  },

  titleLight: {
    fontSize: 20,
    fontWeight: '400',
    color: colors.white
  },

  textInputThin: {
    padding: 8,
    borderRadius: 8,
    width: 160,
    fontSize: 14,
    backgroundColor: colors.grey,
    color: colors.darkNeutral
  },

  textInputWide: {
    padding: 8,
    borderRadius: 8,
    width: 330,
    height: 80,
    fontSize: 14,
    backgroundColor: colors.grey,
    color: colors.darkNeutral
  },

  titleAndChildren: {
    paddingTop: 3,
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
