
import * as React from 'react';
import { Tooltip } from '@mui/material';
import { navigations } from '../../utils-contants';
import EditProfileModal from '../../modals/EditProfileModal';

// --------------- dropdown menu import components ----------------
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
// ------------- ./dropdown menu import components ------------------

export default function Navigation({user, setCurrentNavigation, setProfileBarActive, setProfileBarUserInfo, currentNavigation}) {

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    
  // ------------- <drop down menu function> -------------
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  // on click on something to toggle the dropdown menu
  const handleToggle = (e) => {
    e.preventDefault();
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // ------------- </ drop down menu function> -------------

  // ------------- modal -------------------
  const [openEditProfileModal, setEditProfileModal] = React.useState(false);
  const handleOpenModal = () => setEditProfileModal(true);
  const handleCloseModal = () => setEditProfileModal(false);
  // -------------- ./modal ----------------

  return (
    <>
        <EditProfileModal open = {openEditProfileModal} handleOpen = {handleOpenModal} handleClose = {handleCloseModal} />
        <nav className ="navigation">
            <div className ="nav-group">
                <ul>
                    <li className ="logo">
                        <a href=''>
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="612px" height="612px" viewBox="0 0 612 612" style= {{enableBackground: "new 0 0 612 612" }} xmlSpace="preserve">
                                <g>
                                    <g id="_x32__26_">
                                        <g>
                                        <path d="M401.625,325.125h-191.25c-10.557,0-19.125,8.568-19.125,19.125s8.568,19.125,19.125,19.125h191.25
                                        c10.557,0,19.125-8.568,19.125-19.125S412.182,325.125,401.625,325.125z M439.875,210.375h-267.75
                                        c-10.557,0-19.125,8.568-19.125,19.125s8.568,19.125,19.125,19.125h267.75c10.557,0,19.125-8.568,19.125-19.125
                                        S450.432,210.375,439.875,210.375z M306,0C137.012,0,0,119.875,0,267.75c0,84.514,44.848,159.751,114.75,208.826V612
                                        l134.047-81.339c18.552,3.061,37.638,4.839,57.203,4.839c169.008,0,306-119.875,306-267.75C612,119.875,475.008,0,306,0z
                                        M306,497.25c-22.338,0-43.911-2.601-64.643-7.019l-90.041,54.123l1.205-88.701C83.5,414.133,38.25,345.513,38.25,267.75
                                        c0-126.741,119.875-229.5,267.75-229.5c147.875,0,267.75,102.759,267.75,229.5S453.875,497.25,306,497.25z"></path>
                                        </g>
                                    </g>
                                </g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                            </svg>
                        </a>
                    </li>
                    
                    <li onClick = {(e) => { e.preventDefault(); setCurrentNavigation(navigations.conversations) }}>
                        <Tooltip title={<span style={{  fontSize: '14px' }}>Conversations</span>} placement="right">
                            <a className = {currentNavigation === navigations.conversations ? 'active' : ''} data-navigation-target="chats" href="" data-toggle="tooltip" title="" data-placement="right" data-original-title="Chats">
                                {/* <span className ="badge badge-warning"></span> */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className ="feather feather-message-circle"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                            </a>
                        </Tooltip>
                    </li>
                    
                    <li className ="brackets" onClick = {(e) => { e.preventDefault(); setCurrentNavigation(navigations.onlineFriends) }}>
                        <Tooltip title={<span style={{  fontSize: '14px' }}>Online Friends</span>} placement="right">
                            <a className = {currentNavigation === navigations.onlineFriends ? 'active' : ''} data-navigation-target="friends" href="" data-toggle="tooltip" title="" data-placement="right" data-original-title="Friends">
                                {/* <span className ="badge badge-danger"></span> */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className ="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                            </a>
                        </Tooltip>
                    </li>


                    <li>
                        <Tooltip title={<span style={{  fontSize: '14px' }}>User Menu</span>} placement="right">
                            <a 
                                href=''
                                ref={anchorRef}
                                id="composition-button"
                                aria-controls={open ? 'composition-menu' : undefined}
                                aria-expanded={open ? 'true' : undefined}
                                aria-haspopup="true"
                                onClick={handleToggle}
                            >
                                <figure className ="avatar">
                                    <img src={
                                        user.profile_pic_url
                                            ? user.profile_pic_url
                                            : PF + "person/noAvatar.png"
                                        } 
                                        className ="rounded-circle" alt="image" 
                                    />
                                </figure>
                            </a>
                        </Tooltip>
                        <Popper
                            open={open}
                            anchorEl={anchorRef.current}
                            role={undefined}
                            placement= 'top-end'
                            transition
                        >
                        {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                style={{
                                    transformOrigin: placement === 'top-end' ? 'bottom left' : 'bottom',
                                }}
                            >
                                <Paper>
                                    <ClickAwayListener onClickAway={handleClose}>
                                        <MenuList
                                            autoFocusItem={open}
                                            id="composition-menu"
                                            aria-labelledby="composition-button"
                                            onKeyDown={handleListKeyDown}
                                        >
                                            <MenuItem onClick={(event) => {
                                                setProfileBarUserInfo(user);
                                                setProfileBarActive(true);
                                                handleClose(event);; 
                                            }}>
                                                Profile
                                            </MenuItem>
                                            <MenuItem onClick={(e) => {
                                                handleClose(e);
                                                handleOpenModal();
                                            }}>
                                                Edit Profile
                                            </MenuItem>
                                            <hr style = {{ marginBottom: '2px' }}/>
                                            <MenuItem onClick={() => { 
                                                localStorage.clear();
                                                window.location.reload();
                                            }}
                                                style = {{ color: '#E44522' }}
                                            >
                                                Logout
                                            </MenuItem>
                                        </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                        )}
                        </Popper>
                    </li>
                    
                </ul>
            </div>
        </nav>
    </>
  );
}
