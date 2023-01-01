import React, { useEffect, useState } from 'react'
import { AiFillDelete, AiFillSetting } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { downloadCsvSalary, getListSalary } from '../../api/services/Attendance'
import { Button } from '../../components/Button'
import Input from '../../components/Input'
import { OverlaySpinner } from '../../components/OverlaySpinner'
import Header from '../../partials/Header'

export const Salary = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [salaries, setSalaries] = useState([])
  const navigate = useNavigate()
  const [payload, setPayload] = useState({
    month: new Date(),
  })
  useEffect(() => {
    getData()
  }, [payload]) // triggered on route change

  const getData = () => {
    getListSalary(payload)
      .then(({ data }) => {
        setSalaries(data)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handleDownloadCSV = () => {
    setLoading(true)

    downloadCsvSalary(payload)
      .then((response) => {
        console.log(123)
      })
      .catch((response) => toast.error(get(response, 'message', '')))
      .finally(() => setLoading(false))
  }

  return (
    <div className='flex h-screen w-full overflow-hidden'>
      <OverlaySpinner open={loading} />
      {/* Content area */}
      <div className='relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden'>
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main>
          <div className='px-4 sm:px-6 lg:px-8 py-8 w-1/2 max-w-9xl mx-auto'>
            <Input
              type='month'
              name='month'
              label='Month'
              value={payload.month}
              onChange={(e) =>
                setPayload({ ...payload, month: e.target.value })
              }
            />
            <Button onClick={handleDownloadCSV}>Export CSV</Button>
          </div>
          <div className='px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto'>
            <table className='w-full drop-shadow-lg text-sm text-left text-gray-500 dark:text-gray-400'>
              <thead className='text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400'>
                <tr>
                  <th scope='col' className='py-3 px-6 text-center'>
                    #ID
                  </th>
                  <th scope='col' className='text-center py-3 px-6'>
                    USERNAME
                  </th>
                  <th scope='col' className='text-center py-3 px-6'>
                    NAME
                  </th>
                  <th scope='col' className='text-center py-3 px-6'>
                    POSITION
                  </th>{' '}
                  <th scope='col' className='text-center py-3 px-6'>
                    DEPARTMENT
                  </th>
                  <th scope='col' className='text-center py-3 px-6'>
                    SALARY
                  </th>
                </tr>
              </thead>
              <tbody>
                {salaries &&
                  salaries.map((user, index) => {
                    return (
                      <tr
                        key={user.id}
                        className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'
                      >
                        <th className=' text-center'>{index + 1}</th>
                        <td className='py-4 text-center'>{user.username}</td>
                        <td className='py-4 text-center'>{user.name}</td>
                        <td className='py-4 text-center'>{user.position}</td>
                        <td className='py-4 text-center'>{user.department}</td>
                        <td className='py-4 text-center'>
                          {parseInt(user.salary).toLocaleString('vi-VN')} VND
                        </td>
                      </tr>
                    )
                  })}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  )
}
