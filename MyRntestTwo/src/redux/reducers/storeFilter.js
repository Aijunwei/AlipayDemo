const initialState={
    activeType:-1
};
export default function filter(state=initialState,action){
    switch(action.activeType){
        case -1:{//默认无选择
            return Object.assign({},state,{activeType:action.activeType});
        }
        case 0 :{//全部美食
            return Object.assign({},state,{activeType:action.activeType});
        }
        case 1 : {//全城
            console.log(action);
             return Object.assign({},state,{activeType:action.activeType});
        }
        case 2 : {//智能排序
             return Object.assign({},state,{activeType:action.activeType});
        }
        case 3 : {//筛选
             return Object.assign({},state,{activeType:action.activeType});
        }
        default:
        return state;
    }
}