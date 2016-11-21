import React,{ Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ListView,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


const {width,height} =Dimensions.get('window');

const ds= new ListView.DataSource({
   rowHasChanged: (r1,r2) => r1!==r2 
});
const noop= ()=>{};
export default class Popover extends Component{
    static defaultProps={
        list: [""],
        onClick: noop,
        onClose: noop,
        isVisible:false
    };
    static propsTypes={
        list: React.PropTypes.array.isRequired,
        onClick: React.PropTypes.func,
        onClose: React.PropTypes.func,
        isVisible: React.PropTypes.bool
    }
    constructor(props){
        super(props);
        this.state={
            dataSource: ds.cloneWithRows(this.props.list)
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.list !== this.props.list){
            this.setState({
                dataSource: ds.cloneWithRows(nextProps.list)
            });
        }
    }
    handleClick(data){
        this.props.onClick(data);
        this.props.onClose();
    }
    renderRow(rowData,sectionID,rowId){
       
        let rowStyle=(rowId != this.props.list.length-1) ? styles.rowStyle : styles.rowStyleNoBorder;
        let tipView = <View/>;
        if(rowData.tips){
            tipView =(<View style={styles.tipView}>
                        <Text style={{color:'white'}}>{rowData.tips}</Text>
                    </View>);
        }
        let row=(
            <TouchableOpacity onPress={()=> this.handleClick(rowData)}>
                <View style={rowStyle}>
                   <Icon name={rowData.icon.name} size={rowData.icon.size||20} color="#FFFFFF"/> 
                   <Text style={styles.popItemText}>{rowData.text}</Text>
                   {tipView}
                </View>
            </TouchableOpacity>
        );
        if(this.props.renderRow){
            row=this.props.renderRow(rowData);
        }
        return row;
    }
    renderList(){
        let maxHeight={};
        if(this.props.list.length>5){
            maxHeight ={
                height:250
            }
        }
     //   return (<View></View>);
        return (
            <ListView
              style={maxHeight}
              dataSource={this.state.dataSource}
              renderRow={(rowData,sectionID,rowID)=>this.renderRow(rowData,sectionID,rowID)}
              automaticallyAdjustContentInsets={false} />
        );
    }
    render(){
        let containerStyle=this.props.containerStyle || styles.container,
            popoverStyle = this.props.popoverStyle || styles.popover;
        if (this.props.isVisible) {
            return (
                <TouchableWithoutFeedback onPress={()=>this.props.onClose()}>
                    <View style={containerStyle}>
                        <View style={[styles.popover]}>
                            <View style={styles.trangle}></View>
                            <View style={styles.popoverContent}>
                                {this.renderList()}
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            );
        }else{
            return <View />;
        }

    }
}

const styles=StyleSheet.create({
    container:{
        position:'absolute',
        left:0,
        top:0,
        height:height,
        width:width,
        backgroundColor:'rgba(0,0,0,0.5)'
    },
    popover:{
        position:'absolute',
        right:8,
        top:35
    },
    popoverContent:{
        backgroundColor:'#3F454F',
        width:200,
        //width:width*0.35,
        paddingLeft:10,
        paddingRight:10,
        borderRadius:5
    },
    trangle:{
        borderWidth:10,
        width:10,
        marginLeft:165,
        borderColor:'transparent',
        borderBottomColor:'#3F454F'
    },
    popItemText:{
        color:'#FFFFFF',
        fontSize:20
    },
    rowStyle:{
        borderBottomColor:'#FFFFFF',
        borderBottomWidth:0.5,
        paddingLeft:8,
        paddingRight:5,
        flexDirection:'row',
        justifyContent:'space-between',
        height:50,
        alignItems:'center'
    },
    rowStyleNoBorder:{
        flexDirection: 'row',
        height: 50,
        paddingLeft:8,
        paddingRight:5,
        justifyContent:'space-between',
        alignItems: 'center'
    },
    tipView:{
        width:20,
        height:20,
        borderRadius:20,
        backgroundColor:'red',
        justifyContent:'center',
        alignItems:'center'
    }
});