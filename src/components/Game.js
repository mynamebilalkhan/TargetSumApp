import { StyleSheet, View, Text } from 'react-native';
import RandomNumber from './RandomNumber';
import React, { useEffect, useState } from 'react';

const Game = ({ randomNumberCount, initialSeconds }) => {
	
	// Generate random numbers once and store in state
	const [randomNumbers, setRandomNumbers] = useState(
		Array.from({ length: randomNumberCount }).map(() =>
			1 + Math.floor(10 * Math.random())
		)
	);

	const [selectedIds, setSelectedIds] = useState([]);
	const [remainingSeconds, setRemainingSeconds] = useState(initialSeconds);

	const componentDidMount = () => {
		const intervalId = setInterval(()=>{
			setRemainingSeconds(remainingSeconds - 1);
		}, () => {
			if (remainingSeconds === 0){
				clearInterval(intervalId);
			}
		}, 1000);
	}
	
	const componentWillUnMount = () => {
		clearInterval(intervalId);
	};

	useEffect(() => {
		const intervalId = setInterval(() => {
		  setRemainingSeconds((prevSeconds) => {
		    if (prevSeconds === 0) {
			 clearInterval(intervalId);
			 return 0; // Ensure it doesn't go negative
		    }
		    return prevSeconds - 1;
		  });
		}, 1000);
	   
		return () => clearInterval(intervalId); // Cleanup on unmount
	}, []);		 

  	// Calculate target sum once based on initial random numbers
	const [target, setTarget] = useState(() =>
		randomNumbers.slice(0, randomNumberCount - 2).reduce((acc, curr) => acc + curr, 0)
	);

  	const isNumberSelected = (numberIndex) => selectedIds.includes(numberIndex);

	const selectNumber = (numberIndex) => {
		setSelectedIds([...selectedIds, numberIndex]);
	};

	const gameStatus = () => {
		const sumSelected = selectedIds.reduce((acc, curr) => {
			return acc + randomNumbers[curr];
		}, 0);

		if ( sumSelected === target ){
			return 'WON';
		}
		if ( sumSelected > target ){
			return 'LOST';
		}
		if ( remainingSeconds === 0 ){
			return 'LOST';
		}
		
		return 'PLAYING';
	};

	const gameStatusText = gameStatus();

  	return (
	<View style={styles.container}>
		<Text style={[styles.target, styles[`STATUS_${gameStatusText}`]]}>{target}</Text>
		<View style={styles.randomContainer}>
			{randomNumbers.map((randumNumber, index) => (
				<RandomNumber
					key={index}
					number={randumNumber}
					id={index}
					isDisabled={isNumberSelected(index) || gameStatusText !== 'PLAYING'}
					onPress={selectNumber}
				/>
			))}
		</View>
		<Text>{remainingSeconds}</Text>
		<Text style={[styles.gameStatus, styles[`STATUS_${gameStatusText}`]]}>{gameStatusText}</Text>
	</View>
  	);
};

const styles = StyleSheet.create({
  	container: {
    		backgroundColor: '#ddd',
    		flex: 1,
    		paddingTop: 50,
  	},
	target: {
		backgroundColor: '#aaa',
		fontSize: 40,
		marginHorizontal: 50,
		textAlign: 'center',
	},
	randomContainer: {
		flex: 1,
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		marginHorizontal: 11,
		paddingTop: 50,
	},
	gameStatus: {
		marginHorizontal: 60,
		fontSize: 30,
		textAlign: 'center',
		color: '#fff',
		paddingVertical: 15
	},
	STATUS_PLAYING: {
		backgroundColor: '#bbb'
	},
	STATUS_WON: {
		backgroundColor: 'green'
	},
	STATUS_LOST: {
		backgroundColor: 'red'
	}
});

export default Game;
