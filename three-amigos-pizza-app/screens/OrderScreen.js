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
            special: null,
            qualifiedPizzas: [],
            totalAfterSpecial: null
        };
    }

    componentDidMount = async () => {
        await this.getOrderInfo();
        this.setState({ isLoading: false});
    }

    getOrderInfo = () => {
        return fetch(`${global.API_ROOT}/order/${this.state.orderId}`)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    order: responseJson
                }, function(){
                    const { order } = this.state;
                    this.getPizzas(order.orderItems.pizzas);
                });
        })
        .catch((error) =>{
            console.error(error);
        });
    }

    removePizzaFromOrder = (pizzaId) => {
        this.setState({isLoading: true});
        this.setState({pizzas: []});
        fetch(`${global.API_ROOT}/order/${this.state.orderId}/removePizza?pizzaId=${pizzaId}`, {
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
        this.checkSpecials();
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
        for (let i = 0; i < specials.length; i++) {
            for (let j = 0; j < pizzas.length; j++) {
                if (specials[i].requiredSizeOfPizzas._id == pizzas[j].size._id) {
                    obj[specials[i]._id].push(pizzas[j]);
                }
                if (obj[specials[i]._id].length == specials[i].requiredNumberPizzas) {
                    this.setState({special: specials[i]});
                    this.setState({isLoading: false});
                    this.setState({qualifiedPizzas: obj[specials[i]._id]});
                    return;
                }
            }
        }
        this.setState({special: null});
        this.setState({isLoading: false});
    }

    applySpecial = () => {
        this.setState({isLoading: true});
        let count = 0;
        const { pizzas, qualifiedPizzas, special } = this.state;
        for (i = 0; i < qualifiedPizzas.length; i++) {
            for (j = 0; j < pizzas.length; j++) {
                if (qualifiedPizzas[i]._id == pizzas[j]._id) {
                    count++;
                    pizzas[j].price = pizzas[j].price * special.specialPriceRatio;
                    if (count == qualifiedPizzas.length) {
                        this.getPrice();
                        return
                    }
                }
            }
        }
    }

    getPrice = () => {
        const { pizzas } = this.state;
        let total = 0.0;
        for (let i = 0; i < pizzas.length; i++) {
            total += pizzas[i].price;
        }
        this.setState({totalAfterSpecial: total});
        this.setState({isLoading: false});
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

        const specialAlert = (
            <View>
                <Text>Would you like to apply this special? </Text>
                <Text>{this.state.special ? this.state.special.name : null}</Text>
                <Button title="Apply" onPress={this.applySpecial} />
            </View>
        )

        const totalAfterSpecialApplied = (
            <Text>Total after special application: ${this.state.totalAfterSpecial ? this.state.totalAfterSpecial.toFixed(2) : null}</Text>
        )

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
                        <Text>Subtotal: ${this.state.order.price ? this.state.order.price.toFixed(2) : null}</Text>
                        {this.state.special ? specialAlert : null}
                        {this.state.totalAfterSpecial ? totalAfterSpecialApplied : null}
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