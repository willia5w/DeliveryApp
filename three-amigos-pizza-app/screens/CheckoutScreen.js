import React from 'react';
import {
    Button,
    StyleSheet,
    ScrollView,
    Text,
    TextInput,
    View
} from 'react-native';
import Customer from '../components/Customer';


export class CheckoutScreen extends React.Component {
    state = {
        isLoading: true,
        orderId: this.props.navigation.getParam('orderId'),
        storeId: this.props.navigation.getParam('storeId'),
        order: null,
        // customerInfo: {
        name: null,
        phone: null,
        address: null,
        creditCardNumber: null,
        cvv: null,
        expirationMonth: null,
        expirationYear: null,
        //
        customerId: null,
        customerObject: null,
        errorMessage: null
    }

    getOrderHandler = () => {
        fetch('https://three-amigos-prod.herokuapp.com/order/' + this.state.orderId)  // this.props.navigation.getParam('orderId')
        .then(response => response.json())
        .then(responseJson => {
            this.setState({
                order:responseJson,
                isLoading: false
            })
        })
    }

    submitOrderHandler = () => {
        const errorMessage = this.getErrorMessage();
        if (errorMessage != null) {
            this.setState({
                errorMessage: `Please enter a valid ${errorMessage}`
            })
        } else {
            this.postCustomer();
        }
    }

    getErrorMessage = () => {
        if (!this.state.name) {return 'name'}
        if (!this.state.phone) {return 'phone'}
        if (!this.state.address) {return 'address'}
        if (!this.state.creditCardNumber) {return 'credit card number'}
        if (!this.state.cvv) {return 'cvv'}
        if (!this.state.expirationMonth) {return 'expiration month'}
        if (!this.state.expirationYear) {return 'expiration year'}
        return null;
    }

    postCustomer = () => {
        fetch('https://three-amigos-prod.herokuapp.com/customer/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                _id: "5de481a87c9cbb0004b24fd7",
                name: this.state.name,
                phone: this.state.phone,
                address: this.state.address,
                creditCard: {
                  cardNumber: this.state.creditCardNumber,
                  expirationMonth: this.state.expirationMonth,
                  expirationYear: this.state.expirationYear,
                  cvv: this.state.cvv
                }
            })
        }).then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                customerObject: responseJson,
                customerId: responseJson._id,
                isLoading: true
            }, function() {
                console.log('\n1. customer object created: ' + JSON.stringify(responseJson))
                console.log(`\n   customerId recorded: ${this.state.customerId}`)
                this.addCustomerToOrder();
            });
        })
        .catch((error) => {
            console.error(error);
        });
    }

    addCustomerToOrder = () => {
        fetch(`https://three-amigos-prod.herokuapp.com/order/${this.state.orderId}/customer?customerId=${this.state.customerId}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then((response) => response.json())
        .then(responseJson => {
            this.setState({

            }, function() {
                console.log('\n2. add customer to order response: ' + JSON.stringify(responseJson))
                this.processOrder();
            });
        })
        .catch((error) => {
            console.error(error);
        });
    }

    processOrder = () => {

    }

    render() {
        const {errorMessage} = this.state;
        return (
            <ScrollView>
                <Text style={styles.title}>Checkout</Text>
                
                <Text>{errorMessage}</Text>
                
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Name"
                        onChangeText={(text) => this.setState({errorMessage: null, name: text})}
						value={this.state.name}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder="Phone"
                        onChangeText={(text) => this.setState({errorMessage: null, phone: text})}
                        value={this.state.phone}
                        maxLength={10}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder="Address"
                        onChangeText={(text) => this.setState({errorMessage: null, address: text})}
						value={this.state.address}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder="Credit Card Number"
                        onChangeText={(text) => this.setState({errorMessage: null, creditCardNumber: text})}
                        value={this.state.creditCardNumber}
                        maxLength={16}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder="CVV"
                        onChangeText={(text) => this.setState({errorMessage: null, cvv: text})}
                        value={this.state.cvv}
                        maxLength={3}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder="Expiration Month"
                        onChangeText={(text) => this.setState({errorMessage: null, expirationMonth: text})}
						value={this.state.expirationMonth}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder="Expiration Year"
                        onChangeText={(text) => this.setState({errorMessage: null, expirationYear: text})}
						value={this.state.expirationYear}
                    />
                </View>

                <View>
                    <Button type="outline" title="Submit Order" onPress={this.submitOrderHandler}/>
                </View>
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


    // checkoutOrder = () => {
    //     // fetch(`https://quiet-tor-41409.herokuapp.com/store/${this.state.storeId}/customer?customerId=${this.state.orderId}`, {
    //     fetch(('https://three-amigos-prod.herokuapp.com/store/' + this.state.storeId + '/customer?customerId=' + this.state.orderId), {
    //         method: 'PUT',
    //         headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json'
    //         }
    //     })
    //     .then((response) => response.json())
    //     .then(responseJson => {
    //         console.log('\n3. checkout order response: ' + JSON.stringify(responseJson))
    //     })
    //     .catch((error) => {
    //         console.error(error);
    //     });
    // }