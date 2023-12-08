import React, { useState } from 'react';

import { Text, View, TouchableOpacity } from 'react-native';
import colors from '../config/colors';

function CustomSwitch({
  selectionMode,
  roundCorner,
  option1,
  option2,
  onSelectSwitch,
  selectionColor
}: {
  selectionMode: number;
  roundCorner: boolean;
  option1: string;
  option2: string;
  onSelectSwitch: (val: any) => void;
  selectionColor: string;
}) {
  const [getSelectionMode, setSelectionMode] = useState(selectionMode);
  const [getRoundCorner, setRoundCorner] = useState(roundCorner);

  const updatedSwitchData = (val: any) => {
    setSelectionMode(val);
    onSelectSwitch(val);
  };

  return (
    <View style={{ paddingTop: 10 }}>
      <View
        style={{
          height: 44,
          width: 315,
          backgroundColor: colors.lightNeutral,
          borderRadius: getRoundCorner ? 25 : 0,
          borderWidth: 1,
          borderColor: colors.lightNeutral,
          flexDirection: 'row',
          justifyContent: 'center',
          padding: 2
        }}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => updatedSwitchData(1)}
          style={{
            flex: 1,

            backgroundColor: getSelectionMode == 1 ? selectionColor : colors.lightNeutral,
            borderRadius: getRoundCorner ? 25 : 0,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Text
            style={{
              color: 'black',
              fontWeight: '500',
              fontSize: 15
            }}
          >
            {option1}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => updatedSwitchData(2)}
          style={{
            flex: 1,

            backgroundColor: getSelectionMode == 2 ? selectionColor : colors.lightNeutral,
            borderRadius: getRoundCorner ? 25 : 0,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Text
            style={{
              color: 'black',
              fontWeight: '500',
              fontSize: 15
            }}
          >
            {option2}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default CustomSwitch;
