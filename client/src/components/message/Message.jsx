
import { VideocamOffRounded, VideocamRounded } from '@material-ui/icons';

export default function Message({ message, messageType, own, senderUsername, senderProfilePicture, messageTime, messageTimeTotal, isLastMessSent, isLastMessDelivered, is_group }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  function msToTime(duration) {
    var milliseconds = parseInt((duration % 1000) / 100),
      seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
  
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
  
    return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
  }

  return (
    <>
      {
        message === 'calling' || message === 'In a call' ? 
        <></>
        :
        <>
          <div className = { own ? 'message-item outgoing-message' : 'message-item'}>
            {/* <div className ="message-avatar">
                <figure className ="avatar">
                    <img src={ senderProfilePicture ? senderProfilePicture : PF + "person/noAvatar.png"} className ="rounded-circle" alt="image" />
                </figure>
                <div>
                    <span style = {{ fontSize: '15px', color: 'rgba(165,165,165,0.6)', marginBottom: '-30px' }}>{senderUsername}</span>
                    <div className ="time"> {format(messageTime)} </div>
                </div>
            </div> */}

            {
              is_group ? 
              
                <div className="message-avatar" style = {{ marginBottom: '3px' }}>
                  {
                    own ? 
                      <>
                        <span style = {{ fontSize: '15px', color: 'rgba(125,118,118,1)', marginLeft: '3px' }}>{senderUsername}</span>
                        <figure className ="avatar" style = {{ width: '29px', height: '29px', marginLeft: '15px', marginBottom: '5px' }}>
                          <img src={ senderProfilePicture ? senderProfilePicture : PF + "person/noAvatar.png"} className ="rounded-circle" alt="image" />
                        </figure>
                      </>
                      :
                      <>
                        <figure className ="avatar" style = {{ width: '29px', height: '29px', marginBottom: '5px' }}>
                          <img src={ senderProfilePicture ? senderProfilePicture : PF + "person/noAvatar.png"} className ="rounded-circle" alt="image" />
                        </figure>
                        <span style = {{ fontSize: '15px', color: 'rgba(125,118,118,1)' }}>{senderUsername}</span>
                      </>
                  }
                </div>
              
              : <></>
            }
            <div className = { messageType === 'image_url' ? "" : "message-content"} 
                  style = {
                    messageType === 'call' ? {backgroundColor: '#ebebeb', color: 'black'}:{
                      minWidth: '70px',
                      maxWidth: '400px',
                      whiteSpace: 'pre-wrap',
                      wordWrap: 'break-word',
                    } 
                  }
            >
              {
                messageType === 'string' ? message : 
                messageType === 'image_url' ? 
                  <img src={message} 
                      style = {{
                        height: '250px',
                        width: '100%',
                        objectFit: 'cover',
                        borderRadius: '10px',
                      }} 
                  /> : 
                messageType === 'call' ? 
                  message === 'Missed Call' ? 
                    <>
                      <VideocamOffRounded color='error'/>
                      <span style = {{ marginLeft: '10px' }}>{message}</span> 
                    </>
                  :
                  message === 'Call Ended' ?  
                    <>
                      <VideocamRounded />
                      <span style = {{ marginLeft: '10px' }}>{message}</span> 
                      <p>{msToTime(messageTimeTotal)}  </p>
                    </>
                  : 
                  <>
                    {message}
                  </>
                : <></>
              }
            </div>
            <div className ="message-avatar">
                {/* <figure className ="avatar">
                    <img src={ senderProfilePicture ? senderProfilePicture : PF + "person/noAvatar.png"} className ="rounded-circle" alt="image" />
                </figure> */}
                <div>
                    {/* <h5>{senderUsername}</h5> */}
                    <span className ="time" style = {{ marginRight: '6px', marginLeft: '6px' }}> 
                      {new Date(messageTime).toLocaleString('en-US', {
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: false,
                      })} 
                    </span>
                    {
                      isLastMessSent && isLastMessDelivered ? <span style = {{ color: 'rgb(74, 74, 74)', fontSize: '12px', marginRight: '10px', fontWeight: '500' }}>Delivered</span> : 
                      isLastMessSent ? <span style = {{ color: 'rgb(74, 74, 74)', fontSize: '12px', marginRight: '10px', fontWeight: '500' }}> Sent </span> : <></> 
                    }
                </div>
            </div>
          </div>
        </>
      }
    </>
  );
}
