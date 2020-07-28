import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Container, Content, Grid, Row, Form, Item, Input, Textarea, Text, Button } from 'native-base';
import Colors from '../constants/Colors';
import * as firebase from 'firebase';
import { Shop, User, TabTwoParamList } from '../types';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Loading from './Loading';

type CreateShopRouteProps = RouteProp<TabTwoParamList, 'CreateShop'>;
type CreateShopNavigationProps = StackNavigationProp<TabTwoParamList, 'CreateShop'>;

type Props = {
	route: CreateShopRouteProps;
	navigation: CreateShopNavigationProps;
};
interface createShopProps {}

const createShop = (props: Props) => {
	const [shopName, setShopName] = React.useState<string>('');
	const [contact, setContact] = React.useState<string>('');
	const [address, setAddress] = React.useState<string>('');
	const [description, setDescription] = React.useState<string>('');
	const [isLoading, setLoading] = React.useState(false);
	const create_shop = async () => {
		setLoading(true);
		const ref = firebase.database();
		const user = firebase.auth().currentUser;
		const shop: Shop = {
			ownerId: user?.uid,
			shopname: shopName,
			contact: contact,
			address: address,
			description: description,
		};
		const shopRef = await ref.ref('/Shop/').push();
		await ref
			.ref('/Shop/' + shopRef.key + '/')
			.update(shop)
			.catch((error) => {
				setLoading(false);
				alert(error.message);
			});
		await ref
			.ref('/User/' + user?.uid + '/')
			.once('value')
			.then((snapshot) => {
				const tempUser: User = snapshot.val();
				tempUser.shops = tempUser.shops ? [...tempUser.shops, shopRef.key] : [shopRef.key];
				ref.ref('/User/' + user?.uid + '/')
					.update(tempUser)
					.then(() => {
						setLoading(false);
						props.navigation.pop();
					})
					.catch((error) => {
						alert(error.message);
						setLoading(false);
					});
			})
			.catch((error) => {
				setLoading(false);
				alert(error.message);
			});
	};
	if (isLoading) {
		return <Loading />;
	}
	return (
		<Container>
			<Content>
				<Grid>
					<Row>
						<Form style={{ flex: 1, paddingHorizontal: 10 }}>
							<Item
								regular
								style={{
									borderWidth: 1,
									borderColor: Colors.NAVYBLUE,
									borderRadius: 10,
									marginVertical: 10,
								}}
							>
								<Input
									placeholder="Shop name:"
									onChangeText={(txt) => setShopName(txt)}
									value={shopName}
								/>
							</Item>
							<Item
								regular
								style={{
									borderWidth: 1,
									borderColor: Colors.NAVYBLUE,
									borderRadius: 10,
									marginVertical: 10,
								}}
							>
								<Input
									placeholder="Contact no:"
									onChangeText={(txt) => setContact(txt)}
									value={contact}
								/>
							</Item>
							<Item
								regular
								style={{
									borderWidth: 1,
									borderColor: Colors.NAVYBLUE,
									borderRadius: 10,
									marginVertical: 10,
								}}
							>
								<Input placeholder="Address:" onChangeText={(txt) => setAddress(txt)} value={address} />
							</Item>
							<Textarea
								style={{
									borderWidth: 1,
									borderColor: Colors.NAVYBLUE,
									borderRadius: 10,
									marginVertical: 10,
								}}
								bordered
								rowSpan={5}
								underline
								placeholder="Description:"
								onChangeText={(txt) => setDescription(txt)}
							/>
						</Form>
					</Row>
					<Row style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 20 }}>
						<Text note> After Create shop go to shop profile to add products.</Text>
						<Text style={{ color: Colors.RED }}>*</Text>
					</Row>
					<Row style={{ justifyContent: 'center', alignItems: 'center' }}>
						<Button
							bordered
							style={{ width: 200, borderRadius: 25, justifyContent: 'center' }}
							onPress={() => create_shop()}
						>
							<Text>Create</Text>
						</Button>
					</Row>
				</Grid>
			</Content>
		</Container>
	);
};

export default createShop;

const styles = StyleSheet.create({
	container: {},
});
