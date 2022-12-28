import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUser } from '../../api/services/AuthUser'
import DataTable from '../../components/DataTable'
import { OverlaySpinner } from '../../components/OverlaySpinner'
import Header from '../../partials/Header'

export default function ListUserAttendance() {
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

  const columns = useMemo(
    () => [
      {
        headerName: 'ID',
        field: 'id',
        flex: 1,
        sortable: false,
      },
      {
        headerName: 'USERNAME',
        field: 'username',
        flex: 2,
        sortable: false,
      },
      {
        headerName: 'NAME',
        field: 'name',
        flex: 2,
        sortable: false,
      },
      {
        headerName: 'USER CODE',
        field: 'user_code',
        flex: 2,
        sortable: false,
      },
    ],
    []
  )
  const handleRowClick = (row) => {
    navigate('' + row.id)
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
            <DataTable
              columns={columns}
              rows={users}
              onRowClick={handleRowClick}
            />
          </div>
        </main>
      </div>
    </div>
  )
}
