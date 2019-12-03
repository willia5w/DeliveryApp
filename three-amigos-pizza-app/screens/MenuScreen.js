import React from 'react';
import {
	ActivityIndicator,
	Button,
	Dimensions,
	KeyboardAvoidingView,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	View
} from 'react-native';

import ModalDropdown from 'react-native-modal-dropdown';
import { MenuItem } from '../components/MenuItem';
import { ToppingCheckBox } from '../components/ToppingCheckBox';

export class MenuScreen extends React.Component {
    constructor(props) { 
      	super(props);
      	this.state = {
			allCrusts: [],
			allSizes: [],
			allToppings: [],
			currentStore: this.props.navigation.getParam('store'),
			customCrustType: "",
			customPizzaName: "",
			customSizeId: "",
			customToppingIds: [],
			isLoading: true,
			menuPizzaId: "",
			menuPizzaSizeId: "",
			order: {},
			orderId: "",
			currentStoreId: ""
      	};
	}
	
	componentDidMount = async () => {
		await this.createOrder(this.props.navigation.getParam('store')._id);
		await this.getAllCrusts();
		await this.getAllSizes();
		await this.getAllToppings();
		this.setState({isLoading: false});
	}

	addCustomPizza = () => {
		this.setState({isLoading: true});
		const { orderId, customCrustType, customPizzaName, customToppingIds, customSizeId } = this.state;
		let toppingIdString = "";
		for (let i = 0; i < customToppingIds.length; i++) {
			toppingIdString += "&toppingIds=" + customToppingIds[i];
		}
		fetch('https://three-amigos-prod.herokuapp.com/order/' + orderId + '/addCustomPizza?name='+ customPizzaName +'&crustId=' + customCrustType + toppingIdString + '&sizeId=' + customSizeId, {
			method: 'PUT',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			}
		}).then((response) => response.json())
		.then((responseJson) => {
			this.setState({
				order: responseJson,
				isLoading: false
			}, function() {
			})
		})
		.catch((error) => {
			console.error(error);
		});
	}

	addMenuPizzaToOrder = (pizzaId, sizeId) => {
		this.setState({isLoading: true});
		fetch('https://three-amigos-prod.herokuapp.com/order/'+ this.state.orderId +'/addPizzaById?pizzaId=' + pizzaId + '&sizeId=' + sizeId, {
			method: 'PUT',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			}
		}).then((response) => response.json())
		.then((responseJson) => {
			this.setState({
				order: responseJson,
				isLoading: false
			}, function() {

			})
		})
		.catch((error) => {
			console.error(error);
		});
	}

	createOrder = (storeId) => {
		fetch('https://three-amigos-prod.herokuapp.com/order/?storeId=' + storeId, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			}
		}).then((response) => response.json())
			.then((responseJson) => {
				this.setState({
					orderId: responseJson._id,
					currentStoreId: storeId
				}, function() {
					
				})
			})
			.catch((error) => {
				console.error(error);
			});
	}

	getAllCrusts = () => {
		return fetch('https://three-amigos-prod.herokuapp.com/pizza/crust')
			.then((response) => response.json())
			.then((responseJson) => {
				this.setState({
					allCrusts: responseJson
				}, function(){
				});
		})
		.catch((error) =>{
			console.error(error);
		});
	}

	getAllSizes = () => {
		return fetch('https://three-amigos-prod.herokuapp.com/pizza/size')
			.then((response) => response.json())
			.then((responseJson) => {
				this.setState({
					allSizes: responseJson,
				}, function(){

				});
		})
		.catch((error) =>{
			console.error(error);
		});
	}
	
	getAllToppings = () => {
		return fetch('https://three-amigos-prod.herokuapp.com/pizza/topping')
			.then((response) => response.json())
			.then((responseJson) => {
				this.setState({
					allToppings: responseJson
				}, function(){
				});
		})
		.catch((error) =>{
			console.error(error);
		});
	}

	onClickCheckBox = (isChecked, toppingId) => {
		const { customToppingIds } = this.state;
		if (isChecked) {
			customToppingIds.push(toppingId);
		} else {
			customToppingIds.splice(customToppingIds.indexOf(toppingId), 1);
		}
	}

	onSelectCrust = (index, value) => {
		this.setState({customCrustType: value._id});
	}

	onSelectSize = (index, value) => {
		this.setState({customSizeId: value._id});
	}

	renderRow = (rowData) => {
		return (
			<View>
				<Text>{rowData.name}</Text>
			</View>
		)
	}

	renderButtonText = (rowData) => {
		const { name } = rowData;
		return `${name}`;
	}

	viewOrder = () => {
		this.props.navigation.navigate('Order', {orderId: this.state.orderId, storeId: this.state.currentStoreId});
	}

    render() {
		const { allCrusts, allSizes, allToppings, currentStore, isLoading } = this.state;
		
		const checkBoxes = allToppings.map((item, i) => {
            return (
                <ToppingCheckBox
					key={item._id}
					id={item._id}
					name={item.name}
					onClickCheckBox={this.onClickCheckBox}
                />
            )
        });
		
		const renderSpecials = currentStore.menu.specials.map((item, i) => {
            return (
				<View key={item._id} style={styles.special}>
					<Text>
						{item.name}{i != (currentStore.menu.specials.length-1) ? ', ' : ''}
					</Text>
				</View>
            );
		});

		const menuItems = currentStore.menu.pizzas.map((item, i) => {
			return (
				<MenuItem
					key={item._id}
					id={item._id}
					name={item.name}
					toppings={item.toppings}
					price={item.basePrice}
					sizes={allSizes}
					addMenuPizzaToOrder={this.addMenuPizzaToOrder}
				/>
			)
		});

      	return !isLoading ? (
			<KeyboardAvoidingView 
				style={styles.container} 
				behavior="position" 
				enabled
			>
				<ScrollView
					style={styles.scrollView}
					contentContainerStyle={styles.contentContainer}>
					<Text style={styles.title}>Menu</Text>
					<View style={styles.specials}>
						<Text style={styles.specialsTitle}>Current Specials: </Text>
						{renderSpecials}
					</View>
					<View style={styles.menu}>
						<View style={styles.menuHeader}>
							<View style={styles.menuHeaderColumns}>
								<Text style={styles.menuHeaderText}>Name</Text>
							</View>
							<View style={styles.menuHeaderColumns}>
								<Text style={styles.menuHeaderText}>Ingredients</Text>
							</View>
							<View style={styles.thinHeaderColumn}>
								<Text style={styles.menuHeaderText}>Price</Text>
							</View>
							<View style={styles.thinHeaderColumn}>
								<Text style={styles.menuHeaderText}>Size</Text>
							</View>
						</View>
						<View style={styles.menuContent}>
							{menuItems}
						</View>
					</View>
					<Text style={styles.subHeader}>Build Your Own Pizza</Text>
					<View style={styles.customPizzaContainer}>
						<View style={styles.checkBoxContainer}>
							{checkBoxes}
						</View>

						<View style={styles.crust}>
							<TextInput
								style={{height: 40}}
								placeholder="Name your pizza here"
								onChangeText={(text) => this.setState({customPizzaName: text})}
								value={this.state.text}
							/>
							<ModalDropdown
								options={allCrusts}
								renderRow={this.renderRow}
								renderButtonText={(rowData) => this.renderButtonText(rowData)}
								onSelect={this.onSelectCrust}
								defaultValue={'Select a Crust'}
							/>
							<ModalDropdown
								options={allSizes}
								renderRow={this.renderRow}
								renderButtonText={(rowData) => this.renderButtonText(rowData)}
								onSelect={this.onSelectSize}
								defaultValue={'Select a Size'}
							/>
							<Button
								title="Add Custom Pizza"
								onPress={this.addCustomPizza}
							/>
							<Button
								title="View Order"
								onPress={this.viewOrder}
							/>
						</View>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
      	) : <View style={styles.activityIndicator}><ActivityIndicator/></View>;
    }
}

const styles = StyleSheet.create({
	activityIndicator: {
		marginTop: 50
	},
    container: {
        backgroundColor: '#fff',
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        height: Dimensions.get('window').height,
		marginTop: 10,
		padding: 10
	},
	customPizzaContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		textAlign: 'center',
	},
	menuHeader: {
		flexDirection: 'row',
        flexWrap: 'wrap',
        textAlign: 'center'
	},
	menuHeaderColumns: {
		width: 90,
		justifyContent: 'center'
	},
	menuHeaderText: {
		fontWeight: 'bold'
	},
	scrollView: {
        flex: 1
	},
	special: {
        textAlign: 'left',
        justifyContent: 'center',
	},
	specials: {
		flexDirection: 'row',
		flexWrap: 'wrap'
	},
	specialsTitle: {
		fontWeight: 'bold'
	},
	subHeader: {
		fontSize: 32,
		textAlign: 'center'
	},
	thinHeaderColumn: {
		width: 50,
		justifyContent: 'center'
	},
	title: {
        fontSize: 50,
        textAlign: 'center'
	}
});
