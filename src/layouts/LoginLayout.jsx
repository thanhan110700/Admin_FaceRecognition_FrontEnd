import React, { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { login } from '../api/services/AuthUser'
import { Button } from '../components/Button'
import Input from '../components/Input'
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
        toast.error(error.response.data.errors[0][0])
      })
  }
  const handleChangeData = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }
  return (
    <>
      <OverlaySpinner open={loading} />
      <section className='h-screen flex justify-center mt-10'>
        <div className=' px-[5%] h-[70%] bg-white text-gray-800 shadow-2xl rounded-xl'>
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
                  <Input
                    type='text'
                    onChange={handleChangeData}
                    value={user.username}
                    name='username'
                    id='exampleFormControlInput2'
                    placeholder='Account'
                  />
                </div>

                <div className='mb-6'>
                  <Input
                    type='password'
                    name='password'
                    value={user.password}
                    onChange={handleChangeData}
                    id='exampleFormControlInput2'
                    placeholder='Password'
                  />
                </div>

                <div className='text-center lg:text-left'>
                  <Button type='button' onClick={handleLogin}>
                    Login
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
