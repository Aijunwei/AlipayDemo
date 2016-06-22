'use strict';

import React,{Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity
} from 'react-native';

export default class TestIt extends Component{
    measureWelcome() {
        this.refs.welcome.measure(this.logWelcomeLayout);
        
    }

    logWelcomeLayout(ox, oy, width, height, px, py) {
        console.log("ox: " + ox);
        console.log("oy: " + oy);
        console.log("width: " + width);
        console.log("height: " + height);
        console.log("px: " + px);
        console.log("py: " + py);
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome} ref="welcome">
                    Welcome to React Native!
                </Text>
                <TouchableOpacity onPress={this.measureWelcome.bind(this)}>
                    <Text>Measure it</Text>
             
                </TouchableOpacity>
                       <TextInput placeholder="input" ref="myinput" secureTextEntry={true}  keyboardType="numeric" onEndEditing={(e,text)=>{
                        console.log(e.nativeEvent);
                        console.log(text);
                        console.log(this.refs.myinput);
                    }}/>
                          <TextInput placeholder="input"  keyboardType="numeric" password={true} onEndEditing={(e,text)=>{
                        console.log(e);
                        console.log(text);
                        console.log(this.refs.myinput);
                    }}/>
            </View>
        );
    }

}
var styles = StyleSheet.create({
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
    marginBottom: 5,
  },
});