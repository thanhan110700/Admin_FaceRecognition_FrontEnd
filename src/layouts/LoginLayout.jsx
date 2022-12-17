import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../api/services/AuthUser'
import { OverlaySpinner } from '../components/OverlaySpinner'
import state from '../utils/localStorage'

export const LoginLayout = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const checkLoggedIn = async () => {
      const token = state.getState('token')
      if (token) {
        navigate('/dashboard', { replace: true })
      }
    }
    checkLoggedIn()
    setLoading(false)
  }, [])
  const [user, setUser] = useState({
    username: '',
    password: '',
  })

  const handleLogin = () => {
    login(user)
      .then(({ data }) => {
        const { user, token } = data
        state.set('user', user)
        state.set('token', token)
        navigate('/dashboard', { replace: true })
      })
      .catch((error) => {
        notifyFail(error.response.data.errors[0][0])
      })
  }

  return (
    <>
      <OverlaySpinner open={loading} />
      <section className='h-screen'>
        <div className='px-10 h-full text-gray-800'>
          <div className='flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6'>
            <div className='grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0'>
              <img
                src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp'
                className='w-full'
                alt='Sample image'
              />
            </div>
            <div className='xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0'>
              <form>
                <div className='flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5'>
                  <p className='text-center text-3xl font-semibold mx-4 mb-2'>
                    LOGIN ADMIN
                  </p>
                </div>

                <div className='mb-6'>
                  <input
                    type='text'
                    onChange={(e) =>
                      setUser({ ...user, username: e.target.value })
                    }
                    className='form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                    id='exampleFormControlInput2'
                    placeholder='Account'
                  />
                </div>

                <div className='mb-6'>
                  <input
                    type='password'
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
                    className='form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                    id='exampleFormControlInput2'
                    placeholder='Password'
                  />
                </div>

                <div className='text-center lg:text-left'>
                  <button
                    type='button'
                    onClick={handleLogin}
                    className='inline-block float-right px-10 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
