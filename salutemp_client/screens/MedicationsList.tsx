import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableHighlight } from 'react-native';
import colors from '../config/colors';
import { getAllUserMedicationsWithConstraint } from '../services/medicationService';
import InformationCard from '../components/InformationCard';
import { useNavigation } from '@react-navigation/native';
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

function MedicationsList() {
  const { navigate } = useNavigation<StackNavigation>();
  const [medicationsTemperatureList, setMedicationsTemperatureList] = React.useState<
    StoredMedicationWithConstraint[]
  >([]);
  const [medicationsHumidityList, setMedicationsHumidityList] = React.useState<
    StoredMedicationWithConstraint[]
  >([]);
  const [medicationsLightList, setMedicationsLightList] = React.useState<
    StoredMedicationWithConstraint[]
  >([]);
  const [medicationStatus, setMedicationStatus] = React.useState<MedicationStatus[]>([]);

  React.useEffect(() => {
    //const userId = FIREBASE_AUTH.currentUser?.uid;
    const userId = 1;
    getAllUserMedicationsWithConstraint(userId, 'temperature').then((ml) =>
      setMedicationsTemperatureList(ml)
    );
    getAllUserMedicationsWithConstraint(userId, 'humidity').then((ml) =>
      setMedicationsLightList(ml)
    );
    getAllUserMedicationsWithConstraint(userId, 'light_exposure').then((ml) =>
      setMedicationsHumidityList(ml)
    );

    setMedicationStatus([]);
    medicationsTemperatureList.forEach((mt) => {
      const status = getStatus(
        mt.current,
        mt.min_threshold,
        mt.max_threshold,
        medicationsHumidityList.find((hl) => hl.medication_id === mt.medication_id)?.current,
        medicationsHumidityList.find((hl) => hl.medication_id === mt.medication_id)?.min_threshold,
        medicationsHumidityList.find((hl) => hl.medication_id === mt.medication_id)?.max_threshold,
        medicationsLightList.find((hl) => hl.medication_id === mt.medication_id)?.current,
        medicationsLightList.find((hl) => hl.medication_id === mt.medication_id)?.min_threshold,
        medicationsLightList.find((hl) => hl.medication_id === mt.medication_id)?.max_threshold
      );

      setMedicationStatus([
        ...medicationStatus,
        { medicationId: mt.medication_id, status: status }
      ]);
    });
  }, []);

  const getStatus = (
    mt: number,
    mt1: number,
    mt2: number,
    mh?: number,
    mh1?: number,
    mh2?: number,
    ml?: number,
    ml1?: number,
    ml2?: number
  ) => {
    return Status.Good;
  };

  // TODO: FIND ERROR HANDLING
  return (
    <View style={styles.container}>
      <Header title="Medications" rightIcon={<AddIcon />} rightAction={() => navigate('New')} />
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.medicationsList}>
        {medicationsTemperatureList &&
          medicationsHumidityList &&
          medicationsLightList &&
          medicationsTemperatureList.map((mt, index) => {
            return (
              <InformationCard
                key={index}
                status={
                  medicationStatus.find((ms) => ms.medicationId === mt.medication_id)?.status ??
                  Status.Bad
                }
                cardTouchAction={() =>
                  navigate('MedicationOverview', {
                    medicationHumidityStatus: medicationsHumidityList.find(
                      (mh) => mh.medication_id === mt.medication_id
                    )!,
                    medicationTemperatureStatus: mt,
                    medicationLightStatus: medicationsLightList.find(
                      (ml) => ml.medication_id === mt.medication_id
                    )!
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
                      {medicationStatus.find((ms) => ms.medicationId === mt.medication_id)
                        ?.status ?? Status.Bad}
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
