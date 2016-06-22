'use strict';
import React,{Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    ListView,
    TextInput,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter';
import SearchCityView from './SearchCityView';
const MaterialIcons = require('react-native-vector-icons/MaterialIcons');
const searchIcon = (<MaterialIcons name="search" size={24} color="gray"></MaterialIcons>);
 class City extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <TouchableOpacity style={{marginRight:30,marginBottom:15,}} onPress={()=>{
                this.props.action(this.props.data.name);
            }}>
                <View style={styles.cityView}>
                    <Text style={styles.cityText}>
                        {this.props.data.name}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
}

class CityCard extends Component{
    constructor(props){
        super(props);
        let ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.state={
            dataSource: ds.cloneWithRows(this.props.cities)
        }
    }
    getWidth(){
        return this._width||0;
    }
    render(){
        return (
           <View ref={this.props.refname} onLayout={(e)=>{console.log(e.nativeEvent);this._width=138;this.height=768}}>
                <Text  style={styles.cardTitle}>{this.props.title}</Text>
         
                <ListView dataSource={this.state.dataSource} renderRow={
                    (rowData) => <City data={rowData} action={this.props.action}/>
                } style={styles.listViewStyle} contentContainerStyle={styles.rowList}/>
       
           </View>
        );
    }
}

const CurrentCity={
    name:'深圳'
};
const HistoryCities=[{
    name:'深圳'
},{
    name:'厦门'
}];
const HotCities=[{
    name:'上海'
},{
    name:'杭州'
},{
    name:'广州'
},{
    name:'北京'
},{
    name:'深圳'
}];

export default class CityView extends Component{
    constructor(props){
        super(props);
        let ds= new ListView.DataSource({
            rowHasChanged:(r1,r2)=> r1!==r2,
            sectionHeaderHasChanged:(s1,s2)=> s1!==s2,
            getSectionHeaderData:(dataBlob,sectionID)=>{
                return dataBlob[sectionID]
            },
            getRowData:(dataBlob,sectionID,rowID)=> dataBlob[sectionID+':'+rowID]
        });
        this.state={
            dataSource:this.genDataBlob(ds),
            stickyText:'当前所在城市'
        }
        console.log(this.props.actions);
    }
    genSectionIDs(){
        let sectionIDs=[];
        for(let i=0;i<26;i++){
            sectionIDs.push('sectionID'+i);
        }
        return sectionIDs;
    }
    genRowIDs(){
        let rowIDs=[];
        for(let i=0;i<26;i++){
            let rowID=[];
            for (var j = 0; j < 10; j++) {
               rowID.push('rowID'+j);
            }
            rowIDs.push(rowID);
        }
        return rowIDs;
    }
    genDataBlob(ds){
        let sectionIDs=this.genSectionIDs(),
            rowIDs=this.genRowIDs();
        let dataBlob=[];
        for(let i=0;i<sectionIDs.length;i++){
            dataBlob[sectionIDs[i]]=String.fromCharCode(65+i);
        }
        for(let i=0;i<rowIDs.length;i++){
            let ids=rowIDs[i];
            for(let j=0;j<ids.length;j++){
                dataBlob[sectionIDs[i]+':'+ids[j]]=dataBlob[sectionIDs[i]]+' city'+j;
            }
        }
        return ds.cloneWithRowsAndSections(dataBlob,sectionIDs,rowIDs);
    }
    selectCity(city){
        const {actions, navigator} = this.props;
        actions.selectCity(city);
        navigator.pop();
    }
    componentDidMount(){
       // console.log(RCTDeviceEventEmitter);
        this.scrollOption=RCTDeviceEventEmitter.addListener('scrollCityView',(posY)=>{
           this.refs.cityView.scrollTo({
                y:posY
            });
        });
    }
    componentWillUnmount(){
        this.scrollOption.remove();
    }
    render(){
      const {actions,navigator}=this.props;
        return (
            <View style={{flex:1,backgroundColor:'rgb(245,245,249)'}}>
                <View style={styles.search} >
                    {searchIcon}
                    <TextInput placeholder="输入城市名字、拼音或首字母查询" style={styles.searchInput} underlineColorAndroid="transparent" onFocus={()=>{
                        navigator.push({
                            name:'search',
                            component:SearchCityView
                        })
                    }}/>
                </View>
                <View style={styles.divider}/>
                <ScrollView ref="cityView" style={{flex:1,}} onScroll={(e)=>{}}>
                    <View style={styles.cardContainer}>
                        <CityCard  ref="testscroll0" title="你所在的地区" cities={[CurrentCity]} action={this.selectCity.bind(this)}/>
                        <CityCard  refname="testscroll1" title="历史访问目的地" cities={HistoryCities}  action={this.selectCity.bind(this)}/>
                        <CityCard  refname="testscroll2" title="全部热门目的地" cities={HotCities}  action={this.selectCity.bind(this)}/>
                    </View>
                    <ListView  dataSource={this.state.dataSource} 
                        renderSectionHeader={(sectionData) => {
                            return (
                                <View style={styles.sectionHeader}>
                                    <Text style={{ marginLeft: 20, fontSize: 24 }}>{sectionData}</Text>
                                </View>);
                        } }
                        renderRow={(rowData) => {
                            return (
                                <TouchableOpacity onPress={()=>{
                                    this.selectCity(rowData);
                                }}>
                                    <View style={styles.cityRow}>
                                        <Text style={{ color: 'black', fontSize: 22 }}>{rowData}</Text>
                                    </View>
                                </TouchableOpacity>);
                                
                        } } 
                    style={{backgroundColor:'#FFFFFF'}}/>
                    
                </ScrollView>
                <RightNav />
            </View>
        );
    }
}
const RightNav = ()=>{
    const scrollNavItems=
    [{
        key:'当前',
        positionY:0
    },{
        key:'历史',
        positionY:150
    },{
        key:'热门',
        positionY:290
    },{
        key:'A',
        positionY:485
    },{
        key:'B',
        positionY:1226
    },{
        key:'C',
        positionY:1966
    },{
        key:'D',
        positionY:2706
    },{
        key:'E',
        positionY:3446
    },{
        key:'F',
        positionY:4186
    },{
        key:'G',
        positionY:4926
    },{
        key:'H',
        positionY:5666
    },{
        key:'I',
        positionY:6406
    },{
        key:'G',
        positionY:7146
    },{
        key:'K',
        positionY:7886
    },{
        key:'L',
        positionY:8626
    },{
        key:'M',
        positionY:8366
    },{
        key:'N',
        positionY:9106
    },{
        key:'O',
        positionY:9846
    },{
        key:'P',
        positionY:10586
    },{
        key:'Q',
        positionY:11326
    },{
        key:'R',
        positionY:3446
    },{
        key:'S'
    },{
        key:'T'
    },{
        key:'U'
    },{
        key:'V'
    },{
        key:'W'
    },{
        key:'X'
    },{
        key:'Y'
    },{
        key:'Z'
    }];
    for(let i=4;i<29;i++){
        scrollNavItems[i].positionY=scrollNavItems[i-1].positionY+740;
    }
    let navItems=scrollNavItems.map((item,index)=>{
        return (<Text key={index} 
                     style={{textAlign:'center',fontSize:20,color:'blue',marginTop:5}} 
                     onPress={
                         ()=>{
                             let posY=item.positionY|| 0;
                             RCTDeviceEventEmitter.emit('scrollCityView',posY);
                         }
                     }>
                    {item.key}
                </Text>);
    });
    return (
        <View style={styles.scrollNav}>
            {navItems}
        </View>
        );
}

