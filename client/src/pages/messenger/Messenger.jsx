import Navigation from "../../components/navigation/Navigation";
import CurrentChatBox from "../../components/currentChatBox/CurrentChatBox";
import FriendsSidebar from "../../components/friendsSidebar/FriendsSidebar";
import ProfileBar from "../../components/profileBar/ProfileBar";
import ConversationSidebar from "../../components/conversationsSidebar/ConversationSidebar";

import { useContext, useEffect, useRef, useState, useCallback } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import {
  apiRoutes,
  axiosHeadersObject,
  navigations,
  socketEvents,
} from "../../utils-contants";

// ------------------ socket ----------------------
import socketIOClient from "socket.io-client";
import * as sailsIOClient from "sails.io.js";

// ----------------- ./socket ---------------------

// ------------------- socket -------------------------------
let ioClient;
// -------------------- ./socket ----------------------------

export default function Messenger() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]); // messages for current chat box
  const [newMessage, setNewMessage] = useState(""); // new message when typing text box
  const [arrivalMessage, setArrivalMessage] = useState(null); // arrival message for current chat
  const [onlineUsersId, setOnlineUsersId] = useState([]); // store online users' ids
  const [currentNavigation, setCurrentNavigation] = useState(
    navigations.conversations
  );
  const [isProfileBarActive, setProfileBarActive] = useState(false);
  const [profileBarUserInfo, setProfileBarUserInfo] = useState(null);
  // const [connectSocketSuccess, setConnectSocketSuccess] = useState(false);

  const { user } = useContext(AuthContext);
  const scrollRef = useRef();

  let runOneTime = true;

  useEffect(() => {
    delete socketIOClient.sails;
    ioClient = sailsIOClient(socketIOClient);

    ioClient.sails.url = "http://localhost:6002";
    ioClient.sails.useCORSRouteToGetCookie = false;
    ioClient.sails.query = `token=${localStorage.getItem("token")}`;

    ioClient.socket.get("/subscribe", function (res) {
      // connect to socket server realtime
      console.log(res);
      console.log("connect socket successfully !");
    });

    if (runOneTime) {
      ioClient.socket.on("getUsers", function (res) {
        // get currently online users
        // console.log('online: ', res.data);
        setOnlineUsersId(res.data);
      });

      ioClient.socket.on("updateMessage", function (res) {
        console.log("udpate message", res);
      });

      ioClient.socket.on("getMessage", function (res) {
        console.log("arrival message !: ", res);

        setArrivalMessage(res);

        if (res.message_type != "call") {
          ioClient.socket.get(
            "/update-message",
            { id: res.id, status: "delivered" },
            function (d) {}
          );
        }
      });

      runOneTime = false;
    }
  }, []);

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
    if (
      !currentChat?.is_group &&
      currentChat?.userReceiveId === arrivalMessage?.user_sent_id
    ) {
      setMessages([...messages, arrivalMessage]); // add arrival message to the current chat
    }
  }, [arrivalMessage]);

  useEffect(() => {
    const getConversations = async () => {
      // arrival message to check for new conversations
      try {
        const res = await axios.get(
          apiRoutes.getConversations,
          axiosHeadersObject()
        );
        setConversations(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    getConversations();
  }, [arrivalMessage, messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // send private chat message (not a group)
    if (!currentChat.is_group) {
      // console.log('does this trigger ?')

      const sendMessage = {
        message: newMessage,
        recvId: currentChat.userReceiveId,
        msg_type: "string",
      };

      ioClient.socket.get("/send", { ...sendMessage }, function (res) {
        setMessages([...messages, res.data]); // reverse later
      });
    } else {
    }

    setNewMessage("");
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <body>
      {/* <!-- layout --> */}
      <div className="layout">
        {/* <!-- navigation --> */}
        <Navigation
          user={user}
          setCurrentNavigation={setCurrentNavigation}
          setProfileBarActive={setProfileBarActive}
          setProfileBarUserInfo={setProfileBarUserInfo}
          currentNavigation={currentNavigation}
        />
        {/* <!-- ./ navigation --> */}

        {/* <!-- content --> */}
        <div className="content">
          {/* <!-- sidebar group --> */}
          <div className="sidebar-group">
            {currentNavigation === navigations.conversations ? (
              // <!-- Conversations sidebar -->
              <ConversationSidebar
                conversations={conversations}
                currentUser={user}
                setCurrentChat={setCurrentChat}
                onlineUsersId={onlineUsersId}
                setCurrentNavigation={setCurrentNavigation}
              />
            ) : (
              /* <!-- ./ Conversations sidebar --> */
              <></>
            )}
            {currentNavigation === navigations.onlineFriends ? (
              /* <!-- Friends sidebar --> */
              <FriendsSidebar
                onlineUsersId={onlineUsersId}
                currentId={user.id}
                setCurrentChat={setCurrentChat}
                setProfileBarActive={setProfileBarActive}
                setProfileBarUserInfo={setProfileBarUserInfo}
              />
            ) : (
              /* <!-- ./ Friends sidebar --> */
              <></>
            )}
          </div>
          {/* <!-- ./ sidebar group --> */}

          {/* <!-- chat --> */}
          {currentChat ? (
            <CurrentChatBox
              messages={messages}
              user={user}
              setNewMessage={setNewMessage}
              newMessage={newMessage}
              handleSubmit={handleSubmit}
              scrollRef={scrollRef}
              currentChat={currentChat}
            />
          ) : (
            <span
              style={{ margin: "auto", textAlign: "center", fontSize: "25px" }}
            >
              Open a conversation to start a chat or click on a friend.
            </span>
          )}
          {/* <!-- ./ chat --> */}

          {/* <!-- profile bar --> */}
          <ProfileBar
            user={profileBarUserInfo}
            isProfileBarActive={isProfileBarActive}
            setProfileBarActive={setProfileBarActive}
          />
          {/* <!-- ./ profile bar --> */}
        </div>
        {/* <!-- ./ content --> */}
      </div>
      {/* <!-- ./ layout --> */}
    </body>
  );
}
