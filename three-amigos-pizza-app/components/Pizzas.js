import React from 'react';
import { 
  Text, 
  View, 
  FlatList, 
  StyleSheet, 
  TouchableOpacity 
} from 'react-native';

export class Pizzas extends React.Component {
    constructor(props) { 
        super(props); 
        this.state = {
          isLoading: true
        }; 
    }

    getCrusts = () => {
      return fetch('https://radiant-springs-17894.herokuapp.com/pizza/crust')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson
        }, function(){
          console.log(responseJson)
        });

      })
      .catch((error) =>{
        console.error(error);
      });
    }

    componentDidMount(){
        this.getCrusts();
    }

    addPizza = () => {
      fetch('https://radiant-springs-17894.herokuapp.com/pizza/crust/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          glutenFree: false,
          name: 'thick',
          price: 7
        }),
      });
      this.getCrusts();
    }
    
    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data= {this.state.dataSource}
                    ItemSeparatorComponent = {this.FlatListItemSeparator}
                    renderItem={({item}) => <Text>{item.name}</Text>}
                    keyExtractor={({_id}, index) => _id}
                />

              <View style={styles.helpContainer}>
                <TouchableOpacity onPress={this.addPizza} style={styles.helpLink}>
                  <Text style={styles.helpLinkText}>
                    Add Pizza
                  </Text>
                </TouchableOpacity>
              </View>

            </View>
       )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    helpContainer: {
      marginTop: 15,
      alignItems: 'center',
    },
    helpLink: {
      paddingVertical: 15,
    },
    helpLinkText: {
      fontSize: 14,
      color: '#2e78b7',
    }
});
