import React from 'react';
import { StyleSheet, SafeAreaView, Text, View, Button, TouchableHighlight } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, StackActions } from '@react-navigation/native';


import colors from '../config/colors';

interface MedicationListProps {
    // Define any props if necessary
}

function MedicationsList(props: MedicationListProps) {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Medications</Text>

            <View style={styles.medCard} onTouchEnd={() => navigation.navigate("MedicationOverview")}>
                <View style={styles.preview}>
                    <TouchableHighlight style={styles.addPhoto}>
                        <MaterialIcons name="add" size={20} color={colors.darkNeutral} />
                    </TouchableHighlight>
                    <View>
                        <Text>Name</Text>
                        <Text style={styles.subtitle}>Status Check</Text>
                    </View>
                </View>
            </View>

            <View style={styles.medCard} onTouchEnd={() => navigation.navigate("New")}>
                <View style={styles.preview}>
                    <TouchableHighlight style={styles.addPhoto}>
                        <MaterialIcons name="add" size={20} color={colors.darkNeutral} />
                    </TouchableHighlight>
                    <View>
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
                    <View>
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
                    <View>
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
        height: 100,
        width: 360,
        padding: 20,
        alignItems: 'flex-start',
        justifyContent: 'center'
    },

    preview: {
        flexDirection: 'row',
        gap: 16
    },

    addPhoto: {
        backgroundColor: colors.coordinatingColor,
        borderRadius: 8,
        height: 60,
        width: 60,
        alignItems: 'center',
        justifyContent: 'center'
    },

});

export default MedicationsList;
