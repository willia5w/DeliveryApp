import React from 'react';
import {
    StyleSheet,
    Text,
	View
} from 'react-native';

export class ErrorMessage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { message, style } = this.props;
        return (
            <View style={style}>
                <Text style={styles.text}>{message}</Text>
            </View>
       )
    }
}

const styles = StyleSheet.create({
    text: {
		color: 'red'
    }
});
