'use strict';
import React,{Component} from 'react';
import {
	Image,
	Text,
	TouchableOpacity,
	View
} from 'react-native';

// 字体
const Icon = require('react-native-vector-icons/FontAwesome');
const MaterialIcons = require('react-native-vector-icons/MaterialIcons');
const angleLeftIcon = (<Icon name="angle-left" size={20} color="#FFFFFF"></Icon>);
const fileTextIcon = (<Icon name="file-text-o" size={20} color="#FFFFFF"></Icon>);
const personIcon = (<MaterialIcons name="person-outline" size={24} color="#FFFFFF"></MaterialIcons>);
const searchIcon = (<MaterialIcons name="search" size={24} color="#FFFFFF"></MaterialIcons>);
const addIcon = (<MaterialIcons name="add" size={24} color="#FFFFFF"></MaterialIcons>);

class BackButton extends Component{
	constructor(props) {
	  super(props);
	}
	render(){
		const {styles, text, onPress, style} = this.props;
		const buttonText = text || '返回';
		return (
			<TouchableOpacity onPress={onPress} style={style}>
				<Text key="topBarBack" style={styles.topBarBack}>
					{angleLeftIcon}&nbsp;&nbsp;{buttonText}
				</Text>
			</TouchableOpacity>
		);
	}
}

class RightButton extends Component{
	render(){
		const {styles, children} = this.props;
		return (
			<View key="topBarOPtions" style={styles.topBarOptions}>
				<View>
					{children}
				</View>
			</View>
		);
	}
}

class Title extends Component {
	render(){
		const {styles, title}=this.props;
		if(typeof title === 'undefined'){
			return null;
		}
		 return (
		 	<TouchableOpacity style={{flex: 1, justifyContent:'center'}}>
		 		<Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>{title}</Text>
		 	</TouchableOpacity>
		 );
	}
}

export default {
	BackButton,
	RightButton,
	Title
};