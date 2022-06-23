
import { format } from "timeago.js";

export default function Message({ message, messageType, own, senderUsername, senderProfilePicture, messageTime }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div class= { own ? 'message-item outgoing-message' : 'message-item'}>
      <div class="message-avatar">
          <figure class="avatar">
              <img src={ senderProfilePicture ? senderProfilePicture : PF + "person/noAvatar.png"} class="rounded-circle" alt="image" />
          </figure>
          <div>
              <h5>{senderUsername}</h5>
              <div class="time"> {format(messageTime)} </div>
          </div>
      </div>
      <div class="message-content">
        {message}
      </div>
    </div>
  );
}
