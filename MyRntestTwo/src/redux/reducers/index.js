'use strict';
 import {combineReducers} from 'redux';
 import statement from './koubeiStatement';
 import city from './city';

 const rootReducer = combineReducers({
     statement,
     city
 });

 export default rootReducer;