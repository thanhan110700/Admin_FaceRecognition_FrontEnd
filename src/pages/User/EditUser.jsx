import React, { useEffect, useState } from 'react'
import Header from '../../partials/Header'
import { getUser, getUserById, updateUser } from '../../api/services/AuthUser'
import { OverlaySpinner } from '../../components/OverlaySpinner'
import { AiFillDelete, AiFillSetting } from 'react-icons/ai'
import { useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import get from 'lodash/get'

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

  const handleEdit = (e) => {
    e.preventDefault()
    updateUser(id, dataUser)
      .then(() => {
        toast.success('Update Success')
      })
      .catch((error) => {
        const err = get(error, 'response.data.errors')
        toast.error(err[Object.keys(err)[0]])
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
            <div className='w-full max-w-lg'>
              <div className='flex flex-wrap -mx-3 mb-6'>
                <div className='w-full md:w-full px-3 mb-6 md:mb-0'>
                  <label
                    className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                    htmlFor='grid-first-name'
                  >
                    Username
                  </label>
                  <input
                    className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                    type='text'
                    disabled
                    value={dataUser.username}
                    name='username'
                    placeholder='Username'
                    onChange={(e) => onChangeData(e)}
                  />
                </div>
              </div>
              <div className='flex flex-wrap -mx-3 mb-6'>
                <div className='w-full px-3'>
                  <label
                    className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                    htmlFor='grid-password'
                  >
                    Password
                  </label>
                  <input
                    className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                    type='password'
                    placeholder='password'
                    name='password'
                    onChange={(e) => onChangeData(e)}
                  />
                </div>
              </div>
              <div className='flex flex-wrap -mx-3 mb-6'>
                <div className='w-full px-3'>
                  <label
                    className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                    htmlFor='grid-re-password'
                  >
                    re-Password
                  </label>
                  <input
                    className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                    type='password'
                    placeholder='re-password'
                    name='re_password'
                    onChange={(e) => onChangeData(e)}
                  />
                </div>
              </div>
              <div className='flex flex-wrap -mx-3 mb-6'>
                <div className='w-full md:w-full px-3 mb-6 md:mb-0'>
                  <label
                    className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                    htmlFor='grid-first-name'
                  >
                    Name
                  </label>
                  <input
                    className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                    type='text'
                    name='name'
                    value={dataUser.name}
                    placeholder='Name'
                    onChange={(e) => onChangeData(e)}
                  />
                </div>
              </div>
              <div className='flex flex-wrap -mx-3 mb-6'>
                <div className='w-full md:w-full px-3 mb-6 md:mb-0'>
                  <label
                    className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                    htmlFor='grid-first-name'
                  >
                    User Code
                  </label>
                  <input
                    className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                    type='text'
                    disabled
                    name='user_code'
                    value={dataUser.user_code}
                    onChange={(e) => onChangeData(e)}
                  />
                </div>
              </div>
              <div className='flex flex-wrap -mx-3 mb-6'>
                <div className='w-full md:w-full px-3 mb-6 md:mb-0'>
                  <label
                    className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                    htmlFor='grid-first-name'
                  >
                    Birthday
                  </label>
                  <input
                    className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                    type='date'
                    name='birthday'
                    value={dataUser.birthday}
                    onChange={(e) => onChangeData(e)}
                  />
                </div>
              </div>
              <div className='flex flex-wrap -mx-3 mb-2'>
                <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
                  <label
                    className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                    htmlFor='grid-position'
                  >
                    Position
                  </label>
                  <select
                    className='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                    id='grid-position'
                    value={dataUser.position_id}
                    name='position_id'
                    onChange={(e) => onChangeData(e)}
                  >
                    <option value={1}>Giám đốc</option>
                    <option value={2}>Trưởng phòng</option>
                    <option value={3}>Phó phòng</option>
                    <option value={4}>Nhân viên</option>
                  </select>
                </div>
                <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
                  <label
                    className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                    htmlFor='grid-department'
                  >
                    Department
                  </label>
                  <div className='relative'>
                    <select
                      className='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                      id='grid-department'
                      value={dataUser.department_id}
                      name='department_id'
                      onChange={(e) => onChangeData(e)}
                    >
                      <option value={1}>Quản lý nhân sự</option>
                      <option value={2}>Chuyên viên tư vấn</option>
                      <option value={3}>Chuyên viên kinh doanh</option>
                      <option value={4}>Kỹ sư Công nghệ thông tin</option>
                    </select>
                  </div>
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
