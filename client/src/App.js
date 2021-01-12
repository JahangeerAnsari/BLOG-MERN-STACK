import React, {useEffect, createContext, useReducer,useContext } from "react"
import Navbar from "./components/Navbar"
import {BrowserRouter,Route, Switch, useHistory} from  "react-router-dom"
import Home from "./components/screens/Home"
import Profile from "./components/screens/Profile"
import Signup from "./components/screens/Signup"
import Signin from "./components/screens/Signin"
import CreatePost from "./components/screens/CreatePost"
import {reducer,initialState} from "./reducers/userReducer"
import "./App.css";

const Routing = ()=>{
 // use historyHook
 // this is first component that wiil loaded first
 const history = useHistory()
 const {state,dispatch} = useContext(UserContext)
 useEffect(()=>{
   const user = JSON.parse(localStorage.getItem("user"))
  //  console.log(typeof(user),user)
   // in case if we have user
   if(user){
     dispatch({type:"USER",payload:user})
    
   }else{
     history.push('/signin')
   }
 },[])

     return(
      <Switch>
      <Route path="/" exact component= {Home} />
    <Route path="/profile" exact component= {Profile} />
    <Route path="/signup" exact component= {Signup} />
    <Route path="/signin" exact component= {Signin} />
    <Route path="/createpost" exact component= {CreatePost} />
   
   </Switch>
     )
}

export const UserContext = createContext()
function App(){
  // we cannot excess home page here directly
  // for the we have to create routing() and ude history hook
   //call the reducer
   // we can accees state &dispatch in all components
 const [state, dispatch] = useReducer(reducer,initialState)
  return(
      <UserContext.Provider value={{state,dispatch}}>
     <BrowserRouter>
    <Navbar />
    <Routing />
    </BrowserRouter>
      </UserContext.Provider>
  )
}
export default App;