import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

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

export default function NewGroupModal({ open, handleOpen, handleClose }) {
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
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}



// export default function NewGroupModal() {
//     return (
//         <div class="modal fade" id="newGroup" tabindex="-1" role="dialog" aria-hidden="true">
//             <div class="modal-dialog modal-dialog-centered modal-dialog-zoom" role="document">
//                 <div class="modal-content">
//                     <div class="modal-header">
//                         <h5 class="modal-title">
//                             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-users mr-2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg> New Group
//                         </h5>
//                         <button type="button" class="close" data-dismiss="modal" aria-label="Close">
//                             <i class="ti-close"></i>
//                         </button>
//                     </div>
//                     <div class="modal-body">
//                         <form>
//                             <div class="form-group">
//                                 <label for="group_name" class="col-form-label">Group name</label>
//                                 <div class="input-group">
//                                     <input type="text" class="form-control" id="group_name" />
//                                     <div class="input-group-append">
//                                         <button class="btn btn-light" data-toggle="tooltip" title="" type="button" data-original-title="Emoji">
//                                             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-smile"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                             <p class="mb-2">The group members</p>
//                             <div class="form-group">
//                                 <div class="avatar-group">
//                                     <figure class="avatar" data-toggle="tooltip" title="" data-original-title="Tobit Spraging">
//                                         <span class="avatar-title bg-success rounded-circle">T</span>
//                                     </figure>
//                                     <figure class="avatar" data-toggle="tooltip" title="" data-original-title="Cloe Jeayes">
//                                         <img src="./dist/media/img/women_avatar4.jpg" class="rounded-circle" alt="image" />
//                                     </figure>
//                                     <figure class="avatar" data-toggle="tooltip" title="" data-original-title="Marlee Perazzo">
//                                         <span class="avatar-title bg-warning rounded-circle">M</span>
//                                     </figure>
//                                     <figure class="avatar" data-toggle="tooltip" title="" data-original-title="Stafford Pioch">
//                                         <img src="./dist/media/img/man_avatar1.jpg" class="rounded-circle" alt="image" />
//                                     </figure>
//                                     <figure class="avatar" data-toggle="tooltip" title="" data-original-title="Bethena Langsdon">
//                                         <span class="avatar-title bg-info rounded-circle">B</span>
//                                     </figure>
//                                     <a href="#" title="Add friends">
//                                         <figure class="avatar">
//                                             <span class="avatar-title bg-primary rounded-circle">
//                                                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
//                                             </span>
//                                         </figure>
//                                     </a>
//                                 </div>
//                             </div>
//                             <div class="form-group">
//                                 <label for="description" class="col-form-label">Description</label>
//                                 <textarea class="form-control" id="description"></textarea>
//                             </div>
//                         </form>
//                     </div>
//                     <div class="modal-footer">
//                         <button type="button" class="btn btn-primary">Create Group</button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }