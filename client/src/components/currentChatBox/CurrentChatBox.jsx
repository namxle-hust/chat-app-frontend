import * as React from "react";
import Message from "../../components/message/Message";
import { useEffect, useState } from "react";
import { apiRoutes } from "../../utils-contants";
import axios from "axios";
import { axiosHeadersObject } from "../../utils-contants";
import Share from "../share/Share";
import EmojiPicker from "../emojiPicker/EmojiPicker";
import { SentimentSatisfiedAltOutlined } from "@material-ui/icons";

export default function CurrentChatBox({
  messages,
  user,
  setNewMessage,
  newMessage,
  handleSubmit,
  scrollRef,
  currentChat,
  deliveredMessage,
}) {
  const [membersInBox, setMembersInBox] = useState([]);
  const [chatBoxImg, setChatBoxImg] = useState("");
  const [disableTextInput, setDisableTextInput] = useState(false);
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);

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
      };

      get2Members();
    } else {
      // group multiple members
    }
  }, [currentChat]);

  useEffect(() => {
    if (!currentChat.is_group) {
      setChatBoxImg(
        membersInBox[1]?.profile_pic_url
          ? membersInBox[1].profile_pic_url
          : PF + "person/noAvatar.png"
      );
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

    let tmpObj = {
      user_token: localStorage.getItem("token"),
      user_id: membersInBox[1].id,
      status: "calling",
      call_id: null,
    };

    let url = `http://localhost:9090/${tmpObj.user_token}/${tmpObj.user_id}/${tmpObj.status}/${tmpObj.call_id}`;
    createPopupWin(url, "Video Call", "990", "650");
  };

  return (
    <>
      <div className="chat">
        <div className="chat-header">
          <div className="chat-header-user">
            <figure className="avatar">
              <img src={chatBoxImg} className="rounded-circle" alt="image" />
            </figure>
            <div>
              <h5>{currentChat.conversationName}</h5>
            </div>
          </div>
          <div className="chat-header-action">
            <ul className="list-inline">
              {/* <li className ="list-inline-item d-xl-none d-inline">
                            <a href="#" className ="btn btn-outline-light mobile-navigation-button">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className ="feather feather-menu"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                            </a>
                        </li> */}
              {/* <li className ="list-inline-item" data-toggle="tooltip" title="" data-original-title="Voice call">
                            <a href="#" className ="btn btn-outline-light text-success" data-toggle="modal" data-target="#call">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className ="feather feather-phone"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                            </a>
                        </li> */}
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
              {/* <li className ="list-inline-item">
                            <a href="#" className ="btn btn-outline-light" data-toggle="dropdown">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className ="feather feather-more-horizontal"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
                            </a>
                            <div className ="dropdown-menu dropdown-menu-right">
                                <a href="#" data-navigation-target="contact-information" className ="dropdown-item">Profile</a>
                                <a href="#" className ="dropdown-item">Add to archive</a>
                                <a href="#" className ="dropdown-item">Delete</a>
                                <div className ="dropdown-divider"></div>
                                <a href="#" className ="dropdown-item text-danger">Block</a>
                            </div>
                        </li> */}
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

                  const sender = membersInBox.find(
                    (member) => member?.id === m?.user_sent_id
                  );
               
                  const isLastMessSentByCurrentUser =
                    m?.id === deliveredMessage?.id;
                  const isLastMessDelivered =
                    deliveredMessage?.status === "delivered";

                  return (
                    <Message
                      key={index}
                      message={m?.message}
                      messageType={m?.message_type}
                      own={m?.user_sent_id === user.id}
                      senderUsername={sender?.user_name}
                      senderProfilePicture={sender?.profile_pic_url}
                      messageTime={m?.message_time}
                      messageTimeTotal={m?.msg_time_total}
                      isLastMessSent={isLastMessSentByCurrentUser}
                      isLastMessDelivered={isLastMessDelivered}
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
