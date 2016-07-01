'use strict';
 import {combineReducers} from 'redux';
 import statement from './koubeiStatement';
 import city from './city';
 import filter from './storeFilter';

 const rootReducer = combineReducers({
     statement,
     city,
     filter
 });

 export default rootReducer;