import React from 'react';
import { StyleSheet, SafeAreaView, Text, View } from 'react-native';
import colors from '../config/colors';
interface HeaderProps {
  title?: string;
  rightIcon?: any;
  rightAction?: () => void;
  leftIcon?: any;
  leftAction?: () => void;
}

export default function Header(props: HeaderProps) {
  return (
    <SafeAreaView style={styles.topNavContainer}>
      <View style={styles.icon} onTouchEnd={props.leftAction}>
        {props.leftIcon}
      </View>
      <Text style={styles.title}>{props.title}</Text>
      <View style={styles.icon} onTouchEnd={props.rightAction}>
        {props.rightIcon}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    flex: 5,
    fontWeight: '500',
    color: colors.white,
    textAlign: 'center',
    paddingBottom: 10,
    paddingTop: 10,
    height: 48
  },
  icon: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  topNavContainer: {
    width: '100%',
    backgroundColor: colors.darkNeutral,
    display: 'flex',
    flexDirection: 'row',
    paddingBottom: 10
  }
});
