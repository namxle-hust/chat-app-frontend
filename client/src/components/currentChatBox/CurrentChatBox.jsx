import * as React from "react";
import Message from "../../components/message/Message";
import { useEffect, useState } from "react";
import { apiRoutes } from "../../utils-contants";
import VideoCallModal from "../../modals/VideoCallModal";
import axios from "axios";
import { axiosHeadersObject } from "../../utils-contants";

export default function CurrentChatBox({
  messages,
  user,
  setNewMessage,
  newMessage,
  handleSubmit,
  scrollRef,
  currentChat,
}) {
  const [membersInBox, setMembersInBox] = useState([]);
  const [chatBoxImg, setChatBoxImg] = useState("");

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  // ---------- modal ---------
  const [openVideoCallModal, setOpenVideoCallModal] = React.useState(false);
  const handleOpenModal = () => setOpenVideoCallModal(true);
  const handleCloseModal = () => setOpenVideoCallModal(false);
  // ------- ./modal ----------

  // console.log('messages:', messages);

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

  // useEffect(() => {
  //     // if only 2 members
  //     // if (membersId.length === 2) {
  //     //     const sender = membersInBox.find(member => member.id !== user.id);
  //     //     setChatBoxImg(sender?.profilePicture);
  //     //     setChatBoxName(sender?.username);
  //     // } else {
  //     //     // if is a group, only show svg vector img with first letter of group name: 'group name'.
  //     // }
  // }, [membersInBox]);

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

  // test useEffect
  // useEffect(() => {
  //   console.log('members in box: ', membersInBox);
  // }, [membersInBox]);

  return (
    <>
      <VideoCallModal
        open={openVideoCallModal}
        handleOpen={handleOpenModal}
        handleClose={handleCloseModal}
      />
      <div className="chat">
        <div className="chat-header">
          <div className="chat-header-user">
            <figure className="avatar">
              <img src={chatBoxImg} className="rounded-circle" alt="image" />
            </figure>
            <div>
              <h5>{currentChat.conversationName}</h5>
              {/* <small className ="text-success">
                            <i>writing...</i>
                        </small> */}
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
                onClick={handleOpenModal}
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
                <p className="lead">write a message</p>
              </div>
            ) : (
              <div className="messages">
                {messages.map((m, index) => {
                  if (!m) return <></>;

                  const sender = membersInBox.find(
                    (member) => member?.id === m?.user_sent_id
                  );

                  return (
                    <Message
                      key={index}
                      message={m?.message}
                      messageType={m?.message_type}
                      own={m?.user_sent_id === user.id}
                      senderUsername={sender?.user_name}
                      senderProfilePicture={sender?.profile_pic_url}
                      messageTime={m?.message_time}
                    />
                  );
                })}
              </div>
            )
          }
        </div>
        <div className="chat-footer">
          <form>
            {/* <div>
                        <button className ="btn btn-light mr-3" data-toggle="tooltip" title="" type="button" data-original-title="Emoji">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className ="feather feather-smile"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>
                        </button>
                    </div> */}
            <input
              type="text"
              className="form-control"
              placeholder="Write a message."
              onChange={(e) => setNewMessage(e.target.value)}
              value={newMessage}
            />
            <div className="form-buttons">
              <button
                className="btn btn-light"
                data-toggle="tooltip"
                title=""
                type="button"
                data-original-title="Add files"
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
                  className="feather feather-paperclip"
                >
                  <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
                </svg>
              </button>
              {/* <button className ="btn btn-light d-sm-none d-block" data-toggle="tooltip" title="" type="button" data-original-title="Send a voice record">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className ="feather feather-mic"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
                        </button> */}
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
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
