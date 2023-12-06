import React from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView, TextInput } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import LeftArrow from '../assets/header-icons/left-arrow.svg';
import EditIcon from '../assets/header-icons/edit.svg';

import StatusGood from '../assets/statusGood.svg';
import Union from '../assets/Union.svg';
import colors from '../config/colors';
import Header from '../components/Header';
import { StackNavigation } from '../App';
import MedOverviewPopup from '../components/medication-overview-popup/MedOverviewPopup';
import { PaperProvider } from 'react-native-paper';
import { MedOverviewTypeEnum, Status, getMedOverviewTypeSymbol } from '../types/medicationTypes';
import MonitorInfoCard from '../components/MonitorInfoCard';

type ParamList = {
  mt: {
    medName: string;
    temperature: string;
    humidity: string;
    light: string;
  };
};

// TODO: REMOVE HARDCODED STUFF
function MedOverviewScreen() {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalType, setModalType] = React.useState<MedOverviewTypeEnum>(
    MedOverviewTypeEnum.Temperature
  );

  const { goBack, navigate } = useNavigation<StackNavigation>();
  const route = useRoute<RouteProp<ParamList, 'mt'>>();
  console.log(route.params);

  const { medName, temperature, humidity, light } = route.params;

  return (
    <PaperProvider>
      <MedOverviewPopup
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        medOverviewType={modalType}
        medicationInfo={{ curr: 40, status: Status.Bad, id: 1 }}
      />
      <View style={styles.container}>
        <Header
          leftIcon={<LeftArrow height={24} />}
          leftAction={() => goBack()}
          rightIcon={<EditIcon height={24} />}
        />
        <ScrollView>
          <View style={styles.topShape}>
            <View style={styles.header}>
              <Text style={styles.title}>{medName}</Text>
              <Union style={styles.union} />
              <StatusGood style={styles.statusSymbol} />
            </View>
          </View>
          <View style={styles.monitorDetails}>
            <MonitorInfoCard
              category="Temperature"
              value={`${temperature}${getMedOverviewTypeSymbol(MedOverviewTypeEnum.Temperature)}`}
            />
            <MonitorInfoCard
              category="Humidity"
              value={`${humidity}${getMedOverviewTypeSymbol(MedOverviewTypeEnum.Humidity)}`}
            />
            <MonitorInfoCard category="Light" value={`${light} Lumens`} />
            <Text>Notes</Text>
            <TextInput style={styles.textInput}></TextInput>
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

  topShape: {
    backgroundColor: colors.darkNeutral,
    height: 230,
    width: Dimensions.get('window').width,
    zIndex: 20
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
    paddingBottom: 120
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
    width: 280,
    height: 80,
    fontSize: 14,
    backgroundColor: colors.grey,
    color: colors.darkNeutral
  }
});

export default MedOverviewScreen;
