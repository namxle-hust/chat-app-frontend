import * as React from "react";
import Message from "../../components/message/Message";
import { useEffect, useState } from "react";
import { apiRoutes } from "../../utils-contants";
import axios from "axios";
import { axiosHeadersObject } from "../../utils-contants";
import Share from "../share/Share";
import EmojiPicker from "../emojiPicker/EmojiPicker";
import {
  SentimentSatisfiedAltOutlined,
  PeopleAlt,
  FiberManualRecord,
} from "@material-ui/icons";
import ChatBoxMembersModal from "../../modals/ChatBoxMembersModal";

export default function CurrentChatBox({
  messages,
  user,
  setNewMessage,
  newMessage,
  handleSubmit,
  scrollRef,
  currentChat,
  deliveredMessage,
  onlineUsersId,
}) {
  const [membersInBox, setMembersInBox] = useState([]);
  const [chatBoxImg, setChatBoxImg] = useState("");
  const [disableTextInput, setDisableTextInput] = useState(false);
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [isOnline, setIsOnline] = useState(false); // for private chat only

  // --------- modal ------------------
  const [openMembersModal, setOpenMembersModal] = useState(false);
  const handleOpenModal = () => setOpenMembersModal(true);
  const handleCloseModal = () => setOpenMembersModal(false);
  // ----------------------------------

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    // if only 2 members
    if (!currentChat.is_group) {
      const get2Members = async () => {
        const res = await axios.get(
          apiRoutes.getUser(currentChat.userReceiveId),
          axiosHeadersObject()
        );
        const receiver = res.data;

        setMembersInBox([user, receiver]); // the current logged in user always at the index 0.

        if (onlineUsersId.includes(receiver.id)) {
          setIsOnline(true);
        } else {
          setIsOnline(false);
        }
      };

      get2Members();
    } else {
      // group multiple members
      const getMembers = async () => {
        const responses = await Promise.all(
          currentChat.members.map((id) =>
            axios.get(apiRoutes.getUser(id), axiosHeadersObject())
          )
        );
        const tmp = responses.map((res) => res.data);

        setMembersInBox(tmp);
      };

      getMembers();
    }
  }, [currentChat]);

  useEffect(() => {
    if (!currentChat.is_group) {
      // receiver only
      if (onlineUsersId.includes(membersInBox[1]?.id)) {
        setIsOnline(true);
      } else {
        setIsOnline(false);
      }
    } else {
      setIsOnline(false);
    }
  }, [onlineUsersId, currentChat]);

  useEffect(() => {
    if (!currentChat.is_group) {
      setChatBoxImg(
        membersInBox[1]?.profile_pic_url
          ? membersInBox[1].profile_pic_url
          : PF + "person/noAvatar.png"
      );
    } else {
      setChatBoxImg(PF + "person/groupChat.png");
    }
  }, [membersInBox]);

  useEffect(() => {
    // auto scroll to the bottom of chat box
    var elem = document.getElementById("chat-box-content");
    elem.scrollTop = elem.scrollHeight;
  }, [messages, currentChat, membersInBox]);

  const handleVideoCall = () => {
    function createPopupWin(pageURL, pageTitle, width, height) {
      var leftPosition, topPosition;
      //Allow for borders.
      leftPosition = window.screen.width / 2 - width / 2;
      //Allow for title and status bars.
      topPosition = window.screen.height / 2 - (height / 2 + 50);
      window.open(
        pageURL,
        pageTitle,
        "resizable=yes, width=" +
          width +
          ", height=" +
          height +
          ", top=" +
          topPosition +
          ", left=" +
          leftPosition
      );
    }

    if (!currentChat.is_group) {
      let tmpObj = {
        user_token: localStorage.getItem("token"),
        user_id: membersInBox[1].id,
        status: "calling",
        call_id: null,
      };

      let url = `http://localhost:9090/${tmpObj.user_token}/${tmpObj.user_id}/${tmpObj.status}/${tmpObj.call_id}`;
      createPopupWin(url, "Video Call", "990", "650");
    } else {
      // group video chat

      let tmpObj = {
        user_token: localStorage.getItem("token"),
        group_id: currentChat.conversation_id,
        status: "calling",
        call_id: null,
      };

      let url = `http://localhost:9090/group/${tmpObj.user_token}/${tmpObj.group_id}/${tmpObj.status}/${tmpObj.call_id}`;
      createPopupWin(url, "Video Call", "990", "650");
    }
  };

  return (
    <>
      <ChatBoxMembersModal
        open={openMembersModal}
        handleOpen={handleOpenModal}
        handleClose={handleCloseModal}
        currentChat={currentChat}
        membersInBox={membersInBox}
      />
      <div className="chat">
        <div className="chat-header">
          <div className="chat-header-user">
            <figure className="avatar" style={{ marginTop: "0px" }}>
              <img src={chatBoxImg} className="rounded-circle" alt="image" />
            </figure>
            <div>
              <h5>{currentChat.conversationName}</h5>
              {isOnline ? (
                <span>
                  Online{" "}
                  <FiberManualRecord fontSize="small" htmlColor="#00ba51" />{" "}
                </span>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="chat-header-action">
            <ul className="list-inline">
              {currentChat?.is_group ? (
                <li
                  className="list-inline-item"
                  data-toggle="tooltip"
                  title=""
                  onClick={handleOpenModal}
                >
                  <a
                    href="#"
                    className="btn btn-outline-light text-success"
                    data-toggle="modal"
                  >
                    <PeopleAlt />
                  </a>
                </li>
              ) : (
                <></>
              )}
              <li
                className="list-inline-item"
                data-toggle="tooltip"
                title=""
                data-original-title="Video call"
                onClick={handleVideoCall}
              >
                <a
                  href="#"
                  className="btn btn-outline-light text-warning"
                  data-toggle="modal"
                  data-target="#videoCall"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-video"
                  >
                    <polygon points="23 7 16 12 23 17 23 7"></polygon>
                    <rect
                      x="1"
                      y="5"
                      width="15"
                      height="14"
                      rx="2"
                      ry="2"
                    ></rect>
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div
          className="chat-body scrollbar"
          id="chat-box-content"
          tabIndex="1"
          style={{
            overflow: "hidden",
            outline: "none",
            overflowY: "auto",
          }}
          ref={scrollRef}
        >
          {
            /* <!-- .no-message --> */
            !messages.length || !membersInBox.length ? (
              <div className="no-message-container">
                <div className="row mb-5"></div>
                {/* <p className ="lead">write a message</p> */}
              </div>
            ) : (
              <div className="messages">
                {messages.map((m, index) => {
                  if (!m) return <></>;
                  let sender;
                  let own = false;

                  if (!currentChat.is_group) {
                    sender = membersInBox.find(
                      (member) => member?.id === m?.user_sent_id
                    );
                    own = m?.user_sent_id === user.id;
                  } else {
                    sender = membersInBox.find(
                      (member) => member?.id === m?.user_id
                    );
                    own = m?.user_id === user.id;
                  }

                  const isLastMessSentByCurrentUser =
                    m?.id === deliveredMessage?.id;
                  const isLastMessDelivered =
                    deliveredMessage?.status === "delivered";

                  return (
                    <Message
                      key={index}
                      message={m?.message}
                      messageType={m?.message_type}
                      own={own}
                      senderUsername={sender?.user_name}
                      senderProfilePicture={sender?.profile_pic_url}
                      messageTime={m?.message_time}
                      messageTimeTotal={m?.msg_time_total}
                      isLastMessSent={isLastMessSentByCurrentUser}
                      isLastMessDelivered={isLastMessDelivered}
                      is_group={currentChat?.is_group}
                    />
                  );
                })}
              </div>
            )
          }
        </div>
        <div className="chat-footer" style={{ position: "relative" }}>
          <form>
            {/* <div>
                        <button className ="btn btn-light mr-3" data-toggle="tooltip" title="" type="button" data-original-title="Emoji">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className ="feather feather-smile"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>
                        </button>
                    </div> */}
            {!disableTextInput ? (
              <>
                <SentimentSatisfiedAltOutlined
                  fontSize="medium"
                  onClick={() => {
                    setOpenEmojiPicker(!openEmojiPicker);
                  }}
                />
                {openEmojiPicker ? (
                  <EmojiPicker
                    newMessage={newMessage}
                    setNewMessage={setNewMessage}
                  />
                ) : (
                  <></>
                )}
                <input
                  type="text"
                  className="form-control"
                  placeholder="Write a message."
                  onChange={(e) => setNewMessage(e.target.value)}
                  value={newMessage}
                  style={{ marginRight: "10px", marginLeft: "10px" }}
                />
              </>
            ) : (
              <></>
            )}
            <div className="form-buttons">
              <Share
                disableTextInput={disableTextInput}
                setDisableTextInput={setDisableTextInput}
                setNewMessage={setNewMessage}
                handleSubmit={handleSubmit}
              />
              {!disableTextInput ? (
                <button
                  className="btn btn-primary"
                  type="submit"
                  onClick={(event) => {
                    handleSubmit(event);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-send"
                  >
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                </button>
              ) : (
                <></>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
