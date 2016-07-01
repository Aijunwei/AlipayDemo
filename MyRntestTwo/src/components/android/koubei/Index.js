'use strict';

import React,{Component} from 'react';
import {
	Image,
	Navigator,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
	TouchableHighlight,
	Modal,
	Picker,
	Dimensions,
	ViewPagerAndroid
} from 'react-native';
import ListPopover from 'react-native-list-popover';
import NavBar from './../common/NavBar';
import KoubeiTypeViewPager from './KoubeiTypeViewPager';
import HotAdvice from './HotAdvice';
import Popover from '../common/Popover';
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter';
import CityView from './CityView';

// 样式
import CommonStyles from '../../../styles/common';
import TopBarStyles from '../../../styles/topBar';
const screenWidth=Dimensions.get('window').width;
const screenHeight=Dimensions.get('window').height;
// 字体
const Icon = require('react-native-vector-icons/FontAwesome');
const MaterialIcons = require('react-native-vector-icons/MaterialIcons');
const IonIcon = require('react-native-vector-icons/Ionicons');

const personIcon = (<MaterialIcons name="person-outline" size={24} color="#FFFFFF"></MaterialIcons>);
const searchIcon = (<MaterialIcons name="search" size={24} color="#FFFFFF"></MaterialIcons>);
const addIcon = (<MaterialIcons name="add" size={24} color="#FFFFFF"></MaterialIcons>);
const locationIcon = (<MaterialIcons name="room" size={20} color="#FFFFFF"></MaterialIcons>);
const MoreIcon =(<IonIcon name="ios-more" size={40} color="#FFFFFF"/>);
const orangeColor="#FFB44F";
const greenColor='rgb(54,188,153)';
const blueColor='rgb(16,166,226)';
const redColor='#FC6165';
const addir=[require('../../../images/ad-1.png'),require('../../../images/ad-2.png'),require('../../../images/ad-3.png'),require('../../../images/ad-4.png'),require('../../../images/ad-5.png')]
const koubeiTypes=[
	{
		list:[
			[
				{
					title:'美食',
					icon:{
						name: 'cutlery',
						size: 40,
						color: redColor
					}
				},
				{
					title:'火锅',
					icon:{
						name: 'cutlery',
						size: 40,
						color: orangeColor
					}
				},{
					title:'快餐',
					icon:{
						name: 'coffee',
						size: 40,
						color: greenColor
					}
				},				{
					title:'面包甜点',
					icon:{
						name: 'gift',
						size: 40,
						color: orangeColor
					}
				}
			],[
				{
					title:'外卖',
					icon:{
						name: 'shopping-bag',
						size: 40,
						color: orangeColor
					}
				},
				{
					title:'超市',
					icon:{
						name: 'shopping-cart',
						size: 40,
						color: blueColor
					}
				},{
					title:'丽人',
					icon:{
						name: 'female',
						size: 40,
						color: redColor
					}
				},				{
					title:'电影',
					icon:{
						name: 'film',
						size: 40,
						color: redColor
					}
				}
			]
		]
	},{
		list:[
			[
				{
					title:'生鲜水果',
					icon:{
						name: 'lemon-o',
						size: 40,
						color: greenColor
					}
				},
				{
					title:'小吃',
					icon:{
						name: 'cutlery',
						size: 40,
						color: orangeColor
					}
				},{
					title:'休闲食品',
					icon:{
						name: 'cutlery',
						size: 40,
						color: redColor
					}
				},				{
					title:'韩国料理',
					icon:{
						name: 'cutlery',
						size: 40,
						color: orangeColor
					}
				}
			],[
				{
					title:'休闲娱乐',
					icon:{
						name: 'map-pin',
						size: 40,
						color: redColor
					}
				},
				{
					title:'咖啡',
					icon:{
						name: 'coffee',
						size: 40,
						color: greenColor
					}
				},{
					title:'酒店预订',
					icon:{
						name: 'home',
						size: 40,
						color: blueColor
					}
				},				{
					title:'周末游',
					icon:{
						name: 'bus',
						size: 40,
						color: greenColor
					}
				}
			]
		]
	}
];
const Advertisment = (props)=> (<TouchableOpacity style={{padding:10,paddingBottom:0}}><Image source={props.src} style={{width: screenWidth-20,height:200}}/></TouchableOpacity>);
const LISTITEMS=[
	{
		text:'待评价',
		icon:{
			name:'pencil-square-o',
			size:30
		},
		tips:1
	},{
		text: '我的评价',
		icon:{
			name:'commenting-o',
			size:30
		}
	},
	{
		text: '帮助',
		icon:{
			name:'question-circle',
			size:30
		}
	}
];
class KoubeiView extends Component{
	constructor(props){
		super(props);
		this.state={
			modalVisible:true,
			lang:'java',
			item: "Select Item",
			isVisible: true
		};
	}
	showPopover(){
		this.setState({
			isVisible:true
		});
	}
	closePopover(){
		this.setState({
			isVisible:false
		});
	}
	setItem(){

	}
	componentDidMount(){
		this.openPopover = RCTDeviceEventEmitter.addListener('popover',()=>{
			this.showPopover();
		});
	}
	componentWillUnmount(){
		this.openPopover.remove();
	}
	componentWillUpdate(props,state){
		console.log('update');
	}
	renderPage(){
		const pages=koubeiTypes.map((item,pageIndex)=>{
			let pager=item.list.map((row,rowIndex)=>{
				let typeList=row.map((col,colIndex)=>{
					let icon = <Icon name={col.icon.name} size={col.icon.size} color={col.icon.color} />;
					return (<View key={'typecol-'+colIndex} style={styles.typeItem}>
								<TouchableOpacity style={{flex:1,alignItems:'center',justifyContent:'center'}} onPress={()=>{
								}}>
									{icon}
									<Text style={styles.typeTitle}>{col.title}</Text>
								</TouchableOpacity>
						   </View>);
				});

				return (
					<View key={'typeRow-'+rowIndex} style={styles.typeRow}>
						{typeList}
					</View>
				);

			});
			return (<View key={'page-'+pageIndex} style={{flex:1}}>
						{pager}
					</View>);
		});
		return pages;
	}
	renderAds(){
		
		let ads=[];
		for(let i=0;i<5;i++){
			ads.push(<Advertisment key={'ad-'+i} src={addir[i]}/>);
		}
		return (
			<View style={{marginTop:20,paddingBottom:10,backgroundColor:'#FFFFFF',alignItems:'center',borderColor:'#E6E6E6',borderTopWidth:1,borderBottomWidth:1}}>
				{ads}
			</View>
		);
	}
	_setModalVisible(visible) {
		this.setState({ modalVisible: !this.state.modalVisible });
	}
	render(){
		let {filter,actions}=this.props;
		console.log(this.props);
		return (
			<View style={[styles.container,{marginTop:15}]}>	
				<ScrollView contentContainerStyle={styles.scrollContainerTab}>
					<View key="content" style={styles.content}>
						<KoubeiTypeViewPager navigator={this.props.navigator}/>
						{this.renderAds()}
						<HotAdvice />
					</View>
				</ScrollView>
				<Popover list={LISTITEMS} isVisible={this.state.isVisible} onClose={ () => this.closePopover() }/>
			</View>
		);
	}
}
/*
Modal 画popover
					<Modal  onRequestClose={() => {this._setModalVisible(false)}}
						visible={this.state.modalVisible}
						style={{opacity:0}}>
						<View style={{position:'absolute',right:10,top:50,borderWidth:15,borderColor:'transparent',borderBottomColor:'#3F454F'}}></View>
					<View style={{
						position:'absolute',
						width:200,
						padding:10,
						right:10,
						top:80,
						backgroundColor:'#3F454F'
					}}>
						
						<Text style={{ borderBottomColor: '#FFFFFF', borderBottomWidth: 1 }} onPress={() => {
							this._setModalVisible(false);
						} }>item1</Text>
						<Text style={{ borderBottomColor: '#FFFFFF', borderBottomWidth: 1 }} onPress={() => {
							this._setModalVisible(false);
						} }>item1</Text>
						<Text style={{ borderBottomColor: '#FFFFFF', borderBottomWidth: 1 }} onPress={() => {
							this._setModalVisible(false);
						} }>item1</Text>
					</View>
				</Modal>
*/
class CityViewTabButton extends Component{
	constructor(props){
		super(props);
		this.state={
			activeIndex:0
		};
	}
	render(){
		let leftStyle={},rightStyle={},leftText={},rightText={};

		if(this.state.activeIndex===0){
			leftStyle={
				backgroundColor:'#FFFFFF'
			};
			rightText={
				color:'#FFFFFF'
			};
		}else{
			leftText={
				color:'#FFFFFF'
			};
			rightStyle={
				backgroundColor:'#FFFFFF'
			};
		}
		return (
			<View style={styles.cityTab}>
				<TouchableOpacity style={{ flex: 1 }} onPress={() => this.setState({ activeIndex: 0 }) }>
					<View style={[styles.tabText, styles.leftTabText, leftStyle]}>
						<Text  style={leftText} >境内</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity  style={{flex:1}} onPress={() => this.setState({ activeIndex: 1 }) }>
					<View style={[styles.tabText, styles.rightTabText, rightStyle]}>
						<Text  style={rightText}>境外</Text>
					</View>
				</TouchableOpacity>
			</View>
		);
	}
}
const NavigationBarRouteMapper ={
	LeftButton(route,navigator,index,navState){
	//	console.log(this.props.city);
		if(route.name==='koubei-index'){
			return (
				<TouchableOpacity style={{marginLeft:20,marginTop:15}} onPress={()=>{
					navigator.push({
						name:'cityView',
						component:CityView,
						title:CityViewTabButton
					});
				}}>
					<Text key="topBarCity" style={styles.topBarCity}>{this.props.city.city}<Icon name="angle-down" size={20} color="#FFFFFF"/></Text>
				</TouchableOpacity>
			);
		}

		return (
			<NavBar.BackButton styles={styles}
							   text={route.backButtonText}
							   onPress={()=>navigator.pop()}
							   style={{marginTop: 10}}/>
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

		if(route.name === 'koubei-index'){
			return (
				<NavBar.RightButton styles={styles}>
					<Text onPress={()=>{
						RCTDeviceEventEmitter.emit('popover');
					}}>{MoreIcon}</Text>
				</NavBar.RightButton>
			);
			/*return (
				<NavBar.RightButton styles={styles}>
					<Text key="topBarIcon" style={styles.topBarIcon}>{personIcon}&nbsp;&nbsp;{searchIcon}&nbsp;&nbsp;{addIcon}</Text>
				</NavBar.RightButton>
			);*/
		}
		return null;
	},
	Title(route, navigator, index, navState){
		if(route.title){
			return <route.title />;
		}
		return (
			<View style={{width:200,height:35,backgroundColor:'#FFFFFF',borderRadius:25,marginTop:8,flexDirection:'row',alignItems:'center',marginLeft:30}} >
				<MaterialIcons name="search" size={30} ></MaterialIcons>
				<TextInput placeholder="输入商家、品类" style={{flex:1,height:35,textAlignVertical:'center',marginTop:10}} underlineColorAndroid="transparent"/>
			</View>
		);
	}
};

class Main extends Component{
	constructor(props) {
	  super(props);
	  this.renderScene=this.renderScene.bind(this);
	  NavigationBarRouteMapper.LeftButton=NavigationBarRouteMapper.LeftButton.bind(this);
	}
	renderScene(route,navigator){
		if(route.component){
			return <route.component { ...this.props} { ...route.passProps} navigator={navigator} route={route} />;
			//return React.createElement(route.component,{ ...this.props, ...route.passProps, navigator, route });
		}
	}
	componentDidMount(){
		let navigationContext=this.refs.nav.navigationContext;
		let callback=(event)=>{
			console.log(event.data);
		};
		this._listeners=[
			navigationContext.addListener('willfocus',callback),
			navigationContext.addListener('didfocus',callback)
		];
	}
	componentWillUnmount(){
		this._listeners &&this._listeners.forEach(listener=> listener.remove());
	}
	render(){
		
		let {city}=this.props.city;
		return (
			<Navigator ref="nav" initialRoute={{name: 'koubei-index', component: KoubeiView,params:{selectCity:city}}}
						configureScene={()=>{ return Navigator.SceneConfigs.FloatFromRight }}
						navigationBar={
							<Navigator.NavigationBar ref="navigationBar" style={{backgroundColor: '#3F454F', justifyContent:'center',alignItems:'center'}} routeMapper={NavigationBarRouteMapper} />
						}
						renderScene={this.renderScene}>	
			</Navigator>
		);
	}
}

const styles = StyleSheet.create(Object.assign(
    {},
    CommonStyles,
    TopBarStyles,{
    	PageView:{
    		height: 300,
    		borderColor:'#E6E6E6',
    		borderBottomWidth:1,
    		backgroundColor:'#FFFFFF'
    	},
    	typeItem:{
    		flex:1,
    		height: 130,
    		alignItems:'center',

    	},
    	typeRow:{
    		flexDirection: 'row',
    		height:130
    	},
    	typeTitle:{
    		fontSize: 19,
    		marginTop:12
    	},
    	viewpagerNav:{
    		height:40,
    		flexDirection:'row',
    		justifyContent:'center',
    		alignItems:'center'
    	},
    	viewpagerBtn:{
    		width: 10,
    		height: 10,
    		borderRadius:10,
    		backgroundColor:'#333333'
    	},topBarCity:{
			fontSize:19,
			color:'#FFFFFF'
		}, button: {
			borderRadius: 4,
			padding: 10,
			marginLeft: 10,
			marginRight: 10,
			backgroundColor: "#B8C",
		},
		cityTab:{
			width:220,
			height:35,
			flexDirection:'row',
			borderRadius:5,
			borderWidth:1,
			borderColor:'white',
			alignSelf:'center',
			alignItems:'center',
			marginTop:10
		},
		tabText:{
			flex:1,
			height:35,
			justifyContent:'center',
			alignItems:'center'
		},
		leftTabText:{
			borderTopLeftRadius:5,
			borderBottomLeftRadius:5
		},
		rightTabText:{
			borderTopRightRadius:5,
			borderBottomRightRadius:5
		}
    }
));

export default Main;