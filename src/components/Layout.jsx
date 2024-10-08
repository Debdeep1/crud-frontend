import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

const Layout = ({children}) => {
  return (
    <div className="min-h-screen flex flex-col">
    <Navbar />
    <div className="flex flex-1">
      <Sidebar />
      <main className="flex-1 justify-center items-center p-4 bg-gray-100">
        {children}
      </main>
    </div>
  </div>
  )
}

export default Layout