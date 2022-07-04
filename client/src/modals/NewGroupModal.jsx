import * as React from 'react';
import Modal from '@mui/material/Modal';
import './NewGroupModal.css';
import { useState, useEffect, useContext } from 'react';
import { apiRoutes, axiosHeadersObject, fakeAxios } from "../utils-contants";
import MenuItem from '@mui/material/MenuItem';
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { HighlightOff, AddCircleOutline, AddCircle, LaptopWindows } from '@material-ui/icons';

export default function NewGroupModal({ open, handleOpen, handleClose }) {
  const [groupName, setGroupName] = useState('');
  const [chosenGroupMembers, setChosenGroupMembers] = useState([]); // { id: 1, user_name: '' }
  const [allFriends, setAllFriends] = useState([]);

  const [shouldSave, setShouldSave] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);

  const [showFriends, setShowFriends] = useState(false);  

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const getAllFriends = async () => {
      const res = await axios.get(apiRoutes.getAllUsers, axiosHeadersObject());
      const tmp = res.data.data.filter(f => f.id !== user.id);
      
      setAllFriends(tmp);
    };

    getAllFriends();
  }, [open]);

  useEffect(() => {
    if (groupName === '' || chosenGroupMembers.length === 0) {
      setShouldSave(false);
    } else {
      setShouldSave(true);
    }
    
  }, [groupName, chosenGroupMembers]);

  const handleSave = async () => {
    if (!shouldSave) return;  
    if (groupName.match(/^\s+$/) || !groupName) return;

    setLoadingSave(true);

    await axios.post('/group/create', {
      name: groupName,
      user_ids: chosenGroupMembers.map((el) => el.id)
    },axiosHeadersObject())

    setLoadingSave(false);
    setGroupName('');
    setChosenGroupMembers([]);
    setShouldSave(false);
    setLoadingSave(false);

    handleClose();

    window.location.reload();
  }

  const isContainChosenMember = (id) => {
    const found = chosenGroupMembers.find(m => m.id === id);
    if (found) return true;
    return false;
  }

  const handleRemoveChosenMember = (id) => {
    let foundIndex = -1;
    chosenGroupMembers.find((e, index) => {
      if (e.id === id) { foundIndex = index; return true; }
    });

    chosenGroupMembers.splice(foundIndex,1);  // spliced element
    setChosenGroupMembers([...chosenGroupMembers]);  // remaining elements
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={() => {
          setLoadingSave(false);
          setGroupName('');
          setChosenGroupMembers([]);
          setShouldSave(false);
          setLoadingSave(false);

          handleClose();
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div style = {{ position: 'absolute', left: '39%', top: '15%',  width: '700px' }}>
          <div class="phone">
            <div class="chevron" 
                onClick = {() => { 
                  setLoadingSave(false);
                  setGroupName('');
                  setChosenGroupMembers([]);
                  setShouldSave(false);
                  setLoadingSave(false);

                  handleClose(); 
                }} 
                style = {{ height: '40px', width: '40px' }}>
            </div>
            <div class="title">New Chat Group</div>
            
            <figure className ="avatar" style = {{ width: '90px', height: '90px' }}>
              <img 
                class="rounded-circle" 
                src={ PF + "person/groupChat.png" }
              />
            </figure>

            <div class="name">{ 'create new group' }</div>
            
            <div class="prop">Group Name</div>
            <input class="value"
              value = {groupName}
              onChange = {(e) => {
                setGroupName(e.target.value);
              }}
            />
            
            <div class="prop" 
              style = {{
                cursor: 'pointer'
              }}
            >
              <span style = {{ marginRight: '3px' }} onClick = {() => { setShowFriends(!showFriends) }}>Group Members</span>
              {
                !showFriends ? 
                <AddCircle fontSize='medium' onClick = {() => { setShowFriends(!showFriends) }}/>
                : 
                <AddCircleOutline fontSize='medium' onClick = {() => { setShowFriends(!showFriends) }}/>
              }
            </div>
            <div
              class="value" 
              onClick = {() => {
                setShowFriends(false);
              }}
              
              style = {{
                height: '25px',
                position: 'relative',
                cursor: 'pointer',
                width: '380px',
                height: '50px',
                overflow: 'hidden',
                overflowY: 'scroll'
              }}
            >
              {
                chosenGroupMembers.map((m) => 
                <span style = {{
                  marginRight: '3px',
                  backgroundColor: '#e0e0e0',
                  padding: '1px 6px 2px 6px',
                  borderRadius: '10px',
                  fontWeight: '500'
                }}>
                  {m.user_name}
                  <HighlightOff 
                    fontSize='small' 
                    style = {{ marginLeft: '17px' }} 
                    onClick = {() => {
                      handleRemoveChosenMember(m.id);
                    }}
                  />
                </span>)
              }
            </div>
          
            {
              showFriends ? 
              <div 
                style = {{ 
                  position: 'absolute', 
                  top: '379px' , 
                  height: '250px', 
                  width: '215px',
                  overflow: 'hidden',
                  overflowY: 'scroll',
                  marginTop: '-7px',
                  marginLeft: 'auto'
                }}>
                {
                  allFriends.map((f) => 
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
                        onClick = {() => {
                          if(isContainChosenMember(f.id)) return;
                          setChosenGroupMembers([...chosenGroupMembers, { id: f.id, user_name: f.user_name }]);
                        }}

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
                        <span 
                          style={{ 
                            fontWeight: '500',
                          }}>
                            {f.user_name}
                        </span>
                      </div>
                      {
                        isContainChosenMember(f.id) ? 
                        <HighlightOff 
                          fontSize='small' 
                          style = {{ marginLeft: 'auto' }} 
                          onClick = {() => {
                            handleRemoveChosenMember(f.id);
                          }}
                        />: <></>
                      }
                    </MenuItem>
                  )
                }
              </div> 
              : 
              <></>
            }
            {
              loadingSave ? <div class="loader-save"></div>
              :
              <button 
                onClick = {handleSave}

                style = {
                  shouldSave ? 
                  { 
                    marginTop: '50px', 
                    border: 'none', 
                    padding: '6px 25px', 
                    borderRadius: '20px', 
                    backgroundColor: '#437ab7',
                    fontWeight: '400',
                    outline: 'none',
                  }
                  :
                  { 
                    marginTop: '50px', 
                    border: 'none', 
                    padding: '6px 25px', 
                    borderRadius: '20px', 
                    backgroundColor: '#c7c5c5',
                    fontWeight: '400',
                    outline: 'none',
                  }
                }>
                  Create Group                
              </button>
            }
          </div>
        </div>
      </Modal>
    </div>
  );
}