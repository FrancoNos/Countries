const rootReducer = (state, action) =>{
    switch(action.type){
        case "GET_ALL_COUNTRIES":
            return{
                ...state
            }
            default:
                return state
    }
}

export default rootReducer