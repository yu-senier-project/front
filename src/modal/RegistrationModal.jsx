// RegistrationModal.jsx
import React from 'react';
import Modal from '@mui/material/Modal';
import '../styles/registerModal.scss';
import Input from '../component/basic/Input';
import Button from '../component/basic/Button';
import { useState } from 'react';
const style = {};

function RegistrationModal({ open, handleClose }) {
    const [formData, setFormData] = useState({
        companyName: '',
        firstName: '',
        secondName: '',
        userNickName: '',
        password: '',
        checkPassword: '',
        email: '',
        authCode: '',
    });
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className="registermodal_contaniner">
                <h1>가입하기</h1>
                <Input size={'Big'} name={'companyName'} onChange={handleInputChange} />
            </div>
        </Modal>
    );
}

export default RegistrationModal;
