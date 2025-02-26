import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const RandomNumber = ({number, isDisabled, onPress, id}) => {	

	const handlePress = () => {
		if( isDisabled ){ return; }
		onPress(id);
	};

	return (
		<TouchableOpacity onPress={handlePress}>
			<Text style={[styles.random, isDisabled && styles.disabled]}>{number}</Text>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	random: {
		backgroundColor: '#999',
		width: 100,
		fontSize: 32,
		marginHorizontal: 15,
		textAlign: 'center',
		marginBottom: '30'
	},
	disabled: {
		opacity: 0.3
	}
});

export default RandomNumber