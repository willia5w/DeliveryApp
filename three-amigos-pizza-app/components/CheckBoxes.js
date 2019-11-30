import React from 'react';
import {
    Button,
    CheckBox,
	Text,
	View,
	StyleSheet, 
} from 'react-native';

export class CheckBoxes extends React.Component {
    constructor(props) { 
        super(props); 
    }
    
    componentWillMount = () => {

        console.log("heresss" + JSON.stringify(this.props.toppings));
    }
	

    render() {
        return (
            <View style={styles.container}>
                {/* <CheckBox
                    title=
                /> */}
				
            </View>
       )
    }
}

const styles = StyleSheet.create({
	button: {
		width: 50,
		justifyContent: 'center'
	},
    container: {
		flex: 1,
		backgroundColor: '#fff',
		flexDirection: 'row',
		flexWrap: 'wrap',
		textAlign: 'center'
    },
	toppingsColumn: {
		width: 90,
		marginVertical: 10,
		justifyContent: 'center',
		alignItems: 'flex-start'
	},
	columns: {
		width: 90,
		justifyContent: 'center',
		alignItems: 'flex-start'
	},
	thinColumns: {
		width: 50,
		justifyContent: 'center',
		alignItems: 'flex-start'
	}
});
