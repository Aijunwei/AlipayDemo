'use strict';
import * as types from '../../constants/ActionTypes';
const initialState={
    awaitStatement:0
}

export default function statement(state=initialState,action){
    switch(action.type){
        case types.FETCH_AWAIT_STATEMENTS :{
            return Object.assign({},state,{awaitStatement:action.number});
        }
        default:
        return state;
    }
}