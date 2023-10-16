import React from 'react';
import { AntDesign, FontAwesome5, Entypo } from '@expo/vector-icons';
import { StyleSheet, SafeAreaView, Text, View, TouchableWithoutFeedback } from 'react-native';

import colors from '../config/colors';

interface MedOverviewScreenProps {
  // Define any props if necessary
}

function MedOverviewScreen(props: MedOverviewScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback style={styles.navButton}>
        <Text>   <Entypo name="chevron-thin-left" size={24} color="black" /></Text>
      </TouchableWithoutFeedback>
      <View style={styles.header}>
        <Text style={styles.title}>Medication Name</Text>
        <Text style={styles.subHeadingTwo}>Last used date & time, Expires on date, Lot #</Text>
        <AntDesign name="smileo" size={200} color={colors.coordinatingColor} style={styles.icon} />
      </View>

      <View style={styles.info}>
        <Text style={styles.subHeadingOne}>Monitor Details</Text>
        <View>
          <Text><FontAwesome5 name="temperature-low" size={20} color={colors.coordinatingColor} />  Temperature: %</Text>
        </View>

        <View style={styles.card}>
          <Text>   Humidity: %</Text>
        </View>

        <Text><Entypo name="light-bulb" size={22} color={colors.coordinatingColor} />  Light: %</Text>
      </View>

      <View style={styles.button}>
        <Text style={styles.textOnDark}>Dosage Reminder</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flexDirection: 'column',
  },

  navButton: {
    alignSelf: 'baseline',
    marginLeft: 10,
  },

  header: {
    marginTop: 10,
    alignItems: 'center',
    alignContent: 'center',
    gap: 10,
  },

  dosage: {
    alignItems: 'center',
    alignContent: 'center',
  },

  title: {
    fontSize: 30,
    fontWeight: '500',
    color: colors.black,
  },

  icon: {
    marginTop: 30,
    marginBottom: 30,
  },

  info: {
    alignSelf: 'center',
    padding: 20,
    gap: 20,
  },

  subHeadingOne: {
    fontSize: 20,
  },

  button: {
    alignItems: 'center',
    alignSelf: 'center',
    padding: 20,
    backgroundColor: colors.darkNeutral,
    borderRadius: 20,
    height: 60,
    width: 310,
  },

  subHeadingTwo: {
    fontSize: 12,
    color: colors.black,
  },

  card: {
    alignSelf: 'center',
    padding: 20,
    backgroundColor: colors.lightNeutral,
    borderRadius: 20,
    height: 140,
    width: 340,
  },

  textOnDark: {
    alignSelf: 'center',
    justifyContent: 'center',
    color: colors.lightNeutral,
    lineHeight: 17,
  },
});

export default MedOverviewScreen;
