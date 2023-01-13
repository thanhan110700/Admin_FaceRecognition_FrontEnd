import React, { useEffect, useMemo, useState } from 'react'
import { toast } from 'react-hot-toast'
import { OverlaySpinner } from '../../components/OverlaySpinner'
import Header from '../../partials/Header'
import { ItemCard } from './components/ItemCard'

export const Message = () => {
  const [loading, setLoading] = useState(true)

  return (
    <>
      <OverlaySpinner open={loading} />
      {/* Content area */}
      <div className='relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden'>
        {/*  Site header */}
        <main>
          <div className='px-4 min-h-screen sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto'>
            <ItemCard setLoading={setLoading} />
          </div>
        </main>
      </div>
    </>
  )
}
