import React from 'react';
import { 
  Text, 
  View, 
  FlatList, 
  StyleSheet, 
  TouchableOpacity 
} from 'react-native';

export class Store extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            storeSelected: false
        };
    }

    render() {
        const {name, address} = this.props
        return (
            <View>
                <Text>
                    {name}
                </Text>
                <Text>
                    {address}
                </Text>
            
            </View>
        )
    }
}