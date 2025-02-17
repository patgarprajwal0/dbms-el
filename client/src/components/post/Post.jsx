import "./post.css";
import { MoreVert } from "@mui/icons-material";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Post({ post }) {
  const [like, setLike] = useState(0); // Initialize like count as 0
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const PF = "http://localhost:8800/images/";
  const { user: currentUser } = useContext(AuthContext);

  axios.defaults.baseURL = "http://localhost:8800/api";

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/users?userId=${post.userId}`);
        setUser(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, [post.userId]);

  const likeHandler = () => {
    setLike((prev) => (isLiked ? prev - 1 : prev + 1)); // Increment or decrement like count
    setIsLiked((prev) => !prev);

    try {
      axios.put(`/posts/${post._id}/like`, { userId: currentUser._id });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`profile/${user.username}`}>
              <img
                className="postProfileImg"
                src={user.profilePicture ? PF + user.profilePicture : PF + "person/noAvatar.png"}
                alt=""
              />
            </Link>
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={PF + post.img} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img className="likeIcon" src={PF + "like.png"} onClick={likeHandler} alt="" />
            <img className="likeIcon" src={PF + "heart.png"} onClick={likeHandler} alt="" />
            <span className="postLikeCounter">{like} people liked this</span>
          </div>
        </div>
      </div>
    </div>
  );
}
