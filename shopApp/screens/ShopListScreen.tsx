import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface ShopListScreenProps {}

const ShopListScreen = (props: ShopListScreenProps) => {
  return (
    <View style={styles.container}>
      <Text>ShopListScreen</Text>
    </View>
  );
};

export default ShopListScreen;

const styles = StyleSheet.create({
  container: {}
});
