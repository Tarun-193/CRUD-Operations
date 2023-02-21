import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert'
import axios from 'axios'

const NewRegistration = () => {

    const [data, setData] = useState({
        email: '',
        password: '',
        confirm_password:'',
    })
            // eslint-disable-next-line 
    const [error, setError] = useState('');
    const navigate = useNavigate();


    const changeHandler = (event) => {
        setData({ ...data, [event.target.id]: event.target.value })
    }

    const submitHandler = (event) => {
        event.preventDefault();
        let inputError = {
            email: "",
            password: "",
            confirm_password: "",
          };

        // eslint-disable-next-line 
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            swal({
                text: "Please enter a valid email",
                icon: 'warning'
            })
        }else if(data.password!==data.confirm_password){
            setError({...inputError,confirm_password:"Password and Confirm password doesn't match!",});
            return;
        }
        
        else{
                axios.post('http://localhost:4000/newregister', { email, password }).then(result => {
                    swal({
                        title: 'Registered successfully',
                        icon: 'success',
                        button: 'Go to login'
                    }).then(() => { navigate('/'); })
                }).catch(err => {
                    const erorMessage = err.response.data?.message
                    swal({
                        title: "Already Exist",
                        text: erorMessage ? erorMessage : "Existing Email!",
                        icon: 'error'
                    })
                })
        }
    }

    const { email, password, confirm_password } = { ...data }

    return (
        <>
            <div className='bgHome-container' style={{ marginTop: "100px" }}>
                <h1 className='home-heading' align="center">Enter Details</h1>
                <form className='form-container' onSubmit={submitHandler} style={{
                    margin: "auto",
                    padding: "15px",
                    maxWidth: "400px",
                    alignContent: "center"
                }}>
                    <div className='label-container'>
                        <label className='label-elements' htmlFor='email'>Email</label>
                        <input
                            className='register-inputs'
                            id='email'
                            value={email}
                            placeholder='Enter email'
                            onChange={changeHandler}
                            type="email"
                            required
                        />

                        <label htmlFor="password">Password</label>
                        <input
                            type="password" id='password'
                            name='password'
                            value={password}
                            placeholder='Enter password'
                            onChange={changeHandler}
                            required />

                        <label htmlFor="confirm_password">Confirm Password</label>
                        <input
                            type="password" id='confirm_password'
                            name='confirm_password'
                            value={confirm_password}
                            placeholder='Confirm-Password'
                            onChange={changeHandler}
                            required />
                        
                        <p className="error-message">{error.confirm_password}</p>
                    </div>

                    <div className='btn-container'>
                        <button className='home-button'>Register</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default NewRegistration