import React from 'react';
import { StyleSheet, SafeAreaView, Text, View } from 'react-native';
import colors from '../config/colors';
interface HeaderProps {
  title?: string;
  rightIcon?: any;
  leftIcon?: any;
}

export default function Header(props: HeaderProps) {
  return (
    <SafeAreaView style={styles.topNavContainer}>
      <View style={styles.leftIcon}>{props.leftIcon}</View>
      <Text style={styles.title}>{props.title}</Text>
      <View style={styles.rightIcon}>{props.rightIcon}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    flex: 5,
    fontWeight: '500',
    color: colors.white,
    textAlign: 'center',
    paddingBottom: 20,
    paddingTop: 10
  },
  rightIcon: { flex: 1, paddingRight: 15, paddingBottom: 20, paddingTop: 10 },
  leftIcon: { flex: 1, paddingLeft: 15, paddingBottom: 20, paddingTop: 10 },
  topNavContainer: {
    width: '100%',
    backgroundColor: colors.darkNeutral,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10
  }
});
