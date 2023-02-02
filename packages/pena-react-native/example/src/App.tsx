import * as React from 'react'
import Pena from '../../src'
import {
  StyleSheet,
  View,
} from 'react-native'

export default function App () {
  const url = 'https://reactnative.dev/'

  return (
    <View style={styles.container}>
      <Pena url={url} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex          : 1,
    alignItems    : 'center',
    justifyContent: 'center',
  },
  box: {
    width         : 60,
    height        : 60,
    marginVertical: 20,
  },
})
