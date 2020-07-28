import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface MyShopListProps {}

const MyShopList = (props: MyShopListProps) => {
  return (
    <View style={styles.container}>
      <Text>MyShopList</Text>
    </View>
  );
};

export default MyShopList;

const styles = StyleSheet.create({
  container: {}
});
