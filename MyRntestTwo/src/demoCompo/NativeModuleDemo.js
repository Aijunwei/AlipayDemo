import React,{ Component } from 'react';
import {
    View,
    Text,
    NativeModules
} from 'react-native';
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter';
var BGNativeModuleExample = NativeModules.BGNativeModuleExample;


export default class NativeModuleDemo extends Component{
    constructor(props){
        super(props);
        RCTDeviceEventEmitter.addListener(BGNativeModuleExample.TestEventName,info=>{
            console.log(info);
        })
    }
    render(){
        console.log(BGNativeModuleExample);
        return (
            <View style={{justifyContent:'center', alignItems:'center',flex:1}}>
                <Text onPress={()=>{
                    BGNativeModuleExample.testPrint("Jack",{
                       height: '1.78m',
                       weight: '7kg' 
                    });
                    BGNativeModuleExample.getNativeName(name=>{
                       console.log("nativeName",name); 
                    });
                    BGNativeModuleExample.testPromises(true).then(result=> {
                        console.log('result is ',result);
                    }).catch(result => {
                        console.log('result =',result);
                    });
                    console.log('BGNative const value =',BGNativeModuleExample.BGModuleName);
                    
                }}>NaiveModuleDemo</Text>
            </View>
        );
    }
}