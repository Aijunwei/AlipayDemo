
"use strict";


import React,{ Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
    Dimensions
} from 'react-native';
var items = ["Item 1", "Item 2"];
var ListPopover = require('react-native-list-popover');
var {height,width}=Dimensions.get('window');
var TestListPopover = React.createClass({
  getInitialState: function() {
    return {
      item: "Select Item",
      isVisible: false,
    };
  },

  showPopover: function() {
      alert('show');
    this.setState({isVisible: true});
  },
  closePopover: function() {
    this.setState({isVisible: false});
  },
  setItem: function(item) {
    this.setState({item: item});
  },

  render: function() {
    return (
      <View style={styles.container}>
        <TouchableHighlight style={styles.button} onPress={this.showPopover}>
          <Text>{this.state.item}</Text>
        </TouchableHighlight>

        <ListPopover
          containerStyle={styles.popoverContainer}

          list={items}
          isVisible={this.state.isVisible}
          onClick={this.setItem}
          onClose={this.closePopover}/>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#532860',
  },
  popoverContainer:{
        position:'absolute',
        left:0,
        top:0,
        height:height,
        width:width,
        backgroundColor:'red'
  },
  button: {
    borderRadius: 4,
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "#B8C",
  },
});

export default TestListPopover;