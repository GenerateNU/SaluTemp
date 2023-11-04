import React from 'react';
import { AntDesign, Entypo, MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, SafeAreaView, Text, View, TouchableWithoutFeedback } from 'react-native';

import colors from '../config/colors';
import MonitorInfoCard from '../components/MonitorInfoCard';

interface MedOverviewScreenProps {
  // Define any props if necessary
}

function MedOverviewScreen(props: MedOverviewScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topShape}>
        {/* <TouchableWithoutFeedback style={styles.navButton}>
          <Text>   <Entypo name="chevron-thin-left" size={24} color="black" /></Text>
        </TouchableWithoutFeedback> */}
        <View style={styles.header}>
          <Text style={styles.title}>Medication Name</Text>
          <Text style={styles.subHeadingTwo}>Last used date & time, Expires on date, Lot #</Text>
          <AntDesign name="smileo" size={180} color={colors.coordinatingColor} style={styles.icon} />
        </View>
      </View>

      <View style={styles.monitorDetails}>
        <MonitorInfoCard category='Temperature' value='60°'/>
        <MonitorInfoCard category='Humidity' value='95%'/>
        <MonitorInfoCard category='Light' value='22 Lumens'/>
      </View>

      <View style={styles.navBar}>

      </View>

      {/* <View style={styles.button}>
        <Text style={styles.textOnDark}>Dosage Reminder</Text>
      </View> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flexDirection: 'column',
  },

  topShape: {
    backgroundColor: colors.lightNeutral,
    height: 350,
    width: 'auto',
    borderBottomLeftRadius: 200,
    borderBottomRightRadius: 200,
    marginBottom: 20
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

  monitorDetails: {
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
    gap: 5,
    padding: 15,
    backgroundColor: colors.grey,
    borderRadius: 20,
    height: 70,
    width: 280,
  },

  colorTab: {
    height: 70,
    width: 5,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  textOnDark: {
    alignSelf: 'center',
    justifyContent: 'center',
    color: colors.lightNeutral,
    lineHeight: 17,
  },

  navBar: {
    backgroundColor: colors.coordinatingColor,
    height: 80,
    width: 'auto',
    borderTopLeftRadius: 160,
    borderTopRightRadius: 160,
    marginTop: 30
  }
});

export default MedOverviewScreen;
