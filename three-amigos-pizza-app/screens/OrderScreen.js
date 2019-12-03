import React from 'react';
import {
    ActivityIndicator,
    Button,
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';

import { OrderItem } from '../components/OrderItem';

export class OrderScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            order: {},
            orderId: this.props.navigation.getParam('orderId'),
            pizzas: [],
            specials: this.props.navigation.getParam('specials'),
        };
    }

    componentDidMount = async () => {
        await this.getOrderInfo();
        await this.checkSpecials();
        this.setState({ isLoading: false});
    }

    getOrderInfo = () => {
        return fetch('https://quiet-tor-41409.herokuapp.com/order/' + this.state.orderId)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    order: responseJson
                }, function(){
                    const { order } = this.state;
                    this.getPizzas(order.orderItems.pizzas);
                    this.setState({isLoading: false});
                });
        })
        .catch((error) =>{
            console.error(error);
        });
    }

    removePizzaFromOrder = (pizzaId) => {
        this.setState({isLoading: true});
        this.setState({pizzas: []});
        fetch(`https://quiet-tor-41409.herokuapp.com/order/${this.state.orderId}/removePizza?pizzaId=${pizzaId}`, {
			method: 'DELETE',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			}
		}).then((response) => response.json())
		.then((responseJson) => {
			this.setState({
				order: responseJson
			}, function() {
                this.getOrderInfo();
			})
		})
		.catch((error) => {
			console.error(error);
		});
    }

    getPizzas = (pizzaArray) => {
        for (let item in pizzaArray) {
            this.state.pizzas.push(pizzaArray[item]);
        }
    }

    proceedToCheckout = () => {
        this.props.navigation.navigate('Checkout', {storeId: this.state.orderId.storeId, orderId: this.state.orderId});
    }

    checkSpecials = () => {
        const { specials, pizzas } = this.state;
        let obj = {};
        for (let i = 0; i < specials.length; i++) {
            obj[specials[i]._id] = [];
        }
        console.log("obj: " + JSON.stringify(obj));
        console.log("specials: " + JSON.stringify(specials) + "pizzas: " + JSON.stringify(pizzas));
        for (let i = 0; i < specials.length; i++) {
            for (let j = 0; j < pizzas.length; j++) {
                if (specials[i].requiredSizeOfPizzas._id == pizzas[j].size._id) {
                    obj[specials[i]._id].push(pizzas[j]._id);
                }
                if (obj[specials[i]._id].length == specials[i].requiredNumberPizzas) {
                    // print out things neeeded for adding special to order
                }
            }
        }

        for (let i = 0; i < specials.length; i++) {
            if (obj[specials[i]._id].length >= specials[i].requiredNumberPizzas) {

            }
        }
    }
 
    render() {
        const renderItems = this.state.pizzas.map((item, i) => {
            return (
                <OrderItem
                    key={item._id}
                    id={item._id}
                    name={item.name}
                    size={item.size.name}
                    crust={item.crust.name}
                    price={item.price}
                    removePizzaFromOrder={this.removePizzaFromOrder}
                />
            )
        });

        const orderContent = (
            <View style={styles.contentContainer}>
                <View style={styles.header}>
                    <View style={styles.menuBar}>
                        <View style={styles.headerColumn}>
                            <Text style={styles.text}>Remove</Text>
                        </View>
                        <View style={styles.headerColumn}>
                            <Text style={styles.text}>Pizza</Text>
                        </View>
                        <View style={styles.headerColumn}>
                            <Text style={styles.text}>Size</Text>
                        </View>
                        <View style={styles.headerColumn}>
                            <Text style={styles.text}>Price</Text>
                        </View>
                    </View>

                    <View>
                        {renderItems}
                    </View>
                    <View style={styles.total}>
                        <Text>Total price: ${this.state.order.price ? this.state.order.price.toFixed(2) : null}</Text>
                        <Button
                            title={"Proceed to Checkout"}
                            onPress={this.proceedToCheckout}
                        />
                    </View>
                </View>
            </View>
        );

        const emptyOrder = (
            <View style={styles.imageContainer}>
                <Text style={styles.text}>Order is empty!</Text>
                <Image
                    style={styles.image}
                    source={require('../assets/images/sad_face.png')}
                />
            </View>
        )

        const { isLoading, order } = this.state;
        return !isLoading ? (
            <View style={styles.container}>
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.contentContainer}
                >
                <Text style={styles.title}>Order</Text>
                    {this.state.pizzas.length > 0 ? orderContent : emptyOrder}
                </ScrollView>
            </View>
        ) : <View style={styles.activityIndicator}><ActivityIndicator /></View>;
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
    contentContainer: {
        alignItems: 'center'
    },
    image: {
        marginVertical: 10,
        height: 200,
        width: 200
    },
    imageContainer: {
        alignItems: 'center'
    },
    title: {
        fontSize: 50,
        textAlign: 'center'
    },
    total: {
        alignItems: 'flex-end'
    },
    headerColumn: {
		width: 70,
        justifyContent: 'center',
        marginHorizontal: 5
    },
    menuBar: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        textAlign: 'center',
        alignItems: 'center'
    },
    text: {
        textAlign: 'center',
        fontSize: 16
    }
})