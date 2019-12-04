import React from 'react';
import {
    Button,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { ReceiptItem } from '../components/ReceiptItem';


export class ReceiptScreen extends React.Component {
    state = {
        receiptDetails: this.props.navigation.getParam('receipt'),
        orderDetails: this.props.navigation.getParam('order'),
        totalAfterSpecial: this.props.navigation.getParam('totalAfterSpecial')
    }

    componentDidMount = async () => {
        this.setState({ isLoading: false });
    }

    handleTrackOrder = () => {
        return;
    }

    render() {
        const { receiptDetails, orderDetails, totalAfterSpecial } = this.state;

        const renderItems = Object.values(orderDetails.orderItems.pizzas).map((item, i) => {
            return (
                <ReceiptItem
                    key={item._id}
                    id={item._id}
                    name={'Pizza: ' + item.size.name + ' ' + item.name}
                    price={item.price.toFixed(2)}
                />
            )
        });

        const newTotal = (
            <View style={{ flexDirection: 'row' }}>
                <View style={styles.name}>
                    <Text style={{fontSize: 16, fontWeight: 'bold', marginTop: 5}}>Total after special applied</Text>
                </View>
                <View style={styles.price}>
                    <Text style={{fontSize: 16, marginTop: 5}}>${totalAfterSpecial ? totalAfterSpecial.toFixed(2) : null}</Text>
                </View>
            </View>
        );

        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={{ textAlign: 'center', flexDirection: 'row' }}>
                        <Image style={styles.image} source={require('../assets/images/pizza-icon.png')} />
                        <Text style={styles.title}>Receipt</Text>
                        <Image style={styles.image} source={require('../assets/images/pizza-icon.png')} />
                    </View>

                    <Text style={styles.rowContent}>
                        Thank you, {receiptDetails.customerName}. Your order is on it's way.{"\n"}
                    </Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.rowTitle}>Date: </Text>
                        <Text style={styles.rowContent}>{receiptDetails.timeOfPurchase}</Text>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.rowTitle}>Store: </Text>
                        <Text style={styles.rowContent}>{receiptDetails.storeName}</Text>
                    </View>

                    <Text style={styles.header}>Order Items: </Text>
                    <View>
                        {renderItems}
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.name}>
                            <Text style={{fontSize: 16, fontWeight: 'bold', marginTop: 5}}>Total</Text>
                        </View>
                        <View style={styles.price}>
                            <Text style={{fontSize: 16, marginTop: 5}}>${orderDetails.price.toFixed(2)}</Text>
                        </View>
                    </View>
                    {totalAfterSpecial ? newTotal : null}
                    <Button
                        title="Track your order"
                        onPress={this.handleTrackOrder}
                    />
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    price: {
        width: 60,
        marginHorizontal: 10
    },
    name: {
        width: 200,
        marginHorizontal: 10
    },
    container: {
        flex: 1,
        marginTop: 10,
        marginHorizontal: 10,
    },
    rowContent: {
        fontSize: 16,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5
    },
    rowTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5
    },
    header: {
        fontSize: 22,
        margin: 10,
        fontWeight: 'bold'
    },
    image: {
        height: 50,
        width: 50,
        marginLeft: 40,
        marginRight: 40
    },
    title: {
        fontSize: 30,
        textAlign: 'center'
    }
});