import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert';
// import {toast} from "react-toatify";
import "./Home.css"

const Home = () => {
    const [details, setdetails] = useState(null);
    const getUsersData = () => {
        axios.get('http://localhost:4000/details').then((res) => {
            setdetails(res.data)
        }).catch(err => {
            console.log(err)
        })
    }
    useEffect(() => {
        getUsersData()
    }, [])

    const navigate = useNavigate();

    const onChangeHandler = (event) => {
        event.preventDefault();
        navigate('/Register');
    }

    const DeleteUser = (id) => {

        const temp = window.confirm("Are you sure?");
        if (temp) {
            axios.delete(`http://localhost:4000/details/${id}`).then(res => {
                swal("Successfully deleted record", {
                    icon: "success",
                }).then(() => {
                    getUsersData();
                })
            }).catch(err => {
                swal("Something went wrong while deleting record", {
                    icon: "Error",
                });
            })
        } else {
            swal("Your user Record file is safe!");
        }
    }

    return (
        // <div className='table-container'>
        <div style={{ marginTop: "150px" }} className='table-container'>
            <table className='styled-table'>
                <thead>
                    <tr>
                        <th style={{ textAlign: "center" }}>First Name</th>
                        <th style={{ textAlign: "center" }}>Last Name</th>
                        <th style={{ textAlign: "center" }}>Mobile</th>
                        <th style={{ textAlign: "center" }}>Email</th>
                        <th style={{ textAlign: "center" }}>Adress</th>
                        <th style={{ textAlign: "center" }}>Edit</th>
                        <th style={{ textAlign: "center" }}>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        details?.map((user) => {
                            return (
                                <tr key={user.id}>
                                    <td style={{ textAlign: "center" }}>{user.first_name}</td>
                                    <td style={{ textAlign: "center" }}>{user.last_name}</td>
                                    <td style={{ textAlign: "center" }}>{user.contact}</td>
                                    <td style={{ textAlign: "center" }}>{user.email}</td>
                                    <td style={{ textAlign: "center" }}>{user.address}</td>
                                    <td style={{ textAlign: "center" }} onClick={() => navigate(`/Update/${user.id}`)} ><button className='btn btn-edit'>Edit</button></td>
                                    <td style={{ textAlign: "center" }}><button className='btn btn-delete' onClick={() => { DeleteUser(user.id) }}>Delete</button></td>
                                </tr>)
                        })
                    }
                </tbody>
            </table>
            <button onClick={onChangeHandler} className='btn btn-contact' > Add user  </button>
        </div>
    )
}

export default Home 