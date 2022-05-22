import "./closeFriend.css";

export default function CloseFriend({user}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  // const handleOnClick = (e) => {
  //   e.preventDefault();
  //   console.log("click!");
  // }

  return (
    <li className="sidebarFriend">
      {/* <img className="sidebarFriendImg" src={PF+user.profilePicture} alt="" /> */}
      <img className="sidebarFriendImg" src={user.profilePicture ? user.profilePicture : PF + "person/noAvatar.png"} alt="" />
      <span className="sidebarFriendName">{user.username}</span>
    </li>
  );
}
