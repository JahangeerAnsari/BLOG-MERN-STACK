import {React,useState,useContext} from "react";
import M from "materialize-css"
import {UserContext, userContext} from "../../App"
import {useHistory} from "react-router-dom"
import { baseUrl } from "../../utils/urlConfig";
const Signin = () => {
 // case if user 
 const {state, dispatch} = useContext(UserContext)

  const history = useHistory()
  // define the state
 const [email,setEmail] = useState("");
 const [password,setPassword] = useState("");

 // onclick 
 const PostdataLogin = ()=> {
   fetch(`${baseUrl}/signin`,{
     method:"post",
     headers:{
       "Content-Type":"application/json"
     },
     body:JSON.stringify({
       
       email,
       password
     })
   }).then(res=>res.json())
   .then(data=>{
     if(data.error){
       M.toast({html: data.error,classes:"#c62828 red darken-3"})
     } else{
       // lets store token in localStorage
       localStorage.setItem("jwt",data.token);
       localStorage.setItem("user",JSON.stringify(data.user))
         // use dispatch
        dispatch({type:"USER",payload:data.user})
       M.toast({html: "Signed Success",classes:"#43a047 green darken-3"})
       console.log(data);
       history.push('/');
     }
   }).catch(err => {
     console.log(err);
   })
 }
  return (
    <div className="mycard">
      <div className="card auth-card input-field">
       <h2>Instagram</h2>
       <input type="email" placeholder="email" 
         value={email}
        onChange={(e) => setEmail(e.target.value)}
         />
        <input type="password" placeholder="password" 
         value={password}
        onChange={(e) => setPassword(e.target.value)}
         />
        <button
          className="btn waves-effect waves-light #64b5f6 blue lighten-2"
          onClick={()=>PostdataLogin()}
          >
          Signin
          
        </button>
       
      </div>
    </div>
  );
};

export default Signin;
