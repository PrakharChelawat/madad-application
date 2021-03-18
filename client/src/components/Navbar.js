import React ,{useContext} from 'react'
import {Link,useHistory} from 'react-router-dom'
import {UserContext} from '../App'
const NavBar = ()=>{
  const {state,dispatch} = useContext(UserContext)
  const history =useHistory()
  const renderList =() =>{
    if(state){
      return [
        <li><Link to="/profile">Profile</Link></li>,
        <li><Link to="/create">Create</Link></li>,
        <li><Link to="/myfollowingpost">My Following Post</Link></li>,
        <li>
          <button
          className="btn #b71c1c red darken-4"
          onClick={()=>
          {
            localStorage.clear()
            dispatch({type:"CLEAR"})
            history.push("/signin")
          }}
        >
          Logout
        </button>
        </li>
      ]
    }
    else{
      return [
        <li><Link to="/signin">Sign-in</Link></li>,
        <li><Link to="/signup">Sign-up</Link></li>
      ]
    }
  }

    return(
        <nav>
    <div class="nav-wrapper white">
      <Link to={state?"/":"/signin"} class="brand-logo left">Instagram</Link>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        {renderList()}
      </ul>
    </div>
  </nav>
    )
}
export default NavBar