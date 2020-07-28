import * as React from 'react';
import { StyleSheet, Linking, Image } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { TabTwoParamList, Shop, Product } from '../types';
import { StackNavigationProp } from '@react-navigation/stack';
import * as firebase from 'firebase';
import Loading from './Loading';
import { Container, Content, Text, Icon, Grid, Row, View, Col, List, Card, CardItem } from 'native-base';
import { FloatingAction } from 'react-native-floating-action';
import { Avatar } from 'react-native-elements';
import Colors from '../constants/Colors';

type ShopViewRouteProps = RouteProp<TabTwoParamList, 'ShopView'>;
type ShopViewNavigationProps = StackNavigationProp<TabTwoParamList, 'ShopView'>;

type Prop = {
	route: ShopViewRouteProps;
	navigation: ShopViewNavigationProps;
};

interface ShopViewProps {}

const ShopView = (props: Prop) => {
	const shopId = props.route.params.shopId;
	const ref = firebase.database();
	const user = firebase.auth().currentUser;
	const [shop, setShop] = React.useState<Shop>({});
	const [isLoading, setLoading] = React.useState(true);
	const [products, setProducts] = React.useState<Array<Product>>([]);

	React.useEffect(() => {
		const unsubscribe = props.navigation.addListener('focus', () => {
			loadShop();
		});

		return unsubscribe;
	}, [props]);

	const loadShop = () => {
		setLoading(true);
		setShop({});
		ref.ref('/Shop/' + shopId + '/')
			.once('value')
			.then((snapshot) => {
				let temp: Shop = snapshot.val();
				setShop(temp);
				setProducts([...(temp.products ? temp.products : [])]);
				setLoading(false);
			})
			.catch((error) => {
				setLoading(false);
				alert(error.message);
			});
	};

	const contact = (phone?: string) => {
		Linking.openURL('tel:' + phone);
	};

	if (isLoading) {
		return <Loading />;
	}

	return (
		<Container>
			<Content>
				<Grid
					style={{
						backgroundColor: Colors.Whatsappblue,
						borderBottomLeftRadius: 10,
						borderBottomRightRadius: 10,
					}}
				>
					<Row style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 20 }}>
						<Avatar
							source={{
								uri:
									'https://firebasestorage.googleapis.com/v0/b/shopapp-14fd0.appspot.com/o/default_images%2Fdefault_shop.jpg?alt=media&token=8e80458e-bbb4-4497-991d-a477544c3433',
							}}
							size={120}
							showAccessory
							rounded
							containerStyle={{ borderWidth: 3, borderColor: Colors.WHITE }}
						/>
					</Row>
					<Col style={{ justifyContent: 'center', alignItems: 'center', paddingBottom: 20 }}>
						<Text style={{ color: Colors.WHITE, fontSize: 25, fontWeight: '600', marginBottom: 10 }}>
							{shop.shopname}
						</Text>
						<Text
							note
							style={{ color: Colors.WHITE, justifyContent: 'center', alignItems: 'center' }}
							onPress={() => contact(shop.contact)}
						>
							{shop.contact + '    '}
							<Icon name="md-link" style={{ color: Colors.BLACK, fontSize: 15 }} type="Ionicons" />
						</Text>
					</Col>
					<Row style={{ justifyContent: 'center', alignItems: 'center' }}>
						<Text style={{ color: Colors.WHITE, paddingBottom: 10 }}>{shop.address}</Text>
					</Row>
					{shop.description ? (
						<Row style={{ justifyContent: 'center', alignItems: 'center' }}>
							<Text
								style={{
									color: Colors.WHITE,
									marginHorizontal: 10,
									padding: 10,
									borderColor: Colors.WHITE,
									borderWidth: 0.5,
									borderRadius: 10,
									marginBottom: 10,
								}}
							>
								{shop.description}
							</Text>
						</Row>
					) : null}
				</Grid>
				<View
					style={{
						justifyContent: 'center',
						alignItems: 'baseline',
						marginVertical: 10,
						marginHorizontal: 20,
						borderBottomWidth: 1,
						borderBottomColor: Colors.NAVYBLUE,
					}}
				>
					<Text style={{ fontSize: 20 }}>Products</Text>
				</View>
				<List style={{ paddingHorizontal: 5 }}>
					{products.length === 0 ? (
						<View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 20 }}>
							<Text style={{ fontWeight: 'bold', color: Colors.NAVYBLUE }}>No Products</Text>
						</View>
					) : (
						products.map((value, i) => {
							return (
								<Card style={{ flexDirection: 'row' }} key={i}>
									<CardItem
										style={{
											flex: 0.5,
											flexDirection: 'column',
											height: 250,
											borderWidth: 1,
											borderColor: Colors.NAVYBLUE,
											borderRadius: 10,
											margin: 5,
										}}
									>
										<Text style={{ fontSize: 20, fontWeight: 'bold', marginVertical: 25 }}>
											{value.name}
										</Text>
										<Text>{value.description}</Text>
										<Text style={{ fontSize: 17, marginVertical: 10 }}>
											price : Rs.{value.price}/=
										</Text>
									</CardItem>
									<CardItem style={{ flex: 0.5, paddingHorizontal: 5 }} cardBody>
										<Image
											source={{
												uri: value.image,
											}}
											style={{ height: 200, flex: 1 }}
										/>
									</CardItem>
								</Card>
							);
						})
					)}
				</List>
			</Content>
			{shop.ownerId === user?.uid ? (
				<FloatingAction
					floatingIcon={
						<Icon name="shopping" type="MaterialCommunityIcons" style={{ color: Colors.WHITE }} />
					}
					onPressMain={() => props.navigation.push('AddProducts', { shopId: shopId })}
					showBackground={false}
				/>
			) : null}
		</Container>
	);
};

export default ShopView;

const styles = StyleSheet.create({
	container: {},
});
