import { StyleSheet, Text, View } from 'react-native';
import Game from './Game';
import React from 'react';

const App = () => {
  return (
    <Game randomNumberCount={6} />
  )
}

export default App

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ddd',
        flex: 1
    }
})