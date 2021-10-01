import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Header = () => {
  return (
    <View>
      <Text style={styles.title}>Get Me There</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: 'center',
  },
});

export default Header;
