import React from 'react'
import { UserContext } from '../../../App'
import Cookies from 'universal-cookie'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
    const { user } = React.useContext(UserContext)
    const localUser = localStorage.getItem('user')
    const cookies = new Cookies()
    const token = cookies.get('token')
    if (token && user && localUser) {
        return children
    }

    return <Navigate to='/login'></Navigate>
}

export default ProtectedRoute