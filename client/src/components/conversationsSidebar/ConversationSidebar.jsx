import * as React from 'react';
import Conversation from "../conversations/Conversation";
import { Tooltip } from '@mui/material';
import { navigations } from '../../utils-contants';
import NewGroupModal from '../../modals/NewGroupModal';

export default function ConversationSidebar ({ conversations, currentUser, setCurrentChat, onlineUsersId, setCurrentNavigation }) {
    const [openNewGroupModal, setOpenNewGroupModal] = React.useState(false);
    const handleOpenModal = () => setOpenNewGroupModal(true);
    const handleCloseModal = () => setOpenNewGroupModal(false);

    return (
        <>
            <NewGroupModal open = {openNewGroupModal} handleOpen = {handleOpenModal} handleClose = {handleCloseModal} />
            <div id="chats" class="sidebar active">
                <header>
                    <span>Conversations</span>
                    <ul class="list-inline">
                        <div class="list-inline-item" onClick = { handleOpenModal }>
                            <Tooltip title={<span style={{  fontSize: '14px' }}> New Group </span>} placement="bottom">
                                <li data-toggle="tooltip" title="" data-original-title="New group">
                                    <a class="btn btn-outline-light" href="#" data-toggle="modal" data-target="#newGroup">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-users"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                                    </a>
                                </li>
                            </Tooltip>
                        </div>
                        <div class="list-inline-item" onClick = { () => { setCurrentNavigation(navigations.onlineFriends) } }>
                            <Tooltip title={<span style={{  fontSize: '14px' }}> New Chat </span>} placement="bottom">
                                <li class="list-inline-item">
                                    <a class="btn btn-outline-light" data-toggle="tooltip" title="" href="#" data-navigation-target="friends" data-original-title="New chat">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus-circle"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                                    </a>
                                </li>
                            </Tooltip>
                        </div>
                        <li class="list-inline-item d-xl-none d-inline">
                            <a href="#" class="btn btn-outline-light text-danger sidebar-close">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </a>
                        </li>
                    </ul>
                </header>
                <form>
                    <input type="text" class="form-control" placeholder="Search chats" />
                </form>
                <div class="sidebar-body" tabindex="2" style={{overflow: "hidden", outline: "none" }}>
                    <ul class="list-group list-group-flush">
                        {conversations.map((c) => (
                            <li onClick={() => setCurrentChat(c)} >
                                <Conversation 
                                    conversation={c} 
                                    currentUser={currentUser} 
                                    onlineUsersId = {onlineUsersId}
                                    key={c._id} 
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}
