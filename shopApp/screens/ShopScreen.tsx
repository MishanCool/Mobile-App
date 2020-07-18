import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { Button } from 'native-base';
import * as firebase from 'firebase';

interface ShopScreenProps {}

const ShopScreen = (props: ShopScreenProps) => {
  return (
    <View style={styles.container}>
      <Text>ShopScreen</Text>
      <Button onPress={() => firebase.auth().signOut()}>
        <Text>Sign Out</Text>
      </Button>
    </View>
  );
};

export default ShopScreen;

const styles = StyleSheet.create({
  container: {}
});
