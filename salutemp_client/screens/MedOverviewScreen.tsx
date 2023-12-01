import React from 'react';
import { StyleSheet, SafeAreaView, Text, View, Image } from 'react-native';
import SVG from '../assets/statusGood.svg';
import colors from '../config/colors';
import MonitorInfoCard from '../components/MonitorInfoCard';

interface MedOverviewScreenProps {
  // Define any props if necessary
}

function MedOverviewScreen(props: MedOverviewScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topShape}>
        <View style={styles.header}>
          <Text style={styles.title}>Medication Name</Text>
          <Text style={styles.subHeadingTwo}>Last used date & time, Expires on date, Lot #</Text>
          <Image source={SVG} style={styles.svgs}/>
        </View>
      </View>

      <View style={styles.monitorDetails}>
        <MonitorInfoCard category='Temperature' value='60°'/>
        <MonitorInfoCard category='Humidity' value='95%'/>
        <MonitorInfoCard category='Light' value='22 Lumens'/>
      </View>

      <View style={styles.navBar}>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flexDirection: 'column',
  },

  topShape: {
    backgroundColor: colors.darkNeutral,
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
    color: colors.background,
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
    color: colors.background,
    marginBottom: 30
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
    backgroundColor: colors.darkNeutral,
    height: 80,
    width: 'auto',
    borderTopLeftRadius: 160,
    borderTopRightRadius: 160,
    marginTop: 30
  },

  svgs: {
    height: 180,
    width: 180
  }
});

export default MedOverviewScreen;
