import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import './login.scss';
import { success } from '../../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';


const Login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const router = useNavigate()
    const userData = useAppSelector((state) => state.user.user)
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
                <div>
                    <h1> Login </h1>
                    <input type="text" placeholder='Enter username' value={username} onChange={(e) => setUsername(e.target.value)} />
                    <input type="password" placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type='submit'>Login</button>
                </div>
            </form>
        </div>
    )
}

export default Login;