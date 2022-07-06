import Navigation from "../../components/navigation/Navigation";
import CurrentChatBox from "../../components/currentChatBox/CurrentChatBox";
import FriendsSidebar from "../../components/friendsSidebar/FriendsSidebar";
import ProfileBar from "../../components/profileBar/ProfileBar";
import ConversationSidebar from "../../components/conversationsSidebar/ConversationSidebar";

import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { apiRoutes, axiosHeadersObject, navigations, socketEvents } from '../../utils-contants';
import VideoCallModal from '../../modals/VideoCallModal';

// ------------------ socket ----------------------
import socketIOClient  from "socket.io-client";
import * as sailsIOClient from 'sails.io.js';

// ----------------- ./socket ---------------------

// ------------------- socket -------------------------------
let ioClient;
// -------------------- ./socket ----------------------------

export default function Messenger() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);         // messages for current chat box
  const [newMessage, setNewMessage] = useState("");     // new message when typing text box
  const [arrivalMessage, setArrivalMessage] = useState(null);   // arrival message for current chat
  const [onlineUsersId, setOnlineUsersId] = useState([]);   // store online users' ids
  const [currentNavigation, setCurrentNavigation] = useState(navigations.conversations);
  const [isProfileBarActive, setProfileBarActive] = useState(false);
  const [profileBarUserInfo, setProfileBarUserInfo] = useState(null);
  // const [connectSocketSucess, setConnectSocketSuccess] = useState(false);
  const [deliveredMessage, setDeliveredMessage] = useState(null);  
  // last message delivered by current logged in user so basicly we'll still have to use message id :)
  // search id from last to first for faster finding

  const [messagesQueue, setMessagesQueue] = useState([]);   // for potato machine like macos :V

  const [userUpdated, setUserUpdated] = useState(false);  // to rerender the whole page when updated an user profile

  // ---------- video call modal ---------
  const [openVideoCallModal, setOpenVideoCallModal] = useState(false);

  const [currentCallingUser, setCurrentCallingUser] = useState(null);
  const [currentCallId, setCurrentCallId] = useState(null);
  const [isCurrentGroupCall, setIsCurrentGroupCall] = useState(false);

  const handleOpenModal = () => setOpenVideoCallModal(true);
  const handleCloseModal = () => setOpenVideoCallModal(false);
  // ------- ./modal ----------

  const { user } = useContext(AuthContext);
  const scrollRef = useRef();

  let runOneTime = true;
  let isMessageQueueDone = true;   // for potato machine like macos :V

  useEffect(() => {

    delete socketIOClient.sails;
    ioClient = sailsIOClient(socketIOClient);

    ioClient.sails.url = "http://localhost:6002";
    ioClient.sails.useCORSRouteToGetCookie = false;
    ioClient.sails.query = `token=${localStorage.getItem('token')}`;

    if (runOneTime) {
      ioClient.socket.on('getUsers', function (res) {  // get currently online users
        // console.log('online: ', res.data);
        setOnlineUsersId(res.data);
      })

      ioClient.socket.on('updateMessage', function(res) {
        console.log('update delivered message', res);
        setDeliveredMessage(res);
      })

      // someone call you private chat
      ioClient.socket.on('calling', function(res) {
        console.log('video calling: ', res);

        const getUser = async(user_id, call_id) => {
          try {
            const tmp = await axios.get(apiRoutes.getUser(user_id), axiosHeadersObject());

            setCurrentCallingUser(tmp.data);
            setCurrentCallId(call_id);
            setIsCurrentGroupCall(false);

            // open video modal
            handleOpenModal();
          } catch(err) {
            console.log(err);
          }           
        }
        
        getUser(res.user_sent_id, res.id);
      })

      // someone call you group chat
      ioClient.socket.on('group_calling', function(res) {

        console.log('video group calling: ', res);

                    const getUser = async(group_id, call_id) => {
                      try {
                        const tmp = await axios.get(
                          apiRoutes.findGroupConversation(group_id),
                          axiosHeadersObject()
                        );

                        console.log(tmp);

                        setCurrentCallingUser({...tmp.data.data, group_id: group_id});
                        setCurrentCallId(call_id);
                        setIsCurrentGroupCall(true);

                        // open video modal
                        handleOpenModal();
                      } catch(err) {
                        console.log(err);
                      }           
                    }
        
        getUser(res.group_id, res.id);
      })
  
      ioClient.socket.on('getMessage', function (res) {
        console.log('arrival message !: ', res);

        setArrivalMessage(res);
        setMessagesQueue([...messagesQueue, res]); // push
      })

      runOneTime = false;
    }

    ioClient.socket.get('/subscribe', function (res) {  // connect to socket server realtime
      // if (res.status === 'success') setConnectSocketSuccess(true);
      console.log(res);
      console.log('connect socket successfully !');
    })

  }, []);


  // for potato machine like macos :V
  useEffect(() => {
    if (messagesQueue.length > 0 && isMessageQueueDone) {
      isMessageQueueDone = false;     // block other messages in queue
      const res = messagesQueue.shift(); // pop (not mutating so the messagesQueue useEffect will not be triggered)
      
      if (res.message_type != 'call') {
        console.log('update message: ', res);

        if (!currentChat?.is_group) {
          ioClient.socket.get('/update-message', { id: res.id, status: 'delivered', user_sent_id: res.user_sent_id }, function (d) {
            isMessageQueueDone = true;  // allow other messages in queue since the current message queue is done.
          })
        } else {
          ioClient.socket.get('/update-group-message', { id: res.id, status: 'delivered' }, function (d) {
            isMessageQueueDone = true;  // allow other messages in queue since the current message queue is done.
          })
        }
      }
      
    }
  }, [messagesQueue]);


  // after choosing a current chat, set messages of that current chat
  useEffect(() => {
    setMessages([]);

    if (currentChat) {
      setMessages(currentChat.chats);
    }

  }, [currentChat]);

  useEffect(() => {
    // check for arrival message (real time)
    // should check if the sender of the arrival message is in the current chat box (since current chat box display messages)
    if (!currentChat?.is_group) {
      if (!currentChat?.is_group && currentChat?.userReceiveId === arrivalMessage?.user_sent_id 
          || currentChat?.userReceiveId === arrivalMessage?.user_recv_id) {
        setMessages([...messages, arrivalMessage]);   // add arrival message to the current chat
      }
    } else {
      if (currentChat?.conversation_id === arrivalMessage?.group_id) {
        setMessages([...messages, arrivalMessage]);   // add arrival message to the current chat
      }
    }

  }, [arrivalMessage]);

  useEffect(() => {
    
    const getConversations = async () => { // arrival message to check for new conversations
      try {
        let convImg = '';

        const res = await axios.get(apiRoutes.getConversations, axiosHeadersObject());

        let tmpConversations = res.data.data;
        tmpConversations = await Promise.all(tmpConversations.map(async (conv) => {
          if (!conv.is_group) {
            // set image for conversation
            const res = await axios.get(apiRoutes.getUser(conv.user_id), axiosHeadersObject());
            const receiver = res.data;

            convImg = receiver.profile_pic_url;
          }

          return {
            convImg: convImg,
            ...conv,
          }
        }));

        setConversations(tmpConversations);
      } catch (err) {
        console.log(err);
      }
    };

    getConversations();
  }, [arrivalMessage, messages]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log(newMessage);
    if (newMessage.match(/^\s+$/) || !newMessage) return;

    // send private chat message (not a group)
    if (!currentChat.is_group) {

      const sendMessage = {
        message: newMessage,
        recvId: currentChat.userReceiveId,
        msg_type: "string" 
      };
  
      ioClient.socket.get('/send', {...sendMessage}, function (res) {
        // console.log(res.data);
        setMessages([...messages, res.data]);
      })

    } else {

      const sendMessage = {
        message: newMessage,
        recvId: currentChat.conversation_id,
        msg_type: "string" 
      };

      // console.log(sendMessage);
  
      ioClient.socket.get('/send-group', {...sendMessage}, function (res) {
        // console.log(res);
        setMessages([...messages, res.data]);
      })
    }

    setNewMessage("");
  };

  const handleVideoCallDecline =(user_recv_id, msg_id, isGroupCall) => {
    if (!isGroupCall) {
      ioClient.socket.get('/answer-call', {
        response: 'decline',
        user_recv_id: user_recv_id,
        msg_id: msg_id
      }, function (res) {
        console.log(res);
      })

    } else {

    }
  }

  useEffect(() => {
    // upload image :')
    if (newMessage?.type === 'image') {
      // send private chat message (not a group)
      if (!currentChat.is_group) {

        const sendMessage = {
          message: newMessage.url,
          recvId: currentChat.userReceiveId,
          msg_type: "image_url" 
        };
    
        ioClient.socket.get('/send', {...sendMessage}, function (res) {
          setMessages([...messages, res.data]);
        })

      } else {
        const sendMessage = {
          message: newMessage.url,
          recvId: currentChat.conversation_id,
          msg_type: "image_url" 
        };
    
        ioClient.socket.get('/send-group', {...sendMessage}, function (res) {
          setMessages([...messages, res.data]);
        })
      }

      setNewMessage('');
    }

  }, [newMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    
    <body>
      {
        // currentCallingUser !== null && currentCallId !== null? 
        <VideoCallModal 
          open = {openVideoCallModal} 
          handleOpen = {handleOpenModal} 
          handleClose = {handleCloseModal} 
          currentCallingUser = {currentCallingUser}
          setCurrentCallingUser = {setCurrentCallingUser}
          currentCallId = {currentCallId}
          setCurrentCallId = {setCurrentCallId}
          handleVideoCallDecline = {handleVideoCallDecline}
          arrivalMessage = {arrivalMessage}
          isCurrentGroupCall = {isCurrentGroupCall}
          setIsCurrentGroupCall = {setIsCurrentGroupCall}
        /> 
        // : <></>
      }
       
      {/* <!-- layout --> */}
      <div className ="layout">

        {/* <!-- navigation --> */}
        <Navigation 
          user = {user} 
          setCurrentNavigation = {setCurrentNavigation} 
          setProfileBarActive = {setProfileBarActive} 
          setProfileBarUserInfo = {setProfileBarUserInfo}
          currentNavigation = {currentNavigation}
          userUpdated = {userUpdated}
          setUserUpdated = {setUserUpdated}
        />
        {/* <!-- ./ navigation --> */}

        {/* <!-- content --> */}
        <div className ="content">
          {/* <!-- sidebar group --> */}
          <div className ="sidebar-group">
            {
              currentNavigation === navigations.conversations ? 
              // <!-- Conversations sidebar --> 
              <ConversationSidebar 
                conversations={conversations} 
                currentUser = {user} 
                setCurrentChat = {setCurrentChat} 
                onlineUsersId = {onlineUsersId} 
                setCurrentNavigation = {setCurrentNavigation}  
                arrivalMessage = {arrivalMessage}
              />
              /* <!-- ./ Conversations sidebar --> */
              : <></>
            }
            {
              currentNavigation === navigations.onlineFriends ? 
              /* <!-- Friends sidebar --> */
              <FriendsSidebar 
                onlineUsersId={onlineUsersId}
                currentId={user.id}
                setCurrentChat={setCurrentChat}
                setProfileBarActive={setProfileBarActive}
                setProfileBarUserInfo = {setProfileBarUserInfo}
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
              currentChat = {currentChat}
              deliveredMessage = {deliveredMessage}
              onlineUsersId = {onlineUsersId}
            />
          ) : (
            <span style = {{ margin: 'auto', textAlign: 'center', fontSize: '25px' }}>
              Open a conversation to start a chat or click on a friend.
            </span>
          )}
          {/* <!-- ./ chat --> */}

          {/* <!-- profile bar --> */}
          <ProfileBar 
            user={profileBarUserInfo} 
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
