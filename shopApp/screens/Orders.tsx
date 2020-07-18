import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface orderProps {}

const order = (props: orderProps) => {
  return (
    <View style={styles.container}>
      <Text>order</Text>
    </View>
  );
};

export default order;

const styles = StyleSheet.create({
  container: {}
});
