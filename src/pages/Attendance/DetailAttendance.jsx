import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchAttendanceByUserId } from '../../api/services/Attendance'
import Input from '../../components/Input'
import Modal from '../../components/Modal'
import { OverlaySpinner } from '../../components/OverlaySpinner'
import Select from '../../components/Select'
import Header from '../../partials/Header'
import Form from './components/Form'

export default function DetailAttendance() {
  const [loading, setLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const { id } = useParams()

  const [attendances, setAttendances] = useState([])
  const [user, setUser] = useState({
    id: '',
    name: '',
    position: '',
    department: '',
    salary: '',
  })
  const [dataUpdate, setDataUpdate] = useState({
    id: '',
    user_id: id,
    check_in: '',
    check_out: '',
  })
  const [totalTime, setTotalTime] = useState([])
  const [totalSalary, setTotalSalary] = useState([])
  const [payload, setPayload] = useState({
    month: new Date(),
  })
  const getData = () => {
    fetchAttendanceByUserId(id, payload)
      .then((res) => {
        const { data, total_salary, total_time, user } = res
        setAttendances(data)
        setTotalTime(total_time)
        setTotalSalary(total_salary)
        setUser({
          id: user.id,
          name: user.user_information.name,
          position: user.user_information.position.name,
          department: user.user_information.department.name,
          salary: user.user_information.salary.salary,
        })
      })
      .finally(() => setLoading(false))
  }
  useEffect(() => {
    getData()
  }, [payload])

  const changePayload = (e) => {
    const { value } = e.target
    setPayload({
      ...payload,
      month: value,
    })
  }

  return (
    <>
      {/* Content area */}
      <div className='relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden'>
        {/*  Site header */}
        <main>
          <div className='p-5'>
            <div className='flex justify-between mb-5'>
              <div>
                <h1 className='text-2xl font-semibold text-gray-600 dark:text-gray-300'>
                  Detail Attendance
                </h1>
                <p className='text-sm text-gray-400 dark:text-gray-400'>
                  {user.name} - {user.position} - {user.department} -
                  {Intl.NumberFormat().format(parseInt(user.salary)) + ' VNĐ'}
                  {}
                </p>
              </div>
              <div className='flex flex-col'>
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
              <thead className='text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400'>
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
                    Image
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
                    onClick={() => {
                      setDataUpdate({
                        ...dataUpdate,
                        id: item.id,
                        date: item.date,
                        check_in: item.check_in ?? item.date,
                        check_out: item.check_out ?? item.date,
                        is_late: item.is_late,
                      })
                      setIsOpen(true)
                    }}
                    className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 transition duration-300 ease-in-out hover:bg-[#b1b3b9]'
                  >
                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium '>
                      {index + 1}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium '>
                      {new Date(item.date).toLocaleDateString()}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium '>
                      <img src={item.image_face} alt='' className='w-20' />
                    </td>
                    <td className='text-base  font-light px-6 py-4 whitespace-nowrap'>
                      {item.is_late == 3
                        ? ''
                        : new Date(item.check_in).toLocaleTimeString()}
                    </td>
                    <td className='text-base  font-light px-6 py-4 whitespace-nowrap'>
                      {item.is_late == 3
                        ? ''
                        : item.check_out
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
                  <td></td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium '>
                    {new Intl.NumberFormat().format(parseInt(totalSalary))} VND
                  </td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
          <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
            <Form
              getData={getData}
              dataUpdate={dataUpdate}
              setDataUpdate={setDataUpdate}
              setIsOpen={setIsOpen}
              setLoading={setLoading}
              loading={loading}
            />
          </Modal>
        </main>
      </div>
    </>
  )
}
