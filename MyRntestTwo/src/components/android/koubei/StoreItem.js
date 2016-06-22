'use strict';

import React,{ Component } from 'react';
import {
    View,
    Image,
    ListView,
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class AdviceItem extends Component{
    constructor(props){
        super(props);
    }
    renderStar(){
        let star=this.props.data.star;
        let stars=[];
        let i=1;
        for(;i<=star;i++){
            stars.push(<Icon key={'star-'+i} name="star" size={20} color="#FFB44F"/>);
        }
        if((star-parseInt(star))>=0.5){
            stars.push(<Icon key={'star-'+i} name="star-half-o" size={20} color="#FFB44F"/>);
        }
        return stars;
    }
    render(){
       
        
        return (
            <TouchableOpacity style={styles.adviceItem}>
                <Image source={this.props.data.src} style={styles.adviceImage}/>
                <View style={styles.adviceItemInfo}>
                    <Text style={{fontSize:22,color:'#000000'}}>{this.props.data.name}</Text>
                    <Text style={[styles.itemInfoText,{color:'#FFB44F'}]}>{this.renderStar()}&nbsp;&nbsp;{this.props.data.star}</Text>
                    <Text style={styles.itemInfoText}>{this.props.data.type}&nbsp;&nbsp;{this.props.data.address}&nbsp;&nbsp;{this.props.data.distance}</Text>
                    <Text style={styles.itemInfoText}><Icon name="thumbs-o-up" size={30} color="#FFB44F"/>&nbsp;&nbsp;{this.props.data.desc}</Text>
                </View>
                <View style={styles.discount}>
                    <Text style={styles.discountText}>{this.props.data.discount}<Text style={{fontSize: 20}}>折</Text></Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles=StyleSheet.create({
   adviceItem:{
       flexDirection: 'row',
       padding: 20,
       borderColor: '#E6E6E6',
       borderTopWidth: 1
   },
   adviceImage:{
       width:120,
       height:100,
       borderRadius: 10
   },
   adviceItemInfo:{
       marginLeft:15,
       flex:1
   },
   discount:{
     justifyContent:'center'  
   },
   discountText:{
     color:'rgb(251,97,101)',
     fontSize:45  
   },
   headerText:{
       fontSize:20,
       color:'#000000'
   },
   itemInfoText:{
       fontSize:18,
       marginTop:10
   }
});

