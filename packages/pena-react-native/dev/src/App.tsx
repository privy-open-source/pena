import * as React from 'react'
import Pena from '../../src'
import {
  StyleSheet,
  SafeAreaView,
} from 'react-native'

export default function App () {
  const url = 'https://reactnative.dev/'

  return (
    <SafeAreaView style={styles.container}>
      <Pena url={url} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({ container: { flex: 1 } })
