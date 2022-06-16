import Navigation from "../../components/navigation/Navigation";
import CurrentChatBox from "../../components/currentChatBox/CurrentChatBox";
import FriendsSidebar from "../../components/friendsSidebar/FriendsSidebar";
import ProfileBar from "../../components/profileBar/ProfileBar";
import ConversationSidebar from "../../components/conversationsSidebar/ConversationSidebar";

import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { io } from "socket.io-client";
import { apiRoutes, navigations, socketEvents } from '../../utils-contants';


export default function Messenger() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");   // just to rerender the current chat box component for a new message
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);   // store online users' ids
  const [currentNavigation, setCurrentNavigation] = useState(navigations.conversations);
  const [isProfileBarActive, setProfileBarActive] = useState(false);

  const socket = useRef();
  const { user } = useContext(AuthContext);
  const scrollRef = useRef();

  // test useEffect
  // useEffect(() => {
  //   console.log('test:  ', isProfileBarActive);
  // }, [isProfileBarActive]);

  useEffect(() => {
    socket.current = io("ws://localhost:8900"); // local socket server address 
    socket.current.on(socketEvents.getMessage, (data) => { // socket server sends message from others to current user
      // console.log(data.text);

      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    // check for arrival message and does that message is sent by the user in that conversation
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);   // add arrival message to the current conversation
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit(socketEvents.addUser, user._id);   // add current user id to the socket server
    socket.current.on(socketEvents.getUsers, (users) => {  // get online users currently on socket server
      const currentOnlineUsersId =  users.filter(u => u.userId !== user._id).map(u => u.userId);
      setOnlineUsers(
        currentOnlineUsersId
      );
    });
  }, [user]);

  useEffect(() => {

    const getConversations = async () => {
      try {
        // const res = await axios.get("/conversations/" + user._id);
        const res = await axios.get(apiRoutes.getConversations(user._id));

        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();

  
  }, [user._id, arrivalMessage, currentChat]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        // const res = await axios.get("/messages/" + currentChat?._id);
        const res = await axios.get(apiRoutes.getMessages(currentChat?._id));
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );
    
    // current logged in user send message (in text as newMessage to the other though socker server)
    socket.current.emit(socketEvents.sendMessage, {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

    try {
      // const res = await axios.post("/messages", message); // create that new message on api server
      const res = await axios.post(apiRoutes.createAMessage, message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    
    <body>
      {/* <!-- layout --> */}
      <div class="layout">

          {/* <!-- navigation --> */}
          <Navigation user = {user} setCurrentNavigation = {setCurrentNavigation} setProfileBarActive = {setProfileBarActive}/>
          {/* <!-- ./ navigation --> */}

          {/* <!-- content --> */}
          <div class="content">
            {/* <!-- sidebar group --> */}
            <div class="sidebar-group">
              {
                currentNavigation === navigations.conversations ? 
                // <!-- Conversations sidebar --> 
                <ConversationSidebar 
                  conversations={conversations} 
                  currentUser = {user} 
                  setCurrentChat = {setCurrentChat} 
                  onlineUsersId = {onlineUsers} 
                  setCurrentNavigation = {setCurrentNavigation}  
                />
                /* <!-- ./ Conversations sidebar --> */
                : <></>
              }
              {
                currentNavigation === navigations.onlineFriends ? 
                /* <!-- Friends sidebar --> */
                <FriendsSidebar 
                  onlineUsersId={onlineUsers}
                  currentId={user._id}
                  setCurrentChat={setCurrentChat}
                />
                /* <!-- ./ Friends sidebar --> */
                : <></>
              }
            </div>
            {/* <!-- ./ sidebar group --> */}

            {/* <!-- chat --> */}
            {currentChat ? (
              <CurrentChatBox 
                messages={messages}
                user = {user}
                setNewMessage = {setNewMessage}
                newMessage = {newMessage}
                handleSubmit = {handleSubmit}
                scrollRef = {scrollRef}
                membersId = {currentChat.members}
                currentChat = {currentChat}
              />
            ) : (
              <span style = {{ margin: 'auto', textAlign: 'center', fontSize: '25px' }}>
                Open a conversation to start a chat or create new chat.
              </span>
            )}
            {/* <!-- ./ chat --> */}

            {/* <!-- profile bar --> */}
            <ProfileBar 
              user={user} 
              isProfileBarActive = {isProfileBarActive} 
              setProfileBarActive = {setProfileBarActive} 
            />
            {/* <!-- ./ profile bar --> */}
          </div>
          {/* <!-- ./ content --> */}

      </div>
      {/* <!-- ./ layout --> */}

    </body>
  );
}
