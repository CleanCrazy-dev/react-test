
const initialState = {userData: "", userMessages: [], selectedCase: "", listOfCases:[]}


export const rootReducer = (state = initialState, action)=> {

    switch(action.type){

        case "USERDATA":
            return {...state, userData: action.doneAction}
        case "SELECTED_CASE":
                    return {...state, selectedCase: action.doneAction}
        case "NEW_MESSAGE":
                    return {...state, userMessages: [...action.doneAction]}
        case "STORE_CASES_LIST":
                    return {...state, listOfCases: action.doneAction}
         default:
            return state
    }
 }