import * as types from '../../constants/ActionTypes';
const initial={
    city:'深圳'
}
export default function city(state=initial,action){
    switch(action.type){
        case types.SELECT_CITY :{
            return Object.assign({},state,{
                city:action.city
            });
        }
        default:
            return state;
    }
}