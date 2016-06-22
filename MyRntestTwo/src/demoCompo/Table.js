import React,{Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions
} from 'react-native';
import DatePicker from 'react-native-datepicker';

const {width}=Dimensions.get('window');
//充值项数据
const ChargeItems=[{
    type:1,
    des:'10元'
},{
    type:2,
    des:'20元'
},{
    type:3,
    des:'30元'
},{
    type:4,
    des:'50元'
},{
    type:5,
    des:'100元'  
}];
export default class ChargeTable extends Component{
    _onPress(item){
        alert(item.des);
    }
    render(){
        let itemSpace;
        let content = ChargeItems.map((item,index)=>{
            if((index+1)%3===0){
                itemSpace={
                   marginRight:0
                }
            }else{
                itemSpace = {
                    marginRight: marginR
                };
            }
            return (
                <TouchableOpacity key={'chargeType-'+index} onPress={this._onPress.bind(this,item)}>
                     <View style={[styles.chargeItem,itemSpace]} >
                        <Text>
                            {item.des}
                        </Text>
                     </View>
                </TouchableOpacity>
            );
        });

        return (
                <View style={styles.tableContainer}>
                    {content}
                </View>);
    }
}
const paddingHor=50;//左右边距
const ItemWidth=150;//按钮宽度
const marginR=(width-3*ItemWidth-paddingHor*2)/2;
const styles=StyleSheet.create({
    tableContainer:{
        flexDirection:'row',
        flexWrap:'wrap',
        paddingLeft:paddingHor,
        paddingRight:paddingHor
    },
    chargeItem:{
        width: ItemWidth,
        height:50,
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
        borderColor:'red',
        borderWidth:1,
        marginTop:15,
       
    },
    itemText:{
        fontSize:20
    }
});