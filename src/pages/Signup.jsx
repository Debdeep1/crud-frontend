import React from 'react'
import AuthForm from '../components/AuthForm'

const Signup = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
    <AuthForm type="signup" />
  </div>
  )
}

export default Signup