import axios from "axios";
import { useEffect, useState } from "react";
import { apiRoutes } from "../../utils-contants";
import { axiosHeadersObject } from "../../utils-contants";

const PF = process.env.REACT_APP_PUBLIC_FOLDER;

export default function Conversation({ conversation, currentUser, onlineUsersId }) {
  const [isConversationOnline, setIsOnline] = useState(false);
  const [convImg, setConvImg] = useState('');   // get conv img on backend later

  // console.log('conversation: ', conversation);

  useEffect(() => {
    // private chat
    if (!conversation.is_group) {
      const getReceiver = async () => {
        try {
          const res = await axios.get(apiRoutes.getUser(conversation.user_id), axiosHeadersObject());
          const receiver = res.data;
  
          setConvImg(receiver.profile_pic_url);

        } catch (err) {
            console.log(err);
        }
      }

      getReceiver();
    }
  }, []);

  // check if a member in the conversation is online then show online status 
  useEffect(() => {
    setIsOnline(false);

    // for (let i = 0; i < conversation.members.length; i++) {
    //   if (onlineUsersId.includes(conversation.members[i])) {
    //     setIsOnline(true);  
    //     break;
    //   }
    // }

    if (!conversation.is_group) {
      if (onlineUsersId.includes(conversation.user_id)) setIsOnline(true);
    }

  }, [onlineUsersId]);

  return (
      <div className="list-group-item">
        <figure className = {isConversationOnline ? "avatar avatar-state-success" : "avatar"}>
            <img src={ convImg ? convImg : PF + "person/noAvatar.png" } className="rounded-circle" alt="image" />
        </figure>
        <div className="users-list-body">
          <div>
              <h5 className="text-primary">{conversation.conversation_name}</h5>
              <p>{conversation.last_message}</p>
          </div>
          <div className="users-list-action">
              {/* new message count later using notification service */}
              {/* <div className="new-message-count">3</div>  */}
              <small className="text-primary">{new Date(conversation.message_time).toLocaleString('en-US', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
                day: 'numeric',
                month: 'numeric',
                year: '2-digit'
              })}</small>
          </div>
        </div>
      </div>
  );
}
