import React, { useEffect, useMemo, useState } from 'react'
import Header from '../../partials/Header'
import { deleteUser, getUser } from '../../api/services/AuthUser'
import { OverlaySpinner } from '../../components/OverlaySpinner'
import { AiFillDelete, AiFillSetting } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import {
  DEFAULT_PAGINATION_OBJECT,
  LIST_DEPARTMENT,
  LIST_POSITION,
  LIST_TRAININGS,
} from '../../config/constants'
import sessionState from '../../utils/sessionState'
import CustomPagination from '../../components/Pagination'
import { useDebouncedCallback } from '../../hooks/useDebouncedCallback'
import Input from '../../components/Input'
import { Transition } from '@headlessui/react'
import { Button } from '../../components/Button'
import { SearchForm } from '../../components/SearchForm'
import Select from '../../components/Select'

function ListUser() {
  const [showSearch, setShowSearch] = useState(false)
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState([])
  const [pagination, setPagination] = useState(DEFAULT_PAGINATION_OBJECT)
  const paramsSession = sessionState.getState('params')
  const [dataSearch, setDataSearch] = useState(paramsSession || {})

  const navigate = useNavigate()

  useEffect(() => {
    debounceFn()
  }, []) // triggered on route change

  const getData = (filterValue) => {
    const searchParamsTemp = new URLSearchParams(filterValue || dataSearch)
    sessionState.set('params', filterValue || dataSearch)
    getUser(searchParamsTemp.toString())
      .then(({ data }) => {
        setUsers(data.data)
        setPagination({
          currentPage: data.current_page,
          lastPage: data.last_page,
          totalPage: data.total,
          perPage: data.per_page,
          from: data.from,
          to: data.to,
        })
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const debounceFn = useDebouncedCallback(getData)

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

  const handleChangePage = (event, page) => {
    const dataTemp = { ...dataSearch, page }
    debounceFn(dataTemp)
    setDataSearch(dataTemp)
  }

  const onChange = (e) => {
    const dataTemp = { ...dataSearch, [e.target.name]: e.target.value }
    setDataSearch(dataTemp)
  }

  const onSearch = () => {
    debounceFn(dataSearch)
  }

  const departments = useMemo(() => LIST_DEPARTMENT, [])
  const positions = useMemo(() => LIST_POSITION, [])
  const trainings = useMemo(() => LIST_TRAININGS, [])

  return (
    <>
      <OverlaySpinner open={loading} />
      {/* Content area */}
      <div className='relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden'>
        {/*  Site header */}
        <main>
          <div className='px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto'>
            <div className='flex flex-col items-center justify-center mb-5'>
              <Button
                onClick={() => {
                  setShowSearch(!showSearch)
                }}
              >
                Show
              </Button>
              <Transition show={showSearch}>
                <Transition.Child
                  enter='ease-out duration-300'
                  enterFrom='opacity-0'
                  enterTo='opacity-100'
                  leave='ease-in duration-200'
                  leaveFrom='opacity-100'
                  leaveTo='opacity-0'
                >
                  <SearchForm onHandleSearch={onSearch}>
                    <div className='grid grid-cols-2 gap-2 justify-around'>
                      <Input
                        type='text'
                        label='User ID'
                        value={dataSearch.id}
                        name='id'
                        onChange={onChange}
                      />
                      <Input
                        type='text'
                        value={dataSearch.username}
                        label='Username'
                        name='username'
                        onChange={onChange}
                      />
                    </div>
                    <div className='grid grid-cols-2 gap-2'>
                      <Input
                        type='text'
                        label='User code'
                        value={dataSearch.user_code}
                        name='user_code'
                        onChange={onChange}
                      />
                      <Input
                        type='text'
                        label='Name'
                        value={dataSearch.name}
                        name='name'
                        onChange={onChange}
                      />
                    </div>
                    <div className='grid grid-cols-3 gap-2'>
                      <Select
                        label='Position'
                        value={dataSearch.position_id}
                        name='position_id'
                        data={[{ value: 0, name: 'All' }, ...positions]}
                        onChange={(e) => onChange(e)}
                      />
                      <Select
                        label='Department'
                        value={dataSearch.department_id}
                        name='department_id'
                        data={[{ value: 0, name: 'All' }, ...departments]}
                        onChange={(e) => onChange(e)}
                      />
                      <Select
                        label='Training'
                        value={dataSearch.is_training}
                        name='is_training'
                        data={[{ value: 2, name: 'All' }, ...trainings]}
                        onChange={(e) => onChange(e)}
                      />
                    </div>
                  </SearchForm>
                </Transition.Child>
              </Transition>
            </div>
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
                        <th className='py-4 px-1 text-center'>{user.id}</th>
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
            <div className='flex justify-center'>
              <CustomPagination
                pagination={pagination}
                handleChangePage={handleChangePage}
              />
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export default ListUser
