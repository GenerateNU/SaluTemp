import React from 'react';
import { Pressable, StyleSheet, View, Dimensions } from 'react-native';
import { Modal, Portal, Text } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';
import Graph from './Graph';
import StatusBar from './StatusBar';
import { getStatusColors } from '../../types/medications/functions';
import { Status, MedOverviewTypeEnum } from '../../types/medications/types';
import { getMedicationStatus } from '../../services/medicationService';
interface MedicationInfo {
  status: Status;
  curr: number;
  id: number;
}

interface MedOverviewPopupProps {
  modalVisible: boolean;
  setModalVisible: (input: boolean) => void;
  medOverviewType: MedOverviewTypeEnum;
  medicationInfo: MedicationInfo;
}

export interface MedicationPositionStates {
  min: number;
  max: number;
  data: { time: number; point: number }[];
}

export default function MedOverviewPopup(props: MedOverviewPopupProps) {
  const hideModal = () => props.setModalVisible(false);
  const { width } = Dimensions.get('window');
  const [graph, setGraph] = React.useState<MedicationPositionStates | null>(null);

  React.useEffect(() => {
    getMedicationStatus(props.medicationInfo.id).then((status) => setGraph(status));
  }, [props.medOverviewType]);

  return (
    <Portal>
      <Modal
        visible={props.modalVisible}
        onDismiss={hideModal}
        contentContainerStyle={[styles.popupStyle]}
      >
        <View
          style={[
            styles.modalHeader,
            { backgroundColor: getStatusColors(props.medicationInfo.status).side }
          ]}
        >
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={[styles.titleStyle, { fontSize: width / 20 }]}
          >
            {props.medOverviewType}
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
          {graph && (
            <StatusBar
              type={props.medOverviewType}
              min={graph.min}
              max={graph.max}
              curr={props.medicationInfo.curr}
              status={props.medicationInfo.status}
            />
          )}
          {graph && (
            <Graph type={props.medOverviewType} min={graph.min} max={graph.max} data={graph.data} />
          )}
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
    borderRadius: 20,
    width: '90%',
    flexDirection: 'column',
    backgroundColor: '#EFECE7',
    flex: 0.7
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
