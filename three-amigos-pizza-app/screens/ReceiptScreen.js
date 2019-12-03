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


export class ReceiptScreen extends React.Component {
    constructor(props) { 
      	super(props);
      	this.state = {
			receiptBody: this.props.navigation.getParam('order'),
			storeId: this.props.navigation.getParam('storeId'),
			orderId: this.props.navigation.getParam('orderId'),
			isLoading: true,
			store: null
      	};
	}
	
	componentDidMount = async () => {
		this.completeOrder();
		this.setState({isLoading: false});
	}

	completeOrder = () => {
		this.setState({isLoading: true});
		fetch(`https://three-amigos-prod.herokuapp.com/store/${this.state.storeId}/complete?OrderId=${this.state.orderId}`, {
			method: 'PUT',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			}
		}).then((response) => response.json())
		.then((responseJson) => {
			this.setState({
				store: responseJson,
				isLoading: false
			}, function() {
				// Add delay in API to allow order to be added to store's order lists?
				//console.log(JSON.stringify(this.state.store))
			})
		})
		.catch((error) => {
			console.error(error);
		});
	}

    render() {
        const {receiptBody} = this.state;
        return (
			<ScrollView>
				<Text style={styles.title}>Receipt</Text>
				<Text>{JSON.stringify(receiptBody)}</Text>
			</ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 45,
        backgroundColor: '#F5FCFF',
    },
    header: {
        fontSize: 25,
        textAlign: 'center',
        margin: 10,
        fontWeight: 'bold'
    },
    inputContainer: {
        paddingTop: 15
    },
    textInput: {
        borderColor: '#CCCCCC',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        height: 50,
        fontSize: 25,
        paddingLeft: 20,
        paddingRight: 20
    },
    title: {
        fontSize: 50,
        textAlign: 'center'
	}
});
