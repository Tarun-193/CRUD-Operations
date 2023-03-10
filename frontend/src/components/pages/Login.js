import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import swal from 'sweetalert'
import axios from 'axios'



const Login = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: "",
        password: "",
    })

    const [error, setError] = useState('');


    const changeHandler = (event) => {
        setData({ ...data, [event.target.id]: event.target.value })
    }

    const submitHandler = (event) => {
        event.preventDefault();
        // eslint-disable-next-line 
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            swal({
                text: "Please enter a valid email",
                icon: 'warning'
            })
        } else {
            axios.post('http://localhost:4000/login', { email, password }).then(result => {
                navigate('Home');
            }).catch(err => {
                console.log(err)
                setError('');
                swal({
                    text:"Incorrect email or password",
                    icon:'warning'
                })
            })
        }
    }

    const { email, password } = { ...data }
    return (

        <div style={{ marginTop: "100px" }}>
            <h1 className='home-heading' align="center">Login</h1>
            <form onSubmit={submitHandler} style={{
                margin: "auto",
                padding: "15px",
                maxWidth: "400px",
                alignContent: "center"
            }}
            >
                <label htmlFor="email">Email</label>
                <input
                    type="email" id='email'
                    name='email'
                    value={email}
                    placeholder='Enter email address'
                    onChange={changeHandler}
                    required />
                <label htmlFor="password">Password</label>
                <input
                    type="password" id='password'
                    name='password'
                    value={password}
                    placeholder='Enter password'
                    onChange={changeHandler}
                    required />
                {error && <p className='errMsg'>{error}</p>}
                <div className='butn'>
                    <button className="btn btn-login">Login</button>
                    <Link to="/newregister">
                        <button className="btn btn-register">Register</button>
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default Login