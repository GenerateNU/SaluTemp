import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableHighlight, TextInput, FlatList } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import colors from '../config/colors';


const ScanBarcodeScreen = () => {

    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>

            <TouchableHighlight>
                <View style={styles.toggleButton}>
                    <View style={styles.pill}>
                        <Text>Manual</Text>
                    </View>
                </View>
            </TouchableHighlight>

            <View style={styles.cameraContainer}>
                <View style={styles.cameraCard}>
                    <MaterialIcons name="add" size={50} color={colors.darkNeutral} />
                </View>

                <TouchableHighlight>
                    <Ionicons name="scan-circle" size={60} color={colors.lightNeutral} />
                </TouchableHighlight>
            </View>
        </SafeAreaView>


    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 60,
        backgroundColor: colors.background,
        flexDirection: 'column',
        alignItems: 'center',
    },

    cameraContainer: {
        alignItems: 'center',
        gap: 50
    },

    cameraCard: {
        backgroundColor: colors.lightNeutral,
        borderRadius: 20,
        height: 250,
        width: 250,
        alignItems: 'center',
        justifyContent: 'center'
    },

    toggleButton: {
        backgroundColor: colors.lightNeutral,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        height: 40,
        width: 280
    },

    pill: {
        backgroundColor: colors.white,
        borderRadius: 30,
        height: 30,
        width: 140,
        alignSelf: 'flex-end',
        alignItems: 'center',
        justifyContent: 'center'
    }


});

export default ScanBarcodeScreen;

