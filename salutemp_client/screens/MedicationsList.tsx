import React from 'react';
<<<<<<< HEAD
import { StyleSheet, Text, View, ScrollView, TouchableHighlight } from 'react-native';
=======
import { StyleSheet, SafeAreaView, Text, View, Button, TouchableHighlight, ScrollView } from 'react-native';
>>>>>>> feature/login_flow
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, StackActions } from '@react-navigation/native';

import colors from '../config/colors';
import { Medication, Status } from '../types';
import { getUserMedications } from '../services/medicationService';
import InformationCard from '../components/InformationCard';
import { StackNavigation } from '../App';
import Header from '../components/Header';
import AddIcon from '../assets/header-icons/add.svg';

function MedicationsList() {
  const { navigate } = useNavigation<StackNavigation>();
  const [medicationsList, setMedicationsList] = React.useState<Medication[]>([]);

  React.useEffect(() => {
    // TODO: Do I need an ID here?
    getUserMedications('1').then((ml) => setMedicationsList(ml));
  }, []);

  return (
    <View style={styles.container}>
      <Header title="Medications" rightIcon={<AddIcon />} rightAction={() => navigate('New')} />
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.medicationsList}>
        {medicationsList &&
          medicationsList.map((ml, index) => {
            return (
              <InformationCard key={index} status={ml.status}>
                <TouchableHighlight style={styles.addPhoto}>
                  <MaterialIcons
                    style={{ backgroundColor: colors.grey }}
                    size={20}
                    color={colors.grey}
                  />
                </TouchableHighlight>
                <View style={styles.preview}>
                  <View style={{ gap: 5 }}>
                    <Text style={{ fontSize: 18 }}>{ml.name}</Text>
                    <Text style={styles.subtitle}>Status: {Status[ml.status]}</Text>
                  </View>
                </View>
              </InformationCard>
            );
          })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    width: '100%',
    height: '100%'
  },
  title: {
    fontSize: 20,
    flex: 2,
    fontWeight: '500',
    color: colors.white,
    textAlign: 'right'
  },
  add: {
    textAlign: 'right'
  },
  scrollContainer: {
    backgroundColor: colors.background,
    paddingTop: 20,
    width: '100%'
  },
  topNavContainer: {
    width: '100%',
    backgroundColor: colors.darkNeutral,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10
  },
  medicationsList: {
    display: 'flex',
    marginHorizontal: 'auto',
    alignItems: 'center',
    gap: 20,
    paddingBottom: 30
  },
  subtitle: {
    fontSize: 12
  },
  preview: {
    flexDirection: 'row',
    paddingLeft: 10
  },
  addPhoto: {
    backgroundColor: colors.grey,
    borderRadius: 8,
    height: 60,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default MedicationsList;
