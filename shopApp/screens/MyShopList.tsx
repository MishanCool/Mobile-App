import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { FloatingAction } from "react-native-floating-action";
import { Container, Content, Icon } from 'native-base';
import * as firebase from 'firebase';
import { RouteProp } from '@react-navigation/native';
import { TabTwoParamList, Shop } from '../types';
import { StackNavigationProp } from '@react-navigation/stack';
import Colors from '../constants/Colors';

interface MyShopListProps {}

type MyShopListRoteProps = RouteProp<TabTwoParamList, 'MyShopList'>;
type MyShopListNavigationProps = StackNavigationProp<TabTwoParamList, 'MyShopList'>;

type Props = {
	route: MyShopListRoteProps;
	navigation: MyShopListNavigationProps;
};

const MyShopList = (props: Props) => {
	return (
		// <View style={styles.container}>
		//   <Text>MyShopList</Text>
		// </View>
		<Container>
			<Content>
				<Text>MyShopList</Text>
			</Content>
			<FloatingAction
				floatingIcon={<Icon name="md-add" style={{ color: '#fff' }} />}
				onPressMain={() => props.navigation.push('CreateShop')}
				showBackground={false}
			/>
		</Container>
	);
};

export default MyShopList;

const styles = StyleSheet.create({
  container: {}
});
