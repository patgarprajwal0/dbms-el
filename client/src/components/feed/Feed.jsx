import {useEffect,useState,useContext} from "react";
import Share from "../share/Share";
import Post from "../post/Post";
import "./feed.css";
import axios from "axios"
import { AuthContext } from "../../context/AuthContext";

export default function Feed({username}) {
  axios.defaults.baseURL = 'http://localhost:8800';

  const [posts,setPosts]=useState([]);
  const {user}=useContext(AuthContext)
  useEffect(()=>{
    const fetchPosts= async()=>{
      const res=username?await axios.get("/posts/profile/"+username):await axios.get("/posts/timeline/"+user._id);
      setPosts(res.data.sort((p1,p2)=>{
        return new Date(p2.createdAt)- new Date(p1.createdAt);
      }));
    };
    fetchPosts();
  },[username,user._id])

  
  return (
    <div className="feed">
        <div className="feedWrapper">
        </div>
        {username===user.username && <Share/>}
        {posts.map(p=>(
          <Post key={p._id} post={p}/>
        ))}
        
    </div>
  )
}
