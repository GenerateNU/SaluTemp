import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableHighlight, TextInput, FlatList } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import colors from '../config/colors';


const ScanBarcodeScreen = () => {

    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.cameraCard}>
            <MaterialIcons name="add" size={50} color={colors.darkNeutral} />
            </View>

            <TouchableHighlight>
                <Ionicons name="scan-circle" size={60} color={colors.lightNeutral} />
            </TouchableHighlight>
        </SafeAreaView>

      
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 20,
        backgroundColor: colors.background,
        flexDirection: 'column',
        alignItems: 'center'
    },

    cameraCard: {
        backgroundColor: colors.lightNeutral,
        borderRadius: 20,
        height: 250,
        width: 250,
        alignItems: 'center',
        justifyContent: 'center'
    }

});

export default ScanBarcodeScreen;

