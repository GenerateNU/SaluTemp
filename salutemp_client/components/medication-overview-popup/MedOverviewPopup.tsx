import React from 'react';
import { Pressable, StyleSheet, View, Dimensions } from 'react-native';
import { Modal, Portal, Text } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';
import Graph from './Graph';
import StatusBar from './StatusBar';
import { Status, MedOverviewTypeEnum, getStatusColors } from '../../types/medicationTypes';
import { getMedicationConstraint } from '../../services/medicationService';
import { MedicationConstraint, StatusReport } from '../../types';
interface MedicationInfo {
  status: Status;
  curr: number;
  medId: string;
  storedMedId: string;
}

interface MedOverviewPopupProps {
  modalVisible: boolean;
  setModalVisible: (input: boolean) => void;
  medOverviewType: MedOverviewTypeEnum;
  medicationInfo: MedicationInfo;
  graph: StatusReport[];
}

export interface MedicationPositionStates {
  min: number;
  max: number;
  data: { time: number; point: number }[];
}

export default function MedOverviewPopup(props: MedOverviewPopupProps) {
  const hideModal = () => props.setModalVisible(false);
  const { width } = Dimensions.get('window');
  const [constraint, setConstraint] = React.useState<MedicationConstraint>();
  const [graph, setGraph] = React.useState<{ time: number; point: number }[]>([]);

  React.useEffect(() => {
    if (!props.modalVisible) return;
    getmedconstraint();

    if (!props.graph) return;

    populateGraph();
  }, [props.modalVisible]);

  const getmedconstraint = () => {
    getMedicationConstraint(props.medicationInfo.medId, props.medOverviewType).then(
      (constraint) => {
        setConstraint(constraint);
      }
    );
  };

  const populateGraph = () => {
    props.graph.forEach((g) => {
      // const curr = new Date().setHours(new Date().getHours() - 5);
      // const time = curr - new Date(g.event_time).getTime();
      // graph?.push({
      //   point: g.humidity,
      //   time: time / 1000 / 60 / 60
      // });
      // setGraph(graph);
      // Dummy data array
      const dummyData = [
        { time: 1, point: 10 },
        { time: 2, point: 20 },
        { time: 3, point: 30 },
        { time: 4, point: 40 },
        { time: 5, point: 50 },
        // Add as many points as needed
      ];

      setGraph(dummyData);
    });
  };

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
            {props.medOverviewType == 'LIGHT_EXPOSURE' ? 'LIGHT' : props.medOverviewType}
          </Text>
          <Pressable onTouchEnd={hideModal}>
            <Feather name="x" adjustsFontSizeToFit size={width / 15} color="white" />
          </Pressable>
        </View>
        <View style={styles.popup}>
          {constraint && (
            <StatusBar
              type={props.medOverviewType}
              min={constraint.min_threshold}
              max={constraint.max_threshold}
              curr={props.medicationInfo.curr}
              status={props.medicationInfo.status}
            />
          )}
          {constraint && graph && (
            <Graph
              type={props.medOverviewType}
              min={constraint.min_threshold}
              max={constraint.max_threshold}
              data={graph}
            />
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
  popup: {
    height: '98%',
    backgroundColor: '#EFECE7',
    width: '100%',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    alignItems: 'center'
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
