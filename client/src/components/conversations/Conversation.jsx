const PF = process.env.REACT_APP_PUBLIC_FOLDER;

export default function Conversation({ conversation, isOnline, shouldIndam}) {
  return (
      <div className="list-group-item">
        <figure className = {isOnline ? "avatar avatar-state-success" : "avatar"} style = {{ marginTop: '0px' }}>
            <img src={ conversation.is_group ? PF + "person/groupChat.png" : conversation.convImg ? conversation.convImg : PF + "person/noAvatar.png" } className="rounded-circle" alt="image" />
        </figure>
        <div className="users-list-body">
          <div>
              <h5 className="text-primary">{conversation.conversation_name}</h5>
              {
                shouldIndam ? 
                  <h6>{conversation.message_type === "image_url" ? 'Sent an image ...' : conversation.last_message}</h6>
                  :
                  <p>{conversation.message_type === "image_url" ? 'Sent an image ...' : conversation.last_message}</p>
              }
          </div>
          <div className="users-list-action">
              {/* new message count later using notification service */}
              {/* <div className="new-message-count">3</div>  */}
              {
                !conversation.message_time ? 
                <></> :
                <small className="text-primary">{new Date(conversation.message_time).toLocaleString('en-US', {
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: true,
                  day: 'numeric',
                  month: 'numeric',
                  year: '2-digit'
                })}</small>
              }
          </div>
        </div>
      </div>
  );
}
