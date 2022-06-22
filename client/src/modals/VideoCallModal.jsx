
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import { Grid, Paper, makeStyles } from '@material-ui/core';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const useStyles = makeStyles((theme) => ({
  video: {
    width: '550px',
    [theme.breakpoints.down('xs')]: {
      width: '300px',
    },
  },
  gridContainer: {
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  paper: {
    padding: '10px',
    border: '2px solid black',
    margin: '10px',
  },
}));

export default function VideoCallModal({ open, handleOpen, handleClose }) {

  const classes = useStyles();

  const stream = true;
  const callAccepted = true;
  const callEnded = true;
  const name = 'random';
  const myVideo = '';
  const call = '';
  const userVideo = '';

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
            place video component here
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>

        {/* <Grid container className={classes.gridContainer}>
          {stream && (
            <Paper className={classes.paper}>
              <Grid item xs={12} md={6}>
                <Typography variant="h5" gutterBottom>{name || 'Name'}</Typography>
                <video 
                  playsInline 
                  muted 
                  // ref={myVideo} 
                  autoPlay 
                  className={classes.video} />
              </Grid>
            </Paper>
          )}
          {callAccepted && !callEnded && (
            <Paper className={classes.paper}>
              <Grid item xs={12} md={6}>
                <Typography variant="h5" gutterBottom>{call.name || 'Name'}</Typography>
                <video 
                  playsInline 
                  // ref={userVideo} 
                  autoPlay 
                  className={classes.video} />
              </Grid>
            </Paper>
          )}
        </Grid> */}

      </Modal>
    </div>
  );
}




// export default function VideoCallModal() {
//     return (
//         <div class="modal call fade" id="videoCall" tabindex="-1" role="dialog" aria-hidden="true">
//             <div class="modal-dialog modal-dialog-centered modal-dialog-zoom" role="document">
//                 <div class="modal-content">
//                     <div class="modal-body">
//                         <div class="call">
//                             <div>
//                                 <figure class="mb-4 avatar avatar-xl">
//                                     <img src="./dist/media/img/women_avatar1.jpg" class="rounded-circle" alt="image" />
//                                 </figure>
//                                 <h4>Brietta Blogg <span class="text-success">video calling...</span></h4>
//                                 <div class="action-button">
//                                     <button type="button" class="btn btn-danger btn-floating btn-lg" data-dismiss="modal">
//                                         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
//                                     </button>
//                                     <button type="button" class="btn btn-success btn-pulse btn-floating btn-lg">
//                                         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-video"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }