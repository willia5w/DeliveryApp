import React from 'react';
import {
    StyleSheet,
	View
} from 'react-native';

import CheckBox from 'react-native-check-box'

export class ToppingCheckBox extends React.Component {
    constructor(props) { 
        super(props);
        this.state = {
            isChecked: false
        }
    }

    onClick = () => {
        this.props.onClickCheckBox(!this.state.isChecked, this.props.id);
        this.setState({isChecked: !this.state.isChecked});
    }

    render() {
        const { name } = this.props;
        return (
            <View style={styles.container}>
                <CheckBox
                    rightText={name}
                    onClick={this.onClick}
                    isChecked={this.state.isChecked}
                />
            </View>
       )
    }
}

const styles = StyleSheet.create({
    container: {
		flex: 1,
		backgroundColor: '#fff',
        textAlign: 'center',
        width: 120
    }
});
