'use strict';

import React, { Component } from 'react';
import {
    View,
    Image,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const orangeColor="#FFB44F";
const greenColor='rgb(54,188,153)';
const blueColor='rgb(16,166,226)';
const redColor='#FC6165';

export default class MineHeader extends Component {
    static defaultProps={
        user:{
            name: '杰克船长',
            alias:'Jack',
            mail:'jack@gmail.com'
        }
    }
    constructor(props){
        super(props);
    }
    render(){
        return (
           <TouchableOpacity style={styles.header}>
                <View style={{width:100,height:100,padding:10,}}>
                    <Image source={require('../../../images/header.png')} style={styles.photo} />
                    <Icon name='apple' size={30} style={{position:'absolute',left:70,top:65}} color="#FFB44F"/>
                </View>
                <View style={styles.headerInfo}>
                    <Text style={[styles.textItem,{}]}>
                        <Text style={{color:'#333333',fontSize:16}}>{this.props.user.name}</Text>
                        <Text>{this.props.user.alias ? this.props.user.alias : '未设置昵称'}</Text>
                    </Text>
                    <Text style={styles.textItem}>{this.props.user.mail}</Text>
                    <View style={{flexDirection:'row',marginTop:10}}>
                        <View style={[styles.textWrap,{marginLeft:0}]}>
                            <Text style={styles.innerTextItem}><Icon name="camera-retro" size={20} color={blueColor}/>&nbsp;&nbsp;相册</Text>
                        </View>
                        <View style={styles.textWrap}>
                            <Text style={styles.innerTextItem}><Icon name="envelope-o" size={20} color={blueColor}/>&nbsp;&nbsp;收藏</Text>
                        </View>
                        <View style={[styles.textWrap,{flex:1,borderRightWidth:0}]}>
                            <Text style={[styles.innerTextItem]}><Icon name="diamond" size={20} color={blueColor}/>&nbsp;&nbsp;黄金会员</Text>
                        </View>
                   </View>
                </View>
                <View style={styles.arrow}>
                        <Icon name="chevron-right" size={20} color="gray"/>
                </View>
           </TouchableOpacity> 
        );
    }
}

const styles=StyleSheet.create({
    photo:{
        width:80,
        height:80,
        borderRadius:10
    },
    header:{
        flexDirection:'row',
        backgroundColor: '#FFFFFF',
        padding: 10
    },
    headerInfo:{
        flex: 1,
        marginTop: 10,
        height:90
    },
    textItem:{
        fontSize: 14,

    },
    textWrap: {
        width:55,
        borderRightWidth: 1,
        borderColor: 'gray',
        marginLeft: 10
    },
    innerTextItem:{
        fontSize: 12
    },
    arrow: {
        width: 20,
        alignItems: 'flex-end',
        justifyContent: 'center'
        
    }
});