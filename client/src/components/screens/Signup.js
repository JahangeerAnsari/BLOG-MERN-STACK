import React,{useState} from 'react'
import M from "materialize-css"
import {Link,useHistory} from "react-router-dom"
import { baseUrl } from '../../utils/urlConfig'
 const Signup = () => {
   const history = useHistory()
   // define the state
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  // onclick 
  const Postdata = ()=> {
    fetch(`${baseUrl}/signup`,{
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name,
        email,
        password
      })
    }).then(res=>res.json())
    .then(data=>{
      if(data.error){
        M.toast({html: data.error,classes:"#c62828 red darken-3"})
      } else{
        M.toast({html: data.message,classes:"#43a047 green darken-3"})
        console.log(data);
        history.push('/signin')
      }
    }).catch(err => {
      console.log(err);
    })
  }
    return (
        <div className="mycard">
      <div className="card auth-card input-field">
       <h2>Instagram</h2>
       <input type="text" placeholder="name" 
        value={name}
        onChange={(e) => setName(e.target.value)}
        />

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
          onClick={() => Postdata()}
          >
          Signup
          
        </button>
       <h5> <Link to="/signin">Already have an Account</Link></h5>
      </div>
    </div>
    );
}
export default Signup;
