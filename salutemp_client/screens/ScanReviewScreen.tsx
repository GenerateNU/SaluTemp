import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableHighlight, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import colors from '../config/colors';

const ScanReviewScreen = () => {

  // const navigation = useNavigation();
  // const [medName, setMedName] = useState('');
  // const [nickname, setNickname] = useState('');
  // const [date, setDate] = useState('');
  // const [maxTemp, setMaxTemp] = useState('');
  // const [minTemp, setMinTemp] = useState('');
  // const [maxHumid, setMaxHumid] = useState('');
  // const [minHumid, setMinHumid] = useState('');
  // const [maxLight, setMaxLight] = useState('');
  // const [minLight, setMinLight] = useState('');


  return (
    <SafeAreaView style={styles.container}>
      <TouchableHighlight>
        <View style={styles.scanAgainButton}>
          <Text>Scan Again</Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight style={styles.addPhoto}>
        <MaterialIcons name="add" size={40} color={colors.neutral} />
      </TouchableHighlight>
      <View style={styles.titleAndChildren}>
        <Text style={styles.title}>Medication Info</Text>
        <View style={styles.columnStyle}>
          <Text>Medication Name</Text>
          <TextInput style={styles.textInputThinLong}
            // onChangeText={text => setMedName(text)}
            // value={medName}
          ></TextInput>
        </View>
        <View style={styles.columns}>
          <View style={styles.columnStyle}>
            <Text>Nickname (Optional)</Text>
            <TextInput style={styles.textInputThin}
              // onChangeText={text => setNickname(text)}
              // value={nickname}
              ></TextInput>
          </View>
          <View style={styles.columnStyle}>
            <Text>Expiration Date</Text>
            <TextInput style={styles.textInputThin}
              placeholder="mm / dd / yy"
              // onChangeText={text => setDate(text)}
              // value={date}
              ></TextInput>
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
            <TextInput style={styles.textInputThin}
              // onChangeText={text => setMaxTemp(text)}
              // value={maxTemp}
              ></TextInput>
            <Text>Max Humidity</Text>
            <TextInput style={styles.textInputThin}
              // onChangeText={text => setMaxHumid(text)}
              // value={maxHumid}
              ></TextInput>
            <Text>Max Light</Text>
            <TextInput style={styles.textInputThin}
              // onChangeText={text => setMaxLight(text)}
              // value={maxLight}
              ></TextInput>
          </View>

          <View style={styles.columnStyle}>
            <Text>Min Temp</Text>
            <TextInput style={styles.textInputThin}
              // onChangeText={text => setMinTemp(text)}
              // value={minTemp}
              ></TextInput>
            <Text>Min Humidity</Text>
            <TextInput style={styles.textInputThin}
              // onChangeText={text => setMinHumid(text)}
              // value={minHumid}
              ></TextInput>
            <Text>Min Light</Text>
            <TextInput style={styles.textInputThin}
              // onChangeText={text => setMinLight(text)}
              // value={minLight}
              ></TextInput>
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

  scanAgainButton: {
    backgroundColor: colors.background,
    borderColor: colors.darkNeutral,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: 280,
    height: 45,
    borderRadius: 30, 
    borderWidth: 3
  }
});

export default ScanReviewScreen;
