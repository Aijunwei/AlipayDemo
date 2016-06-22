import {
    SELECT_TYPE,
    SELECT_AREA,
    SELECT_ORDER_TYPE,
    FILTER
} from '../../constants/ActionTypes';
const initialState={
    selectedType:0,
    area:0,
    orderType:0,
    filter:0
};
export default function filters(state=initialState,action){
    switch(action.type){
        case SELECT_TYPE :{
            return Object.assign({},state,{
                selectedType:action.selectedType
            });
        }
        case SELECT_AREA:{
            return Object.assign({},state,{
                area:action.area
            });
        }
        case SELECT_ORDER_TYPE:{
            return Object.assign({},state,{
                orderType:action.orderType
            });
        }
        case FILTER:{
            return Object.assign({},state,{
                filter:action.filter
            });
        }
        default: return state;
    }
}