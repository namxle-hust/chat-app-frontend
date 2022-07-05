import * as React from 'react';
import Conversation from "../conversations/Conversation";
import { Tooltip } from '@mui/material';
import { navigations } from '../../utils-contants';
import NewGroupModal from '../../modals/NewGroupModal';
import axios from "axios";
import { apiRoutes, axiosHeadersObject } from "../../utils-contants";
import { useState } from 'react';
import { useEffect } from 'react';

export default function ConversationSidebar ({ conversations, currentUser, setCurrentChat, onlineUsersId, setCurrentNavigation, arrivalMessage }) {
    
    const [filterConversations, setFilterConversations] = useState([]);
    const [filterText, setFilterText] = useState('');
    
    // ---------------- modal ------------------------------------
    const [openNewGroupModal, setOpenNewGroupModal] = React.useState(false);
    const handleOpenModal = () => setOpenNewGroupModal(true);
    const handleCloseModal = () => setOpenNewGroupModal(false);

    // click on a conversation to go to a conversation
    const handleClick = async (conv) => {
        try {
            
            // if private chat
            if (!conv.is_group) {
                const res = await axios.get(
                    apiRoutes.findAConversation(conv.user_id),
                    axiosHeadersObject()
                );
    
                const conversation = {
                    is_group: false,
                    userReceiveId: conv.user_id,
                    ...res.data.data
                };
                

                setCurrentChat({...conversation});
            
            } else {
                // if group chat
                const res = await axios.get(
                    apiRoutes.findGroupConversation(conv.conversation_id),
                    axiosHeadersObject()
                );

                // console.log(res);
    
                const conversation = {
                    is_group: true,
                    conversation_id: conv.conversation_id,
                    ...res.data.data
                };
                

                setCurrentChat({...conversation});
            }

        } catch (err) {
            console.log(err);
        }
    };

    const filterSearchConversations =(searchText) => {
        const filtered = conversations.filter(conv => {
            if (conv.conversation_name.includes(searchText)) {
                return true;
            }

            return false;
        });

        setFilterConversations(filtered);
    }

    return (
        <>
            <NewGroupModal open = {openNewGroupModal} handleOpen = {handleOpenModal} handleClose = {handleCloseModal} />
            <div id="chats" className ="sidebar active">
                <header>
                    <span>Conversations</span>
                    <ul className ="list-inline">
                        <div className ="list-inline-item" onClick = { handleOpenModal }>
                            <Tooltip title={<span style={{  fontSize: '14px' }}> New Group </span>} placement="bottom">
                                <li data-toggle="tooltip" title="" data-original-title="New group">
                                    <a className ="btn btn-outline-light" href="#" data-toggle="modal" data-target="#newGroup">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className ="feather feather-users"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                                    </a>
                                </li>
                            </Tooltip>
                        </div>
                        <div className ="list-inline-item" onClick = { () => { setCurrentNavigation(navigations.onlineFriends) } }>
                            <Tooltip title={<span style={{  fontSize: '14px' }}> New Chat </span>} placement="bottom">
                                <li className ="list-inline-item">
                                    <a className ="btn btn-outline-light" data-toggle="tooltip" title="" href="#" data-navigation-target="friends" data-original-title="New chat">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className ="feather feather-plus-circle"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                                    </a>
                                </li>
                            </Tooltip>
                        </div>
                    </ul>
                </header>
                <form>
                    <input 
                        type="text" 
                        className ="form-control" 
                        placeholder="Search chats" 
                        onChange = {(e) => {
                            setFilterText(e.target.value);
                            filterSearchConversations(e.target.value);
                        }}
                        value = {filterText}
                    />
                </form>
                <div className ="sidebar-body" tabIndex="2" style={{overflow: "hidden", outline: "none", overflowY: 'scroll' }}>
                    <ul className ="list-group list-group-flush">

                        {!filterText ? 
                            conversations.map((c, index) => { 
                                let isOnline = false;

                                if (!c.is_group) {
                                    if (onlineUsersId.includes(c.user_id)) isOnline = true;
                                } else {
                                    // ko lam online oke :))
                                }


                                return (
                                    <li key={index} onClick={() => { handleClick(c) }}>
                                        <Conversation 
                                            conversation={c} 
                                            isOnline = {isOnline}
                                            shouldIndam = {c.is_black}
                                        />
                                    </li>
                                )
                            }) : 
                            filterConversations.map((c, index) => { 
                                let isOnline = false;

                                if (!c.is_group) {
                                    if (onlineUsersId.includes(c.user_id)) isOnline = true;
                                } else {
                                    // ko lam online oke :))
                                }

                                return (
                                    <li key={index} onClick={() => { handleClick(c) }}>
                                        <Conversation 
                                            conversation={c} 
                                            isOnline = {isOnline}
                                            shouldIndam = {c.is_black}
                                        />
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        </>
    );
}
