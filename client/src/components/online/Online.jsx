import "./online.css"


export default function online({user}) {
  const PF = "./assets";
  return (
    <li className="rightbarFriend">
        <div className="rightbarProfileImgContainer">
        <img className="rightbarProfileImg" src={PF+user.profilePictre} alt="">
        </img>
        <span className="rightbarOnline"></span>
        </div>
        <span className="rightbarUserName">{user.username}</span>
    </li>
  )
}
