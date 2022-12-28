import React, { useEffect, useMemo, useState } from 'react'
import Header from '../../partials/Header'
import {
  getUser,
  getUserById,
  register,
  updateUser,
} from '../../api/services/AuthUser'
import { OverlaySpinner } from '../../components/OverlaySpinner'
import { AiFillDelete, AiFillSetting } from 'react-icons/ai'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import get from 'lodash/get'
import Input from '../../components/Input'
import Select from '../../components/Select'

function RegisterUser() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [dataUser, setDataUser] = useState({
    username: '',
    password: '',
    re_password: '',
    email: '',
    name: '',
    birthday: '',
    department_id: 1,
    position_id: 1,
    total_amount: '',
  })
  const departments = useMemo(
    () => [
      { value: 1, name: 'Quản lý nhân sự' },
      { value: 2, name: 'Chuyên viên tư vấn' },
      { value: 3, name: 'Chuyên viên kinh doanh' },
      { value: 4, name: 'Kỹ sư Công nghệ thông tin' },
    ],
    []
  )
  const positions = useMemo(
    () => [
      { value: 1, name: 'Giám đốc' },
      { value: 2, name: 'Trưởng phòng' },
      { value: 3, name: 'Phó phòng' },
      { value: 4, name: 'Nhân viên' },
    ],
    []
  )

  const onChangeData = (e) => {
    setDataUser({
      ...dataUser,
      [e.target.name]: e.target.value,
    })
  }
  const handleRegister = (e) => {
    setLoading(true)
    e.preventDefault()
    register(dataUser)
      .then(() => {
        toast.success('Register Success')
        navigate(`/user/list`)
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
                    REGISTER USER
                  </p>
                </div>
              </label>
              <div className='flex flex-wrap -mx-3 mb-2 '>
                <div className='w-full md:w-full px-3 mb-2 md:mb-0'>
                  <Input
                    label='Username'
                    type='text'
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
                    value={dataUser.name}
                    placeholder='Name'
                    onChange={(e) => onChangeData(e)}
                  />
                </div>
              </div>
              <div className='flex flex-wrap -mx-3 mb-2'>
                <div className='w-full md:w-full px-3 mb-2 md:mb-0'>
                  <Input
                    label='Birthday'
                    type='date'
                    required
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
                <div className='flex w-full mt-5 justify-end px-5'>
                  <button
                    className='flex px-10 py-2 bg-green-500 text-white rounded-sm float-right'
                    onClick={handleRegister}
                  >
                    Register
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

export default RegisterUser
