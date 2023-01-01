import React, { useState } from 'react'
import WelcomeBanner from '../../partials/dashboard/WelcomeBanner'
import Header from '../../partials/Header'
import Card from './components/Card'

function Dashboard() {
  return (
    <>
      {/* Content area */}
      <div className='relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden'>
        {/*  Site header */}

        <main>
          <div className='px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto'>
            {/* Welcome banner */}
            <WelcomeBanner />
          </div>
        </main>
      </div>
    </>
  )
}

export default Dashboard
