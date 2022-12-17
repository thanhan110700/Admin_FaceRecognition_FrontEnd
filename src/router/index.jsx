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
import Dashboard from '../pages/Dashboard'
import EditUser from '../pages/User/EditUser'
import ListUser from '../pages/User/ListUser'
import RedirectDefault from './RedirectDefault'

const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<RedirectDefault />} />
      <Route path='/' element={<BaseLayout />}>
        <Route path={URL.DASHBOARD} element={<Dashboard />} />
        <Route path={URL.LIST_USER} element={<ListUser />} />
        <Route path={URL.EDIT_USER} element={<EditUser />} />
      </Route>
      <Route path='/login' element={<LoginLayout />} />
    </Routes>
  )
}
export default Router
