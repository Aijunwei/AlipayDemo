'use strict';

import React,{ Component } from 'react';
import {
	Image,
	Text,
	TouchableOpacity,
	View
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

class AppList extends Component{

	render(){
		const {
			styles,
			data,
			topBorder,
			onMorePress,
			onAppPress
			} = this.props;
		const appRowList = data.map((row, rowIndex) => {
			let appColList = row.map((col,colIndex)=>{
				if(col.isMore){
					return(
					<View key={'appCol-'+colIndex} style={[styles.appCol,{justifyContent:'center'}]}>
						<TouchableOpacity 
							underlayColor="#B5B5B5"
							onPress={onMorePress}>
							<Text style={styles.appItemTextMore}>...</Text>
						</TouchableOpacity>
					</View>);
				}

				if(!col.title){
					return (
						<View key={'appCol-'+colIndex} style={styles.appCol}></View>
					);
				}
				let icon;
				if(col.image){
					icon = <Image source={col.image.source} style={styles.appItemImageIcon}/>;
				}else if(col.icon){	
					const iconSize = col.icon.size || 20;
					const iconColor = col.icon.color || '#56abe4';
					icon =<Icon name={col.icon.name} size={iconSize} color={iconColor} style={styles.appItemIcon}/>;
				}

				return (
					<View key={'appCol-'+colIndex} style={styles.appCol}>
						<TouchableOpacity style={{flex: 1, alignItems: 'center'}}
										  onPress={()=> {onAppPress(col); }}>
							{icon}
							<Text style={styles.appItemText}>{col.title}</Text>
						</TouchableOpacity>
					</View>
				);
			});
			
			let rowStyle = styles.appRow;
			if(topBorder && rowIndex===0){
				rowStyle = styles.appRowTopBorder;
			}
			return (
				<View key={'appRow-'+rowIndex} style={rowStyle}>
					{appColList}
				</View>
			);
		});
		
		return (
    		 <View key="appListContent">
         		 {appRowList}
      	 	 </View>
		);
	}
}

export default AppList;