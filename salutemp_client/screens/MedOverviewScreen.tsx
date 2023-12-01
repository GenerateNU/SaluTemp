import React from 'react';
import { StyleSheet, SafeAreaView, Text, View, Image, Dimensions } from 'react-native';
import statusGood from '../assets/statusGood.svg';
import union from '../assets/union.svg';
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
          <Image source={union} style={styles.union}/>
          <Image source={statusGood} style={styles.statusSymbol}/>
          <Text style={styles.subHeadingTwo}>Last used date & time</Text>
          <Text style={styles.subHeadingTwo}>Expires on date</Text>
          <Text style={styles.subHeadingTwo}>Lot #</Text>
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
    height: Dimensions.get("window").height
  },

  topShape: {
    backgroundColor: colors.darkNeutral,
    height: 230,
    width: Dimensions.get("window").width,
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
    marginTop: 180
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

  statusSymbol: {
    position: 'absolute',
    top: 150,
    height: 180,
    width: 180
  },

  union: {
    position: 'absolute',
    top: 80,
    height: 305.9,
    width: Dimensions.get("window").width,
  }

});

export default MedOverviewScreen;
