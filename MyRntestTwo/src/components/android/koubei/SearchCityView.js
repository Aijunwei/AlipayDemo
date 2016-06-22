'use strict';

import React,{Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput
} from 'react-native';

export default class SearchCityView extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
                <View style={styles.container}>
                    <Text>searchCity</Text>
                </View>
            );
    }
}

const styles=StyleSheet.create({
    container:{
        opacity:0.1,
        backgroundColor:'red',
        flex:1
    }
})