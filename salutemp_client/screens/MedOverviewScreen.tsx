import React from 'react';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LeftArrow from '../assets/header-icons/left-arrow.svg';
import EditIcon from '../assets/header-icons/edit.svg';

import colors from '../config/colors';
import Header from '../components/Header';
import { StackNavigation } from '../App';
import MedOverviewPopup, {
  MedOverviewTypeEnum
} from '../components/medication-overview-popup/MedOverviewPopup';
import { PaperProvider } from 'react-native-paper';

function MedOverviewScreen() {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalView, setModalView] = React.useState<MedOverviewTypeEnum>();
  const { goBack } = useNavigation<StackNavigation>();
  return (
    <PaperProvider settings={{}}>
      <MedOverviewPopup
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        medOverviewType={MedOverviewTypeEnum.Temperature}
      />
      <View style={styles.container}>
        <Header
          leftIcon={<LeftArrow height={24} />}
          leftAction={() => goBack()}
          rightIcon={<EditIcon height={24} />}
        />

        <View style={styles.topShape}>
          {/* <TouchableWithoutFeedback style={styles.navButton}>
          <Text>   <Entypo name="chevron-thin-left" size={24} color="black" /></Text>
        </TouchableWithoutFeedback> */}
          <View style={styles.header}>
            <Text style={styles.title}>Medication Name</Text>
            <Text style={styles.subHeadingTwo}>Last used date & time, Expires on date, Lot #</Text>
            <AntDesign
              name="smileo"
              size={180}
              color={colors.coordinatingColor}
              style={styles.icon}
            />
          </View>
        </View>
        <View style={styles.monitorDetails}>
          <View
            style={styles.card}
            onTouchEnd={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <Text>Temperature</Text>
            <View style={styles.row}>
              <Text>46°F </Text>
              <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
            </View>
          </View>

          <View style={styles.card}>
            <Text>Humidity</Text>
            <View style={styles.row}>
              <Text>95%</Text>
              <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
            </View>
          </View>

          <View style={styles.card}>
            <Text>Light</Text>
            <View style={styles.row}>
              <Text>22 lumens</Text>
              <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
            </View>
          </View>
        </View>

        <View style={styles.navBar}></View>

        {/* <View style={styles.button}>
        <Text style={styles.textOnDark}>Dosage Reminder</Text>
      </View> */}
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flexDirection: 'column'
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
    color: colors.black
  },

  icon: {
    marginTop: 30,
    marginBottom: 30
  },

  monitorDetails: {
    alignSelf: 'center',
    padding: 20,
    gap: 20
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
    color: colors.black
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
    backgroundColor: colors.coordinatingColor,
    height: 80,
    width: 'auto',
    borderTopLeftRadius: 160,
    borderTopRightRadius: 160,
    marginTop: 30
  },

  add: {
    textAlign: 'left'
  }
});

export default MedOverviewScreen;
