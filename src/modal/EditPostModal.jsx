import React from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import "./EditPostModal.scss";
export default function EditPostModal({ open, handleClose, postContent, setPostContent, handleSave }) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box className="modal-box">
        <Typography id="modal-title" variant="h6" component="h2" className="modal-title">
          게시글 수정
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={4}
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          margin="normal"
          variant="outlined"
          className="modal-textfield"
        />
        <Button variant="contained" color="primary" onClick={handleSave} className="modal-button">
          Save
        </Button>
      </Box>
    </Modal>
  );
}
