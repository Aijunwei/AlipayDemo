import React,{ Component } from 'react';
import {
    View,
    Text
} from 'react-native';
import Storage from 'react-native-storage';

global.storage= new Storage({
    size: 1000,
    defaultExpires: 1000 * 3600 * 24,
    enableCache: true,
    sync:{
       
    }
}); 
export default class NativeStorage extends Component{
    constructor(props){
        super(props);
        this.state={
          times:0  
        };
    }
    componentWillMount(){
       storage.load({
            key: 'visitTimes',
            autoSync: true,
            syncInBackground:true
        }).then(ret=>{
            console.log(ret);
            if(ret){
               this.setState({
                times:ret.times
                });
            }

        }).catch(err=>{
            console.warn(err);
        });
    }
    render(){
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                  <Text>Today Visit times: {this.state.times}</Text>
                  <Text onPress={()=>{
                      storage.save({
                          key:'visitTimes',
                          rawData:{
                            times:this.state.times+1
                          },
                          expires:1000*3600
                      });
                      storage.load({
                            key: 'visitTimes',
                             autoSync: true,
                             syncInBackground:true
                         }).then(ret=>{
                             console.log(ret);
                              if(ret){
                               this.setState({
                                times:ret.times
                             });
                      }

        }).catch(err=>{
            console.warn(err);
        });
                  }}>cilck to visit</Text>
            </View>
        );
    }
}