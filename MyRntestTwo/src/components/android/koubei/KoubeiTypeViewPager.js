'use strict';
import React,{ Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ViewPagerAndroid
} from 'react-native';
import KoubeiStores from './KoubeiStores';
// 字体
const Icon = require('react-native-vector-icons/FontAwesome');
//color
const orangeColor="#FFB44F";
const greenColor='rgb(54,188,153)';
const blueColor='rgb(16,166,226)';
const redColor='#FC6165'
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
export default class KoubeiTypeViewPager extends Component{
    constructor(props){
        super(props);
        this.state={
           position:0
        }
    }
	renderPage(){
		const {navigator}=this.props;
		const pages=koubeiTypes.map((item,pageIndex)=>{
			let pager=item.list.map((row,rowIndex)=>{
				let typeList=row.map((col,colIndex)=>{
					let icon = <Icon name={col.icon.name} size={col.icon.size} color={col.icon.color} />;
					return (<View key={'typecol-'+colIndex} style={styles.typeItem}>
								<TouchableOpacity style={{flex:1,alignItems:'center',justifyContent:'center'}} onPress={()=>{
									navigator.push({
										name:'KoubeiStores',
										component:KoubeiStores
									});
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
    renderNavButtons(){
        let num=koubeiTypes.length;
        let btns=[];
        
        for(let i=0;i<num;i++){
            let selectedStyle=this.state.position===i ? {opacity:1} :{};
            let btn=(<TouchableOpacity key={"nav-btn-"+i} onPress={this._onPress.bind(this,i)}>
                        	<View style={[styles.viewpagerBtn,selectedStyle]}></View>
                     </TouchableOpacity>);
            btns.push(btn);
        }
        return btns;
    }
    _onPress(position){
        this.setState({
            position:position
        });
        this.refs.viewpager.setPage(position);
    }
    render(){
        return (
                    <View key="pagerView" style={styles.PageView}>
							<ViewPagerAndroid initialPage={0} style={{flex: 1}} ref="viewpager" onPageSelected={(event)=>{
                                this.setState({
                                    position:event.nativeEvent.position 
                                });
                            }}>
								{this.renderPage()}
							</ViewPagerAndroid>
							<View key="nav-buttons" style={styles.viewpagerNav}>
								{this.renderNavButtons()}
							</View>
					</View>);
        
    }
}

const styles=StyleSheet.create({
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
            opacity:0.5,
    		borderRadius:10,
            marginLeft:5,
    		backgroundColor:'#333333'
    	}
    });

