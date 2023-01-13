import React, { useEffect, useState } from 'react'
import { getMasterData } from '../../api/services/Dashboard'
import WelcomeBanner from '../../partials/dashboard/WelcomeBanner'
import Card from './components/Card'
import DescriptionCard from './components/DescriptionCard'

function Dashboard() {
  const [totalUser, setTotalUser] = useState(0)
  const [attendanceOfMonth, setAttendanceOfMonth] = useState([])
  useEffect(() => {
    getMsData()
  }, [])

  const getMsData = () => {
    getMasterData()
      .then(({ data }) => {
        setTotalUser(data.totalUser)
        setAttendanceOfMonth(data.attendanceOfMonth)
      })
      .catch((err) => {
        // console.log('lỗi')
      })
  }
  return (
    <>
      {/* Content area */}
      <div className='relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden'>
        {/*  Site header */}

        <main>
          <div className='px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto'>
            {/* Welcome banner */}
            <WelcomeBanner />
            <div>
              <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3'>
                <DescriptionCard
                  className='bg-blue-500 text-white'
                  title='Total Users'
                  value={totalUser}
                  icon='users'
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export default Dashboard
