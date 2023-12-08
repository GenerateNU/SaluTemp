import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import colors from '../config/colors';
import { getAllUserMedicationsWithConstraint } from '../services/medicationService';
import InformationCard from '../components/InformationCard';
import { StackNavigation } from '../App';
import Header from '../components/Header';
import AddIcon from '../assets/header-icons/add.svg';
import { MaterialIcons } from '@expo/vector-icons';
import { Status } from '../types/medicationTypes';
import { StoredMedicationWithConstraint } from '../types';
import { FIREBASE_AUTH } from '../firebaseConfig';

interface MedicationStatus {
  medicationId: number;
  status: Status;
}

export const getStatusForMedicationConstraint = (
  current: number,
  minThreshold: number,
  maxThreshold: number
) => {
  if (maxThreshold == 0 && minThreshold == 0) {
    return Status.NoStatus;
  }

  if (current > maxThreshold + 2 || current < minThreshold + 2) {
    return Status.Bad;
  }
  if (current + 1 > maxThreshold || current - 1 < minThreshold) {
    return Status.Warning;
  }

  return Status.Good;
};

function MedicationsList() {
  const { navigate } = useNavigation<StackNavigation>();
  const [medicationsTemperatureList, setMedicationsTemperatureList] = React.useState<
    StoredMedicationWithConstraint[]
  >([]);

  React.useEffect(() => {
    //const userId = FIREBASE_AUTH.currentUser?.uid;
    const userId = '1';
    getAllUserMedicationsWithConstraint(userId).then((ml) => setMedicationsTemperatureList(ml));
  }, []);

  const getStatus = (
    mt: number,
    mt1: number,
    mt2: number,
    mh: number,
    mh1: number,
    mh2: number,
    ml: number,
    ml1: number,
    ml2: number
  ) => {
    const mts = getStatusForMedicationConstraint(mt, mt1, mt2);
    const mhs = getStatusForMedicationConstraint(mh, mh1, mh2);
    const mls = getStatusForMedicationConstraint(ml, ml1, ml2);

    if (mts == Status.Bad || mts == Status.Warning) return mts;
    if (mhs == Status.Bad || mhs == Status.Warning) return mhs;
    if (mls == Status.Bad || mls == Status.Warning) return mls;
    return Status.Good;
  };

  return (
    <View style={styles.container}>
      <Header title="Medications" rightIcon={<AddIcon />} rightAction={() => navigate('New')} />
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.medicationsList}>
        {medicationsTemperatureList &&
          medicationsTemperatureList.map((mt, index) => {
            const status = getStatus(
              mt.current_temperature,
              mt.temp_min_threshold,
              mt.temp_max_threshold,
              mt.current_light,
              mt.light_min_threshold,
              mt.light_max_threshold,
              mt.current_humidity,
              mt.humidity_min_threshold,
              mt.humidity_max_threshold
            );
            return (
              <InformationCard
                key={index}
                status={status}
                cardTouchAction={() =>
                  navigate('MedicationOverview', {
                    id: mt.medication_id,
                    storedMedId: mt.stored_medication_id,
                    temperature: mt.current_temperature,
                    light: mt.current_light,
                    humidity: mt.current_humidity,
                    medName: mt.medication_name,
                    status: status,
                    statusTemp: getStatusForMedicationConstraint(
                      mt.current_temperature,
                      mt.temp_min_threshold,
                      mt.temp_max_threshold
                    ),
                    statusLight: getStatusForMedicationConstraint(
                      mt.current_light,
                      mt.light_min_threshold,
                      mt.light_max_threshold
                    ),
                    statusHumidity: getStatusForMedicationConstraint(
                      mt.current_humidity,
                      mt.humidity_min_threshold,
                      mt.humidity_max_threshold
                    )
                  })
                }
              >
                <TouchableHighlight style={styles.addPhoto}>
                  <MaterialIcons
                    style={{ backgroundColor: colors.grey }}
                    size={20}
                    color={colors.grey}
                  />
                </TouchableHighlight>
                <View style={styles.preview}>
                  <View style={{ gap: 5 }}>
                    <Text style={{ fontSize: 18 }}>{mt.medication_name}</Text>
                    <Text style={styles.subtitle}>
                      Status:
                      {status}
                    </Text>
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
