import React, { useState } from 'react'
import WelcomeBanner from '../../partials/dashboard/WelcomeBanner'
import Header from '../../partials/Header'
import Card from './components/Card'

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  return (
    <div className='flex h-screen overflow-hidden'>
      {/* Content area */}
      <div className='relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden'>
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className='px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto'>
            {/* Welcome banner */}
            <WelcomeBanner />
            <div className='flex flex-col mb-10'>
              <label className='font-bold mb-1 text-xl ml-10'>User</label>
              <hr className='mb-2' />
              <div className='flex justify-around '>
                <Card className='bg-blue-300'>List</Card>
                <Card className='bg-red-300'>Register</Card>
              </div>
            </div>
            <div className='flex flex-col mb-10'>
              <label className='font-bold mb-1 text-xl ml-10'>Attendance</label>
              <hr className='mb-2' />
              <div className='flex justify-around '>
                <Card className='bg-green-300'>List User</Card>
                <Card className='bg-red-300'>Register</Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Dashboard
