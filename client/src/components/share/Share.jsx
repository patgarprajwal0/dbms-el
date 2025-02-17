import { useContext,useState,useRef } from "react";
import "./share.css"; 
import {PermMedia,Label,Room,EmojiEmotions, Cancel} from "@mui/icons-material";
import {AuthContext} from "../../context/AuthContext";
import axios from "axios"

export default function Share() {
    const {user}=useContext(AuthContext);
    const PF = "http://localhost:8800/images/";
    const desc = useRef();
    const [file,setFile]=useState(null)

    const submitHandler = async(e)=>{
        e.preventDefault()
        const newPost ={
            userId: user._id,
            desc : desc.current.value
        }
        if(file){
            const data=new FormData();
            const fileName=file.name;
            data.append("file",file);
            data.append("name",fileName);
            newPost.img=fileName;
            try{
                await axios.post("/upload",data)
            }catch(err){
                console.log(err);
            }
        }
        try{
            await axios.post("/posts",newPost)
            window.location.reload();
        }catch(err){
            console.log(err);    
        }
    };

    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img className="shareProfileImg" src={user.profilePicture?PF+user.profilePicture:PF+"person/noAvatar.png"} alt=""/>
                    <input placeholder={"Whats in your mind "+user.username+"?"} className="ShareInput" ref={desc}/>
                </div>
                <hr className="shareHr"/>
                {file && (
                    <div className="shareImgContainer">
                        <img className="shareImg" src={URL.createObjectURL(file)}>
                        </img>
                        <Cancel className="shareCancelImg" onClick={()=>setFile(null)}/>
                    </div>
                )}
                <form className="shareBottom" onSubmit={submitHandler}>
                    <div className="shareOptions">
                        <label htmlFor="file" className="shareOption">
                            <PermMedia htmlColor="tomato" className="shareIcon"/>
                            <span className="shareOptionsText">Photo or Video</span>
                            <input style={{display:"none"}} type="file" id="file" accept=".png,.jpeg,.jpg" onChange={(e)=>setFile(e.target.files[0])}></input>
                        </label>
                        <div className="shareOption">
                            <Label  htmlColor="blue" className="shareIcon"/>
                            <span className="shareOptionsText">Tag</span>
                        </div>
                        <div className="shareOption">
                            <Room  htmlColor="green" className="shareIcon"/>
                            <span className="shareOptionsText">Location</span>
                        </div>
                        <div className="shareOption">
                            <EmojiEmotions  htmlColor="gold" className="shareIcon"/>
                            <span className="shareOptionsText">Feelings</span>
                        </div>
                    </div>
                    <button className="shareButton" type="submit">Share</button>
                </form>
            </div>
        </div>
    )
    }
