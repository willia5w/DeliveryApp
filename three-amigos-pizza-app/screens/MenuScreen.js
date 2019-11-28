import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

export class MenuScreen extends React.Component {
    constructor(props) { 
      	super(props);
      	this.state = {
        	currentStore: this.props.navigation.getParam('store')
      	};
    }

    render() {
      	const { currentStore } = this.state;
      	return (
			<View style={styles.container}>
				<Text>
					MenuScreen for {currentStore.name}
				</Text>
			</View>
      	);
    }
}

const styles = StyleSheet.create({
  	container: {
		backgroundColor: '#fff',
		flex: 1,
		paddingTop: 15
  	}
});
