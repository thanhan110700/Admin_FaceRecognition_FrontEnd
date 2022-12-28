import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchAttendanceByUserId } from '../../api/services/Attendance'
import Input from '../../components/Input'
import { OverlaySpinner } from '../../components/OverlaySpinner'
import Select from '../../components/Select'
import Header from '../../partials/Header'

export default function DetailAttendance() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [attendances, setAttendances] = useState([])
  const [totalTime, setTotalTime] = useState([])
  const [totalSalary, setTotalSalary] = useState([])
  const [payload, setPayload] = useState({
    month: new Date(),
  })
  const navigate = useNavigate()
  const { id } = useParams()
  useEffect(() => {
    fetchAttendanceByUserId(id, payload)
      .then((res) => {
        const { data, total_salary, total_time } = res
        setAttendances(data)
        setTotalTime(total_time)
        setTotalSalary(total_salary)
      })
      .finally(() => setLoading(false))
  }, [payload])

  const changePayload = (e) => {
    const { value } = e.target
    setPayload({
      ...payload,
      month: value,
    })
  }

  return (
    <div className='flex h-screen w-full overflow-hidden'>
      <OverlaySpinner open={loading} />
      {/* Content area */}
      <div className='relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden'>
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main>
          <div className='p-5'>
            <div className='float-right mb-5'>
              <div className='flex'>
                <label className='form-label inline-block'>Select Month</label>
                <Input
                  type='month'
                  value={payload.month}
                  onChange={changePayload}
                  placeholder='Search'
                />
              </div>
            </div>
            <table className='w-full drop-shadow-lg text-sm text-left text-gray-500 dark:text-gray-400'>
              <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                <tr>
                  <th
                    scope='col'
                    className='text-base font-medium  px-6 py-4 text-left'
                  >
                    #
                  </th>
                  <th
                    scope='col'
                    className='text-base font-medium  px-6 py-4 text-left'
                  >
                    Date
                  </th>
                  <th
                    scope='col'
                    className='text-base font-medium  px-6 py-4 text-left'
                  >
                    Check In
                  </th>
                  <th
                    scope='col'
                    className='text-base font-medium  px-6 py-4 text-left'
                  >
                    Check Out
                  </th>
                  <th
                    scope='col'
                    className='text-base font-medium  px-6 py-4 text-left'
                  >
                    Time
                  </th>
                  <th
                    scope='col'
                    className='text-base font-medium py-4 text-left'
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className='font-montserrat'>
                {attendances.map((item, index) => (
                  <tr
                    key={item.id}
                    className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 transition duration-300 ease-in-out hover:bg-[#b1b3b9]'
                  >
                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium '>
                      {index + 1}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium '>
                      {new Date(item.date).toLocaleDateString()}
                    </td>
                    <td className='text-base  font-light px-6 py-4 whitespace-nowrap'>
                      {item.check_in &&
                        new Date(item.check_in).toLocaleTimeString()}
                    </td>
                    <td className='text-base  font-light px-6 py-4 whitespace-nowrap'>
                      {item.check_out
                        ? new Date(item.check_out).toLocaleTimeString()
                        : item.check_in
                        ? 'Pending'
                        : ''}
                    </td>
                    <td className='text-base  font-light px-6 py-4 whitespace-nowrap'>
                      {item.time ? item.time : ''}
                    </td>
                    <td className='text-base text-red-500 font-light py-4 whitespace-nowrap'>
                      {item.is_late_label}
                    </td>
                  </tr>
                ))}
                <tr className='bg-white border-b dark:border-gray-700'>
                  <td></td>
                  <td></td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium '>
                    Total
                  </td>
                  <td></td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium '>
                    {totalTime}
                  </td>
                  <td></td>
                </tr>
                <tr className='bg-white'>
                  <td></td>
                  <td></td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium '>
                    Total Salary
                  </td>
                  <td></td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium '>
                    {new Intl.NumberFormat().format(parseInt(totalSalary))} VND
                  </td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  )
}
