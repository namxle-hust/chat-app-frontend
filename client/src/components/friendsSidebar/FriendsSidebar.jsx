import axios from "axios";
import * as React from 'react';
import { useEffect, useState } from "react";
import { apiRoutes, axiosHeadersObject } from "../../utils-contants";

 // --------------- dropdown menu import components ----------------
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
 // ------------- ./dropdown menu import components ------------------ 

export default function FriendsSidebar ({ onlineUsersId, currentId, setCurrentChat, setProfileBarActive, setProfileBarUserInfo }) {
    const [allFriends, setAllFriends] = useState([]);
    const [clickedUser, setClickedUser] = useState(null);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    // -------------------------
    const [filterFriends, setFilterFriends] = useState([]);
    const [filterText, setFilterText] = useState('');

    useEffect(() => {
        const getAllFriends = async () => {
            const res = await axios.get(apiRoutes.getAllUsers, axiosHeadersObject());
            const tmp = res.data.data.filter(f => f.id !== currentId);
            setAllFriends(tmp);
        };

        getAllFriends();
    }, [currentId]);

    // click on a online friend to go to conversation (private chat)
    const handleClick = async (user) => {
        try {
            const res = await axios.get(
                apiRoutes.findAConversation(user.id),
                axiosHeadersObject()
            );

            const conversation = {
                is_group: false,
                userReceiveId: user.id,
                ...res.data.data
            };

            setCurrentChat({...conversation});

        } catch (err) {
            console.log(err);
        }
    };

    // ------------- <drop down menu function> -------------
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    // ------------- </ drop down menu function> -------------

    useEffect(() => {
        setFilterFriends(allFriends);
    }, [allFriends]);

    const filterSearchFriends =(searchText) => {
        if (searchText === '') setFilterFriends(allFriends);

        const filtered = allFriends.filter(friend => {
            if (friend.user_name.includes(searchText)) {
                return true;
            }

            return false;
        });

        setFilterFriends(filtered);
    }

    return (
        <div id="friends" className ="sidebar active">
            <header>
                <span>Friends</span>
                {/* <ul className ="list-inline">
                    <li className ="list-inline-item" data-toggle="tooltip" title="" data-original-title="Add friends">
                        <a className ="btn btn-outline-light" href="#" data-toggle="modal" data-target="#addFriends">
                            <svg xmlns="http://www.w3.org/2000/s
                            vg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className ="feather feather-user-plus"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
                        </a>
                    </li>
                    <li className ="list-inline-item d-xl-none d-inline">
                        <a href="#" className ="btn btn-outline-light text-danger sidebar-close">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className ="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </a>
                    </li>
                </ul> */}
            </header>
            <form>
                <input 
                    type="text" 
                    className ="form-control" 
                    placeholder="Search friends" 
                    value = {filterText}
                    onChange = {(e) => {
                        setFilterText(e.target.value);
                        filterSearchFriends(e.target.value);
                    }}
                />
            </form>
            <div className ="sidebar-body" tabIndex="3" style = {{ overFlow: 'hidden', outline: 'none' }}>
                <ul className ="list-group list-group-flush">
                    {
                    
                    filterFriends.map((o) => {
                        return (
                            <li className ="list-group-item" data-navigation-target="chats" key={o.id}>
                                {
                                    onlineUsersId.includes(o.id) ? 
                                    <div onClick={() => { handleClick(o)}}>
                                        <figure className ="avatar avatar-state-success" style = {{ marginTop: '0px' }}>
                                            <img 
                                                src={
                                                    o?.profile_pic_url
                                                    ? o.profile_pic_url
                                                    : PF + "person/noAvatar.png"
                                                } 
                                                className ="rounded-circle" 
                                                alt="image" 
                                            />
                                        </figure>
                                    </div>
                                    : 
                                    <div onClick={() => { handleClick(o) }}>
                                        <figure className ="avatar" style = {{ marginTop: '0px' }}>
                                            <img 
                                                src={
                                                    o?.profile_pic_url
                                                    ? o.profile_pic_url
                                                    : PF + "person/noAvatar.png"
                                                } 
                                                className ="rounded-circle" 
                                                alt="image" 
                                            />
                                        </figure>
                                    </div>
                                }
                                <div className ="users-list-body">
                                    <div onClick={() => {
                                        handleClick(o);
                                    }}>
                                        <h5> {o?.user_name} </h5>
                                    </div>
                                    <div 
                                        className ="users-list-action"
                                        id="basic-button"
                                        aria-controls={open ? 'basic-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                        onClick={(e) => {
                                            handleOpenMenu(e);
                                            setClickedUser(o);
                                        }}
                                    >    
                                        <div className ="action-toggle">   
                                            <div className ="dropdown">
                                                <a href="#">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className ="feather feather-more-horizontal"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <Menu
                                        id="basic-menu"
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                        MenuListProps={{
                                            'aria-labelledby': 'basic-button',
                                        }}
                                    >
                                        <div>
                                            <MenuItem 
                                                onClick={() => {
                                                    handleClose();
                                                    setProfileBarActive(true); 
                                                    setProfileBarUserInfo(clickedUser);
                                                }} 
                                            > 
                                                Profile
                                            </MenuItem>
                                        </div>
                                    </Menu>
                                </div>
                            </li>
                        ) 
                    })}
                </ul>
            </div>
        </div>
    );
}


