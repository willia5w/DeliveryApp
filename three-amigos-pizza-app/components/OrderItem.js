import React from 'react';
import {
    Button,
	StyleSheet,
	Text,
	View
} from 'react-native';

export class OrderItem extends React.Component {
    constructor(props) { 
        super(props); 
        this.state = {
		  isLoading: true
        };
    }
    
    removePizza = () => {
        this.props.removePizzaFromOrder(this.props.id)
    }
    
    render() {
        const { name, size, crust, price } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.buttonColumn}>
                    <Button
                        title={"Remove"}
                        style={styles.button}
                        onPress={this.removePizza}
                    />
                </View>
                <View style={styles.column}>
                    <Text style={styles.text}>{name}</Text>
                </View>
                <View style={styles.column}>
                    <Text style={styles.text}>{size}</Text>
                </View>
                <View style={styles.column}>
                    <Text style={styles.text}>${price.toFixed(2)}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        fontSize: 14
    },
    buttonColumn: {
        width: 85
    },
    column: {
        width: 70,
        justifyContent: 'center',
        marginHorizontal: 5
    },
    container: {
		flexDirection: 'row',
        flexWrap: 'wrap',
        textAlign: 'center'
    },
    text: {
        fontSize: 14,
        textAlign: 'center'
    }
});
