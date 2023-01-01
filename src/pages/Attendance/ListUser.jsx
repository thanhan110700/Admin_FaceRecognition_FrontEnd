import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUser } from '../../api/services/AuthUser'
import DataTable from '../../components/DataTable'
import { OverlaySpinner } from '../../components/OverlaySpinner'
import CustomPagination from '../../components/Pagination'
import { DEFAULT_PAGINATION_OBJECT } from '../../config/constants'
import { useDebouncedCallback } from '../../hooks/useDebouncedCallback'
import Header from '../../partials/Header'
import sessionState from '../../utils/sessionState'

export default function ListUserAttendance() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
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

  const handleRowClick = (id) => {
    navigate('' + id)
  }

  const handleChangePage = (event, page) => {
    const dataTemp = { ...dataSearch, page }
    debounceFn(dataTemp)
    setDataSearch(dataTemp)
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
              <thead className='text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400'>
                <tr>
                  <th scope='col' className='py-3 px-6 text-center'>
                    #ID
                  </th>
                  <th scope='col' className='py-3 px-6 text-center'>
                    USERNAME
                  </th>
                  <th scope='col' className='py-3 px-6 text-center'>
                    USER CODE
                  </th>
                  <th scope='col' className='py-3 px-6 text-center'>
                    NAME
                  </th>
                </tr>
              </thead>
              <tbody>
                {users &&
                  users.map((user, index) => {
                    return (
                      <tr
                        key={user.id}
                        onClick={() => handleRowClick(user.id)}
                        className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'
                      >
                        <th className='py-4 text-center'>{user.id}</th>
                        <td className='py-4 text-center'>{user.username}</td>
                        <td className='py-4 text-center'>{user.user_code}</td>
                        <td className='py-4 text-center'>{user.name}</td>
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
    </div>
  )
}
