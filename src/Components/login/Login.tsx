import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import './login.scss';
import { success } from '../../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { VisibilityOffOutlined } from '@mui/icons-material';
import { Button } from '@mui/material';


const Login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [show, setShow] = useState(false)
    const router = useNavigate()
    const dispatch = useAppDispatch()


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const res = await axios.post('https://dummyjson.com/auth/login', {
                username: username,
                password: password,
            })
            if (res) {
                router('/products')
                dispatch(success(res.data))
            }
        } catch (error) {
            console.log("error in posting")
        }
    }


    return (
        <div className='login'>
            <form onSubmit={handleSubmit}>
                <div className="holderForm">
                    <h1> Login </h1>
                    <input type="text" placeholder='Enter username' value={username} onChange={(e) => setUsername(e.target.value)} />
                    <div className="holderInput">
                        <input type={show ? "text" : "password"} placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                        <VisibilityOffOutlined className='ico' onClick={() => setShow(!show)} />
                    </div>
                    <div>
                        <Button type='submit' variant='contained' size='small' className='btn' >Login</Button>
                    </div>
                    <div>
                        <p>Forgot Password? <span style={{ textDecoration: "underline", cursor: "pointer" }}> reset password</span></p>
                        <p style={{ marginTop: "12px" }}>Already have an account? <span style={{ textDecoration: "underline", cursor: "pointer" }}>Login</span></p>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Login;