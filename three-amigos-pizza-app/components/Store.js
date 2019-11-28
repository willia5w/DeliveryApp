import React from 'react';
import {
    Button,
    StyleSheet,
    Text,
    View
} from 'react-native';

export class Store extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { name, address, navigate } = this.props;
        return (
            <View style={styles.container}>
                <Button 
                    style={styles.button} 
                    title="Select"
                    onPress={() => navigate()}
                />  
                <View style={styles.nameColumn}>
                    <Text style={styles.text}>{name}</Text>
                </View>
                <View style={styles.addressColumn}>
                    <Text style={styles.text}>{address}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    nameColumn: {
        textAlign: 'left',
        justifyContent: 'center',
        width: 120
    },
    addressColumn: {
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    text: {
        fontSize: 16
    }
})