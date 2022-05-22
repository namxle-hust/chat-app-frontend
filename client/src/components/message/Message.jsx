import "./message.css";
import { format } from "timeago.js";

export default function Message({ message, own, senderUsername, senderProfilePicture }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src={ senderProfilePicture ? senderProfilePicture : PF + "person/noAvatar.png"}
          alt=""
        />
        <p className="messageText">
          <span style = {{ fontWeight: '500', fontSize: '13px' }}>
            {senderUsername}
          </span>
          {": " + message.text}
        </p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}
