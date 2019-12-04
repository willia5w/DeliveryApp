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
                <View style={styles.column}>
                    <Text style={styles.text}>{name}</Text>
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
