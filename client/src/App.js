import React,{useEffect,createContext,useReducer,useContext} from 'react';
import NavBar from './components/Navbar'
import "./App.css"
import {BrowserRouter,Route, Switch,useHistory} from 'react-router-dom'
import Home from './components/screens/Home'
import Signup from './components/screens/Signup'
import Profile from './components/screens/Profile'
import Signin from './components/screens/Signin'
import CreatePost from './components/screens/createpost'
import {reducer,intialState} from './reducers/userReducer'
import UserProfile from './components/screens/UserProfile'
import SubcribesUserPosts from './components/screens/SubscribesUserPosts'
export const UserContext = createContext()
// hello
const Routing = () =>{
  const history =useHistory()
  const {state,dispatch}=useContext(UserContext)
  useEffect(()=>{
    const user =JSON.parse(localStorage.getItem("user"))
    console.log(typeof(user),user)
    if(user){
      dispatch({type:"USER",payload:user})
      // history.push("/")
    }
    else{
      history.push('/signin')
    }
  },[])
  return (
    <Switch>
    <Route exact path="/">
      <Home />
    </Route>
    <Route path="/signin">
      <Signin />
    </Route>
    <Route path="/signup">
      <Signup />
    </Route>
    <Route exact path="/profile">
      <Profile />
    </Route>
    <Route path="/create">
      <CreatePost />
    </Route>
    <Route path="/profile/:userid">
      <UserProfile />
    </Route>
    <Route path="/myfollowingpost">
      <SubcribesUserPosts />
    </Route>
    </Switch>
  );
}


function App() {
  const [state,dispatch]=useReducer(reducer,intialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
    <NavBar />
    <Routing />
    </BrowserRouter>
    </UserContext.Provider>
    
  );
}

export default App;
