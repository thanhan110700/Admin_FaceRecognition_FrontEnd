import React, { useEffect, useMemo, useState } from 'react'
import { toast } from 'react-hot-toast'
import { OverlaySpinner } from '../../components/OverlaySpinner'
import Header from '../../partials/Header'
import { ItemCard } from './components/ItemCard'

export const Message = () => {
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='flex h-screen w-full overflow-hidden'>
      <OverlaySpinner open={loading} />
      {/* Content area */}
      <div className='relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden'>
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main>
          <div className='px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto'>
            <ItemCard setLoading={setLoading} />
          </div>
        </main>
      </div>
    </div>
  )
}
