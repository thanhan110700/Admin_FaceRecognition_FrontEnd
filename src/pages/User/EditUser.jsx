import React, { useEffect, useMemo, useState } from 'react'
import Header from '../../partials/Header'
import { getUser, getUserById, updateUser } from '../../api/services/AuthUser'
import { OverlaySpinner } from '../../components/OverlaySpinner'
import { AiFillDelete, AiFillSetting } from 'react-icons/ai'
import { useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import get from 'lodash/get'
import Select from '../../components/Select'
import Input from '../../components/Input'

function EditUser() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const [dataUser, setDataUser] = useState({
    username: '',
    password: '',
    re_password: '',
    email: '',
    user_code: '',
    name: '',
    birthday: '',
    department_id: 1,
    position_id: 1,
    total_amount: '',
  })

  const onChangeData = (e) => {
    setDataUser({
      ...dataUser,
      [e.target.name]: e.target.value,
    })
  }

  useEffect(() => {
    getData(id)
  }, []) // triggered on route change

  const getData = (id) => {
    getUserById(id)
      .then(({ data }) => {
        setDataUser({
          ...data,
          password: '',
        })
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }
  const departments = useMemo(
    () => [
      { value: 1, name: 'Human Resource' },
      { value: 2, name: 'Marketing' },
      { value: 3, name: 'Sales' },
      { value: 4, name: 'Information Technology' },
    ],
    []
  )
  const positions = useMemo(
    () => [
      { value: 1, name: 'Director' },
      { value: 2, name: 'Manager' },
      { value: 3, name: 'Deputy' },
      { value: 4, name: 'Employee' },
    ],
    []
  )

  const handleEdit = (e) => {
    setLoading(true)
    e.preventDefault()
    updateUser(id, dataUser)
      .then(() => {
        toast.success('Update Success')
      })
      .catch((error) => {
        const err = get(error, 'response.data.errors')
        toast.error(err[Object.keys(err)[0]])
      })
      .finally(() => {
        setLoading(false)
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
          <div className='flex justify-center px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto'>
            <div className='w-full max-w-lg bg-white shadow-lg p-5 rounded-md'>
              <label>
                <div className='flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5'>
                  <p className='text-center text-3xl font-semibold mx-4 mb-2'>
                    EDIT USER
                  </p>
                </div>
              </label>
              <div className='flex flex-wrap -mx-3 mb-2'>
                <div className='w-full md:w-full px-3 mb-2 md:mb-0'>
                  <Input
                    label='Username'
                    type='text'
                    disabled
                    value={dataUser.username}
                    name='username'
                    placeholder='Username'
                    onChange={(e) => onChangeData(e)}
                  />
                </div>
              </div>
              <div className='flex flex-wrap -mx-3 mb-2'>
                <div className='w-full px-3'>
                  <Input
                    label='Password'
                    type='password'
                    value={dataUser.password}
                    placeholder='password'
                    name='password'
                    onChange={(e) => onChangeData(e)}
                  />
                </div>
              </div>
              <div className='flex flex-wrap -mx-3 mb-2'>
                <div className='w-full px-3'>
                  <Input
                    label='re-Password'
                    type='password'
                    value={dataUser.re_password}
                    placeholder='re-password'
                    name='re_password'
                    onChange={(e) => onChangeData(e)}
                  />
                </div>
              </div>
              <div className='flex flex-wrap -mx-3 mb-2'>
                <div className='w-full md:w-full px-3 mb-2 md:mb-0'>
                  <Input
                    label='Name'
                    type='text'
                    name='name'
                    required
                    value={dataUser.name}
                    placeholder='Name'
                    onChange={(e) => onChangeData(e)}
                  />
                </div>
              </div>
              <div className='flex flex-wrap -mx-3 mb-2'>
                <div className='w-full md:w-full px-3 mb-2 md:mb-0'>
                  <Input
                    label='User Code'
                    type='text'
                    disabled
                    name='user_code'
                    value={dataUser.user_code}
                    onChange={(e) => onChangeData(e)}
                  />
                </div>
              </div>
              <div className='flex flex-wrap -mx-3 mb-2'>
                <div className='w-full md:w-full px-3 mb-2 md:mb-0'>
                  <Input
                    label='Birthday'
                    type='date'
                    name='birthday'
                    value={dataUser.birthday}
                    onChange={(e) => onChangeData(e)}
                  />
                </div>
              </div>
              <div className='flex flex-wrap -mx-3 mb-2'>
                <div className='w-full md:w-1/2 px-3 mb-2 md:mb-0'>
                  <Select
                    label='Position'
                    id='grid-position'
                    value={dataUser.position_id}
                    name='position_id'
                    data={positions}
                    onChange={(e) => onChangeData(e)}
                  />
                </div>
                <div className='w-full md:w-1/2 px-3 mb-2 md:mb-0'>
                  <Select
                    label='Department'
                    id='grid-department'
                    value={dataUser.department_id}
                    name='department_id'
                    data={departments}
                    onChange={(e) => onChangeData(e)}
                  />
                </div>
                <div className='flex w-full mt-5 justify-end'>
                  <button
                    className='flex px-10 py-2 bg-green-500 text-white rounded-sm float-right'
                    onClick={handleEdit}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default EditUser
