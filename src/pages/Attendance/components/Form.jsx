import React, { useState } from 'react'
import first from 'lodash/first'
import { toast } from 'react-hot-toast'
import { format, set } from 'date-fns'
import { updateAttendance } from '../../../api/services/Attendance'

export default function Form({
  loading,
  getData,
  setDataUpdate,
  dataUpdate,
  setIsOpen,
  setLoading,
}) {
  const close = () => setIsOpenConfirm(false)

  const onChangeData = (e) => {
    const { name, value } = e.target
    const date = new Date(dataUpdate.check_in)
    const [hour, minute] = value.split(':')
    let newDate = set(date, {
      hours: hour,
      minutes: minute,
      seconds: 0,
      milliseconds: 0,
    })
    newDate = format(newDate, 'yyyy-MM-dd HH:mm:ss')
    setDataUpdate({
      ...dataUpdate,
      [name]: newDate,
    })
    return
  }
  const handleUpdate = () => {
    setLoading(true)
    updateAttendance(dataUpdate)
      .then((res) => {
        toast.success('Update attendance success')
        getData()
        setIsOpen(false)
        setLoading(false)
      })
      .catch((err) => {
        toast.error('Update attendance failed')
        setLoading(false)
      })
  }

  return (
    <>
      <div className='mt-10 sm:mt-0'>
        <div className='mt-5 md:col-span-3 md:mt-0'>
          <div className='overflow-hidden shadow sm:rounded-md'>
            <div className='bg-gray-50 px-4 py-3 sm:px-6'>
              <h4>Edit Attendance</h4>
            </div>
            <div className='bg-white px-4 py-5 sm:p-6'>
              <div className='grid grid-cols-12 gap-6'>
                <div className='col-span-6 sm:col-span-6'>
                  <label
                    htmlFor='id'
                    className='block text-sm font-medium text-gray-700'
                  >
                    User Id
                  </label>
                  <input
                    type='text'
                    className='mt-1 block w-full rounded-md border py-2 px-3 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                    disabled
                    value={dataUpdate.user_id}
                  />
                </div>
                <div className='col-span-6 sm:col-span-6'>
                  <label
                    htmlFor='name'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Date
                  </label>
                  <input
                    type='text'
                    className='mt-1 block w-full rounded-md border py-2 px-3 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                    disabled
                    value={new Date(dataUpdate.check_in).toLocaleDateString()}
                  />
                </div>
                <div className='col-span-6 sm:col-span-6'>
                  <label
                    htmlFor='category_name'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Check In
                  </label>
                  <input
                    type='time'
                    name='check_in'
                    className='mt-1 block w-full rounded-md border py-2 px-3 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                    value={format(new Date(dataUpdate.check_in), 'HH:mm')}
                    onChange={onChangeData}
                  />
                </div>
                <div className='col-span-6 sm:col-span-6'>
                  <label
                    htmlFor='price'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Check out
                  </label>
                  <input
                    type='time'
                    name='check_out'
                    className='mt-1 block w-full rounded-md border py-2 px-3 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                    value={format(new Date(dataUpdate.check_out), 'HH:mm')}
                    onChange={onChangeData}
                  />
                </div>
              </div>
            </div>
            <div className='bg-gray-50 px-4 py-3 text-right sm:px-6'>
              <button
                className='inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                onClick={handleUpdate}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
