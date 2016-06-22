'use strict';

import React,{ Component } from 'react';
import {
	Image,
	Navigator,
	ScrollView,
	StyleSheet,
	Text,
	View
} from 'react-native';

import NavBar from './../common/NavBar';

import CommonStyles from '../../../styles/common';
import TopBarStyles from '../../../styles/topBar';
import MineHeader from './MineHeader';
import MineBody from './MineBody';

import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const personIcon = (<MaterialIcons name="person-outline" size={24} color="#FFFFFF"></MaterialIcons>);
const searchIcon =(<MaterialIcons name="search" size={24} color="#FFFFFF"></MaterialIcons>);
const addIcon = (<MaterialIcons name="add" size={24} color="#FFFFFF"></MaterialIcons>);

class MineView extends Component{
	render(){
		return (
			<View style={[styles.container,{marginTop:44}]}>
				<ScrollView>
					<MineHeader />
					<MineBody />
				</ScrollView>
			</View>
		);
	}
}

const NavigationBarRouteMapper={
	LeftButton(route, navigator, index, navState){
		if(route.name === 'mine-index'){
			return null;
		}
		return (
			<NavBar.BackButton styles={styles} 
							   text={route.backButtonText}
							   onPress={() => navigator.pop()}
							   style={{margin: 10}}/>
		);
	},
	RightButton(route,navigator,index,navState){
		if(route.RightButton){
			return (
				<NavBar.RightButton styles={styles}>
					{route.RightButton}
				</NavBar.RightButton>
			);
		}
		if(route.name==='mine-index'){
			return (
				<NavBar.RightButton styles={styles}>
					<Text key="topBarIcon" style={styles.topBarIcon}>{personIcon}&nbsp;&nbsp;{searchIcon}&nbsp;&nbsp;{addIcon}</Text>
				</NavBar.RightButton>
			);
		}

		return null;
	},
	Title(route,navigator,index,navState){
		return (
			<NavBar.Title style={styles} title={route.title}/>
		);
	}
}

export default class Main extends Component{
	constructor(props) {
	  super(props);
	  this.renderScene=this.renderScene.bind(this);
	}
	renderScene(route,navigator){
		if(route.component){
			return React.createElement(route.component,{ ...this.props, ...route.passProps, navigator, route});
		}
	}
	render(){
		return (
			<Navigator initialRoute={{name:'mine-index',component:MineView}}
					   configureScene={()=> Navigator.SceneConfigs.FloatFromRight}
					   navigationBar={<Navigator.NavigationBar style={{backgroundColor: '#3F454F', alignItems: 'center'}} routeMapper={NavigationBarRouteMapper} />}
					   renderScene={this.renderScene}
					   >
					   </Navigator>
		);
	}
}
const styles=StyleSheet.create(Object.assign({}, CommonStyles,TopBarStyles));