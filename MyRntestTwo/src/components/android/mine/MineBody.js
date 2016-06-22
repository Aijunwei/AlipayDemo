'use strict';

import React,{ Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
const orangeColor="#FFB44F";
const greenColor='rgb(54,188,153)';
const blueColor='rgb(16,166,226)';
const redColor='#FC6165';

const SectionOne=[
    [
        {
            icon:{
                name: 'cny',
                size: 30,
                color: orangeColor
            },
            title: '余额',
            des:'0.00'
        },{
            icon:{
                name: 'credit-card',
                size: 30,
                color: orangeColor
            },
            title: '银行卡',
            des:'6'
        }
    ],[
        {
            icon:{
                name: 'money',
                size: 30,
                color: redColor
            },
            title: '余额宝',
            des:'0.00'
        },{
            icon:{
                name: 'area-chart',
                size: 30,
                color: redColor
            },
            title: '定期理财',
            des:'0.00'
        }
    ]
];
const SectionTwo=[
    [
        {
            icon:{
                name: 'leaf',
                size: 30,
                color: greenColor
            },
            title: '芝麻信用',
            des:'因为信用，所以简单'
        },{
            icon:{
                name: 'fire',
                size: 30,
                color: greenColor
            },
            title: '蚂蚁花呗',
            des:'立即开通'
        }
    ],[
        {
            icon:{
                name: 'money',
                size: 30,
                color: greenColor
            },
            title: '蚂蚁借呗',
            des:'现金15000.00'
        },{
            icon:{
                name: 'envira',
                size: 30,
                color: greenColor
            },
            title: '网商银行',
            des:'0.00'
        }
    ]
];
const SectionThree=[
     [
        {
            icon:{
                name: 'lock',
                size: 30,
                color: blueColor
            },
            title: '我的保险',
            des:'有保障更安心'
        },{
            icon:{
                name: 'cny',
                size: 30,
                color: redColor
            },
            title: '基金',
            des:'买入汇率一折起'
        }
    ],[
        {
            icon:{
                name: 'users',
                size: 30,
                color: blueColor
            },
            title: '淘宝众筹',
            des:'认真对待每一个梦想'
        },{
            icon:{
                name: 'line-chart',
                size: 30,
                color: redColor
            },
            title: '股票',
            des:'查看行情'
        }
    ],[
        {
            icon:{
                name: 'film',
                size: 30,
                color: blueColor
            },
            title: '娱乐宝',
            des:'魔兽预售'
        },{
            icon:{
                name: 'heart',
                size: 30,
                color: redColor
            },
            title: '爱心捐赠',
            des:'爱在行动'
        }
    ]
]
export default class MineBody extends Component{
    constructor(props){
        super(props);
    }
    renderMineItems(items,marginstyle){
        let sectioinStyle = marginstyle ? marginstyle : {};
        let rows=items.map((rowItem,rowIndex)=>{
            let cols=rowItem.map((colItem,colIndex)=>{
                return <MineItem key={'mineItem-'+colIndex} icon={colItem.icon} title={colItem.title} des={colItem.des} style={{borderLeftWidth:1,borderColor:'#E6E6E6'}}/>;
            });
            return (<View key={'row-'+rowIndex} style={styles.mineItemRowStyle}>
                    {cols}
                </View>);
        });
        return (
            <View style={[styles.mineItemSetion,sectioinStyle]}>
                {rows}
            </View>
        );
    }
    render(){
        return (
            <View style={styles.mineBody}>
                <TouchableOpacity style={[styles.flexrowStyle,{height: 60,padding: 10,backgroundColor:'#FFFFFF'}]}>
                    <View style={styles.flexrowStyle}>
                        <Text style={{fontSize:22,color:'#333333'}}>15000.5</Text>
                    </View>
                    <View style={[styles.flexrowStyle,{justifyContent:'flex-end'}]}>
                        <Text style={{fontSize:14,marginRight:5}}>开启账号安全险享100万保障</Text>
                         <Icon name="chevron-right" size={20} />
                    </View>
                </TouchableOpacity>
                {this.renderMineItems(SectionOne)}
                 {this.renderMineItems(SectionTwo,{marginTop:30})}
                 {this.renderMineItems(SectionThree,{marginTop:30})}
            </View>
        );
    }
}

class MineItem extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <TouchableOpacity style={[styles.flexrowStyle,this.props.style]}>
                <Icon name={this.props.icon.name} size={this.props.icon.size} color={this.props.icon.color} style={styles.iconStyle}/>
                <View style={styles.minItemText}>
                    <Text style={styles.mineItemTitleText}>{this.props.title}</Text>
                    <Text style={{fontSize:12}}>{this.props.des}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}
const styles=StyleSheet.create({
    mineBody:{
      marginTop: 20
    },
    flexrowStyle:{
        flexDirection: 'row',
        alignItems: 'center',
        flex:1
    },
    rowItem:{
        flex: 1
    },
    mineItemTitleText: {
        fontSize: 16,
        color: '#333333'
    },
    minItemText: {
        justifyContent: 'center',
        marginLeft:15
    },
    mineItemRowStyle:{
        flexDirection: 'row',
        height: 65,
        borderBottomWidth:1,
        borderColor:'#E6E6E6'
    },
    mineItemSetion: {
        borderTopWidth: 1,
        borderColor: '#E6E6E6',
        backgroundColor:'#FFFFFF'
    },
    iconStyle:{
        marginLeft:20,
        width: 30
    }
});

