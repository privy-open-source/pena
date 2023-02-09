import React, { useState } from 'react'
import Pena, { type Payload } from '@privyid/pena-react-native'
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  Button,
} from 'react-native'
import { StatusBar } from 'expo-status-bar'

export default function App () {
  const url           = 'http://192.168.1.13:5173'
  const [log, setLog] = useState<string[]>([])

  function onAfterAction (event: Payload) {
    setLog((old) => [event.action, ...old])
  }

  function clear () {
    setLog([])
  }

  return (
    <SafeAreaView style={styles.container}>
      <Pena
        url={url}
        lang="id"
        onAfterAction={onAfterAction} />
      <ScrollView style={styles.row}>
        {log.map((l, i) => (
          <Text key={i}>{l}</Text>
        ))}
        <Button title="Clear" onPress={clear} />
      </ScrollView>
      <StatusBar />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({ container: { flex: 1 }, row: { maxHeight: '50%' } })
