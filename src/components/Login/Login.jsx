import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../Shared/Autherization'
import { decodeToken } from 'react-jwt'
import { UserContext } from '../../App'
import Cookies from 'universal-cookie'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const { user, setUser } = React.useContext(UserContext)
    const cookies = new Cookies()
    const navigate = useNavigate()


    useEffect(() => {
        if (user) {
            navigate('/')
        }
    })
    const handleLogin = async (e) => {
        e.preventDefault()
        const [response, status] = await loginUser(email, password)
        if (status != 200) {
            setError(response)
        }

        const token = response.token
        const user = decodeToken(token)
        cookies.set('token', token, { path: '/', expires: new Date(user.exp * 1000) })
        localStorage.setItem('user', JSON.stringify(user))
        await setUser(user)
        navigate('/')
    }


    return (
        <section className='flex justify-center items-center'>
            <div className='glass_morphism w-max p-8 text-bgColor rounded-lg'>
                <h1 className='text-3xl font-bold tracking-wider text-center'>Login</h1>
                <p className='mt-4'>Enter the required fields below</p>
                <p className='text-primary'>{error}</p>
                <form className='flex xs:w-[10rem] sm:w-[20rem] md:w-[30rem] flex-col gap-4 mt-2' onSubmit={handleLogin}>
                    <input type="email" className=' py-3 px-4 border-0 rounded-lg outline-none' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" className=' py-3 px-4 border-0 rounded-lg outline-none' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button className='bg-bgColor py-4 tracking-wider px-4 text-white rounded-lg' type='submit'>Login</button>
                    <p>Are you new here? <Link to='/register' className='font-bold hover:underline'>Register</Link></p>
                </form>
            </div>
        </section>
    )
}

export default Login