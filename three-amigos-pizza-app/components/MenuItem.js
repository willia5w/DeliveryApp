import React from 'react';
import {
	Button,
	Text,
	View,
	StyleSheet, 
} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';

export class MenuItem extends React.Component {
    constructor(props) { 
        super(props); 
        this.state = {
		  isLoading: true,
		  size: ""
        }; 
	}
	
    // addPizza = () => {
    //   fetch('https://radiant-springs-17894.herokuapp.com/pizza/crust/', {
    //     method: 'POST',
    //     headers: {
    //       Accept: 'application/json',
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       glutenFree: false,
    //       name: 'thick',
    //       price: 7
    //     }),
    //   });
    //   this.getCrusts();
    // }
	
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
		this.setState({size: value});
	}

    render() {
		const { name, toppings, price, sizes } = this.props;
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
						defaultValue={'Size'}
					/>
				</View>
				<View style={styles.button}>
					<Button 
						style={styles.button} 
						title="Add"
						onPress={() => navigate()}
					/>  
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
    container: {
		flex: 1,
		backgroundColor: '#fff',
		flexDirection: 'row',
		flexWrap: 'wrap',
		textAlign: 'center'
    },
	toppingsColumn: {
		width: 90,
		marginVertical: 10,
		justifyContent: 'center',
		alignItems: 'flex-start'
	},
	columns: {
		width: 90,
		justifyContent: 'center',
		alignItems: 'flex-start'
	},
	thinColumns: {
		width: 50,
		justifyContent: 'center',
		alignItems: 'flex-start'
	}
});
