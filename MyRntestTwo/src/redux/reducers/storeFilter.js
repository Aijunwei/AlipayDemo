const initialState={
    activeType:0
};
export default function(state=initialState,action){
    switch(action.activeType){
        case 0 :{
            return Object.assign(state,{activeType:action.activeType});
        }
        case 1 : {
             return Object.assign(state,{activeType:action.activeType});
        }
    }
}