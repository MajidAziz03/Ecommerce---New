import axios from 'axios';
import React, { useState } from 'react'
import './register.scss';
import { AUTH_URL } from '../../globalconfig';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const Register = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useNavigate()

    const handleSubmit = async(e : React.FormEvent) => {
        e.preventDefault()
        try{
            const res = await axios.post('https://fyp-container-server.vercel.app/users/register', {
                username,
                email,
                password
            })
                router('/login')
                toast.success("Successfully Created")
        }
        catch(error: any) {
            console.log(error.message)
        }
    }

  return (
    <div className='register'>
        <form onSubmit={handleSubmit}>
            <div className='form' onSubmit={handleSubmit}>
                <h1> Register </h1>
                <input type="text" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="text" placeholder='Email' value={email}  onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder='Password' value={password}  onChange={(e) => setPassword(e.target.value)} />
                <button type='submit'>Register</button>
            </div>
        </form>
    </div>
  )
}

export default Register;