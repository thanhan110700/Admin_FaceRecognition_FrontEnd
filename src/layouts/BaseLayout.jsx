import React, { useEffect, useState } from 'react'

import Sidebar from '../partials/Sidebar'
import { Outlet, useNavigate } from 'react-router-dom'
import { OverlaySpinner } from '../components/OverlaySpinner'
import state from '../utils/localStorage'
import Header from '../partials/Header'
import sessionState from '../utils/sessionState'

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
        <div className='w-full bg-white'>
          <div className='flex h-screen w-full overflow-hidden'>
            <OverlaySpinner open={loading} />
            {/* Content area */}
            <div className='relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden'>
              {/*  Site header */}
              <Header
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
              />
              <main>
                <Outlet setLoading={setLoading} />
              </main>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default BaseLayout
