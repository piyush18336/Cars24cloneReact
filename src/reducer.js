const reducer = (state, action)=>{

    switch(action.type){
     case "GET_VALUES":
        return{
            ...state,
           Cars: action.payload.Cars
        }
    }
    return state;
}

export default reducer;