const styles=StyleSheet.create({
    cardContainer:{
        borderBottomWidth:0.5,
        borderBottomColor:'rgb(228,228,230)'
    },
    cardTitle:{
        fontSize: 19,
        marginLeft:20,
        marginTop:20
    },
    cityView:{
        width: 156,
        height:56,

        borderRadius:5,
        backgroundColor:'#FFFFFF',
        justifyContent:'center',
        alignItems:'center'
    },
    cityText:{
        fontSize:20,
        color:'black'
    },  
    listViewStyle: {
        marginTop: 20,
        paddingLeft: 20,
        paddingRight: 20

    },
    rowList:{
        justifyContent:'flex-start',
        flexDirection:'row',
        flexWrap:'wrap'
    },
    search:{
        flexDirection:'row',
        marginLeft:15,
        marginRight:15,
        borderRadius:35,
        height:30,
        marginTop:70,
        backgroundColor:'#FFFFFF',
        justifyContent:'center',
        alignItems:'center',marginBottom:10
    },
    searchInput:{
        flex:1,
        height:48,
        fontSize: 15
    },
    sectionHeader:{
        backgroundColor:'rgb(245,245,249)',
        height:40,
        justifyContent:'center',
        borderBottomWidth:0.5,
        borderBottomColor:'rgb(228,228,230)'
    },
    cityRow:{
        height: 70,
        marginLeft: 20,
        marginRight: 20,
        borderBottomWidth: 0.5,
        borderBottomColor: 'rgb(228,228,230)',
        justifyContent:'center'
    },
    scrollNav:{
        position:'absolute',
        paddingTop:150,
        flex:1,
        right:0,
        top:0,
        width:50
    },divider:{
        borderBottomWidth:0.5,
        borderBottomColor: 'rgb(228,228,230)'
    }
});