import { StyleSheet, View, Text } from 'react-native'
import React from 'react'

const Game = ({randomNumberCount}) => {
	const randumNumbers = Array.from({length: randomNumberCount}).map(()=> 1 + Math.floor(10 * Math.random()));
	const target = randumNumbers.slice(0, randomNumberCount - 2).reduce((acc, curr) => acc + curr, 0);
	return (
		<View style={styles.container}>
			<Text style={styles.target}>{target}</Text>
			<View style={styles.randomContainer}>
				{randumNumbers.map((randumNumber, index) => 
					<Text key={index} style={styles.random}>{randumNumber}</Text>
				)}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#ddd',
		flex: 1,
		paddingTop: 30,
	},
	target: {
		backgroundColor: '#aaa',
		fontSize: 40,
		marginHorizontal: 50,
		textAlign: 'center'
	},
	randomContainer: {
		flex: 1,
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		marginHorizontal: 11,
		paddingTop: 50
	},
	random: {
		backgroundColor: '#999',
		width: 100,
		fontSize: 32,
		marginHorizontal: 15,
		textAlign: 'center',
		marginBottom: '30'
	}

});

export default Game;