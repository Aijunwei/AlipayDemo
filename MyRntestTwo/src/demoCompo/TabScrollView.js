'use strict';
import React,{Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView
} from 'react-native';

import ScrollableTabView,{DefaultTabBar,ScrollableTabBar} from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/Ionicons';

const SimpleTabView =()=>(<ScrollableTabView style={{marginTop: 20}} renderTabBar={()=><DefaultTabBar/>}>
        <Text tabLabel="Tab #1">Tab1</Text>
        <Text tabLabel="Tab #2">Tab2</Text>
        <Text tabLabel="Tab #3">Tab3</Text>
</ScrollableTabView>);

const ScrollTabBar =()=> (<View style={styles.container}>
    <ScrollableTabView initialPage={0} renderTabBar={()=> <ScrollableTabBar />}>
        <Text tabLabel='Tab #1'>My</Text>
        <Text tabLabel='Tab #2 word word'>favorite</Text>
        <Text tabLabel='Tab #3 word word word'>project</Text>
        <Text tabLabel='Tab #4 word word word word'>favorite</Text>
        <Text tabLabel='Tab #5'>project</Text>
       <Text tabLabel='Tab #6 word word word'>project</Text>
        <Text tabLabel='Tab #7 word word word word'>favorite</Text>
        <Text tabLabel='Tab #8'>project</Text>
    </ScrollableTabView>
</View>
);


const Test=()=><View><Text>Test</Text></View>;

const OverlayTabView =() => (
    <ScrollableTabView style={styles.container}
                       renderTabBar={() => <DefaultTabBar backgroundColor='rgba(255,255,255,0.7)'/>}
                       tabBarPosition='overlayBottom'>
      <ScrollView tabLabel='iOS'>
        <Icon name='logo-apple' color='#DBDDDE' size={300} style={styles.icon} />
        <Icon name='ios-alarm' color='#DBDDDE' size={300} style={styles.icon} />
        <Icon name='ios-appstore-outline' color='#DBDDDE' size={300} style={styles.icon} />
        <Icon name='ios-baseball' color='#DBDDDE' size={300} style={styles.icon} />
        <Icon name='ios-beer' color='#DBDDDE' size={300} style={styles.icon} />
      </ScrollView>
      <ScrollView tabLabel='Android'>
        <Icon name='logo-android' color='#A4C639' size={300} style={styles.icon} />
        <Icon name='logo-chrome' color='#A4C639' size={300} style={styles.icon} />
        <Icon name='logo-html5' color='#A4C639' size={300} style={styles.icon} />
      </ScrollView>
        
    </ScrollableTabView>
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },
    icon: {
    width: 300,
    height: 300,
    alignSelf: 'center',
  },
});

export {
    SimpleTabView,
    ScrollTabBar,
    Test,
    OverlayTabView
};