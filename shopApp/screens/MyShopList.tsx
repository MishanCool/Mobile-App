import * as React from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { FloatingAction } from 'react-native-floating-action';
import {
	Button,
	Container,
	Header,
	Left,
	Icon,
	Body,
	Title,
	Right,
	Content,
	List,
	ListItem,
	Thumbnail,
	Text,
	View,
} from 'native-base';
import * as firebase from 'firebase';
import { RouteProp } from '@react-navigation/native';
import { TabTwoParamList, Shop } from '../types';
import { StackNavigationProp } from '@react-navigation/stack';
import Colors from '../constants/Colors';

type MyShopListRoteProps = RouteProp<TabTwoParamList, 'MyShopList'>;
type MyShopListNavigationProps = StackNavigationProp<TabTwoParamList, 'MyShopList'>;

type Props = {
	route: MyShopListRoteProps;
	navigation: MyShopListNavigationProps;
};

interface ShopScreenProps {}

const MyShopList = (props: Props) => {
	const user = firebase.auth().currentUser;
	const ref = firebase.database();
	const [shopData, setShopData] = React.useState<Array<Shop>>([]);

	React.useEffect(() => {
		loadData();
	}, []);

	const loadData = () => {
		ref.ref('/User/' + user?.uid + '/shops').on('value', (snapshot) => {
			setShopData([]);
			let shopKeys: Array<string> = snapshot.val();
			if (!shopKeys) {
				console.log('no shop');
				return;
			}
			shopKeys.map(async (value, i) => {
				await ref
					.ref('/Shop/' + value + '/')
					.once('value')
					.then((snapshot2) => {
						let shop: Shop = snapshot2.val();
						shop.shopId = value;
						setShopData((preShopData) => [...preShopData, shop]);
					});
			});
		});
	};

	return (
		<Container>
			<Content>
				<List>
					{shopData.length === 0 ? (
						<View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, marginTop: 30 }}>
							<Text style={{ fontWeight: 'bold', color: Colors.NAVYBLUE }}>No Shops</Text>
						</View>
					) : (
						shopData.map((value, i) => {
							return (
								<ListItem
									noIndent
									key={i}
									style={{
										borderWidth: 1,
										borderColor: Colors.NAVYBLUE,
										borderRadius: 10,
										marginVertical: 5,
										marginHorizontal: 10,
									}}
									onPress={() =>
										props.navigation.push('ShopView', {
											shopId: value.shopId,
											title: value.shopname,
										})
									}
								>
									<Left>
										<Thumbnail
											source={{
												uri:
													'https://firebasestorage.googleapis.com/v0/b/shopapp-14fd0.appspot.com/o/default_images%2Fdefault_shop.jpg?alt=media&token=8e80458e-bbb4-4497-991d-a477544c3433',
											}}
										/>
										<Body>
											<Text>{value.shopname}</Text>
											<Text note>{value.contact}</Text>
										</Body>
									</Left>
								</ListItem>
							);
						})
					)}
				</List>
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
	container: {
		flex: 1,
	},
});
