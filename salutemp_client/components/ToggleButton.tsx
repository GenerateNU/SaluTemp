import React, { useState } from 'react';
import { Text, View, TouchableHighlight, StyleSheet } from 'react-native';
import colors from '../config/colors';

const ToggleButton = ({
    // roundCorner
}) => {
    // const[getRoundCorner, setroundCorner] = useState(roundCorner);
}

const styles = StyleSheet.create({
    pillContainter: {
        backgroundColor: colors.lightNeutral,
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 4,
        height: 40,
        width: 280
    },

    pill: {
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center'
    }

})

export default ToggleButton;