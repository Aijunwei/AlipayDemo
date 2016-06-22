'use strict';

import React,{Component} from 'react';
import {
	Image,
	View
} from 'react-native';

export default class Banner extends Component{
	render(){
		const {styles}=this.props;
		return (
			<View key="banner" style={styles.banner}>
				<Image source={require('../../../images/banner.png')} style={styles.bannerImage} resizeMode="cover"/>
			</View>
		);
	}
}