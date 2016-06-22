'use strict';

import React,{Component} from 'react';
import {
	Image,
	Navigator,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from 'react-native';

import NavBar from './../common/NavBar';
import List from './../common/List';

// 样式
import CommonStyles from '../../../styles/common';
import TopBarStyles from '../../../styles/topBar';
import ListStyles from '../../../styles/list';

//字体
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const personIcon =(<MaterialIcons name="person-outline" size={24} color="#FFFFFF"></MaterialIcons>);
const searchIcon =(<MaterialIcons name="search" size={24} color="#FFFFFF"></MaterialIcons>);
const addIcon =(<MaterialIcons name="add" size={24} color="#FFFFFF"></MaterialIcons>);

const friendListData = [
  {
    title: '服务窗',
    type: 'fuwu',
    content: '服务窗推荐：国网浙江省电力公司',
    image: {
      source: require('../../../images/iconfont-fuwuchuang.png'),
    }
  },
  {
    title: '招商银行信用卡',
    content: '交易提醒',
    type: 'fuwuchuang',
    icon: {
      name: 'credit-card-alt',
      size: 30,
      color: '#FFB44F',
    }
  },
  {
    title: '消息中心',
    type: 'message',
    content: '会员积分通知',
    icon: {
      name: 'whatsapp',
      size: 35,
      color: '#00bb9c',
    }
  },
  {
    title: '阿里旅行去啊',
    type: 'fuwu',
    content: '恭喜你获得全年机票免费名额',
    image: {
      source: require('../../../images/iconfont-jipiao.png'),
    }
  },
  {
    title: '体验技术部',
    type: 'qun',
    content: '玉伯：做地球上专业、有爱的团队',
    icon: {
      name: 'wechat',
      size: 35,
      color: '#00bb9c',
    }
  },
  {
    title: '路人甲',
    type: 'ren',
    content: '[转账]转账13.70元',
    icon: {
      name: 'user',
      size: 35,
      color: '#cccccc',
    }
  },
  {
    title: '路人乙',
    type: 'ren',
    content: '你已经添加了路人乙，现在可以聊天了',
    icon: {
      name: 'github',
      size: 35,
      color: '#00A9F1',
    }
  },
  {
    title: '路人丙',
    type: 'ren',
    content: '你已经添加了路人丙，现在可以聊天了',
    icon: {
      name: 'user',
      size:35,
      color: '#cccccc',
    }
  }
];

class FriendView extends Component{
	handleItemClick(appInfo){

	}
	handleLifeCircleClick(){

	}
	navigatorPush(name, title, component, options={}){
		this.props.navigator.push(Object.assign({
			title: title,
			name: name,
			component: component
		},options));
	}
	render(){
 return (
        <View style={[styles.container,{marginTop:54}]}>
          <ScrollView 
                      automaticallyAdjustContentInsets={true}>
            <View key="content" style={styles.content}>
              <View>
                <TouchableOpacity onPress={this.handleLifeCircleClick}>
                  <View style={lifeCircleStyle}>
                    <View key="list-item-image" style={styles.listItemImageWrap}>
                      <Icon name="chrome" size={30} color="#FF6600" style={{width: 40, height: 40, paddingTop: 3}}/>
                    </View>
                    <View key="list-item-content" style={styles.listItemContent}>
                      <View key="list-item-content-title" style={{flexDirection: 'row', paddingTop: 5}}>
                        <View key="list-item-title-text" style={{flex: 1}}>
                          <Text style={{paddingTop: 3,fontSize:19}}>生活圈</Text>
                        </View>
                        <View>
                          <Text><Icon name="angle-right" size={30} color="#cccccc"></Icon></Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
                <List styles={styles}
                      data={friendListData}
                      onPress={this.handleItemClick} />
              </View>
            </View>
          </ScrollView>
        </View>
    );
	}
}

const NavigationBarRouteMapper={
	LeftButton(route,navigator,index,navState){
		if(route.name === 'friend-index'){
			return null;
		}

		return (
			<NavBar.BackButton styles={styles}
							   text={route.backButtonText}
							   onPress={()=> navigator.pop()}
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

		if(route.name === 'friend-index'){
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
			<NavBar.Title styles={styles} title={route.title}/>
		);
	}
};

export default class Main extends Component{
	constructor(props) {
	  super(props);
	  this.renderScene=this.renderScene.bind(this);
	}
	renderScene(route,navigator){
		if(route.component){
			 return React.createElement(route.component, { ...this.props, ...route.passProps, navigator, route } );
		}
	}
	render(){
		return (
			<Navigator initialRoute={{name:'friend-index',component: FriendView}}
					   configureScene={()=>Navigator.SceneConfigs.FloatFromRight}
					   navigationBar={ <Navigator.NavigationBar style={{backgroundColor: '#3F454F', alignItems: 'center'}} routeMapper={NavigationBarRouteMapper}/>}
					   renderScene={this.renderScene}
			></Navigator>
		);
	}
}
const lifeCircleStyle = {
  flexDirection: 'row',
  paddingTop: 12,
  paddingBottom: 12,
  paddingLeft: 10,
  marginBottom: 10,
  paddingRight: 10,
  borderBottomWidth: 1,
  borderColor: '#E6E6E6',
  backgroundColor: '#fff'
};
const styles = StyleSheet.create(Object.assign(
    {},
    CommonStyles,
    TopBarStyles,
    ListStyles
));
