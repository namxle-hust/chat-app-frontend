
import * as React from 'react';
import Modal from '@mui/material/Modal';
import { useEffect } from 'react';
import './VideoCallModal.css';

const PF = process.env.REACT_APP_PUBLIC_FOLDER;

export default function VideoCallModal({ 
  open, 
  handleOpen, 
  handleClose, 
  currentCallingUser, 
  setCurrentCallingUser, 
  currentCallId, 
  setCurrentCallId, 
  handleVideoCallDecline,
  arrivalMessage
}) {

  useEffect(() => {
    
    if (arrivalMessage?.message_type === 'call' && arrivalMessage?.message === 'Missed Call') {
      handleClose();
      setCurrentCallingUser(null);
      setCurrentCallId(null);
    }
  }, [arrivalMessage]);
  
  const handleVideoCall =() => {
    function createPopupWin(pageURL, pageTitle, width, height) {
      var leftPosition, topPosition;
      //Allow for borders.
      leftPosition = window.screen.width / 2 - (width / 2 );
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
      user_token: localStorage.getItem('token'),
      user_id: currentCallingUser.id,
      status: 'answer',
      call_id: currentCallId
    }

    let url = `http://localhost:9090/${tmpObj.user_token}/${tmpObj.user_id}/${tmpObj.status}/${tmpObj.call_id}`;
    createPopupWin(url, "Video Call", "990", "650");

    setCurrentCallingUser(null);
    setCurrentCallId(null);
  }


  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div class="modal call fade show" id="videoCall" tabIndex="-1" role="dialog" aria-modal="true" style={{ display: 'block'}}>
            <div class="modal-dialog modal-dialog-centered modal-dialog-zoom" role="document">
                <div class="modal-content">
                    <div class="modal-body">
                        <div class="call">
                            <div>
                                <div className = 'call-animation'>
                                  {/* <figure class="mb-4 avatar avatar-xl"> */}
                                      <img 
                                            src={currentCallingUser.profile_pic_url ? 
                                            currentCallingUser.profile_pic_url
                                            : 
                                            PF + "person/noAvatar.png"}
                                            class="" alt="image" 
                                            style = {{
                                              width: '120px',
                                              height: '120px',
                                              borderRadius: '100%',
                                              position: 'absolute',
                                              left: '-5px',
                                              top: '-5px'
                                            }}
                                      />
                                  {/* </figure> */}
                                </div>
                                <h4 style = {{ marginTop: '40px' }}> {currentCallingUser.user_name} <span class="text-success">video calling...</span></h4>
                                <div class="action-button">
                                    <button type="button" class="btn btn-danger btn-floating btn-lg" data-dismiss="modal" 
                                      onClick = {(e) => {
                                        e.preventDefault();
                                        handleClose();
                                        handleVideoCallDecline(currentCallingUser.id, currentCallId);
                                        setCurrentCallingUser(null);
                                        setCurrentCallId(null);
                                      }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                    </button>
                                    <button type="button" class="btn btn-success btn-pulse btn-floating btn-lg" 
                                          onClick = {(e) => {
                                            e.preventDefault();
                                            handleClose();
                                            handleVideoCall();
                                          }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-video"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        
      </Modal>
    </div>
  );
}