import React from 'react';
import { StyleSheet, SafeAreaView, Text, View, Button, TouchableHighlight } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';


import colors from '../config/colors';

interface MedicationListProps {
    // Define any props if necessary
}

function MedicationsList(props: MedicationListProps) {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Medications</Text>

            <View style={styles.medCard}>
                <View style={styles.preview}>
                    <TouchableHighlight style={styles.addPhoto}>
                        <MaterialIcons name="add" size={20} color={colors.darkNeutral} />
                    </TouchableHighlight>
                    <View style={styles.nestedPreview}>
                        <Text>Name</Text>
                        <Text style={styles.subtitle}>Status Check</Text>
                    </View>
                </View>
            </View>

            <View style={styles.medCard}>
                <View style={styles.preview}>
                    <TouchableHighlight style={styles.addPhoto}>
                        <MaterialIcons name="add" size={20} color={colors.darkNeutral} />
                    </TouchableHighlight>
                    <View style={styles.nestedPreview}>
                        <Text>Name</Text>
                        <Text style={styles.subtitle}>Status Check</Text>
                    </View>
                </View>
            </View>

            <View style={styles.medCard}>
                <View style={styles.preview}>
                    <TouchableHighlight style={styles.addPhoto}>
                        <MaterialIcons name="add" size={20} color={colors.darkNeutral} />
                    </TouchableHighlight>
                    <View style={styles.nestedPreview}>
                        <Text>Name</Text>
                        <Text style={styles.subtitle}>Status Check</Text>
                    </View>
                </View>
            </View>

            <View style={styles.medCard}>
                <View style={styles.preview}>
                    <TouchableHighlight style={styles.addPhoto}>
                        <MaterialIcons name="add" size={20} color={colors.darkNeutral} />
                    </TouchableHighlight>
                    <View style={styles.nestedPreview}>
                        <Text>Name</Text>
                        <Text style={styles.subtitle}>Status Check</Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.background,
        alignSelf: 'center',
        flexDirection: 'column',
        gap: 20
    },

    title: {
        fontSize: 20,
        fontWeight: '500',
        color: colors.darkNeutral,
    },

    subtitle: {
        fontSize: 12
    },

    medCard: {
        backgroundColor: colors.lightNeutral,
        borderRadius: 10,
        height: 80,
        width: 300,
        padding: 10,
        alignItems: 'flex-start',
        justifyContent: 'center'
    },

    preview: {
        flexDirection: 'row',
        gap: 20
    },

    addPhoto: {
        backgroundColor: colors.coordinatingColor,
        borderRadius: 8,
        height: 60,
        width: 60,
        alignItems: 'center',
        justifyContent: 'center'
    },

    nestedPreview: {

    },

});

export default MedicationsList;
