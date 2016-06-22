import React,{ Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Animated,
    Dimensions,
    PanResponder
} from 'react-native';

const {
    height: deviceHeight,
    width: deviceWidth
} = Dimensions.get('window');

export default class DragDemo extends Component{
    constructor(props){
        super(props);
    }
    componentWillMount(){
        this._animatedValue= new Animated.ValueXY();
        this._value={x:0,y:0};
        this._animatedValue.addListener((value)=> this._value=value );
        this._panResponder = PanResponder.create({
            onMoveShouldSetPanResponderCapture: ()=>true,
            onMoveShouldSetResponderCapture: ()=>true,
            onPanResponderGrant: (e,gestureState)=>{
                this._animatedValue.setOffset({
                    x: this._value.x,
                    y: this._value.y
                });
                this._animatedValue.setValue({x:0,y:0});
            },
            onPanResponderMove: Animated.event([
                null,
                {
                    dx: this._animatedValue.x,
                    dy: this._animatedValue.y
                }
            ]),
            onPanResponderRelease: ()=>{
                this._animatedValue.flattenOffset();
            }
        });
    }
    render(){
        var interpolateColorAnimation = this._animatedValue.y.interpolate({
            inputRange: [0,deviceHeight - 100],
            outputRange: ['rgba(229,27,66,1)','rgba(90,146,253,1)'],
            extrapolate: 'clamp'
        });
        
        var interpolateRotateAnimation = this._animatedValue.x.interpolate({
            inputRange: [0, deviceWidth/2,deviceWidth],
            outputRange: ['-360deg','0deg','360deg']
        });
        
        return (
          <View style={styles.container}>
                <Animated.View style={[styles.box,{
                    transform:[
                        { translateX: this._animatedValue.x},
                        {
                            translateY: this._animatedValue.y
                        },
                        {
                            rotate: interpolateRotateAnimation
                        }
                    ],
                    backgroundColor: interpolateColorAnimation
                }]} {...this._panResponder.panHandlers}></Animated.View>
          </View>  
        );
    }
}

const styles=StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    box:{
        width: 100,
        height: 100
    }
})