import React, { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Router from '.'
import { OverlaySpinner } from '../components/OverlaySpinner'
import Toast from '../components/Toast'
import '../css/style.css'

const App = () => {
  return (
    <>
      <Suspense fallback={<OverlaySpinner open />}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </Suspense>
      <Toast />
    </>
  )
}

export default App
