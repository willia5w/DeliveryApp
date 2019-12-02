import React from 'react';
import {
	Button,
	StyleSheet,
	Text,
	View
} from 'react-native';

import ModalDropdown from 'react-native-modal-dropdown';

export class MenuItem extends React.Component {
    constructor(props) { 
        super(props); 
        this.state = {
		  isLoading: true,
		  size: null,
		  sizeNotSelected: false
        };
	}

	addPizza = () => {
		if (!this.state.size) {
			this.setState({sizeNotSelected: true});
		} else {
			this.props.addMenuPizzaToOrder(this.props.id, this.state.size._id);
		}
	}

	onSelect = (index, value) => {
		this.setState({size: value});
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

    render() {
		const errorMessage = (
			<Text style={styles.error}>Please select a size for your pizza.</Text>
		)

		const { name, price, sizes, toppings } = this.props;
		const renderToppings = toppings.map((item, i) => {
			return (
				<View key={item._id} style={styles.topping}>
					<Text>
						{item.name}{i != (toppings.length-1) ? ', ' : ''}
					</Text>
				</View>
			)
		});

        return (
			<View>
				{this.state.sizeNotSelected ? errorMessage : null}
				<View style={styles.container}>
					<View style={styles.columns}>
						<Text>{name}</Text>
					</View>
					<View style={styles.toppingsColumn}>
						{renderToppings}
					</View>
					<View style={styles.thinColumns}>
						<Text>${price.toFixed(2)}</Text>
					</View>
					<View style={styles.thinColumns}>
						<ModalDropdown
							options={sizes}
							renderRow={this.renderRow}
							renderButtonText={(rowData) => this.renderButtonText(rowData)}
							onSelect={this.onSelect}
							defaultValue={'Select Size'}
						/>
					</View>
					<View style={styles.button}>
						<Button 
							style={styles.button} 
							title="Add"
							onPress={() => this.addPizza()}
						/>
					</View>
				</View>
			</View>
       )
    }
}

const styles = StyleSheet.create({
	button: {
		width: 50,
		justifyContent: 'center'
	},
	columns: {
		width: 90,
		justifyContent: 'center',
		alignItems: 'flex-start'
	},
    container: {
		flex: 1,
		backgroundColor: '#fff',
		flexDirection: 'row',
		flexWrap: 'wrap',
		textAlign: 'center'
	},
	error: {
		color: 'red'
	},
	thinColumns: {
		width: 50,
		justifyContent: 'center',
		alignItems: 'flex-start'
	},
	toppingsColumn: {
		width: 90,
		marginVertical: 10,
		justifyContent: 'center',
		alignItems: 'flex-start'
	}
});
