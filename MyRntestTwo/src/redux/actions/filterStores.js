import {
    FILTER_TYPE
} from '../../constants/ActionTypes';
/**
 * 选择过滤类型（过滤条件）
 * */
export function FilterType(filterType){
    return {
        type:FILTER_TYPE,
        activeType:filterType
    }
}
//export function FilterContent()