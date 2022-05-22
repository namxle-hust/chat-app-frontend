import axios from "axios";
import { useEffect, useState } from "react";
import "./chatOnline.css";

export default function ChatOnline({ onlineUsersId, currentId, setCurrentChat }) {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);   
  const [isNoMessage, setIsNoMessage] = useState({});  // there's no message between you and the online user
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get("/users/getAll");
      setFriends(res.data);
    };

    getFriends();
  }, [currentId]);

  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsersId.includes(f._id)));
  }, [friends, onlineUsersId]);

  // click on a online friend to go to conversation
  const handleClick = async (user) => {
    try {
      const res = await axios.get(
        `/conversations/find/${currentId}/${user._id}`
      );

      if (!res.data) setIsNoMessage({ ...isNoMessage, [user._id]: true }); 
      
      setCurrentChat(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // create a new conversation
  const handleNewConversation = async (user) => {

    try {
      const res = await axios.post(
        `/conversations`, {
          senderId: currentId,
          receiverId: user._id 
        }
      );

      if (res.data) setIsNoMessage({ ...isNoMessage, [user._id]: false }); ; 
      // console.log(res.data);
      setCurrentChat(res.data);
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div className="chatOnline">
      {onlineFriends.map((o) => (
        <div className="chatOnlineFriend" key={o._id} onClick={() => handleClick(o)}>
          <div className="chatOnlineImgContainer">
            <img
              className="chatOnlineImg"
              src={
                o?.profilePicture
                  ? o.profilePicture
                  : PF + "person/noAvatar.png"
              }
              alt=""
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <div>
            <span className="chatOnlineName">{o?.username}</span>
            {isNoMessage[o._id] ? <div> 
              <button onClick = {() => handleNewConversation(o)}>{"start new conversation"}</button> 
             </div> : <></>}
          </div>
        </div>
      ))}
    </div>
  );
}
