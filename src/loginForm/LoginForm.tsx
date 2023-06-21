import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./form.css";
const LoginForm = (props) => {
    const [formData, setFormData] = useState({
        name: '',
        password: ''
    });
   const navigate = useNavigate();
    const changePage = () => {
        navigate('/products');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform registration logic with formData
        console.log(formData);
        // // Reset form fields
        fetch('http://localhost:5001/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Response from server:', data);
                changePage();
                props.setAuthUser(true);
                setFormData((prevFormData) => ({
                    ...prevFormData}));
                setFormData({
                    name: "",
                    password: ""
                });
            })
            .catch((error) => {
                alert('Логін або пароль є неправильним!')
                console.error('Error:', error);
            });

    };

    return (!props.authUser) ? (
        <div className="login-page">
            <div className="form">
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="forClose">
                    </div>
                    <input type="text" placeholder="Логін" required value={formData.name}
                           onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                    <input type="password" placeholder="Пароль" required value={formData.password}
                           onChange={(e) => setFormData({ ...formData, password: e.target.value })}/>
                    <button type="submit" className="okButton">Ввійти</button>
                </form>
            </div>
        </div>
    ):"";
}

export default LoginForm;
