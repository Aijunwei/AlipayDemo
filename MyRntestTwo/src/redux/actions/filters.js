import {
    SELECT_TYPE,
    SELECT_AREA,
    SELECT_ORDER_TYPE,
    FILTER
} from '../../constants/ActionTypes';

export function selectType(type){
    return {
        type:SELECT_TYPE,
        selectedType:type
    }
}

export function selectArea(area){
    return {
        type:SELECT_AREA,
        area:area
    }
}

export function selectOrderType(orderType){
    return {
        type:SELECT_ORDER_TYPE,
        orderType
    }
}

export function filter(filter){
    return {
        type: FILTER,
        filter
    }
}