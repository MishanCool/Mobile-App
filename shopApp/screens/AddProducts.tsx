import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { Container, Content, Form, Item, Input, Textarea, Button, Footer } from 'native-base';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as firebase from 'firebase';
import { RouteProp } from '@react-navigation/native';
import { TabTwoParamList, Product, Shop } from '../types';
import { StackNavigationProp } from '@react-navigation/stack';
import { isLoading } from 'expo-font';
import Loading from './Loading';

type AddProductsRouteProps = RouteProp<TabTwoParamList, 'AddProducts'>;
type AddProductsNavigationProps = StackNavigationProp<TabTwoParamList, 'AddProducts'>;

type Props = {
	route: AddProductsRouteProps;
	navigation: AddProductsNavigationProps;
};

interface AddProductsProps {}

const AddProducts = (props: Props) => {
	const user = firebase.auth().currentUser;
	const ref = firebase.database();
	const shopId = props.route.params.shopId;
	const [name, setName] = React.useState('');
	const [price, setPrice] = React.useState('');
	const [description, setDescription] = React.useState('');
	const [image, setImage] = React.useState('');
	const [imageBase64, setBase64] = React.useState<string | undefined>('');
	const [isLoading, setLoading] = React.useState(false);

	React.useEffect(() => {
		getPermissionAsync();
	}, []);

	const getPermissionAsync = async () => {
		if (Constants.platform?.ios) {
			const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
			if (status !== 'granted') {
				alert('Sorry, we need camera roll permissions to make this work!');
			}
		}
	};

	const addProduct = async (uri: string) => {
		const product: Product = {
			name: name,
			price: price,
			description: description,
			image: uri,
		};
		ref.ref('/Shop/' + shopId + '/')
			.once('value')
			.then((snapshot) => {
				let shop: Shop = snapshot.val();
				shop.products = shop.products ? [...shop.products, product] : [product];
				ref.ref('/Shop/' + shopId + '/')
					.update(shop)
					.then(() => {
						setLoading(false);
						props.navigation.pop();
					});
			})
			.catch((error) => {
				setLoading(false);
				alert(error.message);
			});
	};

	const uploadImageAsync = async () => {
		setLoading(true);
		const blob: Blob = await new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			xhr.onload = function () {
				resolve(xhr.response);
			};
			xhr.onerror = function (e) {
				console.log(e);
				reject(new TypeError('Network request failed'));
				setLoading(false);
				props.navigation.pop();
			};
			xhr.responseType = 'blob';
			xhr.open('GET', image, true);
			xhr.send(null);
		});
		const uid = user?.uid;
		const ref = firebase
			.storage()
			.ref('/Shop/' + uid)
			.child(new Date().getTime().toString() + '.jpg');
		const uploadTask = ref.put(blob);

		uploadTask.on(
			'state_changed',
			(snapshot) => {
				var progress = snapshot.bytesTransferred / snapshot.totalBytes;
				// this.setState({ progress: progress });
				console.log('Upload is ' + progress + '% done');
			},
			function (error) {
				setLoading(false);
				alert(error.message);
				props.navigation.pop();
			},
			() => {
				uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
					console.log('File available at', downloadURL);
					setImage(downloadURL);
					addProduct(downloadURL);
				});
			}
		);
	};

	const pickImage = async () => {
		try {
			let result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.All,
				allowsEditing: true,
				aspect: [3, 4],
				quality: 1,
				base64: true,
			});
			if (!result.cancelled) {
				setImage(result.uri);
				setBase64(result.base64);
			}
		} catch (E) {
			console.log(E);
		}
	};

	if (isLoading) {
		return <Loading />;
	}

	return (
		<Container>
			<Content>
				<Form style={{ paddingHorizontal: 5, alignItems: 'center' }}>
					<Item
						regular
						style={{
							borderColor: Colors.NAVYBLUE,
							borderRadius: 10,
							paddingHorizontal: 5,
							marginVertical: 5,
						}}
					>
						<Input placeholder="Product Name :" onChangeText={(txt) => setName(txt)} value={name} />
					</Item>
					<Item
						regular
						style={{
							borderColor: Colors.NAVYBLUE,
							borderRadius: 10,
							paddingHorizontal: 5,
							marginVertical: 5,
						}}
					>
						<Input placeholder="Price :" onChangeText={(txt) => setPrice(txt)} value={price} />
					</Item>
					<Textarea
						placeholder="Description :"
						rowSpan={5}
						bordered
						underline
						style={{
							borderColor: Colors.NAVYBLUE,
							borderRadius: 10,
							padding: 5,
							marginVertical: 5,
							width: Layout.window.width * 0.96,
						}}
						onChangeText={(txt) => setDescription(txt)}
						value={description}
					/>
					<Button
						bordered
						style={{ justifyContent: 'center', width: 150, marginTop: 20 }}
						onPress={() => pickImage()}
					>
						<Text style={{ color: Colors.NAVYBLUE }}>Add Image</Text>
					</Button>
				</Form>
				{image ? (
					<View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 20 }}>
						<Image source={{ uri: image }} style={{ flex: 1, height: 300, width: 200 }} />
					</View>
				) : null}
			</Content>
			<Footer style={{ backgroundColor: Colors.WHITE, justifyContent: 'center' }}>
				<Button
					style={{ justifyContent: 'center', width: 150, borderRadius: 25 }}
					onPress={() => uploadImageAsync()}
				>
					<Text style={{ color: Colors.WHITE }}>Add Product</Text>
				</Button>
			</Footer>
		</Container>
	);
};

export default AddProducts;

const styles = StyleSheet.create({
	container: {},
});
