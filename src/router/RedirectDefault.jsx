import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import state from '../utils/localStorage'

const RedirectDefault = () => {
  let navigate = useNavigate()
  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = state.getState('token')
      if (!token) {
        navigate('/login', { replace: true })
      }
      if (token) {
        navigate('/dashboard', { replace: true })
      }
    }
    checkLoggedIn()
  }, [])
  return
}

export default RedirectDefault
