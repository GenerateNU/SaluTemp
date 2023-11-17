import React from 'react';
import { Pressable, StyleSheet, View, Dimensions } from 'react-native';
import { Modal, Portal, Text } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';
import colors from '../../config/colors';
import Graph from './Graph';
import StatusBar from './StatusBar';

interface MedOverviewPopupProps {
  modalVisible: boolean;
  setModalVisible: (input: boolean) => void;
  medOverviewType: MedOverviewTypeEnum;
}

export enum MedOverviewTypeEnum {
  None,
  Temperature,
  Humidity,
  Light
}

export default function MedOverviewPopup(props: MedOverviewPopupProps) {
  const hideModal = () => props.setModalVisible(false);
  const { width } = Dimensions.get('window');
  const fill = 80;
  const status = 'Bad';
  return (
    <Portal>
      <Modal
        visible={props.modalVisible}
        onDismiss={hideModal}
        contentContainerStyle={[styles.popupStyle]}
      >
        <View style={[styles.modalHeader, { backgroundColor: colors.darkRed }]}>
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={[styles.titleStyle, { fontSize: width / 20 }]}
          >
            Temperature
          </Text>
          <Pressable onTouchEnd={hideModal}>
            <Feather name="x" adjustsFontSizeToFit size={width / 15} color="white" />
          </Pressable>
        </View>
        <View
          style={{
            height: '98%',
            backgroundColor: '#EFECE7',
            width: '100%',
            borderBottomRightRadius: 20,
            borderBottomLeftRadius: 20,
            alignItems: 'center'
          }}
        >
          <StatusBar />
          <Graph />
        </View>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modalHeader: {
    flexDirection: 'row',
    display: 'flex',
    height: '10%',
    paddingHorizontal: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  popupStyle: {
    alignSelf: 'center',
    height: '80%',
    borderRadius: 20,
    width: '90%',
    flexDirection: 'column',
    backgroundColor: '#EFECE7'
  },
  titleStyle: {
    color: 'white',
    fontWeight: '500',
    flex: 1
  },
  numberStyle: {
    fontSize: 68,
    fontWeight: '500'
  },
  statusStyle: {
    fontSize: 30,
    fontWeight: '500'
  }
});
