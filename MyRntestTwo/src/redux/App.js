'use strict';
import React,{Component} from 'react';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';

import Entry from './containers/Entry';
const store=configureStore();

export default class App extends Component{
    render(){
        return (
            <Provider store={store}>
                 <Entry /> 
            </Provider>
        );
    }
}