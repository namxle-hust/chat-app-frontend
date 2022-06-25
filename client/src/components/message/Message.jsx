
import { format } from "timeago.js";
import { CheckCircle, CheckCircleOutline } from '@material-ui/icons';

export default function Message({ message, messageType, own, senderUsername, senderProfilePicture, messageTime, isLastMessSent, isLastMessDelivered }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <>
      <div className = { own ? 'message-item outgoing-message' : 'message-item'}>
        <div className ="message-avatar">
            <figure className ="avatar">
                <img src={ senderProfilePicture ? senderProfilePicture : PF + "person/noAvatar.png"} className ="rounded-circle" alt="image" />
            </figure>
            <div>
                <h5>{senderUsername}</h5>
                <div className ="time"> {format(messageTime)} </div>
            </div>
        </div>
        <div className ="message-content">
          {messageType !== 'image_url' ? 
            message : 
            <img src={message} 
                 style = {{
                  height: '250px',
                  width: '100%',
                  objectFit: 'cover'
                 }} 
            />}
        </div>
        {
            isLastMessSent && isLastMessDelivered ? <CheckCircle fontSize="small" color='primary' /> : 
            isLastMessSent ? <CheckCircleOutline fontSize="small" /> : <></>
        }
      </div>
    </>
  );
}
