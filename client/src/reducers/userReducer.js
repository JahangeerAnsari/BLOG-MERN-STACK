//reducer is a function having two state (state,action)
export const initialState =null

export const reducer =(state,action)=>{
     if(action.type=="USER"){
         return action.payload
     }

     if(action.type=="USER"){
        return action.payload
    }
     if(action.type=="CLEAR"){
         return null;
     }
     // in other case return initial state
     return state
 }
