import React from 'react';
import {
    ActivityIndicator,
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';

import { Store } from '../components/Store';

export class StoreScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allStores: [],
            isLoading: true,
            storeSelected: false
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

                });
        })  
        .catch((error) =>{
            console.error(error);
        });
    }

    componentWillMount = () => {
        this.getStores();
    }

    goToMenuScreen = (store) => {
        this.props.navigation.navigate('Menu', {store: store});
    }

    render() {
        const renderStores = this.state.allStores.map((item) => {
            return (
                <Store
                    key={item._id}
                    name={item.name}
                    address={item.address}
                    onPress={this.onPress}
                    navigate={() => this.goToMenuScreen(item)}
                />
            );
        });

        return !this.state.isLoading ? (
            <View style={styles.container}>
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.contentContainer}>
                    <Text style={styles.title}>Three Amigos Pizza App</Text>
                    <View style={styles.imageContainer}>
                        <Image 
                            style={styles.image}
                            source={require('../assets/images/pizza-1428931_1280.png')}
                        />
                    </View>
                    <Text style={styles.select}>Select a Store</Text>
                    <View style={styles.storesHeader}>
                        <View style={styles.nameHeader}>
                            <Text style={styles.text}>Store Name</Text>
                        </View>
                        <View style={styles.addressHeader}>
                            <Text style={styles.text}>Store Address</Text>
                        </View>
                    </View>

                    <View style={styles.storesContainer}>
                        {renderStores}
                    </View>

                </ScrollView>
            </View>
        ) : <View style={styles.activityIndicator}><ActivityIndicator /></View>;
    }
}

const styles = StyleSheet.create({
    activityIndicator: {
		marginTop: 50
	},
    addressHeader: {
        justifyContent: 'center',
        width: 120
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
    content: {
        flexGrow: 1,
        justifyContent: 'space-between'
    },
    contentContainer: {
        alignItems: 'center',
        paddingTop: 30
    },
    image: {
        marginVertical: 10,
        height: 200,
        width: 200
    },
    imageContainer: {
        alignItems: 'center'
    },
    nameHeader: {
        justifyContent: 'center',
        marginLeft: 50,
        marginRight: 20,
        width: 120
    },
    scrollView: {
        flex: 1
    },
    select: {
        fontSize: 24,
        marginBottom: 25,
        textAlign: 'center'
    },
    storesContainer: {
        display: 'flex'
    },
    storesHeader: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        textAlign: 'center'
    },
    text: {
        fontSize: 18,
        marginBottom: 10,
        textAlign: 'center',
        textDecorationLine: 'underline'
    },
    title: {
        fontSize: 50,
        textAlign: 'center',
    }
  });
