import React,{useEffect,useState,useContext} from 'react'
import {UserContext} from '../../App'
const Profile =()=>{
    const [mypics,setPics]=useState([])
    const {state,dispatch}=useContext(UserContext)
    useEffect(()=>{
        fetch('/mypost',{
            headers:{
                "Authorization":"hello "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            setPics(result.mypost)
        })
    },[])
    
    return (
        // <h1>Profile</h1>
        <div style={{maxWidth:"550px",margin:"0px auto"}}>
            <div style={{
                display:"flex",
                justifyContent:"space-around",
                margin:"18px 0px",
                borderBottom:"1px solid grey"
            }}>
                <div>
                    <img style={{width:"160px",height:"160px",borderRadius:"80px"}}
                    src="https://images.unsplash.com/photo-1499482125586-91609c0b5fd4?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTh8fHBlcnNvbnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                    />
                </div>
                <div>
                    <h4>{state?state.name:"loading"}</h4>
                    <h5>{state?state.email:"loading"}</h5>
                    <div style={{display:"flex",justifyContent:"space-between",width:"108%"}}>
                        
                        <h5>{mypics.length} posts</h5>
                        {/* <h5>{state?state.followers.length:"0"}</h5> */}
                        <h5>{state?state.following.length:"loading"}</h5>
                    </div>
                </div>
            </div>
        
            <div className="gallery">
               {
                   mypics.map((item)=>{
                        return(
                            <img key={item._id} className="item" src={item.photo} alt={item.title}/>
                        )
                   })

               }
                
            </div>
        </div>
    )
}
export default Profile