'use strict';

import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Animated,
    ListView,
    Dimensions
} from 'react-native';
import { FILTER_DATAS } from '../../../constants/configData';
// 字体
const Icon = require('react-native-vector-icons/FontAwesome');
const AnimatedIcon= Animated.createAnimatedComponent(Icon);
const {screenWidth}=Dimensions.get('window');

 class FilterBar extends Component{
    render(){
        let {activeIndex,action}=this.props;
       
        return (
            <View style={styles.container}>
                <FilterItem text="全部美食" active={activeIndex==0 ? true :false} action={(val)=>action(val||0)} />
                <FilterItem text="全城" active={activeIndex==1 ? true :false} action={(val)=>action(val||1)} />
                <FilterItem text="智能排序" active={activeIndex==2 ? true :false} action={(val)=>action(val||2)}/>
                <FilterItem text="筛选" noborder={true} active={activeIndex==3 ? true :false} action={(val)=>action(val||3)}/>
            </View>
        );
    }
}
class FilterItem extends Component{
    constructor(props){
        super(props);
        this.expanded=this.props.active;  
    }
    _onPress(){
        let toValue=0.5;
        if(this.expanded){
            toValue=1
        }
       Animated.spring(this.anim, {
              toValue: toValue,   // Returns to the start
              velocity: 5,  // Velocity makes it move
            }).start(); 
       this.expanded=!this.expanded;
       if (this.expanded) {
           this.props.action();
       } else {
           this.props.action(-1);
       }
    }
    componentWillMount(){

    }
    componentDidMount(){

    }
    componentWillReceiveProps(nextProps){
        if(!nextProps.active&&this.expanded){
             Animated.spring(this.anim, {
              toValue: 1,   // Returns to the start
              velocity: 5,  // Velocity makes it move
            }).start();
            this.expanded=!this.expanded;
        }
    }
    render(){
        this.anim=this.anim||new Animated.Value(0);
        let textColor=this.props.active ? {color:'rgb(251,97,101)'} : {};

        return (
           <View style={[styles.filterItem,styles.filterItem,this.props.noborder ? styles.noborder : {}]}>
                <Text style={[styles.filterText,textColor]} onPress={()=>this._onPress()}>{this.props.text}</Text>
                <Animated.View style={{
                    transform:[
                        {
                            rotate:this.anim.interpolate({
                                inputRange:[0,0.5,1],
                                outputRange:['0deg','180deg','0deg']
                            })
                        }
                    ],
                    height:20,
                    width:20,
                    alignItems:'center',
                    justifyContent:'center',
                  
                }}>
                <Text style={[{marginTop:-10},textColor]}><Icon name='sort-desc' size={20} /></Text>
                </Animated.View>
           </View> 
        );
    }
}
export default class KoubeiStores extends Component{
    renderFilterSection(activeIndex){
        console.log(activeIndex);
        switch(activeIndex){
            case 0 : { return <SelectComp activeIndex={{left:1,right:0}} filterIndex={0} key="select-1" />;}//用相同组件加key后才会渲染不同的组件出来
            case 1 : { return <SelectComp activeIndex={{left:0,right:0}} filterIndex={1}  key="select-2" />;}
            default : return null;
        }
    }
    render() {
        let {filter,actions}=this.props,
            {FilterType}=actions;
            
        return (
            <View style={{ flex: 1,  paddingTop:60,}}>
                <FilterBar activeIndex={filter.activeType} action={FilterType}/>
                <View style={styles.content}>
                   {this.renderFilterSection(filter.activeType)}
                </View>
            </View>
        );

    }
}

class SelectComp extends Component{
    constructor(props){
        super(props);
        this.leftListDataSource=new ListView.DataSource({
            rowHasChanged:(r1,r2) => r1 !== r2
        });
        this.rightListDataSource=new ListView.DataSource({
            rowHasChanged:(r1,r2) => r1 !== r2
        });
        this.renderLeftRow=this.renderLeftRow.bind(this);
        this.renderRightRow=this.renderRightRow.bind(this);
    }
    componentWillMount(){
        let _filterIndex=this.props.filterIndex;
        let {left}=this.props.activeIndex;
        let _data=FILTER_DATAS[_filterIndex].map((item)=> item.des);

        this.leftListDataSource=this.leftListDataSource.cloneWithRows(_data);
        this.rightListDataSource=this.rightListDataSource.cloneWithRows(FILTER_DATAS[_filterIndex][left].items);
    }
    renderLeftRow(rowData,sectionID,rowID){
        let bgStyle={};
     
        if(rowID==this.props.activeIndex.left){
            bgStyle={
                backgroundColor:'#FFFFFF'
            }
        }
        return (
            <View style={[styles.leftRow,bgStyle]}>
                <Text style={{color:'#000000'}}>
                    {rowData}
                </Text>
            </View>
        );
    }
    renderRightRow(rowData,sectioinID,rowID){
        let textColor='#000000',
            borderColor={};
        if(rowID==this.props.activeIndex.right){
            textColor='rgb(251,97,101)';
            borderColor={
                borderBottomColor:'rgb(251,97,101)'
            };
        }
        return (
            <View style={[styles.rightRow,borderColor]}>
                <Text style={{color:textColor}}>{rowData}</Text>
            </View>
        );
    }
    render(){
        let {left,right}=this.props.activeIndex;

        return (
            <View style={{flex:1,backgroundColor:'rgba(0,0,0,0.3)',}}>
                <Animated.View style={[styles.selectContent,{height:this.props.height||350}]}>
                    <View style={styles.leftContent}>
                        <ListView dataSource={this.leftListDataSource} renderRow={this.renderLeftRow}/>
                    </View>
                    <View style={styles.rightContent}>
                        <ListView dataSource={this.rightListDataSource} enableEmptySections={true} renderRow={this.renderRightRow} />
                    </View>
                </Animated.View>
            </View>
        );
    }
}
const styles=StyleSheet.create({
    container:{
        flexDirection: 'row',
        alignItems:'center',
        paddingTop:5,
        paddingBottom:5,
        borderBottomWidth:0.5,
        borderColor:'rgba(0,0,0,0.1)'
    },
    filterItem:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 25,
        borderRightWidth:0.5,
        flex:1,
        borderRightColor:'rgba(0,0,0,0.5)'
    },
    filterText:{
        fontSize:15,
        
    },
    noborder:{
        borderRightWidth:0,
        borderRightColor:'#FFFFFF'
    },
    content:{
        flex:1,
    },
    selectContent:{
        flexDirection:'row',
    },
    leftContent:{
        flex:1,
       backgroundColor:'rgba(240,240,240,0.5)'
    },
    rightContent:{
        flex:1,
        backgroundColor:'#FFFFFF',
        paddingLeft:15
    },
    leftRow:{
        height:40,
        paddingLeft:10,
        justifyContent:'center'
    },
    rightRow:{
        height:40,
        borderBottomWidth:0.5,
        borderBottomColor:'rgb(229,229,229)',
        justifyContent:'center'
    }
});