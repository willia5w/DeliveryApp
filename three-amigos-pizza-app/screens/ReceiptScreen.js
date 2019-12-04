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
import ReceiptItem from '../components/ReceiptItem';


export class ReceiptScreen extends React.Component {
    state = {
        receiptDetails: this.props.navigation.getParam('receipt'),
        orderDetails: this.props.navigation.getParam('order')
    }

    componentDidMount = async () => {
        console.log('\nreceipt: \n' + JSON.stringify(this.state.receiptDetails))
        console.log('\norder: \n' + JSON.stringify(this.state.orderDetails))
        console.log('\norder items:\n' + JSON.stringify(this.state.orderDetails.orderItems))
        console.log('\npizzas: \n' + JSON.stringify(this.state.orderDetails.orderItems.pizzas))
        // this.setState({ isLoading: false });
    }

    getItems = () => {
        const items = []
        for (let item in this.state.orderDetails.orderItems.pizzas) {
            console.log('\n item: ' + this.state.orderDetails.orderItems.pizzas[item])
            items.push(this.state.orderDetails.orderItems.pizzas[item]);
        }
        return items;
    }

    render() {
        const { receiptDetails, orderDetails} = this.state;

        // const renderItems = orderDetails.orderItems['pizzas'].map((item, i) => {
        //     // const pizza = orderDetails.orderItems.pizzas[item];
        //     // console.log('\n item: ' + item)
        //     return (
        //         <ReceiptItem
        //             key={this.orderDetails.orderItems.pizzas[item]._id}
        //             id={this.orderDetails.orderItems.pizzas[item]._id}
        //             name={this.orderDetails.orderItems.pizzas[item].name}
        //             price={this.orderDetails.orderItems.pizzas[item].price}
        //         />
        //     )
        // });

        const renderPizzas = this.state.receiptDetails.pizzas.map((pizzaName, i) => {
            return (
                <Text key={i} style={styles.receiptItem}>{pizzaName} Pizza</Text>
            )
        })
        return (
            <View style={styles.container}>
                <ScrollView
                    style={styles.scrollView}
                >
                    <Text style={styles.title}>Receipt</Text>
                    <Text style={styles.receiptItem}>Thank you for your order, {receiptDetails.customerName}</Text>
                    <Text style={styles.receiptItem}>Date: {receiptDetails.timeOfPurchase}</Text>
                    <Text style={styles.receiptItem}>Store: {receiptDetails.storeName}</Text>
                    {/* <Text style={styles.header}>Items</Text>
                    <View>{renderItems}</View> */}
                    <Text style={styles.header}>Order Items: </Text>
                    <View>{renderPizzas}</View>
                    <Text style={styles.totalPrice}>Amount Paid: {this.state.orderDetails.price}</Text>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 45,
        backgroundColor: '#F5FCFF',
    },
    contentContainer: {
        alignItems: 'center'
    },
    header: {
        fontSize: 25,
        margin: 10,
        fontWeight: 'bold'
    },
    receiptItem: {
        fontSize: 18,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 2
    },
    totalPrice: {
        marginTop: 20,
        marginLeft: 10,
        fontSize: 20,
        fontWeight: 'bold',
        alignItems: 'center'
    },
    title: {
        fontSize: 30,
        textAlign: 'center'
    }
});



    // completeOrder = () => {
    //     this.setState({ isLoading: true });
    //     fetch(`${global.API_ROOT}/store/${this.state.orderDetails.storeId}/complete?OrderId=${this.state.orderDetails._id}`, {
    //         method: 'PUT',
    //         headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json',
    //         }
    //     }).then((response) => response.json())
    //         .then((responseJson) => {
    //             this.setState({
    //                 store: responseJson,
    //                 isLoading: false
    //             }, function () {
    //                 // Add delay in API to allow order to be added to store's order lists?
    //                 console.log(JSON.stringify(this.state.store))
    //             })
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //         });
    // }
