import axios from 'axios'
import React , {useState} from 'react'
import swal from 'sweetalert'
import { useNavigate } from "react-router-dom";
// import './index.css'
// import {toast} from "react-toastify";

const Register = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        phoneNo: '',
        email: '',
        address: '',
    })


    const onChangeHandler = (event) => {
        setData({...data, [event.target.id]: event.target.value})
        if (event.target.id === "firstName") {
            const first_nameInput = event.target.value;
            const onlyLetters = first_nameInput.replace(/[^a-zA-Z]/g,'');
            setData({ ...data, firstName: onlyLetters});
        }
        if (event.target.id === "lastName") {
            const last_nameInput = event.target.value;
            const onlyLetters = last_nameInput.replace(/[^a-zA-Z]/g,'');
            setData({ ...data, lastName: onlyLetters });
        }
        if (event.target.id === "phoneNo") {
            const phoneNoInput = event.target.value;
            const onlyNums = phoneNoInput.replace(/[^0-9]/g, '');
            setData({ ...data, phoneNo: onlyNums });
        }
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();


        if(phoneNo.length!==10){
            swal({
                text:"Phone Number must be 10 digits",
                icon:'warning',
            })
            // eslint-disable-next-line
        } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            swal({
                text:"please enter a valid email",
                icon:'warning'
            })
            // toast.warning("enter valid email");
        } else{
            axios.post('http://localhost:4000/user/register',{
            firstName,
            lastName,
            phoneNo,
            email,
            address
        }).then(res=>{
            swal({
                title: "User Added!",
                text:"User registered successfully",
                icon:'success',
                button:'Goto Home'
            }).then(()=>{
                navigate('/Home')
            })
        }).catch(err=>{
            const erorMessage =err.response.data?.message
            swal({
                text:erorMessage?erorMessage:"Something went wrong!",
                icon:'error'
            })
            console.log(erorMessage);
            // toast.error("something went wrong");
        })
        }
    }

    const {firstName,lastName,phoneNo,email,address} = {...data}
    return (
        <>
        <div className='bgHome-container' style={{marginTop: "100px"}}>
            <h1 className='home-heading' align="center">Enter Details</h1>
            <form className='form-container' onSubmit={onSubmitHandler} style={{
            margin: "auto",
            padding: "15px",
            maxWidth: "400px",
            alignContent:"center"
        }}>
                <div className='label-container'>
                    <label className='label-elements' htmlFor='firstName'>First  Name</label>
                    <input
                    className='register-inputs'
                    id='firstName'
                    value={firstName}
                    onChange={onChangeHandler}
                    type="text"
                    required
                    />
                </div>
                <div className='label-container'>
                    <label className='label-elements' htmlFor='lastName'>Last  Name</label>
                    <input
                    className='register-inputs'
                    id='lastName'
                    value={lastName}
                    onChange={onChangeHandler}
                    type="text"
                    required
                    />
                </div>
                <div className='label-container'>
                    <label className='label-elements' htmlFor='phoneNo'>Phone Number</label>
                    <input
                    className='register-inputs'
                    id='phoneNo'
                    value={phoneNo}
                    onChange={onChangeHandler}
                    type="number"
                    maxLength={10}
                    required
                    />
                </div>
                <div className='label-container'>
                    <label className='label-elements' htmlFor='email'>Email</label>
                    <input
                    className='register-inputs'
                    id='email'
                    value={email}
                    onChange={onChangeHandler}
                    type="email"
                    required
                    />
                </div>
                <div className='label-container'>
                    <label className='label-elements' htmlFor='address'>Address</label>
                    <input
                    className='register-inputs'
                    id='address'
                    value={address}
                    onChange={onChangeHandler}
                    type="text"
                    required
                    />
                </div>
                <div className='btn-container'>
                    <button className='home-button'>Add user</button>
                </div>
            </form>
        </div>
        </>
    )
}

export default Register 