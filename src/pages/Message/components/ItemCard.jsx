import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { AiFillNotification } from 'react-icons/ai'
import { BiTimeFive } from 'react-icons/bi'
import {
  getListNotification,
  updateNotificationRead,
} from '../../../api/services/Notification'
import FilterButton from './FilterButton'

export const ItemCard = ({ className, setLoading }) => {
  const [notifications, setNotifications] = useState([])
  const [payload, setPayload] = useState({
    orderType: 'desc',
  })
  const getData = () => {
    getListNotification(payload)
      .then(({ data }) => {
        setNotifications(data)
      })
      .catch(() => {
        toast.success('Error')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    getData()
  }, [payload])

  const onClickItem = (id) => {
    updateNotificationRead(id, payload).then(({ data }) => {
      setNotifications(data)
    })
  }
  return (
    <div className='flex justify-center'>
      <div className='w-1/2 shadow-2xl rounded-md p-2'>
        <FilterButton setPayload={setPayload} />
        {notifications &&
          notifications.map((notification) => (
            <div
              key={notification.id}
              onClick={() => onClickItem(notification.id)}
              className={`flex flex-col shadow-md p-5 my-2 bg-blue-200 hover:cursor-pointer transition-all duration-200 rounded-xl ${
                notification.read ? 'bg-blue-200' : 'bg-red-200'
              }`}
            >
              <div className='flex items-center justify-between'>
                <div className='flex items-center font-semibold'>
                  <AiFillNotification />
                  {notification.from}
                </div>
                <div className='flex items-center'>
                  <BiTimeFive />
                  <p className='text-sm'>
                    {new Date(notification.created_at).toLocaleString()}
                  </p>
                </div>
              </div>
              <div className='flex items-center justify-start mt-5'>
                <p className='font-thin'>{notification.message}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
