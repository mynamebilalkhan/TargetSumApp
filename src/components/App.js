import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const App = () => {
  return (
    <View style={styles.container}>
      <Text>App Component</Text>
    </View>
  )
}

export default App

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ddd',
        flex: 1
    }
})