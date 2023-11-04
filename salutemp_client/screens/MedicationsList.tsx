import React from 'react';
import { StyleSheet, SafeAreaView, Text } from 'react-native';
import colors from '../config/colors';
import { Medication } from '../types';
import { GetMedications } from '../api/MedicationsApi';
import MedicationCard from '../components/MedicationCard';

interface MedicationListProps {
  // Define any props if necessary
}

function MedicationsList(props: MedicationListProps) {
  const [medicationsList, setMedicationsList] = React.useState<Medication[]>([]);

  React.useEffect(() => {
    GetMedications().then((ml) => setMedicationsList(ml));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Medications</Text>
      {medicationsList &&
        medicationsList.map((ml, index) => (
          <MedicationCard key={index} name={ml.name} status={ml.status} photo={ml.photo} />
        ))}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    alignSelf: 'center',
    flexDirection: 'column',
    gap: 20
  },

  title: {
    fontSize: 20,
    fontWeight: '500',
    color: colors.darkNeutral
  }
});

export default MedicationsList;
