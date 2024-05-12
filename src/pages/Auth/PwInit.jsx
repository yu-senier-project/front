import Tobbar from '../../component/Topbar';
import Input from '../../component/basic/Input';
import Button from '../../component/basic/Button';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

import '../../styles/find/find.scss';

export default function PwInit() {
    const location = useLocation();
    const email = location.state.email;
    const [formData, setFormData] = useState({
        newPassword: '',
        newPasswordCheck: '',
    });
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleInitPassword = () => {
        if (formData.newPassword !== formData.newPasswordCheck) {
            alert('비밀번호가 일치하지 않습니다');
            return;
        } else {
            const data = {
                email: email,
                password: formData.newPassword,
            };
            axios.put('http://13.51.99.142:8080/api/v1/auth/password-inquiry', data).then((response) => {
                console.log(response.data);
            });
        }
        console.log(formData, email);
    };
    return (
        <div className="pwinit_container">
            <Tobbar />
            <div id="find_content">
                <h1>비밀번호 초기화</h1>
                <h2>아래 양식을 작성후 버튼을 클릭해 주세요.</h2>
                <Input size={'Small'} placeholder={'새 비밀번호'} name={'newPassword'} onChange={handleInputChange} />
                <Input
                    size={'Small'}
                    placeholder={'새 비밀번호 확인'}
                    name={'newPasswordCheck'}
                    onChange={handleInputChange}
                />
                <Button size={'Small'} text={'비밀번호 초기화'} onClick={handleInitPassword} />
                <Link className="login_button" to={'/'}>
                    로그인 페이지로 가기
                </Link>
            </div>
        </div>
    );
}
