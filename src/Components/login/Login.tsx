import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import './login.scss';
import { success } from '../../redux/slices/userSlice';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { VisibilityOffOutlined } from '@mui/icons-material';
import { Button } from '@mui/material';
import Navbar from '../navbar/Navbar';
import { toast } from 'react-toastify';


const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [show, setShow] = useState(false)
    const router = useNavigate()
    const dispatch = useAppDispatch()
const location = useLocation()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const res = await axios.post('https://fyp-container-server.vercel.app/users/login', {
                email: email,
                password: password,
            })
            if (res) {
                dispatch(success((res.data)))
                
                router('/products')
            }
        } catch (error : any) {
            toast.error("Wrong")  
        }
    }


    // const handleSubmitForm = (e:React.FormEvent) => {
    //     e.preventDefault()
    //     const data = loginUser(username,password)
    //     console.log("data comes from form", data)
    // }


    return (
        <>
            <Navbar />
            <div className='login'>
                <form onSubmit={handleSubmit}>
                    <div className="holderForm">

                        <h1> Login </h1>
                        <input type="text" placeholder='Enter username' value={email} onChange={(e) => setEmail(e.target.value)} />
                        <div className="holderInput">
                            <input type={show ? "text" : "password"} placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                            <VisibilityOffOutlined className='ico' onClick={() => setShow(!show)} />
                        </div>
                        <div>
                            <Button type='submit' variant='contained' size='small' className='btn' >Login</Button>
                        </div>
                        <div>
                            <p>Forgot Password? <span style={{ textDecoration: "underline", cursor: "pointer" }}> reset password</span></p>
                            <p style={{ marginTop: "12px" }}>Don't have an account? <Link to='/register'><span style={{ textDecoration: "underline", cursor: "pointer" }}>Register</span></Link></p>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login;