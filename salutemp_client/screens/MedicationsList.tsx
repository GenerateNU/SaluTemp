import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import colors from '../config/colors';
import { Medication } from '../types';
import { GetMedications } from '../api/MedicationsApi';
import MedicationCard from '../components/MedicationCard';
import { useNavigation } from '@react-navigation/native';
import { StackNavigation } from '../App';
import Header from '../components/Header';
import AddIcon from '../assets/header-icons/add.svg';

function MedicationsList() {
  const { navigate } = useNavigation<StackNavigation>();
  const [medicationsList, setMedicationsList] = React.useState<Medication[]>([]);

  React.useEffect(() => {
    GetMedications().then((ml) => setMedicationsList(ml));
  }, []);

  return (
    <View style={styles.container}>
      <Header title="Medications" rightIcon={<AddIcon />} rightAction={() => navigate('New')} />
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.medicationsList}>
        {medicationsList &&
          medicationsList.map((ml, index) => (
            <MedicationCard key={index} name={ml.name} status={ml.status} photo={ml.photo} />
          ))}
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
  }
});

export default MedicationsList;
