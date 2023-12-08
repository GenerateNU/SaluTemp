import React from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import LeftArrow from '../assets/header-icons/left-arrow.svg';
import EditIcon from '../assets/header-icons/edit.svg';

import StatusGood from '../assets/statusGood.svg';
import StatusWarning from '../assets/statusWarning.svg';
import StatusBad from '../assets/statusBad.svg';
import Union from '../assets/Union.svg';
import colors from '../config/colors';
import Header from '../components/Header';
import { StackNavigation } from '../App';
import MedOverviewPopup from '../components/medication-overview-popup/MedOverviewPopup';
import { PaperProvider } from 'react-native-paper';
import { MedOverviewTypeEnum, Status, getMedOverviewTypeSymbol } from '../types/medicationTypes';
import InformationCard from '../components/InformationCard';
import { StatusReport } from '../types';
import { getMedicationStatus } from '../services/medicationService';

type ParamList = {
  mt: {
    medName: string;
    temperature: string;
    humidity: string;
    light: string;
    status: string;
    statusLight: string;
    statusTemp: string;
    statusHumidity: string;
    id: string;
    storedMedId: string;
  };
};

interface ModalInfo {
  current: number;
  status: Status;
}

function MedOverviewScreen() {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalType, setModalType] = React.useState<MedOverviewTypeEnum>(
    MedOverviewTypeEnum.Temperature
  );
  const [modalInfo, setModalInfo] = React.useState<ModalInfo>();
  const [graph, setGraph] = React.useState<StatusReport[]>([]);
  const ref = React.useRef<ScrollView | null>(null);
  const { goBack } = useNavigation<StackNavigation>();
  const route = useRoute<RouteProp<ParamList, 'mt'>>();

  const {
    medName,
    temperature,
    humidity,
    light,
    status,
    statusHumidity,
    statusLight,
    statusTemp,
    id,
    storedMedId
  } = route.params;

  React.useEffect(() => {
    ref.current?.scrollTo({ y: 0 });
    //getMedicationStatus(id).then((status) => setGraph(status));
    // Creating dummy data that matches the StatusReport type
    const dummyData: StatusReport[] = [
      {
        event_time: new Date().toISOString(),
        stored_medication_id: 1,
        temperature: 22,
        humidity: 45,
        light: 300,
      },
      {
        event_time: new Date().toISOString(),
        stored_medication_id: 2,
        temperature: 25,
        humidity: 50,
        light: 350,
      },
      {
        event_time: new Date().toISOString(),
        stored_medication_id: 3,
        temperature: 32,
        humidity: 60,
        light: 500,
      },
      {
        event_time: new Date().toISOString(),
        stored_medication_id: 4,
        temperature: 40,
        humidity: 20,
        light: 200,
      },
      {
        event_time: new Date().toISOString(),
        stored_medication_id: 5,
        temperature: 55,
        humidity: 80,
        light: 800,
      },
      {
        event_time: new Date().toISOString(),
        stored_medication_id: 6,
        temperature: 75,
        humidity: 35,
        light: 450,
      },
      {
        event_time: new Date().toISOString(),
        stored_medication_id: 7,
        temperature: 90,
        humidity: 10,
        light: 100,
      },
      {
        event_time: new Date().toISOString(),
        stored_medication_id: 8,
        temperature: 85,
        humidity: 95,
        light: 950,
      },
      {
        event_time: new Date().toISOString(),
        stored_medication_id: 9,
        temperature: 45,
        humidity: 55,
        light: 550,
      },
      {
        event_time: new Date().toISOString(),
        stored_medication_id: 10,
        temperature: 60,
        humidity: 70,
        light: 700,
      },
    ];
    
    setGraph(dummyData);
  }, [id]);

  const medStatus =
    (status as Status) == Status.Good ? (
      <StatusGood style={styles.statusSymbol} />
    ) : (status as Status) == Status.Warning ? (
      <StatusWarning style={styles.statusSymbol} />
    ) : (
      <StatusBad style={styles.statusSymbol} />
    );

  return (
    <PaperProvider>
      <MedOverviewPopup
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        medOverviewType={modalType}
        graph={graph}
        medicationInfo={{
          curr: modalInfo?.current ?? 0,
          status: modalInfo?.status ?? Status.Bad,
          medId: id,
          storedMedId: storedMedId
        }}
      />
      <View style={styles.container}>
        <Header
          leftIcon={<LeftArrow height={24} />}
          leftAction={() => goBack()}
          rightIcon={<EditIcon height={24} />}
        />
        <ScrollView ref={ref}>
          <View style={styles.topShape}>
            <View style={styles.header}>
              <Text style={styles.title}>{medName}</Text>
              <Text style={styles.subtext}>Last used: 12/08/2023</Text>
              <Text style={styles.subtext}>Expiration Date: 12/08/2023</Text>
              <Text style={styles.subtext}>Lot #: 12082023</Text>
              <Union style={styles.union} />
              {medStatus}
            </View>
          </View>
          <View style={styles.monitorDetails}>
            <InformationCard
              status={(statusTemp as Status) ?? Status.Bad}
              cardTouchAction={() => {
                setModalInfo({
                  status: statusTemp as Status,
                  current: parseFloat(temperature)
                });
                setModalType(MedOverviewTypeEnum.Temperature);
                setModalVisible(true);
              }}
            >
              <View>
                <Text style={styles.cardHeading}>Temperature</Text>
                <Text style={styles.numberText}>{`${temperature}${getMedOverviewTypeSymbol(
                  MedOverviewTypeEnum.Temperature
                )}F`}</Text>
              </View>
            </InformationCard>
            <InformationCard
              status={(statusHumidity as Status) ?? Status.Bad}
              cardTouchAction={() => {
                setModalInfo({
                  status: statusHumidity as Status,
                  current: parseFloat(humidity)
                });
                setModalType(MedOverviewTypeEnum.Humidity);
                setModalVisible(true);
              }}
            >
              <View>
                <Text style={styles.cardHeading}>Humidity</Text>
                <Text style={styles.numberText}>{`${humidity}${getMedOverviewTypeSymbol(
                  MedOverviewTypeEnum.Humidity
                )}`}</Text>
              </View>
            </InformationCard>

            <InformationCard
              status={(statusLight as Status) ?? Status.Bad}
              cardTouchAction={() => {
                setModalInfo({
                  status: statusLight as Status,
                  current: parseFloat(light)
                });
                setModalType(MedOverviewTypeEnum.Light);
                setModalVisible(true);
              }}
            >
              <View>
                <Text style={styles.cardHeading}>Light</Text>
                <Text style={styles.numberText}>{`${light} Lumens`}</Text>
              </View>
            </InformationCard>
            <Text style={styles.notes}>Notes</Text>
            <View style={styles.textInput}></View>
          </View>
        </ScrollView>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flexDirection: 'column',
    height: '100%'
  },

  cardHeading: {
    fontSize: 20,
    fontWeight: '500',
    paddingBottom: 20
  },

  numberText: {
    fontSize: 15,
    fontWeight: '500'
  },

  notes: {
    fontSize: 20,
    fontWeight: '500',
    paddingLeft: 10
  },

  topShape: {
    backgroundColor: colors.darkNeutral,
    height: 230,
    width: Dimensions.get('window').width,
    top: 0
  },

  navButton: {
    alignSelf: 'baseline',
    marginLeft: 10
  },

  header: {
    marginTop: 10,
    alignItems: 'center',
    alignContent: 'center',
    gap: 10
  },

  dosage: {
    alignItems: 'center',
    alignContent: 'center'
  },

  title: {
    fontSize: 30,
    fontWeight: '500',
    color: colors.white
  },

  subtext: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.white,
    zIndex: 20
  },

  icon: {
    marginTop: 30,
    marginBottom: 30,
    color: colors.background
  },

  monitorDetails: {
    alignSelf: 'center',
    padding: 20,
    gap: 20,
    top: 100,
    paddingBottom: 120,
    paddingTop: 50
  },

  subHeadingOne: {
    fontSize: 20
  },

  button: {
    alignItems: 'center',
    alignSelf: 'center',
    padding: 20,
    backgroundColor: colors.darkNeutral,
    borderRadius: 20,
    height: 60,
    width: 310
  },

  subHeadingTwo: {
    fontSize: 12,
    color: colors.background
  },

  card: {
    alignSelf: 'center',
    gap: 5,
    padding: 15,
    backgroundColor: colors.grey,
    borderRadius: 20,
    height: 70,
    width: 280
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
    lineHeight: 17
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
    top: 140,
    height: 180,
    width: 180
  },

  union: {
    position: 'absolute',
    top: 80,
    height: 305.9,
    width: Dimensions.get('window').width
  },

  textInput: {
    padding: 8,
    borderRadius: 20,
    width: Dimensions.get('screen').width - 60,
    height: 80,
    fontSize: 14,
    backgroundColor: colors.grey,
    color: colors.darkNeutral
  }
});

export default MedOverviewScreen;
