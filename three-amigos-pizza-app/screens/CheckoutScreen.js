import React from 'react';
import {
    Button,
    Image,
    StyleSheet,
    ScrollView,
    Text,
    View
} from 'react-native';
import { Form, TextValidator } from 'react-native-validator-form';


export class CheckoutScreen extends React.Component {
    state = {
        // props
        orderId: this.props.navigation.getParam('orderId'),
        storeId: this.props.navigation.getParam('storeId'),
        // time for validation
        timeProcessed: new Date(),
        // input info from form
        // name: '',
        // phone: '',
        // address: '',
        // creditCardNumber: '',
        // cvv: '',
        // expirationMonth: '',
        // expirationYear: '',
        name: 'Bob Shnob',
        phone: '2061234567',
        address: '69 b street',
        creditCardNumber: '1234567812345678',
        cvv: '123',
        expirationMonth: '12',
        expirationYear: '2020',
        // id of customer in db
        customerId: '',
        cardExpired: false,
        // order details
        orderDetails: {}
    }

    // Submit only gets called if all validations are passed
    handleSubmit = () => {
        this.refs.form.submit();
    }

    submit = () => {
        if (this.validatePayment()) {
            this.postCustomer();
        } else {
            this.setState({ cardExpired: true })
            return
        }
    }

    // extra validation for payment expiration
    validatePayment = () => {
        const { timeProcessed, expirationYear, expirationMonth } = this.state;
        if (timeProcessed.getFullYear() > expirationYear) {
            return false;
        } else if (timeProcessed.getFullYear() == expirationYear) {
            if (timeProcessed.getMonth() >= expirationMonth) {
                return false
            }
        }
        return true
    }

    // 1. post customer to db
    postCustomer = () => {
        fetch(`${global.API_ROOT}/customer/`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
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
                this.addCustomerToOrder(responseJson._id);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    // 2. add customer to the order
    addCustomerToOrder = (customerId) => {
        console.log('\n StoreId: ' + this.state.storeId)
        fetch(`${global.API_ROOT}/order/${this.state.orderId}/customer?customerId=${customerId}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then(responseJson => {
                this.setState({
                    orderDetails: responseJson
                }, function () {
                    this.checkout()
                    //this.processOrder(responseJson);
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    // 3. checkout 
    checkout = () => {
        fetch(`${global.API_ROOT}/store/${this.state.storeId}/checkout?OrderId=${this.state.orderId}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then(responseJson => {
                this.setState({
                }, function () {
                    this.processOrder(responseJson);
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

        // 4. pass the order details to receipt page
        processOrder = (receiptDetails) => {
            this.props.navigation.navigate('Receipt', {
                receipt: receiptDetails,
                order: this.state.orderDetails
            });
        }

    render() {
        const {
            name, phone, address,
            creditCardNumber, cvv, expirationMonth, expirationYear,
            cardExpired
        } = this.state;

        return (
            <ScrollView>
                <Text style={styles.title}>Checkout</Text>
                <Form
                    ref="form"
                    onSubmit={this.submit} // Only fires when all validations are passed
                >
                    <Text style={styles.header}>Contact Info</Text>
                    <TextValidator
                        name="name"
                        style={styles.textInput}
                        validators={['required', 'isString']}
                        errorMessages={['*required', 'Name invalid']}
                        placeholder="Your name..."
                        value={name}
                        onChangeText={(text) => this.setState({ name: text })}
                    />
                    <TextValidator
                        name="phone"
                        style={styles.textInput}
                        maxLength={11}
                        validators={['required', 'isNumber', 'matchRegexp:^[0-9]{10,11}$']}
                        errorMessages={['*required', 'Phone invalid', 'inv']}
                        placeholder="Your phone..."
                        value={phone}
                        onChangeText={(text) => this.setState({ phone: text })}
                    />
                    <TextValidator
                        name="address"
                        style={styles.textInput}
                        validators={['required', 'isString']}
                        errorMessages={['*required', 'Address invalid']}
                        placeholder="Your address..."
                        value={address}
                        onChangeText={(text) => this.setState({ address: text })}
                    />

                    <Text style={styles.header}>Payment Details</Text>

                    <TextValidator
                        name="creditCardNumber"
                        style={styles.textInput}
                        maxLength={16}
                        validators={['required', 'matchRegexp:^[0-9]{16}$']}
                        errorMessages={['*required', 'Credit Card Number invalid']}
                        placeholder="Your 16 digit credit card number..."
                        value={creditCardNumber}
                        onChangeText={(text) => this.setState({ creditCardNumber: text })}
                    />
                    <View style={{ flexDirection: 'row' }} >
                        <TextValidator
                            name="expirationMonth"
                            style={styles.inLineTextInput}
                            maxLength={2}
                            validators={['required', 'isNumber', 'minNumber:1', 'maxNumber:12']}
                            errorMessages={['*required', 'Month invalid', 'Month invalid', 'Month invalid']}
                            placeholder="Expiration month..."
                            value={expirationMonth}
                            onChangeText={(text) => this.setState({ expirationMonth: text, cardExpired: false })}
                        />
                        <TextValidator
                            name="expirationYear"
                            style={styles.inLineTextInput}
                            maxLength={4}
                            validators={['required', 'isNumber', 'minNumber:2019']}
                            errorMessages={['*required', 'Year invalid', 'Year invalid']}
                            placeholder="Expiration year..."
                            value={expirationYear}
                            onChangeText={(text) => this.setState({ expirationYear: text, cardExpired: false })}
                        />
                        <TextValidator
                            name="cvv"
                            style={styles.inLineTextInput}
                            maxLength={3}
                            validators={['required', 'matchRegexp:^[0-9]{3}$']}
                            errorMessages={['*required', 'CVV number invalid']}
                            placeholder="CVV..."
                            value={cvv}
                            onChangeText={(text) => this.setState({ cvv: text })}
                        />
                    </View>
                    {cardExpired ? <Text>Credit card is expired :/</Text> : null}
                    <Button
                        title="Submit"
                        onPress={this.handleSubmit}
                    />
                </Form>
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
        textAlign: 'left',
        margin: 10,
        fontWeight: 'bold'
    },
    icon: {
        marginVertical: 10,
        height: 50,
        width: 50
    },
    inputContainer: {
        paddingTop: 15
    },
    subtitle: {
        fontSize: 30
    },
    textInput: {
        borderColor: '#CCCCCC',
        borderTopWidth: 0,
        borderBottomWidth: 2,
        height: 50,
        fontSize: 15,
        paddingLeft: 15,
        paddingRight: 15,
    },
    inLineTextInput: {
        borderColor: '#CCCCCC',
        borderBottomWidth: 2,
        height: 50,
        width: 150,
        fontSize: 15,
        paddingLeft: 15,
        paddingRight: 15,
        borderLeftWidth: 1,
        borderRightWidth: 1
    },
    title: {
        fontSize: 50,
        textAlign: 'center'
    }
});
