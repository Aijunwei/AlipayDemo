import React,{Component} from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

export default BorderExample=()=>(
        <View style={styles.container}>
            <View style={styles.borderChange}>
                <Text>渐变边框</Text>
            </View>
        </View>);
const styles=StyleSheet.create({
    borderChange:{
        
    },
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
});
    
