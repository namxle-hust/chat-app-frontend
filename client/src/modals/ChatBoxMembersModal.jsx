import * as React from 'react';
import Modal from '@mui/material/Modal';
import MenuItem from '@mui/material/MenuItem';

export default function ChatBoxMembersModal ({ open, handleOpen, handleClose, currentChat, membersInBox }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <div>
            <Modal
                open={open}
                onClose={() => {
                    handleClose();
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div style = {{ position: 'absolute', left: '39%', top: '15%',  width: '550px' }}>
                <div class="phone">
                    <div class="chevron" 
                        onClick = {() => { 
                        handleClose(); 
                        }} 
                        style = {{ height: '40px', width: '40px' }}>
                    </div>
                    <div class="title">Members: </div>
                    
                    <figure className ="avatar" style = {{ width: '90px', height: '90px' }}>
                    <img 
                        class="rounded-circle" 
                        src={ PF + "person/groupChat.png" }
                    />
                    </figure>
                    
                    {
                        currentChat?.is_group ? 
                        <div 
                            style = {{ 
                                position: 'absolute', 
                                top: '200px' , 
                                left: '65px',
                                height: '250px', 
                                width: '215px',
                                overflow: 'hidden',
                                overflowY: 'scroll',
                                marginTop: '-7px',
                            }}>
                            {
                                membersInBox.map((f) => 
                                    <MenuItem 
                                        style = {{ 
                                            backgroundColor: '#e0e0e0', 
                                            width: '200px', 
                                            borderRadius: '4px 4px 4px 4px',
                                            height: '50px',
                                            opacity: '0.95'
                                        }}
                                    >
                                        <div 
                                            style = {{
                                                overflowX: 'scroll'
                                            }}
                                        >
                                            <img className='avatar' 
                                                style = {{ 
                                                width: '30px',
                                                height: '30px',
                                                marginTop: '0px',
                                                marginRight: '30px'
                                                }} 
                                                src = {f.profile_pic_url ? f.profile_pic_url : PF + "person/noAvatar.png"}
                                            />
                                            <span style={{ 
                                                fontWeight: '500',
                                            }}>{f.user_name}</span>
                                        </div>
                                    </MenuItem>
                                )
                            }
                        </div> 
                        : 
                        <></>
                    }          
                
                </div>
                </div>
            </Modal>
        </div>
    );
}