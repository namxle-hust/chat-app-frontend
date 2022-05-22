import Message from "../../components/message/Message";
import axios from "axios";
import { useEffect, useState } from "react";

export default function  CurrentChatBox({ messages, user, setNewMessage, newMessage, handleSubmit, scrollRef, membersId }) {
    const [membersInBox, setMembersInBox] = useState([]);

    useEffect(() => {
        const getMembers = async () => {
            const responses = await Promise.all(membersId.map(id => axios.get(`/users/?userId=${id}`))); 
            const datas = responses.map(res => res.data);
        
            setMembersInBox(datas);
        };
    
        getMembers();
    }, []);

    return (
    <>
    <div className="chatBoxTop">
        {messages.map((m) => {
            const sender = membersInBox.find(member => member._id === m.sender); 

            return (               
                <div ref={scrollRef}>
                    <Message key={m.sender} 
                            message={m} 
                            own={m.sender === user._id} 
                            senderUsername = {sender?.username}
                            senderProfilePicture = {sender?.profilePicture}/>
                </div> 
            ) 
        })}
    </div>
    <div className="chatBoxBottom">
        <textarea
            className="chatMessageInput"
            placeholder="write something..."
            onChange={(e) => setNewMessage(e.target.value)}
            value={newMessage}
        ></textarea>
        <button className="chatSubmitButton" onClick={handleSubmit}>
            Send
        </button>
    </div>
    </>
    );
}
