import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert'
import "./Registration.css";


const Update = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        phoneNo: '',
        email: '',
        address: '',
    })
    const { firstName, lastName, phoneNo, email, address } = { ...data }

    const [isLoading, setIsLoading] = useState(false)

    const onChangeHandler = (event) => {
        setData({ ...data, [event.target.id]: event.target.value })
        if (event.target.id === "firstName") {
            const first_nameInput = event.target.value;
            const onlyLetters = first_nameInput.replace(/[^a-zA-Z]/g, '');
            setData({ ...data, firstName: onlyLetters });
        }
        if (event.target.id === "lastName") {
            const last_nameInput = event.target.value;
            const onlyLetters = last_nameInput.replace(/[^a-zA-Z]/g, '');
            setData({ ...data, lastName: onlyLetters });
        }
        if (event.target.id === "phoneNo") {
            const phoneNoInput = event.target.value;
            const onlyNums = phoneNoInput.replace(/[^0-9]/g, '');
            setData({ ...data, phoneNo: onlyNums });
        }
    }
    useEffect(() => {
        if (id) {
            setIsLoading(true)
            axios.get('http://localhost:4000/details/' + id).then((res) => {
                data.firstName = res.data[0].first_name;
                data.lastName = res.data[0].last_name;
                data.phoneNo = res.data[0].contact;
                data.email = res.data[0].email;
                data.address = res.data[0].address;
                setIsLoading(false)
            }).catch(err => {
                console.log(err)
            })
        }
        // eslint-disable-next-line
    }, [id])
    const onSubmitHandler = (event) => {
        event.preventDefault();

        if (phoneNo.length !== 10) {
            swal({
                text: "Phone Number must be 10 digits",
                icon: 'warning'
            })
            // eslint-disable-next-line
        } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            swal({
                text: "Please enter a Valid Email",
                icon: 'warning'
            })
        } else {
            axios.patch(`http://localhost:4000/details/${id}`, {
                firstName,
                lastName,
                phoneNo,
                email,
                address
            }).then(res => {
                swal({
                    title: "User details updated!",
                    text: "User details updated successfully",
                    icon: 'success',
                    button: 'Ok'
                }).then(() => {
                    navigate('/Home')
                })
            }).catch(err => {
                const erorMessage = err.response.data?.message
                swal({
                    title: "Already Exist",
                    text: erorMessage ? erorMessage : "Existing Email Or Contact !",
                    icon: 'error'
                })
            })
        }


    }

    return (
        <>
            {
                !isLoading && <div className='bgUpdate-container' style={{ marginTop: "100px" }}>
                    <h1 className='home-heading' align="center">Update Details</h1>
                    <form className='form-container' onSubmit={onSubmitHandler} style={{
                        margin: "auto",
                        padding: "15px",
                        maxWidth: "400px",
                        alignContent: "center"
                    }}>
                        <div className='label-container'>
                            <label className='label-elements' htmlFor='firstName'>FirstName</label>
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
                            <label className='label-elements' htmlFor='lastName'>LastName</label>
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
                            <button className='home-button'>Update</button>

                        </div>
                    </form>


                </div>
            }

        </>
    )

}

export default Update 