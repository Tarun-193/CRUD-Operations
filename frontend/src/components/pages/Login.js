import React, {useState} from 'react';
import { useNavigate} from "react-router-dom";
import swal from 'sweetalert'
import axios from 'axios'

// import './index.css'

const Login = () => {
    const navigate = useNavigate(); 
    const [data, setData] = useState({
        email: "",
        password: "",
    })

    const [error, setError] = useState('');


    const changeHandler = (event) => {
        setData({...data, [event.target.id]: event.target.value})
    }

    const submitHandler = (event) => {
        event.preventDefault();

        if (email.slice(-10) !== ("@gmail.com")) {
            swal({
                text:"Please enter a valid email",
                icon:'warning'
            })
        } else {
            axios.post('http://localhost:4000/login',{email,password}).then(result=>{
            navigate('Home');
        }).catch(err=>{
            console.log(err)
            setError('Incorrect Email or Password*');
        })
        }
    }

    const {email, password} = {...data}
    return(
        
        <div style={{marginTop: "100px"}}>
        <form onSubmit={submitHandler} style={{
            margin: "auto",
            padding: "15px",
            maxWidth: "400px",
            alignContent:"center"
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
            <button className="btn btn-login">Login</button>
            {/* <Link to="/register">
                <button className="btn btn-contact">Register</button>
            </Link> */}
        </form>
    </div>
    )
}

export default Login