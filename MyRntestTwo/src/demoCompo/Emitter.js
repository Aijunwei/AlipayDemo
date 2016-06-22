import React,{Component} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableHighlight
    
}from 'react-native';
import RCTDeviceEventEmitter from'RCTDeviceEventEmitter';
class Input extends Component{
    handleUpdateChange(text){
        RCTDeviceEventEmitter.emit('change',text);
        
    }
    render(){
        return (
            <View style={{justifyContent: 'center', alignItems: 'center',backgroundColor: '#F5FCFF'}}>
                <TextInput onChangeText={(text)=> this.handleUpdateChange(text)} style={{width: 200, height: 40, borderColor: 'gray', borderWidth: 1}}/>
            </View>
        );
    }
}

class ShowText extends Component{
    constructor(props){
        super(props);
        this.state={
          text: ''  
        };
    }
    componentDidMount(){
        this.changeEmitterSub=RCTDeviceEventEmitter.addListener('change',(text)=>{
            this.setState({
                text:text
            })
        });
    }
    componentWillUnmount(){
        RCTDeviceEventEmitter.removeSubscription(this.changeEmitterSub);
    }
    render(){
        return (
            <View style={{justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5FCFF'}}>
                <Text>{this.state.text}</Text>
            </View>
        );
    }
}
const EmmiterExample = ()=> {
    return (
        <View>
            <Input />
            <ShowText />
        </View>);}
 export default EmmiterExample;      
/*export default class EmmiterExample extends Component{
    render(){
        
    }
}*/