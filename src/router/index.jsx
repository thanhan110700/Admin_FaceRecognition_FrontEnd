import React, { useEffect, useState } from 'react'
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useRoutes,
} from 'react-router-dom'
import { URL } from '../config/constants'

import BaseLayout from '../layouts/BaseLayout'
import { LoginLayout } from '../layouts/LoginLayout'
import DetailAttendance from '../pages/Attendance/DetailAttendance'
import ListUserAttendance from '../pages/Attendance/ListUser'
import Dashboard from '../pages/Dashboard/Dashboard'
import EditUser from '../pages/User/EditUser'
import ListUser from '../pages/User/ListUser'
import RegisterUser from '../pages/User/RegisterUser'
import RedirectDefault from './RedirectDefault'

const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<RedirectDefault />} />
      <Route path='/' element={<BaseLayout />}>
        <Route path={URL.DASHBOARD} element={<Dashboard />} />
        <Route path={URL.LIST_USER} element={<ListUser />} />
        <Route path={URL.EDIT_USER} element={<EditUser />} />
        <Route path={URL.REGISTER_USER} element={<RegisterUser />} />
        <Route
          path={URL.LIST_USER_ATTENDANCE}
          element={<ListUserAttendance />}
        />
        <Route path={URL.ATTENDANCE_DETAIL} element={<DetailAttendance />} />
      </Route>
      <Route path='/login' element={<LoginLayout />} />
    </Routes>
  )
}
export default Router
