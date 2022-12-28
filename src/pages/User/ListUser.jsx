import React, { useEffect, useState } from 'react'
import Header from '../../partials/Header'
import { deleteUser, getUser } from '../../api/services/AuthUser'
import { OverlaySpinner } from '../../components/OverlaySpinner'
import { AiFillDelete, AiFillSetting } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'

function ListUser() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    getData()
  }, []) // triggered on route change

  const getData = () => {
    getUser()
      .then(({ data }) => {
        setUsers(data)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handleDelete = (id) => {
    if (confirm(`Are you sure you want delete User with ID = ${id} ?`)) {
      setLoading(true)
      deleteUser(id)
        .then(() => {
          getData()
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }

  const handleEdit = (id) => {
    navigate(`/user/${id}/edit`)
  }

  return (
    <div className='flex h-screen w-full overflow-hidden'>
      <OverlaySpinner open={loading} />
      {/* Content area */}
      <div className='relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden'>
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className='px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto'>
            <table className='w-full drop-shadow-lg text-sm text-left text-gray-500 dark:text-gray-400'>
              <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                <tr>
                  <th scope='col' className='py-3 px-6 text-center'>
                    #ID
                  </th>
                  <th scope='col' className='py-3 px-6'>
                    <div className='flex items-center'>USERNAME</div>
                  </th>
                  <th scope='col' className='py-3 px-6'>
                    <div className='flex items-center'>USER CODE</div>
                  </th>
                  <th scope='col' className='py-3 px-6'>
                    <div className='flex items-center'>NAME</div>
                  </th>
                  <th scope='col' className='py-3 px-6'>
                    <span className='flex items-center'>BIRTH DAY</span>
                  </th>
                  <th scope='col' className='py-3 px-6'>
                    <span className='flex items-center'>DEPARTMENT</span>
                  </th>
                  <th scope='col' className='py-3 px-6'>
                    <span className='flex items-center'>POSITION</span>
                  </th>
                  <th scope='col' className='py-3 px-6'>
                    <span className='flex items-center'>TOTAL AMOUNT</span>
                  </th>
                  <th scope='col' className='py-3 px-6'>
                    <span className='flex items-center'>SALARY</span>
                  </th>
                  <th scope='col' className='py-3 px-6'>
                    <span className='flex items-center'>TRAINING</span>
                  </th>
                  <th scope='col' className='py-3 px-6'></th>
                </tr>
              </thead>
              <tbody>
                {users &&
                  users.map((user, index) => {
                    return (
                      <tr
                        key={user.id}
                        className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'
                      >
                        <th className='py-4 px-1 text-center'>{index + 1}</th>
                        <td className='py-4 px-2 text-center'>
                          {user.username}
                        </td>
                        <td className='py-4 px-2 text-center'>
                          {user.user_code}
                        </td>
                        <td className='py-4 px-2 text-center'>{user.name}</td>
                        <td className='py-4 px-2 text-center'>
                          {user.birthday}
                        </td>
                        <td className='py-4 px-2 text-center'>
                          {user.department}
                        </td>
                        <td className='py-4 px-2 text-center'>
                          {user.position}
                        </td>
                        <td className='py-4 px-2 text-center'>
                          {user.total_amount}
                        </td>
                        <td className='py-4 px-2 text-center'>{user.salary}</td>
                        <td className='py-4 px-2 text-center'>
                          {user.is_training}
                        </td>
                        <td className='py-4 px-2'>
                          <div className='flex items-center space-x-4 text-sm'>
                            <div className='flex content-between items-center'>
                              <button
                                onClick={() => handleDelete(user.id)}
                                className='items-center text-xl mr-2'
                              >
                                <AiFillDelete className='hover:text-red-600' />
                              </button>
                              <button
                                onClick={() => handleEdit(user.id)}
                                className='items-center text-xl'
                              >
                                <AiFillSetting className='hover:text-blue-600' />
                              </button>
                            </div>
                          </div>
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

export default ListUser
