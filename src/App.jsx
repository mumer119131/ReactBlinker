import { createContext, useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Navbar from './components/Navbar/Navbar';
import Messages from './components/Messages/Messages';
import ProtectedRoute from './components/Shared/ProtectedRoute/ProtectedRoute';



const UserContext = createContext()

function App() {
  const [user, setUser] = useState(() => {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  })


  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={
              <ProtectedRoute>
                <Messages />
              </ProtectedRoute>
            } />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  )
}

export { UserContext }
export default App
