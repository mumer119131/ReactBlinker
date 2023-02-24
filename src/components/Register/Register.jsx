import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../Shared/Autherization'

const Register = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleRegister = async (e) => {
        e.preventDefault()

        const [response, status] = await registerUser(username, email, password, confirmPassword)
        if (status != 201) {
            return setError(response)
        }

        navigate('/login')
        console.log(response, status)
    }
    return (
        <section className='flex justify-center items-center'>
            <div className='glass_morphism w-max p-8 text-bgColor rounded-lg'>
                <h1 className='text-3xl font-bold tracking-wider text-center'>Register</h1>
                <p className='mt-4'>Enter the required fields below</p>
                <p className='text-primary'>{error}</p>
                <form className='flex xs:w-[10rem] sm:w-[20rem] md:w-[30rem] flex-col gap-4 mt-2' onSubmit={handleRegister}>
                    <input type="text" className=' py-3 px-4 border-0 rounded-lg outline-none' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
                    <input type="email" className=' py-3 px-4 border-0 rounded-lg outline-none' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" className=' py-3 px-4 border-0 rounded-lg outline-none' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <input type="password" className=' py-3 px-4 border-0 rounded-lg outline-none' placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    <button className='bg-bgColor py-4 tracking-wider px-4 text-white rounded-lg' type='submit'>Register</button>
                    <p>Already have an account? <Link to='/login' className='font-bold hover:underline'>Login</Link></p>
                </form>
            </div>
        </section>
    )
}

export default Register