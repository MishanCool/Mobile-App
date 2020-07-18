import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface shopProps {}

const shop = (props: shopProps) => {
  return (
    <View style={styles.container}>
      <Text>shop</Text>
    </View>
  );
};

export default shop;

const styles = StyleSheet.create({
  container: {}
});
