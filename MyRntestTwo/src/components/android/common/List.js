'use strict';

import React,{Component} from 'react';
import {
	Image,
	Text,
	TouchableOpacity,
	TouchableHighlight,
	View
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

class List extends Component{
	render(){
		const {styles} = this.props;
		const {
			data,
			onPress
		} = this.props;

		const itemList = data.map((item,index)=>{
			let icon;
			if(item.image){
				icon = <Image source={item.image.source} style={styles.listItemImage}/>;
			}else if(item.icon){
				const iconSize = item.icon.size || 20;
				const iconColor =item.icon.color || '#56abe4';
				icon =<Icon name={item.icon.name} size={iconSize} color={iconColor} style={styles.listItemIcon}/>
			}

			let itemStyle = styles.listItem;
			if(index === 0){
				itemStyle = styles.listItemWithoutBorder;
			}

			return (
				<View key={'listItem-' + index}>
					<TouchableOpacity style={itemStyle}
									  onPress={()=>{ onPress(item)}}>
						<View key="list-item-image" style={styles.listItemImageWrap}>
							{icon}
						</View>
						<View key="list-tem-content" style={styles.listItemContent}>
							<View key="list-item-title" style={styles.listItemContentTitle}>
								<View key="list-item-title-text" style={{flex: 1}}>
									<Text style={{fontSize: 19}}>{item.title}</Text>
								</View>
								<View key="list-item-title-time">
									<Text style={{color: '#999', fontSize: 14}}>14:53</Text>
								</View>
							</View>
							<View key="list-item-desc" style={styles.listItemContentDesc}>
								<Text style={{color: '#999', fontSize: 14}}>{item.content}</Text>
							</View>
						</View>
					</TouchableOpacity>
				</View>
			);
		});
		
		return (
			<View key="listContainer" style={styles.listContainer}>
				{itemList}
			</View>
		);
	}
}

export default List;