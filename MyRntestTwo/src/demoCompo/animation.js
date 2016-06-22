'use strict';

import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Animated,
    Easing,
    TouchableOpacity,
    Text
} from 'react-native';
import UIExplorerBlock from './../../UIExplorerBlock';
import UIExplorerPage from './../../UIExplorerPage';

class FadeInView extends Component{
    constructor(props){
        super(props);
        this.state={
            fadeAnim: new Animated.Value(0)
        };
    }
    componentDidMount(){
        Animated.timing(this.state.fadeAnim,{
            toValue: 1,
            duration: 2000
        }).start();
    }
    render(){
        return (
            <Animated.View
            style={{
                opacity: this.state.fadeAnim
            }}>
            {this.props.children}
            </Animated.View>
        );
    }
}

class FadeInExample extends Component{
    constructor(props){
        super(props);
        this.state={
            show: true
        };
    }
    render(){
        return (
            <View>
                <TouchableOpacity onPress={()=>{this.setState({show: !this.state.show})}}>
                    <Text>Press to {this.state.show ? 'Hide' : 'Show'}</Text>
                </TouchableOpacity>
                {this.state.show && <FadeInView>
                        <View style={styles.content}>
                            <Text>FadeInView</Text>
                        </View>
                    </FadeInView>}
            </View>
        );
    }
}

class Button extends Component{
    render(){
        return (
            <TouchableOpacity onPress={this.props.onPress} style={styles.button}>
                    <Text style={{fontSize:19}}>{this.props.text}</Text>
                </TouchableOpacity>
        );
    }
}
class SpringAnimation extends Component{
    constructor(props){
        super(props);
        this.state={
          anim: new Animated.Value(0)  
        };
    }
    render(){
        return (
            <View>
            <Button text="press to fling it!" onPress={()=>{
                Animated.spring(this.state.anim,{
                    toValue: 0,
                    velocity: 3,
                    tension: 5,
                    friction: 1
                }).start();
            }}/>
            <Animated.View
                style={[styles.content,{
                    transform:[
                        {
                            scale: this.state.anim.interpolate({
                                inputRange: [0,1],
                                outputRange: [1,4]
                            })
                        },{
                            translateX: this.state.anim.interpolate({
                                inputRange:[0,1],
                                outputRange:[0,500]
                            })
                        },
                        {
                            rotate: this.state.anim.interpolate({
                                inputRange: [0,1],
                                outputRange:['0deg','360deg']
                            })
                        }
                    ]
                }]}>
                <Text>Transforms!</Text>
                </Animated.View>
                </View>
        );
    }
}

class AnimatedSequence extends Component{
    componentDidMount(){
        var test=new Animated.Value(1);
        var result=test.interpolate({
            inputRange: [0,1],
            outputRange:[2,8]
        });
        console.log(result);
    }
    render(){
        this.anims=this.anims || [1,2,3].map(
            ()=> new Animated.Value(0)
        );
        
        return (
            <View>
                <Button text="press to animate" onPress={()=>{
                    let timing=Animated.timing;
                    Animated.sequence([
                       timing(this.anims[0],{
                           toValue: 200,
                           easing: Easing.linear
                       }),
                       Animated.delay(400),
                       timing(this.anims[0],{
                           toValue: 0,
                           easing: Easing.elastic(2)
                       }),
                       Animated.delay(400),
                       Animated.stagger(200,
                             this.anims.map((anim)=> timing(anim,{toValue: 200})).concat(
                           this.anims.map((anim)=> timing(anim,{toValue: 0}))
                       )),
                       Animated.delay(400),
                       Animated.parallel([
                           Easing.inOut(Easing.quad),
                           Easing.back(1.5),
                           Easing.ease
                       ].map((easing,ii)=>{
                          return timing(this.anims[ii],{
                               toValue:320,
                               easing, duration:3000
                           })
                       })),
                       Animated.delay(400),
                       Animated.stagger(200,
                       this.anims.map((anim)=> timing(anim,{
                           toValue: 0,
                           easing: Easing.bounce,
                           duration: 2000
                       }))) 
                    ]).start();
                }}/>
                { ['Composite','Easing','Animations!'].map((text, ii)=>
                    
                        <Animated.View key={text} style={[styles.content,{
                            left: this.anims[ii]
                        }]}>
                             <Text>{text}</Text>
                        </Animated.View>
                    )
                }
            </View>
        );
    }
}
export default class Animations extends Component{
    render(){
        return (
            <UIExplorerPage title="Animated">
                <UIExplorerBlock title="fadeInView">
                    <FadeInExample />
                </UIExplorerBlock>
                <UIExplorerBlock title="Transform">
                    <SpringAnimation />
                </UIExplorerBlock>
                <UIExplorerBlock title="sequence">
                    <AnimatedSequence />
                </UIExplorerBlock>
            </UIExplorerPage>
        );
    }
}

const styles=StyleSheet.create({
   content:{
       backgroundColor: 'deepskyblue',
       borderWidth: 1,
       borderColor: 'dodgerblue',
       padding: 20,
       margin: 20,
       borderRadius: 10,
       alignItems: 'center'
   },
   button:{
       backgroundColor: 'deepskyblue',
       borderRadius:10,
       width:150,
       height:60
   }
});