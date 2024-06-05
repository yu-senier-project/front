// FileModal.jsx
import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import "../styles/message/fileModal.scss";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const imageStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    height: 'auto',
    maxWidth: '80%',
    maxHeight: '80%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };
  

export default function FileModal({ open, handleClose, files = [] }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (fileUrl) => {
    setSelectedImage(fileUrl);
  };

  const handleImageClose = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <div className="file-grid">
            {files.length !== 0 ? (
              files.map((file, index) => (
                <div className="file-grid-item" key={index} onClick={() => handleImageClick(file.fileUrl)}>
                  <img src={file.fileUrl} alt={`file-${index}`} className="file-grid-image" />
                </div>
              ))
            ) : (
              <p className="no-files-message">파일이 없습니다!</p>
            )}
          </div>
        </Box>
      </Modal>

      {selectedImage && (
        <Modal open={true} onClose={handleImageClose}>
          <Box sx={imageStyle}>
            <img src={selectedImage} alt="Selected" style={{ width: '100%', height: '100%' }} />
          </Box>
        </Modal>
      )}
    </>
  );
}
