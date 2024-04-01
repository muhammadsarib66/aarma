import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
    const navigate = useNavigate()
    const handleLogout = () => {
        console.log('logout')
        localStorage.removeItem('token')
        navigate('/login')
    }
  return (
    <section className="pt-20">Dashboard
    <Button onClick={handleLogout} variant='contained'>
logout
    </Button>
    </section>
  )
}

export default Dashboard