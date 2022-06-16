import axios from "axios";
import { useEffect, useState } from "react";
import { apiRoutes } from "../../utils-contants";

export default function Conversation({ conversation, currentUser, onlineUsersId }) {
  const [user, setUser] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [isConversationOnline, setIsOnline] = useState(false);

  // check if a member in the conversation is online then show online status
  useEffect(() => {
    setIsOnline(false);

    for (let i = 0; i < conversation.members.length; i++) {
      if (onlineUsersId.includes(conversation.members[i])) {
        setIsOnline(true);  
        break;
      }
    }
  }, [onlineUsersId]);

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        // const res = await axios("/users?userId=" + friendId);
        const res = await axios(apiRoutes.getUser(friendId));
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
      <div class="list-group-item">
        <figure class = {isConversationOnline ? "avatar avatar-state-success" : "avatar"}>
            <img src={
              user?.profilePicture
                ? user.profilePicture
                : PF + "person/noAvatar.png"
            } class="rounded-circle" alt="image" />
        </figure>
        <div class="users-list-body">
          <div>
              <h5 class="text-primary">{user?.username}</h5>
              <p>{' first line of conversation will appear here (later using notification service) '}</p>
          </div>
          <div class="users-list-action">
              {/* new message count later using notification service */}
              <div class="new-message-count">3</div> 
              {/* last message created time using notification server */}
              {/* using timeago.js module ... later */}
              <small class="text-primary">03:41 PM</small>
          </div>
        </div>
      </div>
  );
}
