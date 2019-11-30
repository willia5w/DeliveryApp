import React from 'react';
import {
	ActivityIndicator,
	Button,
	Dimensions,
	Picker,
	ScrollView,
	StyleSheet,
	Text,
	View
} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import { MenuItem } from '../components/MenuItem';
import { CheckBoxes } from '../components/CheckBoxes';


export class MenuScreen extends React.Component {
    constructor(props) { 
      	super(props);
      	this.state = {
			currentStore: this.props.navigation.getParam('store'),
			crustType: "",
			allCrusts: [],
			isLoading: true,
			allSizes: [],
			allToppings: [],
			checkBoxObj: {}
      	};
	}
	
	componentDidMount = async () => {

		// this.createOrder(this.currentStore._id);
		await this.getAllCrusts();
		await this.getAllSizes();
		await this.getAllToppings();
		this.setState({isLoading: false});
		this.createCheckBoxObj();
		console.log("hi" + JSON.stringify(this.state.checkBoxObj));
	}

	// createOrder = () => {
	// 	fetch('https://radiant-springs-17894.herokuapp.com/order/?storeId=' + this.currentStore._id, {
	// 		method: 'POST',
	// 		headers: {
	// 			Accept: 'application/json',
	// 			'Content-Type': 'application/json',
	// 		},
    //     // body: JSON.stringify({
    //     //   glutenFree: false,
    //     //   name: 'thick',
    //     //   price: 7
    //     // }),
    //   });
	// }

	getAllSizes = () => {
		return fetch('https://quiet-tor-41409.herokuapp.com/pizza/size')
			.then((response) => response.json())
			.then((responseJson) => {
				this.setState({
					allSizes: responseJson,
				}, function(){
					// console.log(this.state.allSizes);
				});
		})
		.catch((error) =>{
			console.error(error);
		});
	}
	
	getAllCrusts = () => {
		return fetch('https://quiet-tor-41409.herokuapp.com/pizza/crust')
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

	getAllToppings = () => {
		return fetch('https://quiet-tor-41409.herokuapp.com/pizza/topping')
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

	onSelect = (index, value) => {
		this.setState({crustType: value});
	}

	createCheckBoxObj = () => {
		console.log("yo" + this.state.allToppings);
		this.state.allToppings.map((item, i) => {
			this.state.checkBoxObj[item.name] = false;
		});
	}

    render() {
		const { currentStore, allSizes, allCrusts, isLoading, checkBoxObj } = this.state;
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
					name={item.name}
					toppings={item.toppings}
					price={item.basePrice}
					sizes={allSizes}
				/>
			)
		});

      	return !isLoading ? (
			<View style={styles.container}>
			<ScrollView
				style={styles.scrollView}
				contentContainerStyle={styles.contentContainer}>
				<Text style={styles.title}>Menu</Text>
				<View style={styles.specials}>
					<Text style={styles.specialsTitle}>Current Specials: </Text>
					{renderSpecials}
				</View>
				<View style={styles.crust}>
					<ModalDropdown
						options={allCrusts}
						renderRow={this.renderRow}
						renderButtonText={(rowData) => this.renderButtonText(rowData)}
						onSelect={this.onSelect}
						defaultValue={'Select a Crust'}
					/>		
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
				<View style={styles.customPizzaContainer}>
					<Text style={styles.subHeader}>Build Your Own Pizza</Text>
					<CheckBoxes toppings={checkBoxObj}/>
				</View>
			</ScrollView>
		</View>
      	) : <View><ActivityIndicator /></View>;
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        height: Dimensions.get('window').height,
		marginTop: 10,
		padding: 10
	},
	scrollView: {
        flex: 1
	},
	specials: {
		flexDirection: 'row',
		flexWrap: 'wrap'
	},
	special: {
        textAlign: 'left',
        justifyContent: 'center',
	},
	specialsTitle: {
		fontWeight: 'bold'
	},
	title: {
        fontSize: 50,
        textAlign: 'center',
	},
	subHeader: {
		fontSize: 32,
		textAlign: 'center'
	},
	menuHeader: {
		flexDirection: 'row',
        flexWrap: 'wrap',
        textAlign: 'center'
	},
	menuHeaderText: {
		fontWeight: 'bold'
	},
	menuHeaderColumns: {
		width: 90,
		justifyContent: 'center'
	},
	thinHeaderColumn: {
		width: 50,
		justifyContent: 'center'
	}

});
