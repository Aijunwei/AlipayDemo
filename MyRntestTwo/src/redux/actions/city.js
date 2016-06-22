import * as types from '../../constants/ActionTypes';
export function selectCity(city){
    return {
        type: types.SELECT_CITY,
        city:city
    }
}