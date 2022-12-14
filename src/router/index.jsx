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
import { Salary } from '../pages/Attendance/Salary'
import Dashboard from '../pages/Dashboard/Dashboard'
import { Message } from '../pages/Message'
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
        <Route path={URL.ATTENDANCE_SALARY} element={<Salary />} />
        <Route path={URL.MESSAGE} element={<Message />} />
      </Route>
      <Route path='/login' element={<LoginLayout />} />
    </Routes>
  )
}
export default Router
