import React ,{useContext} from 'react'
import {Link, useHistory} from "react-router-dom"
import {UserContext} from "../App"
import CreatePost from './screens/CreatePost'
import Profile from './screens/Profile'
import Signin from './screens/Signin'
import Signup from './screens/Signup'

// import { baseUrl } from "../../utils/urlConfig";
const Navbar = () => {
  // initially state = null
    //state = user (user login)
    const {state,dispatch} = useContext(UserContext)
    const history = useHistory()
    const renderList = ()=>{

      if(state){
        return [
                      
        <li key={Profile}><Link to= "/profile">Profile</Link></li>,
        <li key={CreatePost}><Link to="/createpost">CreatePost</Link></li>,
        <li>
        <button
          className="btn #c62828 red darken-3"
          onClick={() => {
            localStorage.clear()
            dispatch({type:"CLEAR"})
            history.push('/signin')
          }}
          >
          logout
          
        </button>

        </li>
        ]
      }else{
        return [
          <li key={Signup}><Link to="/signup">Signup</Link></li>,
          <li key={Signin}><Link to="/signin">SignIn</Link></li>
        ]
      }
    } 
    return (
        <nav>
    <div className="nav-wrapper white">
      <Link to= {state?"/":"/signin"} className="brand-logo">Instagram</Link>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
         {renderList()}
      </ul>
    </div>
  </nav>
    )
}

export default Navbar
