import React, { useEffect, useState } from 'react'

import Sidebar from '../partials/Sidebar'
import { Outlet, useNavigate } from 'react-router-dom'
import { OverlaySpinner } from '../components/OverlaySpinner'
import state from '../utils/localStorage'

function BaseLayout() {
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkLoggedIn = async () => {
      const token = state.getState('token')
      if (!token) {
        navigate('/login', { replace: true })
      }
    }
    checkLoggedIn()
    setLoading(false)
  }, [])
  return (
    <>
      <OverlaySpinner open={loading} />
      <div className='flex h-screen overflow-hidden'>
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className='w-full'>
          <Outlet />
        </main>
      </div>
    </>
  )
}

export default BaseLayout
