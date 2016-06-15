/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native'

import feathers from 'feathers/client'
import socketio from 'feathers-socketio/client'

// A hack so that you can still debug. Required because react native debugger runs in a web worker, which doesn't have a window.navigator attribute.
if (window.navigator && Object.keys(window.navigator).length == 0) {
  window = Object.assign(window, { navigator: { userAgent: 'ReactNative' }})
}

var io = require('socket.io-client/socket.io')

const host = 'http://192.168.1.3:3030'

const socket = io(host, { jsonp: false, transports: ['websocket'] })
const app = feathers().configure(socketio(socket, { timeout: 30 * 1000 }))

class badrequest extends Component {
  componentDidMount () {
   // Get the message service that uses a websocket connection
    const messageService = app.service('messages')
    messageService.create({ x: 123 })
      .then((response) => {
        console.log('Response', response)
      })
      .catch((error) => {
        console.log('Error', error)
      })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Shake or press menu button for dev menu
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
})

AppRegistry.registerComponent('badrequest', () => badrequest)
