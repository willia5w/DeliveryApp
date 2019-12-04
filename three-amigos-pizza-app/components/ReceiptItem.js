import React from 'react';

import {
	StyleSheet,
	Text,
	View
} from 'react-native';

export class ReceiptItem extends React.Component {
    constructor(props) { 
        super(props); 
        this.state = {
		  isLoading: true
        };
    }
    
    render() {
        const { name, price } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.name}>
                    <Text style={styles.text}>{name}</Text>
                </View>
                <View style={styles.price}>
                    <Text style={styles.text}>${price}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    price: {
        width: 50,
        marginHorizontal: 10
    },
    name: {
        width: 200,
        marginHorizontal: 10
    },
    column: {
        width: 150,
        marginHorizontal: 5
    },
    container: {
		flexDirection: 'row',
        flexWrap: 'wrap',
    },
    text: {
        fontSize: 14,
    }
});
