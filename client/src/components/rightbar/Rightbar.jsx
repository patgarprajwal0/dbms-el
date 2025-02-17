import "./rightbar.css";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Add, Remove } from "@mui/icons-material";
import { AuthContext } from "../../context/AuthContext";

export default function Rightbar({ user }) {
  const PF = "http://localhost:8800/images/";
  axios.defaults.baseURL = "http://localhost:8800/api";
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(false);
  const [friends, setFriends] = useState([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("user");
    navigate("/login");
    window.location.reload();
  };

  useEffect(() => {
    const isFollowed = async () => {
      try {
        if (user?._id) {
          const res = await axios.get(`/users/isfollowed/${currentUser._id}/${user._id}`);
          setFollowed(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    isFollowed();
  }, [currentUser, user]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        if (user?._id) {
          const friendList = await axios.get(`/users/friends/${user._id}`);
          setFriends(friendList.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user]);

  const handleClick = async () => {
    try {
      if (!followed) {
        await axios.put(`/users/${user._id}/follow`, { userId: currentUser._id });
      } else {
        await axios.delete(`/users/${user._id}/unfollow`, { data: { userId: currentUser._id } });
      }
      setFollowed(!followed);
    } catch (err) {
      console.log(err);
    }
  };

  const HomeRightBar = () => {
    const [notFriends, setNotFriends] = useState([]);

    useEffect(() => {
      const fetchNotFriends = async () => {
        try {
          const res = await axios.get(`/users/notfriends/${currentUser._id}`);
          setNotFriends(res.data);
        } catch (err) {
          console.error("Error fetching not friends:", err);
        }
      };
      fetchNotFriends();
    }, [currentUser]);

    return (
      <>
        <h4 className="rightbarTitle">Users You May Know</h4>
        <ul className="rightbarNotFriendList">
          {notFriends.map((user) => (
            <Link to={`/profile/${user.username}`} key={user._id}>
              <div className="rightbarFollowing">
                <img
                  src={
                    user.profilePicture
                      ? PF + user.profilePicture
                      : PF + "person/noAvatar.png"
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{user.username}</span>
              </div>
            </Link>
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightBar = () => {
    const isTeacher = user.isAdmin; // Assuming isAdmin is true for teachers

    return (
      <>
        {user.username === currentUser.username && (
          <button onClick={handleLogout} className="logoutButton">
            Logout
          </button>
        )}

        {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}

        <h4 className="rightbarTitle">User Information</h4>
        <div className="rightbarInfo">
          {isTeacher ? (
            <div className="rightbarInfoItem">
              <span className="rightbarInfoKey">Role:</span>
              <span className="rightbarInfoValue">{user.year}</span>
            </div>
          ) : (
            <>
              <div className="rightbarInfoItem">
                <span className="rightbarInfoKey">USN:</span>
                <span className="rightbarInfoValue">{user.usn}</span>
              </div>
              <div className="rightbarInfoItem">
                <span className="rightbarInfoKey">Year:</span>
                <span className="rightbarInfoValue">{user.year}</span>
              </div>
            </>
          )}
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Department:</span>
            <span className="rightbarInfoValue">{user.department}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Description:</span>
            <span className="rightbarInfoValue">{user.des}</span>
          </div>
        </div>

        <h4 className="rightbarTitle">Connections</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <Link to={`/profile/${friend.username}`} key={friend._id}>
              <div className="rightbarFollowing">
                <img
                  src={
                    friend.profilePicture
                      ? PF + friend.profilePicture
                      : PF + "person/noAvatar.png"
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightBar /> : <HomeRightBar />}
      </div>
    </div>
  );
}
