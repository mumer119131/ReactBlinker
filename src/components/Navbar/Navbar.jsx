import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { RiMessage3Fill } from 'react-icons/ri'
import { UserContext } from '../../App'
import Cookies from 'universal-cookie'

const Navbar = () => {
    const { user, setUser } = useContext(UserContext)
    const cookies = new Cookies()
    const navigate = useNavigate()
    const handleLogout = async () => {
        localStorage.removeItem('user')
        await setUser(null)
        cookies.remove('token')
        navigate('/login', { replace: true })
    }
    return (
        <nav className='flex justify-between px-12 py-6 max-w-[1440px] mx-auto'>

            <h2 className='font-bold text-2xl flex items-center gap-2'><RiMessage3Fill /> <span className='text-primary'>Blinker</span></h2>
            <ul className='sm:flex hidden gap-6 font-light tracking-wide'>
                {user && <>
                    <li><Link href="#" className='hover:bg-primary py-2 px-4 rounded-full hover:text-bgColor transition-all'>Messages</Link></li>
                    <li><Link href="#" className='hover:bg-primary py-2 px-4 rounded-full hover:text-bgColor transition-all'>About</Link></li>
                    <li><Link href="#" className='hover:bg-primary py-2 px-4 rounded-full hover:text-bgColor transition-all'>Profile</Link></li>
                    <li><Link href="#" className='hover:bg-primary py-2 px-4 rounded-full hover:text-bgColor transition-all' onClick={handleLogout}>Logout</Link></li>
                </>}
                {
                    !user && <>
                        <li><Link to="/login" className='hover:bg-primary py-2 px-4 rounded-full hover:text-bgColor transition-all'>Login</Link></li>
                        <li><Link to="/register" className='hover:bg-primary py-2 px-4 rounded-full hover:text-bgColor transition-all'>Register</Link></li>
                        <li><Link href="#" className='hover:bg-primary py-2 px-4 rounded-full hover:text-bgColor transition-all'>About</Link></li>
                    </>
                }
            </ul>
        </nav>
    )
}

export default Navbar