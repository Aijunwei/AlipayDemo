/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

 //require('./jsCode/Main');


import React, { Component } from 'react';
import {
  AppRegistry
} from 'react-native';

import Alipay from './src/redux/App';
class MyRntestTwo extends Component {
  render() {
    return <Alipay/>;
  }
}


AppRegistry.registerComponent('MyRntestTwo', () => MyRntestTwo);
