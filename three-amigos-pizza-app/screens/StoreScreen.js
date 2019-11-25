import React from 'react';
import { 
  Text, 
  View, 
  FlatList, 
  StyleSheet, 
  TouchableOpacity 
} from 'react-native';

import { Store } from '../components/Store';

export class StoreScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            storeSelected: false,
            allStores: []
        };
    }

    getStores = () => {
        return fetch('https://radiant-springs-17894.herokuapp.com/store')
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({
            isLoading: false,
            allStores: responseJson
          }, function(){
            console.log(responseJson)
          });
  
        })
        .catch((error) =>{
            console.error(error);
        });
    }

    componentDidMount(){
        this.getStores();
    }

    render() {
        return this.state.allStores.map((item) => {
            return (
                <Store 
                    name={item.name}
                    address={item.address}
                    onPress={this.onPress}
                />
            );
        });
    }




}

StoreScreen.navigationOptions = {
    title: 'Store'
};
